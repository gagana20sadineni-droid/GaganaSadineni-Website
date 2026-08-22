"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import { checkRateLimit } from "@/lib/rate-limit";
import {
  contactSchema,
  emptyContactValues,
  type ContactInput,
  type ContactState,
  type ContactValues,
} from "@/lib/schema";

const GENERIC_ERROR =
  "Something went wrong sending your message. Please try again in a moment.";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactMessage(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Raw strings, echoed back on failure so the visitor keeps what they typed.
  const submitted: ContactValues = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const fail = (
    message: string,
    errors?: ContactState["errors"],
  ): ContactState => ({ status: "error", message, errors, values: submitted });

  const succeed = (message: string): ContactState => ({
    status: "success",
    message,
    values: emptyContactValues,
  });

  const parsed = contactSchema.safeParse({
    ...submitted,
    website: formData.get("website"),
  });

  if (!parsed.success) {
    const errors: Partial<Record<keyof ContactInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactInput | undefined;
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return fail("Please fix the highlighted fields and try again.", errors);
  }

  const { name, email, message, website } = parsed.data;

  // Honeypot tripped — report success so bots learn nothing, but send nothing.
  if (website) {
    return succeed("Thanks — your message is on its way.");
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip).allowed) {
    return fail(
      "You've sent several messages already. Please try again a bit later.",
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Website Contact <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error(
      "Contact form is not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL.",
    );
    return fail(GENERIC_ERROR);
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Website message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <hr />
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });

    if (error) {
      console.error("Resend rejected the message:", error);
      return fail(GENERIC_ERROR);
    }
  } catch (err) {
    console.error("Failed to send contact message:", err);
    return fail(GENERIC_ERROR);
  }

  return succeed("Thanks — your message is on its way. I'll get back to you soon.");
}

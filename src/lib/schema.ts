import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(100, "That name is too long."),
  email: z
    .email("Please enter a valid email address.")
    .max(200, "That email address is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(4000, "Please keep your message under 4000 characters."),
  /** Honeypot: real people never fill this in, bots usually do. */
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Field-level errors, keyed by field name. */
  errors?: Partial<Record<keyof ContactInput, string>>;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
};

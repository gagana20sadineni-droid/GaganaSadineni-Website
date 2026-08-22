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
  /**
   * Honeypot: real people never fill this in, bots usually do. Deliberately
   * permissive — rejecting it here would surface a validation error and tell
   * the bot it was caught. The action checks it after parsing and returns a
   * fake success instead.
   */
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** What the visitor typed, echoed back so a failed submit doesn't lose it. */
export type ContactValues = {
  name: string;
  email: string;
  message: string;
};

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Field-level errors, keyed by field name. */
  errors?: Partial<Record<keyof ContactInput, string>>;
  /**
   * React resets a form once its action completes, restoring each input to its
   * `defaultValue`. Driving those defaults from here means an error round-trip
   * restores the visitor's text, while a success clears the form.
   */
  values: ContactValues;
};

export const emptyContactValues: ContactValues = {
  name: "",
  email: "",
  message: "",
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  values: emptyContactValues,
};

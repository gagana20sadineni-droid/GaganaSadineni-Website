"use client";

import { useActionState, useId } from "react";

import { sendContactMessage } from "@/lib/actions";
import { initialContactState } from "@/lib/schema";

const fieldClass =
  "w-full rounded-lg border border-line bg-raised px-3.5 py-2.5 text-[0.95rem] text-ink placeholder:text-ink-faint focus:border-steel focus:outline-none";

const errorClass = "mt-1.5 text-[0.82rem] text-accent";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialContactState,
  );

  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  // The inputs stay uncontrolled. React resets the form once the action
  // resolves, restoring each field to the `defaultValue` from the state the
  // action just returned — so a validation error keeps the visitor's text and
  // a successful send clears the form.
  const { values } = state;

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {/* Honeypot — off-screen and skipped by keyboard users; bots fill it in. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={nameId} className="label-mono mb-1.5 block text-ink-soft">
            Name
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            defaultValue={values.name}
            className={fieldClass}
            aria-invalid={state.errors?.name ? true : undefined}
            aria-describedby={state.errors?.name ? `${nameId}-error` : undefined}
          />
          {state.errors?.name ? (
            <p id={`${nameId}-error`} className={errorClass}>
              {state.errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={emailId} className="label-mono mb-1.5 block text-ink-soft">
            Email
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            defaultValue={values.email}
            className={fieldClass}
            aria-invalid={state.errors?.email ? true : undefined}
            aria-describedby={state.errors?.email ? `${emailId}-error` : undefined}
          />
          {state.errors?.email ? (
            <p id={`${emailId}-error`} className={errorClass}>
              {state.errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor={messageId} className="label-mono mb-1.5 block text-ink-soft">
          Message
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={5}
          required
          maxLength={4000}
          defaultValue={values.message}
          className={`${fieldClass} resize-y`}
          aria-invalid={state.errors?.message ? true : undefined}
          aria-describedby={state.errors?.message ? `${messageId}-error` : undefined}
        />
        {state.errors?.message ? (
          <p id={`${messageId}-error`} className={errorClass}>
            {state.errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="label-mono rounded-lg border border-accent/40 bg-accent-soft px-5 py-2.5 text-accent-ink transition-colors hover:bg-accent hover:text-bg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Sending…" : "Send message"}
        </button>

        <p
          role="status"
          aria-live="polite"
          className={`text-[0.88rem] ${
            state.status === "success" ? "text-steel" : "text-accent"
          }`}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}

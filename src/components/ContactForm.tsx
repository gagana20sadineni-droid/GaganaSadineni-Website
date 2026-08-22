"use client";

import { useActionState, useEffect, useId, useRef } from "react";

import { sendContactMessage } from "@/lib/actions";
import { initialContactState } from "@/lib/schema";

const fieldClass =
  "w-full rounded-lg border border-line bg-raised px-3.5 py-2.5 text-[0.95rem] text-ink placeholder:text-ink-faint focus:border-steel focus:outline-none";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialContactState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4" noValidate>
      {/* Honeypot — visually hidden, ignored by real people. */}
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
            className={fieldClass}
            aria-invalid={state.errors?.name ? true : undefined}
            aria-describedby={state.errors?.name ? `${nameId}-error` : undefined}
          />
          {state.errors?.name ? (
            <p id={`${nameId}-error`} className="mt-1.5 text-[0.82rem] text-accent">
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
            className={fieldClass}
            aria-invalid={state.errors?.email ? true : undefined}
            aria-describedby={state.errors?.email ? `${emailId}-error` : undefined}
          />
          {state.errors?.email ? (
            <p id={`${emailId}-error`} className="mt-1.5 text-[0.82rem] text-accent">
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
          minLength={10}
          maxLength={4000}
          className={`${fieldClass} resize-y`}
          aria-invalid={state.errors?.message ? true : undefined}
          aria-describedby={state.errors?.message ? `${messageId}-error` : undefined}
        />
        {state.errors?.message ? (
          <p id={`${messageId}-error`} className="mt-1.5 text-[0.82rem] text-accent">
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

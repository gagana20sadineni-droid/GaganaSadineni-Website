import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";

export function Contact() {
  return (
    <Section id="contact" title="Get in Touch" last>
      <div className="grid gap-9 md:grid-cols-[1fr_1.4fr]">
        <p className="text-ink-soft">
          Have a question about my research, want to collaborate, or just want to
          say hello? Send a message and it will land straight in my inbox.
        </p>
        <ContactForm />
      </div>
    </Section>
  );
}

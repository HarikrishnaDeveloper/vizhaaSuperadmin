"use client";

import { useState } from "react";
import { ArrowRight, Check } from "../_components/icons";
import { contactDetails } from "../_components/nav";

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3.5 text-[15px] text-ink placeholder:text-ink-mute/70 transition-colors focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100";

// There is no contact endpoint on the API yet, so the form hands off to the
// visitor's mail client with everything pre-filled.
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const topic = String(data.get("topic") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = `[${topic}] Message from ${name}`;
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${contactDetails.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <div className="rounded-3xl border border-line bg-white p-7 shadow-lift sm:p-10">
      {sent ? (
        <div className="py-10 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-brand">
            <Check className="h-7 w-7" strokeWidth={2.4} />
          </span>
          <h2 className="mt-6 font-display text-2xl font-bold text-ink">Your email is ready to send</h2>
          <p className="mx-auto mt-2 max-w-sm text-ink-soft">
            We opened your mail app with your message. If nothing opened, write to us at{" "}
            <a href={`mailto:${contactDetails.email}`} className="font-semibold text-brand-600">
              {contactDetails.email}
            </a>
            .
          </p>
          <button type="button" onClick={() => setSent(false)} className="mt-8 text-sm font-semibold text-brand-600 hover:underline">
            Write another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">Send us a message</h2>
            <p className="mt-1 text-[15px] text-ink-soft">We usually reply within one business day.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-ink">Name</span>
              <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-ink">Email</span>
              <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={field} />
            </label>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-ink">I am a…</legend>
            <div className="grid grid-cols-3 gap-2.5">
              {["Organizer", "Catering person", "Other"].map((t, i) => (
                <label key={t} className="cursor-pointer">
                  <input type="radio" name="topic" value={t} defaultChecked={i === 0} className="peer sr-only" />
                  <span className="block rounded-xl border border-line px-2 py-3 text-center text-sm font-medium text-ink-soft transition-colors peer-checked:border-brand-500 peer-checked:bg-brand-50 peer-checked:text-brand-700 peer-focus-visible:ring-4 peer-focus-visible:ring-brand-100">
                    {t}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-ink">Message</span>
            <textarea name="message" required rows={5} placeholder="Tell us about your event or question" className={`${field} resize-none`} />
          </label>

          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-4 text-[15px] font-semibold text-white shadow-brand transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            Send Message
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </form>
      )}
    </div>
  );
}

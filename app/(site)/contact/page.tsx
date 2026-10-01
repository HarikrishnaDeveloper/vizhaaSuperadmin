import type { Metadata } from "next";
import { Clock, Mail, MapPin } from "../_components/icons";
import { contactDetails } from "../_components/nav";
import { Container, Eyebrow, IconBadge, Photo } from "../_components/ui";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions or need support? Get in touch with the Vizhaa team.",
};

const channels = [
  { icon: Mail, label: "Email", value: contactDetails.email, href: `mailto:${contactDetails.email}` },
  { icon: MapPin, label: "Location", value: contactDetails.location },
  { icon: Clock, label: "Business Hours", value: contactDetails.hours },
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist to-white py-16 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand-100/50 blur-3xl" />
      <Container className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="rise">
          <Eyebrow className="mb-4">Contact us</Eyebrow>
          <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink sm:text-6xl">
            Get in <span className="text-brand-600">Touch</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            Have questions or need support? We’re here to help. Reach out to us and we’ll get back to you soon.
          </p>

          <ul className="mt-10 space-y-5">
            {channels.map((c) => (
              <li key={c.label} className="flex items-center gap-4">
                <IconBadge icon={c.icon} />
                <div>
                  <p className="text-sm font-bold text-ink">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="text-[15px] text-ink-soft hover:text-brand-600">
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-[15px] text-ink-soft">{c.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="relative mt-12 hidden aspect-[16/7] overflow-hidden rounded-3xl lg:block">
            <Photo name="contactSide" sizes="560px" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/30 to-transparent" />
            <p className="absolute bottom-6 left-7 max-w-[15rem] font-display text-xl font-bold leading-snug text-white">
              Every great event starts with a conversation.
            </p>
          </div>
        </div>

        <div className="rise lg:pt-6" style={{ animationDelay: "120ms" }}>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}

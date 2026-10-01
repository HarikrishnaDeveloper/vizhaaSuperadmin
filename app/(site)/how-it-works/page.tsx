import type { Metadata } from "next";
import Link from "next/link";
import type { PhotoKey } from "../_components/images";
import { Calendar, ChefHat, Search, Users } from "../_components/icons";
import { ButtonLink, Container, CtaBanner, PageHero, Photo, SectionHeading, Steps } from "../_components/ui";

export const metadata: Metadata = {
  title: "How It Works",
  description: "How Vizhaa helps organizers find catering people and helps catering professionals get event work.",
};

const tracks: {
  label: string;
  title: string;
  photo: PhotoKey;
  steps: string[];
  cta: { href: string; label: string };
}[] = [
  {
    label: "For organizers",
    title: "Build your catering team",
    photo: "howOrganizer",
    steps: [
      "Create a free organizer account",
      "Post your event with date, venue and roles needed",
      "Review interested catering people and confirm your team",
      "Share the schedule and track confirmations in one place",
    ],
    cta: { href: "/register?role=ORGANIZER", label: "Start as an organizer" },
  },
  {
    label: "For catering people",
    title: "Find your next event",
    photo: "howSupplier",
    steps: [
      "Create your profile with your role and experience",
      "Get notified about events that match your skills",
      "Accept the dates that work for you",
      "Show up, do great work and build your reputation",
    ],
    cta: { href: "/register?role=SUPPLIER", label: "Join as a catering person" },
  },
];

const faqs = [
  {
    q: "Is Vizhaa free to join?",
    a: "Creating an account is free for both organizers and catering people. Reach out to us for details on event plans.",
  },
  {
    q: "How are catering people verified?",
    a: "Every profile is reviewed by our team before it can be matched to events, and organizers share feedback after each event.",
  },
  {
    q: "What kinds of events can I staff?",
    a: "Weddings, corporate events, religious functions, birthdays and private parties — any event that needs a catering crew.",
  },
  {
    q: "Which roles can I find on Vizhaa?",
    a: "Cooks, kitchen helpers and serving staff. You can request several roles for a single event.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={
          <>
            A Simple Process <br className="hidden sm:block" />
            for <span className="text-brand-600">Everyone</span>
          </>
        }
        lead="We make it easy for event organizers to find catering people and for catering professionals to get opportunities."
        photo="howHero"
        actions={<ButtonLink href="/register">Get Started</ButtonLink>}
      />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="At a glance" title="Three steps to a smooth event" />
          <div className="mt-14">
            <Steps
              steps={[
                { icon: Search, title: "Organizers Find Catering People", text: "Search and connect with reliable catering professionals." },
                { icon: Users, title: "Catering People Get Opportunities", text: "Receive event requests and join catering teams." },
                { icon: Calendar, title: "Events Happen Smoothly", text: "Together we make every event a success." },
              ]}
            />
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Step by step"
            title="Two sides, one simple flow"
            lead="Whichever side you are on, getting started takes minutes."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {tracks.map((t, idx) => (
              <article key={t.label} className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
                <div className="relative aspect-[16/8]">
                  <Photo name={t.photo} sizes="(min-width: 1024px) 600px, 100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
                  <div className="absolute bottom-5 left-6 flex items-center gap-3 text-white">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/30 backdrop-blur">
                      {idx === 0 ? <Users className="h-5 w-5" /> : <ChefHat className="h-5 w-5" />}
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/80">{t.label}</p>
                      <h3 className="font-display text-xl font-bold">{t.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-7 sm:p-8">
                  <ol className="space-y-4">
                    {t.steps.map((s, i) => (
                      <li key={s} className="flex gap-4">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[13px] font-bold text-brand-600 ring-1 ring-brand-100">
                          {i + 1}
                        </span>
                        <span className="pt-0.5 text-[15px] text-ink">{s}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-8">
                    <ButtonLink href={t.cta.href} variant={idx === 0 ? "primary" : "secondary"} className="px-5 py-3 text-sm">
                      {t.cta.label}
                    </ButtonLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <SectionHeading align="left" eyebrow="Questions" title="Frequently asked" />
            <p className="mt-4 text-ink-soft">
              Still curious?{" "}
              <Link href="/contact" className="font-semibold text-brand-600 hover:underline">
                Talk to our team
              </Link>
              .
            </p>
          </div>
          <div className="divide-y divide-line rounded-2xl border border-line bg-white shadow-card">
            {faqs.map((f) => (
              <details key={f.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-[16.5px] font-bold text-ink">
                  {f.q}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mist text-brand-600 transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 pr-10 text-[15px] leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        eyebrow="Ready when you are"
        title="Start in Minutes"
        text="Create your free account and put together your first catering team, or find your next event."
        photo="howCta"
        action={<ButtonLink href="/register">Create your account</ButtonLink>}
      />
    </>
  );
}

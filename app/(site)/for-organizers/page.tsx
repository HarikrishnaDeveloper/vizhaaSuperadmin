import type { Metadata } from "next";
import { Bell, Calendar, Check, Clock, Search, Shield, Users } from "../_components/icons";
import {
  ButtonLink,
  Container,
  CtaBanner,
  FeatureCard,
  FloatingNote,
  Photo,
  PhotoTile,
  SectionHeading,
} from "../_components/ui";

export const metadata: Metadata = {
  title: "For Organizers",
  description: "Find skilled, verified catering people for weddings, corporate events and private celebrations.",
};

const reasons = [
  { icon: Clock, title: "Save Time", text: "Find the right catering people quickly — no more chasing calls the week of your event." },
  { icon: Shield, title: "Reliable People", text: "Work with verified and experienced professionals who arrive ready to work." },
  { icon: Users, title: "Focus on Your Event", text: "Leave catering team management to us and spend your energy on your guests." },
];

const flow = [
  { icon: Calendar, title: "Post your event", text: "Share the date, venue, guest count and the roles you need." },
  { icon: Search, title: "Pick your team", text: "Review profiles and experience, then confirm the people you want." },
  { icon: Bell, title: "Stay in the loop", text: "Everyone gets the schedule, and you see who has confirmed at a glance." },
];

export default function OrganizersPage() {
  return (
    <>
      {/* Hero — mirror layout: photo left, copy right, to set this page apart */}
      <section className="relative overflow-hidden bg-gradient-to-b from-mist to-white">
        <Container className="grid items-center gap-12 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="rise order-1">
            <p className="mb-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-brand-600">For Organizers</p>
            <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink sm:text-6xl">
              Find Reliable <span className="text-brand-600">Catering People</span> for Your Events
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
              Connect with skilled and experienced catering professionals to make your event a success.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/register?role=ORGANIZER">Find Catering People</ButtonLink>
              <ButtonLink href="/how-it-works" variant="secondary" arrow={false}>
                See how it works
              </ButtonLink>
            </div>
          </div>

          <div className="relative order-2">
            <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-brand-100/60" aria-hidden />
            <div className="relative aspect-[5/4] overflow-hidden rounded-[32px] rounded-tl-[120px] shadow-lift">
              <Photo name="orgHero" sizes="(min-width: 1024px) 600px, 100vw" priority />
            </div>
            <div className="absolute -bottom-6 left-4 sm:left-[-24px]">
              <FloatingNote icon={Check} title="Team confirmed" text="12 people · Saturday, 6 PM" />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Why organizers choose us"
            title="Why Organizers Choose Vizhaa"
            lead="Everything you need to put together a dependable catering crew, without the last-minute stress."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {reasons.map((r) => (
              <FeatureCard key={r.title} {...r} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="Every occasion"
              title="Perfect for All Your Events"
              lead="From intimate gatherings to grand receptions, the right team for the moment."
            />
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <PhotoTile photo="orgWeddings" title="Weddings" text="Large teams for receptions, mehendi and sangeet nights." />
            <PhotoTile photo="orgCorporate" title="Corporate Events" text="Polished service for conferences, launches and offsites." />
            <PhotoTile photo="orgPrivate" title="Private Celebrations" text="Birthdays, anniversaries and housewarmings, done right." />
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading align="left" eyebrow="Your workflow" title="From request to ready, in three steps" />
            <ol className="mt-10 space-y-7">
              {flow.map((f, i) => (
                <li key={f.title} className="flex gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-brand">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold tracking-wider text-brand-600">STEP {i + 1}</p>
                    <h3 className="mt-0.5 font-display text-lg font-bold text-ink">{f.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{f.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] rounded-br-[120px]">
            <Photo name="orgToast" sizes="(min-width: 1024px) 600px, 100vw" />
          </div>
        </Container>
      </section>

      <CtaBanner
        eyebrow="Ready to plan your event?"
        title="Get Started with Vizhaa"
        text="Find trusted catering people and make your event memorable."
        photo="orgCta"
        action={<ButtonLink href="/register?role=ORGANIZER">Find Catering People</ButtonLink>}
      />
    </>
  );
}

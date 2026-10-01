import type { Metadata } from "next";
import { Check, Eye, Heart, Shield, Target } from "../_components/icons";
import { ButtonLink, Container, CtaBanner, FloatingNote, IconBadge, PageHero, Photo, SectionHeading } from "../_components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "Vizhaa is a platform that connects event organizers with skilled catering professionals.",
};

const values = ["Trust", "Reliability", "Simplicity", "People First"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Vizhaa"
        title={
          <>
            Making Events Easier, <span className="text-brand-600">Together</span>
          </>
        }
        lead="Vizhaa is a platform that connects event organizers with skilled catering professionals. Our goal is to make every event smooth and successful by bringing the right people together."
        photo="aboutHero"
        actions={<ButtonLink href="/contact">Talk to us</ButtonLink>}
        floating={<FloatingNote icon={Heart} title="Made in Coimbatore" text="Built for India’s celebrations" />}
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-line bg-white p-8 shadow-card">
              <IconBadge icon={Eye} size="lg" />
              <h3 className="mt-6 font-display text-xl font-bold text-ink">Our Vision</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                To make it easy for every event to find reliable catering people.
              </p>
            </div>
            <div className="rounded-3xl border border-line bg-white p-8 shadow-card">
              <IconBadge icon={Target} size="lg" />
              <h3 className="mt-6 font-display text-xl font-bold text-ink">Our Mission</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                To create more opportunities for catering professionals and support the event industry.
              </p>
            </div>
            <div className="rounded-3xl bg-brand-600 p-8 text-white shadow-brand">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                <Shield className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-xl font-bold">Our Values</h3>
              <ul className="mt-3 grid grid-cols-2 gap-2.5 text-[15px]">
                {values.map((v) => (
                  <li key={v} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-brand-100" strokeWidth={2.4} />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-5 gap-4">
              <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-3xl">
                <Photo name="aboutStory" sizes="(min-width: 1024px) 340px, 60vw" />
              </div>
              <div className="relative col-span-2 mt-16 aspect-[2/3] overflow-hidden rounded-3xl">
                <Photo name="aboutVenue" sizes="(min-width: 1024px) 220px, 40vw" />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title="Great food needs great people"
              lead="We have seen beautiful events held back by one thing: finding enough dependable hands in the kitchen and on the floor. Good cooks and serving staff were out there — they just weren’t easy to reach."
            />
            <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
              Vizhaa brings both sides onto one platform. Organizers get a team they can trust, and catering professionals
              get steady, fair work and a reputation that grows with every event.
            </p>
            <div className="mt-9">
              <ButtonLink href="/how-it-works" variant="secondary">
                See how it works
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner
        eyebrow="Be part of the story"
        title="Let’s Build Better Events Together"
        text="Whether you plan events or cook for them, there is a place for you at Vizhaa."
        photo="aboutCta"
        action={<ButtonLink href="/register">Join Vizhaa</ButtonLink>}
      />
    </>
  );
}

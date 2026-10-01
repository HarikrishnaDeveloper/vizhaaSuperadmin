import type { Metadata } from "next";
import { Briefcase, Calendar, Heart, Shield, Star, TrendingUp } from "../_components/icons";
import {
  ButtonLink,
  Container,
  CtaBanner,
  FeatureCard,
  FloatingNote,
  PageHero,
  PhotoTile,
  SectionHeading,
} from "../_components/ui";

export const metadata: Metadata = {
  title: "For Suppliers",
  description: "Join Vizhaa as a cook, kitchen helper or serving staff and get event catering opportunities.",
};

const benefits = [
  { icon: Briefcase, title: "Get Event Opportunities", text: "Receive requests from event organizers near you, matched to your skills." },
  { icon: TrendingUp, title: "Grow Your Experience", text: "Work with different events and organizers, and build a record you can be proud of." },
  { icon: Shield, title: "Be Part of a Trusted Network", text: "Build your reputation as a catering professional organizers ask for by name." },
];

const perks = [
  { icon: Calendar, title: "Choose your dates", text: "Accept the events that fit your week." },
  { icon: Star, title: "Earn recognition", text: "Good feedback helps you get picked first." },
  { icon: Heart, title: "Join great teams", text: "Work alongside experienced catering crews." },
];

export default function SuppliersPage() {
  return (
    <>
      <PageHero
        eyebrow="For Suppliers"
        title={
          <>
            Showcase Your <span className="text-brand-600">Catering Skills</span>
          </>
        }
        lead="Join Vizhaa and get catering opportunities from event organizers. Be part of a trusted platform built for catering professionals."
        photo="supHero"
        actions={
          <>
            <ButtonLink href="/register?role=SUPPLIER">Join as a Catering Person</ButtonLink>
            <ButtonLink href="/how-it-works" variant="secondary" arrow={false}>
              How it works
            </ButtonLink>
          </>
        }
        footer={
          <ul className="grid gap-4 sm:grid-cols-3">
            {perks.map((p) => (
              <li key={p.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <p.icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-sm leading-snug">
                  <span className="block font-bold text-ink">{p.title}</span>
                  <span className="text-ink-mute">{p.text}</span>
                </span>
              </li>
            ))}
          </ul>
        }
        floating={<FloatingNote icon={Briefcase} title="New event request" text="Wedding reception · 3 cooks" />}
      />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Why join"
            title="Why Join as a Supplier?"
            lead="More events, better teams and a reputation that travels with you."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {benefits.map((b) => (
              <FeatureCard key={b.title} {...b} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Roles we hire for"
            title="Who Can Join?"
            lead="Whether you run the kitchen or the floor, there is a place for you on Vizhaa."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <PhotoTile photo="supCooks" title="Cooks" text="Head cooks and specialists for every cuisine and scale." />
            <PhotoTile photo="supHelpers" title="Kitchen Helpers" text="Prep, cleaning and support that keeps the kitchen moving." />
            <PhotoTile photo="supServers" title="Serving Staff" text="Friendly, well-presented staff for buffets and table service." />
          </div>
        </Container>
      </section>

      <CtaBanner
        eyebrow="Your next event is waiting"
        title="Start Your Journey with Vizhaa"
        text="Join as a catering person and get event opportunities."
        photo="supCta"
        action={<ButtonLink href="/register?role=SUPPLIER">Join Now</ButtonLink>}
      />
    </>
  );
}

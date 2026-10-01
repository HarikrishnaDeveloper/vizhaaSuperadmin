import type { PhotoKey } from "./_components/images";
import { Calendar, ChefHat, Check, Search, Shield, Sparkles, Users, Utensils } from "./_components/icons";
import {
  ButtonLink,
  Container,
  CtaBanner,
  FloatingNote,
  IconBadge,
  PageHero,
  Photo,
  SectionHeading,
  Steps,
} from "./_components/ui";

const heroPoints = [
  { icon: Users, title: "Verified", text: "Catering People" },
  { icon: Shield, title: "Reliable", text: "Professionals" },
  { icon: Calendar, title: "For All", text: "Events" },
];

const audiences: {
  icon: typeof Users;
  title: string;
  text: string;
  cta: string;
  href: string;
  photo: PhotoKey;
}[] = [
  {
    icon: Users,
    title: "For Organizers",
    text: "Find skilled and reliable catering people for your events. Save time and focus on what matters most.",
    cta: "Find Catering People",
    href: "/for-organizers",
    photo: "homeOrganizers",
  },
  {
    icon: ChefHat,
    title: "For Catering People",
    text: "Showcase your skills and get event opportunities. Be part of trusted catering teams.",
    cta: "Join as a Catering Person",
    href: "/for-suppliers",
    photo: "homeSuppliers",
  },
];

const promises = [
  { value: "Verified", label: "Every profile checked" },
  { value: "3 roles", label: "Cooks, helpers & serving staff" },
  { value: "Any size", label: "Home functions to grand weddings" },
  { value: "One place", label: "Requests, teams & schedules" },
];

export default function HomePage() {
  return (
    <>
      <PageHero
        title={
          <>
            Catering People <br className="hidden sm:block" />
            for Every <span className="text-brand-600">Celebration</span>
          </>
        }
        lead="Vizhaa connects event organizers with reliable catering professionals to make every event a success."
        photo="homeHero"
        actions={
          <>
            <ButtonLink href="/for-organizers">Find Catering People</ButtonLink>
            <ButtonLink href="/how-it-works" variant="secondary" arrow={false}>
              Learn More
            </ButtonLink>
          </>
        }
        footer={
          <ul className="grid grid-cols-3 gap-4 sm:max-w-xl sm:gap-6">
            {heroPoints.map((p) => (
              <li key={p.title} className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
                <IconBadge icon={p.icon} />
                <span className="text-sm leading-tight">
                  <span className="block font-bold text-ink">{p.title}</span>
                  <span className="text-ink-mute">{p.text}</span>
                </span>
              </li>
            ))}
          </ul>
        }
        floating={<FloatingNote icon={Utensils} title="Quality Catering Support" text="for Your Events" />}
      />

      {/* Audiences */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Simple and focused"
            title="Built for Event Organizers and Catering People"
            lead="We simplify the way event organizers find catering people and help catering professionals get more opportunities."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {audiences.map((a) => (
              <article
                key={a.title}
                className="group grid overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-white to-mist shadow-card transition-shadow duration-300 hover:shadow-lift sm:grid-cols-[1.15fr_1fr]"
              >
                <div className="flex flex-col p-8 sm:p-9">
                  <IconBadge icon={a.icon} size="lg" />
                  <h3 className="mt-6 font-display text-2xl font-bold text-ink">{a.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft">{a.text}</p>
                  <div className="mt-8">
                    <ButtonLink href={a.href} className="px-5 py-3 text-sm">
                      {a.cta}
                    </ButtonLink>
                  </div>
                </div>
                <div className="relative m-3 min-h-60 overflow-hidden rounded-2xl sm:ml-0">
                  <Photo
                    name={a.photo}
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="rounded-[28px] bg-mist px-6 py-14 ring-1 ring-line sm:px-12 sm:py-16">
            <SectionHeading eyebrow="How it works" title="A Simple Process" />
            <div className="mt-14">
              <Steps
                steps={[
                  {
                    icon: Search,
                    title: "Organizer Finds Catering People",
                    text: "Search and connect with reliable catering professionals.",
                  },
                  {
                    icon: Users,
                    title: "Catering People Get Opportunities",
                    text: "Receive event requests and join catering teams.",
                  },
                  {
                    icon: Sparkles,
                    title: "Events Happen Smoothly",
                    text: "Together we make every event a success.",
                  },
                ]}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Trust split */}
      <section className="pb-4">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[5/4] lg:aspect-[4/5]">
                <Photo name="homeTrust" sizes="(min-width: 1024px) 560px, 100vw" />
              </div>
              <div className="absolute -bottom-8 right-4 w-[46%] overflow-hidden rounded-2xl border-[6px] border-white shadow-lift sm:right-8">
                <div className="relative aspect-square">
                  <Photo name="homeGuests" sizes="260px" />
                </div>
              </div>
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-ink shadow-card backdrop-blur sm:left-6 sm:top-6">
                <Shield className="h-4 w-4 text-brand-600" />
                Verified catering teams
              </div>
            </div>

            <div className="pt-6 lg:pt-0">
              <SectionHeading
                align="left"
                eyebrow="Why Vizhaa"
                title="Every plate served by people you can count on"
                lead="Behind every memorable event is a team that shows up on time and knows the work. Vizhaa makes finding that team simple."
              />
              <ul className="mt-8 space-y-4">
                {[
                  "Profiles checked before anyone is placed at your event",
                  "Feedback from organizers after every event",
                  "Cooks, kitchen helpers and serving staff in one place",
                  "Clear schedules so everyone knows where to be and when",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[15.5px] text-ink">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line lg:grid-cols-4">
            {promises.map((s) => (
              <div key={s.label} className="bg-white px-6 py-8 text-center">
                <p className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{s.value}</p>
                <p className="mt-1.5 text-sm text-ink-mute">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        eyebrow="Food brings people together"
        title="Let’s Make Your Next Event a Success"
        text="Connect with trusted catering professionals and create memorable events with Vizhaa."
        photo="homeCta"
        action={<ButtonLink href="/register">Get Started</ButtonLink>}
      />
    </>
  );
}

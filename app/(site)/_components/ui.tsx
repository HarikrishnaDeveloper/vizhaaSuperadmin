import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { ArrowRight } from "./icons";
import { photos, type PhotoKey } from "./images";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[12.5px] font-semibold uppercase tracking-[0.14em] text-brand-600 ${className}`}>{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <h2 className="font-display text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-[2.6rem] sm:leading-[1.1]">
        {title}
      </h2>
      {lead && <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">{lead}</p>}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  arrow?: boolean;
  className?: string;
}) {
  const styles = {
    primary: "bg-brand-600 text-white shadow-brand hover:bg-brand-700",
    secondary: "border border-line bg-white text-ink hover:border-brand-200 hover:bg-brand-50",
    light: "bg-white text-brand-700 hover:bg-brand-50",
  }[variant];
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-6 py-3.5 text-[15px] font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${styles} ${className}`}
    >
      {children}
      {arrow && <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
    </Link>
  );
}

/** Next/Image filling its parent; the parent sets the size and shape. */
export function Photo({
  name,
  sizes,
  priority,
  className = "",
}: {
  name: PhotoKey;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const { src, alt } = photos[name];
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />;
}

export function IconBadge({ icon: Icon, size = "md" }: { icon: Icon; size?: "md" | "lg" }) {
  const box = size === "lg" ? "h-14 w-14 rounded-2xl" : "h-11 w-11 rounded-xl";
  const glyph = size === "lg" ? "h-6 w-6" : "h-5 w-5";
  return (
    <span className={`inline-flex shrink-0 items-center justify-center bg-brand-50 text-brand-600 ring-1 ring-brand-100 ${box}`}>
      <Icon className={glyph} />
    </span>
  );
}

/**
 * Split hero: copy on the left, arc-edged photo bleeding to the right edge,
 * with a soft brand disc behind the curve. Shared by every page so the
 * system feels consistent.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  photo,
  actions,
  footer,
  floating,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead: ReactNode;
  photo: PhotoKey;
  actions?: ReactNode;
  footer?: ReactNode;
  floating?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist to-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-brand-100/40 blur-3xl"
      />
      <div className="relative grid lg:min-h-[600px] lg:grid-cols-[1.05fr_1fr]">
        <div className="flex items-center">
          <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:mr-0 lg:max-w-[640px] lg:py-24 lg:pr-12">
            <div className="rise">
              {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
              <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink sm:text-6xl lg:text-[4.1rem]">
                {title}
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">{lead}</p>
            </div>
            {actions && (
              <div className="rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "120ms" }}>
                {actions}
              </div>
            )}
            {footer && (
              <div className="rise mt-12" style={{ animationDelay: "220ms" }}>
                {footer}
              </div>
            )}
          </div>
        </div>

        <div className="relative min-h-[340px] pb-6 sm:min-h-[460px] lg:min-h-0 lg:pb-0">
          <div aria-hidden className="absolute left-[-6%] top-1/2 hidden h-[62%] aspect-square -translate-y-1/2 rounded-full bg-brand-100/70 lg:block" />
          <div className="absolute inset-x-5 bottom-6 top-0 overflow-hidden rounded-3xl sm:inset-x-8 lg:inset-y-0 lg:left-[6%] lg:right-0 lg:rounded-none lg:arc-left">
            <Photo name={photo} sizes="(min-width: 1024px) 50vw, 100vw" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
          </div>
          {floating && (
            <div className="absolute bottom-10 right-9 sm:bottom-12 sm:right-12 lg:bottom-10 lg:right-10">{floating}</div>
          )}
        </div>
      </div>
    </section>
  );
}

export function FloatingNote({ icon: Icon, title, text }: { icon: Icon; title: string; text: string }) {
  return (
    <div className="rise flex items-center gap-3.5 rounded-2xl bg-white/95 py-3.5 pl-3.5 pr-6 shadow-lift ring-1 ring-black/5 backdrop-blur" style={{ animationDelay: "350ms" }}>
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm font-bold text-ink">{title}</p>
        <p className="text-[13px] text-ink-mute">{text}</p>
      </div>
    </div>
  );
}

export function FeatureCard({ icon, title, text }: { icon: Icon; title: string; text: string }) {
  return (
    <div className="group rounded-2xl border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
      <IconBadge icon={icon} />
      <h3 className="mt-5 font-display text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{text}</p>
    </div>
  );
}

export function PhotoTile({ photo, title, text }: { photo: PhotoKey; title: string; text?: string }) {
  return (
    <figure className="group overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Photo
          name={photo}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <figcaption className="p-5">
        <p className="font-display font-bold text-ink">{title}</p>
        {text && <p className="mt-1 text-sm leading-relaxed text-ink-soft">{text}</p>}
      </figcaption>
    </figure>
  );
}

/** Wide closing banner: text on a soft panel, photo fading in from the right. */
export function CtaBanner({
  eyebrow,
  title,
  text,
  photo,
  action,
}: {
  eyebrow: string;
  title: string;
  text: string;
  photo: PhotoKey;
  action: ReactNode;
}) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-50 via-white to-brand-50 ring-1 ring-brand-100">
          <div className="absolute inset-y-0 right-0 -z-10 w-full sm:w-3/5">
            <Photo name={photo} sizes="(min-width: 640px) 60vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-50 via-brand-50/80 to-brand-50/10 sm:via-brand-50/0 sm:via-40% sm:to-transparent" />
          </div>
          <div className="max-w-xl px-7 py-12 sm:px-12 sm:py-16">
            <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl">{title}</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-soft sm:text-lg">{text}</p>
            <div className="mt-8">{action}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Steps({
  steps,
}: {
  steps: { icon: Icon; title: string; text: string }[];
}) {
  return (
    <ol className="relative grid gap-10 md:grid-cols-3 md:gap-6">
      <div aria-hidden className="absolute left-[16.6%] right-[16.6%] top-7 hidden border-t-2 border-dashed border-brand-200 md:block" />
      {steps.map((step, i) => (
        <li key={step.title} className="relative text-center">
          <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-card ring-1 ring-brand-100">
            <step.icon className="h-6 w-6" />
            <span className="absolute -right-2.5 -top-2.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-brand-600 px-1.5 text-[11px] font-bold text-white">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mx-auto mt-6 max-w-[15rem] font-display text-lg font-bold text-ink">{step.title}</h3>
          <p className="mx-auto mt-2 max-w-[17rem] text-[15px] leading-relaxed text-ink-soft">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

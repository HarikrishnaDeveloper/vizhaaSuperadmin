"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { VizhaaMark } from "@/lib/brand";
import { Close, Menu } from "./icons";
import { navLinks } from "./nav";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Vizhaa home">
      <VizhaaMark height={28} priority />
      <span className="font-display text-[1.35rem] font-extrabold tracking-[-0.02em] text-ink">VIZHAA</span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-line bg-white/90 backdrop-blur-xl" : "border-b border-transparent bg-white"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-lg px-3.5 py-2 text-[14.5px] font-medium transition-colors ${
                  active ? "text-brand-600" : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-3.5 -bottom-[17px] h-0.5 rounded-full bg-brand-600 transition-opacity ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/login" className="rounded-lg px-4 py-2 text-[14.5px] font-semibold text-ink hover:text-brand-600">
            Sign in
          </Link>
          <Link
            href="/register"
            className="rounded-xl bg-brand-600 px-4.5 py-2.5 text-[14.5px] font-semibold text-white shadow-brand transition-colors hover:bg-brand-700"
          >
            Get started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-xl text-ink hover:bg-mist lg:hidden"
        >
          {open ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-white lg:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-7xl flex-col px-5 py-4 sm:px-8" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-xl px-3 py-3 text-base font-medium ${
                    active ? "bg-brand-50 text-brand-700" : "text-ink hover:bg-mist"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-line pt-4">
              <Link href="/login" className="rounded-xl border border-line py-3 text-center font-semibold text-ink">
                Sign in
              </Link>
              <Link href="/register" className="rounded-xl bg-brand-600 py-3 text-center font-semibold text-white">
                Get started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

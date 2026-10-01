import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vizhaa — Catering People for Every Celebration",
    template: "%s · Vizhaa",
  },
  description:
    "Vizhaa connects event organizers with reliable, verified catering professionals — cooks, kitchen helpers and serving staff.",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${jakarta.variable} flex min-h-screen flex-col bg-white font-display text-ink antialiased`}>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

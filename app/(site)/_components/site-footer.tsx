import Link from "next/link";
import { Mail, MapPin } from "./icons";
import { contactDetails, navLinks } from "./nav";
import { Logo } from "./site-header";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              The trusted way to bring event organizers and skilled catering people together.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-ink">Explore</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-[15px]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ink-soft transition-colors hover:text-brand-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold text-ink">Get in touch</p>
            <ul className="mt-4 space-y-3 text-[15px] text-ink-soft">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4.5 w-4.5 text-brand-600" />
                <a href={`mailto:${contactDetails.email}`} className="hover:text-brand-600">
                  {contactDetails.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4.5 w-4.5 text-brand-600" />
                {contactDetails.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line py-6 text-[13px] text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Vizhaa. All rights reserved.</p>
          <p>Connecting Catering People and Event Organizers.</p>
        </div>
      </div>
    </footer>
  );
}

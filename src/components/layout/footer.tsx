import Link from "next/link";
import { FOOTER_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Logo } from "@/components/ui/logo";

export default function Footer() {
  return (
    <footer className="relative bg-ink-950 overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div>
            <Link href="/" className="mb-4 inline-block">
              <Logo iconClassName="w-8 h-8" textClassName="text-xl text-white" highlightClassName="text-indigo-400" />
            </Link>
            <p className="text-ink-400 text-sm leading-relaxed max-w-xs mb-6">
              {SITE_CONFIG.description}
            </p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                AI-Powered
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-ink-400 hover:text-indigo-300 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ink-500 text-sm">
            © {new Date().getFullYear()} IKIP Technologies. All rights reserved.
          </p>
          <p className="text-ink-500 text-sm">
            Engineered for Industrial Excellence. Ensuring compliance, safety, and reliability worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}

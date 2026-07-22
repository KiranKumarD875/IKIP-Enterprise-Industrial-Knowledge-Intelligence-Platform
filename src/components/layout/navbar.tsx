"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/ui/logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass shadow-subtle border-b border-ink-100"
            : "bg-white/0 border-b border-transparent"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="group">
              <Logo className="scale-105 group-hover:scale-110 transition-transform duration-300" iconClassName="w-10 h-10" textClassName="text-2xl text-ink-900" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "relative px-5 py-2.5 rounded-lg text-base font-medium transition-colors duration-200",
                      isActive
                        ? "text-indigo-600"
                        : "text-ink-600 hover:text-ink-900 hover:bg-ink-100/60"
                    )}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-lg bg-indigo-50 border border-indigo-100" />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <Link href="/dashboard" className="btn-primary text-base px-6 py-3">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-base font-medium text-ink-600 hover:text-ink-900 px-4 py-2 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link href="/signup" className="btn-primary text-base px-6 py-3">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-ink-600 hover:text-ink-900 hover:bg-ink-100"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink-950/30 backdrop-blur-sm animate-fade-in" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white border-l border-ink-100 p-6 flex flex-col shadow-floating animate-scale-in origin-top-right">
            <div className="flex items-center justify-between mb-8">
              <Logo iconClassName="w-8 h-8" textClassName="text-xl text-ink-900" />
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg text-ink-400 hover:text-ink-900 hover:bg-ink-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 flex-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-3 rounded-lg text-ink-700 hover:text-indigo-600 hover:bg-indigo-50 font-medium text-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-3 pt-6 border-t border-ink-100">
              {user ? (
                <Link href="/dashboard" className="btn-primary text-center justify-center text-lg py-3">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login" className="btn-secondary text-center justify-center text-lg py-3">
                    Log in
                  </Link>
                  <Link href="/signup" className="btn-primary text-center justify-center text-lg py-3">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
          scrolled
            ? "surface shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]"
            : "border border-transparent"
        }`}
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-mist-200"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-ember-500" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-ember-500" />
          </span>
          <span className="hidden xs:inline">Oleksii&nbsp;Lavrenin</span>
          <span className="xs:hidden">OL</span>
        </Link>

        <div className="flex items-center gap-0.5 sm:gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-2.5 py-1.5 text-sm text-mist-400 transition-colors hover:bg-white/5 hover:text-mist-200 sm:px-3.5"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

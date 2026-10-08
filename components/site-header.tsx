"use client";

import Link from "next/link";
import { useState } from "react";
import { HeartPulse, Menu, X } from "lucide-react";

const links = [
  { href: "/#doctors", label: "Shifokorlar" },
  { href: "/#how-it-works", label: "Qanday ishlaydi" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="Medora bosh sahifasi"
        >
          <span className="flex size-10 items-center justify-center rounded-[14px] bg-teal-600 text-white shadow-md shadow-teal-600/20 transition-transform group-hover:rotate-[-8deg]">
            <HeartPulse size={21} strokeWidth={2.2} />
          </span>
          <span className="text-[21px] font-bold tracking-[-0.06em] text-slate-900">
            medora<span className="text-teal-600">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-500 transition-colors hover:text-teal-700"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+998712000000"
            className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800"
          >
            +998 71 200 00 00
          </a>
        </nav>

        <Link
          href="/#doctors"
          className="hidden items-center justify-center rounded-full bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-700/15 transition-all hover:-translate-y-0.5 hover:bg-teal-800 active:scale-95 sm:inline-flex"
        >
          Shifokor topish
        </Link>
        <button
          type="button"
          aria-label={menuOpen ? "Menyuni yopish" : "Menyuni ochish"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 md:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm font-medium text-slate-600"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+998712000000"
            className="block py-3 text-sm font-medium text-teal-700"
          >
            +998 71 200 00 00
          </a>
        </nav>
      )}
    </header>
  );
}

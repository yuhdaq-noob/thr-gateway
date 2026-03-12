"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "sambutan", label: "Sambutan" },
  { id: "spin", label: "Putaran" },
  { id: "klasemen", label: "Klasemen" },
  { id: "info", label: "Pencairan" },
] as const;

export function GameHeader() {
  const [activeSection, setActiveSection] =
    useState<(typeof SECTIONS)[number]["id"]>("sambutan");
  const shouldReduceMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const elements = SECTIONS.map((section) =>
      document.getElementById(section.id),
    ).filter((item): item is HTMLElement => Boolean(item));

    if (elements.length === 0) return;

    let ticking = false;

    const updateActiveSection = () => {
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      const triggerLine = window.scrollY + headerHeight + 32;

      let currentSection = elements[0].id as (typeof SECTIONS)[number]["id"];

      for (const element of elements) {
        if (element.offsetTop <= triggerLine) {
          currentSection = element.id as (typeof SECTIONS)[number]["id"];
        }
      }

      setActiveSection((prev) =>
        prev === currentSection ? prev : currentSection,
      );
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/88 px-4 py-3 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 select-none">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-[linear-gradient(180deg,rgba(251,191,36,0.16),rgba(15,23,42,0.24))] shadow-[0_10px_30px_rgba(2,6,23,0.2)]">
              <span className="h-2.5 w-2.5 rounded-sm bg-amber-300 shadow-[0_0_16px_rgba(252,211,77,0.45)]" />
            </span>
            <div>
              <p className="text-base font-semibold tracking-tight text-slate-50 md:text-lg">
                THR Gateway
              </p>
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                Portal hadiah lebaran
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-300 md:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Active Portal
          </div>
        </div>

        <nav className="flex items-center gap-1 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/72 p-1.5 text-sm font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:self-end">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={isActive ? "page" : undefined}
                className={`relative shrink-0 overflow-hidden rounded-xl px-3.5 py-2 text-center ${
                  isActive
                    ? "text-slate-50"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isActive &&
                  (shouldReduceMotion ? (
                    <span className="absolute inset-0 rounded-xl border border-amber-400/15 bg-[linear-gradient(180deg,rgba(51,65,85,0.98),rgba(30,41,59,0.95))]" />
                  ) : (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-xl border border-amber-400/15 bg-[linear-gradient(180deg,rgba(51,65,85,0.98),rgba(30,41,59,0.95))] shadow-[0_8px_24px_rgba(2,6,23,0.18)]"
                      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                    />
                  ))}
                <span className="relative z-10 inline-flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isActive ? "bg-amber-300" : "bg-slate-600"
                    }`}
                  />
                  {section.label}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

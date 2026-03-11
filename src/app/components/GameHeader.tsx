"use client";

import { useEffect, useMemo, useState } from "react";

const SECTIONS = [
  { id: "spin", label: "Putaran" },
  { id: "klasemen", label: "Klasemen" },
  { id: "info", label: "Pencairan" },
] as const;

export function GameHeader() {
  const [activeSection, setActiveSection] =
    useState<(typeof SECTIONS)[number]["id"]>("spin");

  const observerOptions = useMemo(
    () => ({
      root: null,
      rootMargin: "-35% 0px -55% 0px",
      threshold: [0.2, 0.5, 0.8],
    }),
    [],
  );

  useEffect(() => {
    const elements = SECTIONS.map((section) =>
      document.getElementById(section.id),
    ).filter((item): item is HTMLElement => Boolean(item));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (left, right) => right.intersectionRatio - left.intersectionRatio,
        );

      if (visibleEntries[0]?.target?.id) {
        setActiveSection(
          visibleEntries[0].target.id as (typeof SECTIONS)[number]["id"],
        );
      }
    }, observerOptions);

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [observerOptions]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/78 px-4 py-3 shadow-[0_10px_40px_rgba(2,6,23,0.35)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <div className="flex items-center gap-3 select-none">
          <span className="h-3 w-3 rounded-sm bg-gradient-to-br from-amber-300 to-orange-400 shadow-[0_0_18px_rgba(251,191,36,0.25)]" />
          <div>
            <p className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-lg font-extrabold text-transparent">
              THR Gateway
            </p>
            <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
              Portal hadiah lebaran
            </p>
          </div>
        </div>
        <nav className="flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/70 p-1 text-sm font-semibold">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 transition-all duration-300 ${
                  isActive
                    ? "bg-slate-800 text-amber-200 shadow-[0_0_0_1px_rgba(251,191,36,0.16)]"
                    : "text-slate-300 hover:bg-slate-800 hover:text-amber-200"
                }`}
              >
                {section.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

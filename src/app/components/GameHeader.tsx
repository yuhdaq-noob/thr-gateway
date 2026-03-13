"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "sambutan", label: "Home" },
  { id: "spin", label: "Claim" },
  { id: "klasemen", label: "Top Global" },
  { id: "info", label: "Info" },
] as const;

type GameHeaderProps = {
  userName: string;
};

export function GameHeader({ userName }: GameHeaderProps) {
  const [activeSection, setActiveSection] =
    useState<(typeof SECTIONS)[number]["id"]>("sambutan");
  const shouldReduceMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement | null>(null);
  const avatarLabel = userName
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  useEffect(() => {
    const elements = SECTIONS.map((section) =>
      document.getElementById(section.id),
    ).filter((item): item is HTMLElement => Boolean(item));

    if (elements.length === 0) return;

    let observer: IntersectionObserver | null = null;

    const createObserver = () => {
      observer?.disconnect();

      const headerHeight = headerRef.current?.offsetHeight ?? 0;

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
            );

          if (visible.length === 0) return;

          const nextSection = visible[0]?.target
            .id as (typeof SECTIONS)[number]["id"];

          setActiveSection((prev) =>
            prev === nextSection ? prev : nextSection,
          );
        },
        {
          root: null,
          rootMargin: `-${headerHeight + 24}px 0px -60% 0px`,
          threshold: [0, 0.2, 0.55, 1],
        },
      );

      elements.forEach((element) => observer?.observe(element));
    };

    createObserver();
    window.addEventListener("resize", createObserver);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", createObserver);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-slate-800/70 bg-[linear-gradient(180deg,rgba(2,6,23,0.96),rgba(2,6,23,0.86))] px-4 py-3 shadow-[0_14px_40px_rgba(2,6,23,0.35)] backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-3 select-none">
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-slate-700 bg-[linear-gradient(180deg,rgba(251,191,36,0.16),rgba(15,23,42,0.24))] shadow-[0_12px_32px_rgba(2,6,23,0.3)]">
              <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.28),transparent_60%)]" />
              <Image
                src="/logo.png"
                alt="THR Gateway"
                width={44}
                height={44}
                className="relative z-10 h-full w-full object-contain"
                priority
              />
            </span>
            <div>
              <p className="text-base font-bold tracking-tight text-slate-50 md:text-lg">
                THR Gateway
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/70 px-2.5 py-1.5 shadow-[0_10px_22px_rgba(2,6,23,0.35)] lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/30 bg-[linear-gradient(180deg,rgba(251,191,36,0.16),rgba(15,23,42,0.24))] text-xs font-semibold text-amber-100">
              {avatarLabel || "TG"}
            </span>
            <span className="hidden max-w-[120px] truncate text-sm font-semibold text-slate-100 sm:block">
              {userName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:justify-end">
          <nav className="flex items-center gap-1 overflow-x-auto rounded-2xl border border-slate-800/80 bg-slate-900/70 p-1.5 text-sm font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_28px_rgba(2,6,23,0.28)] backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:self-end">
            {SECTIONS.map((section) => {
              const isActive = activeSection === section.id;

              return (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative shrink-0 overflow-hidden rounded-xl px-3.5 py-2 text-center transition-all duration-200 ring-1 ring-transparent hover:ring-amber-300/30 hover:shadow-[0_0_16px_rgba(251,191,36,0.12)] ${
                    isActive
                      ? "text-slate-50 ring-amber-300/20"
                      : "text-slate-300 hover:text-slate-100"
                  }`}
                  whileHover={
                    shouldReduceMotion || isActive ? undefined : { y: -1.5 }
                  }
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                >
                  {!isActive && (
                    <span className="absolute inset-0 rounded-xl bg-slate-800/40 opacity-0 transition duration-200 group-hover:opacity-100" />
                  )}
                  {isActive &&
                    (shouldReduceMotion ? (
                      <span className="absolute inset-0 rounded-xl border border-amber-400/15 bg-[linear-gradient(180deg,rgba(51,65,85,0.98),rgba(30,41,59,0.95))]" />
                    ) : (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-xl border border-amber-400/15 bg-[linear-gradient(180deg,rgba(51,65,85,0.98),rgba(30,41,59,0.95))] shadow-[0_8px_24px_rgba(2,6,23,0.18)]"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                          mass: 0.7,
                        }}
                      />
                    ))}
                  {isActive && (
                    <span className="absolute inset-x-4 bottom-1 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />
                  )}
                  <span className="relative z-10 inline-flex items-center">
                    {section.label}
                  </span>
                </motion.a>
              );
            })}
          </nav>
          <div className="hidden items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/70 px-3 py-2 shadow-[0_10px_22px_rgba(2,6,23,0.35)] lg:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/30 bg-[linear-gradient(180deg,rgba(251,191,36,0.16),rgba(15,23,42,0.24))] text-xs font-semibold text-amber-100">
              {avatarLabel || "TG"}
            </span>
            <span className="max-w-[160px] truncate text-sm font-semibold text-slate-100">
              {userName}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

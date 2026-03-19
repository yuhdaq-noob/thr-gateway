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
      className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/55 px-3 py-2 shadow-[0_10px_28px_rgba(2,6,23,0.28)] backdrop-blur-lg max-[390px]:px-2.5 max-[390px]:py-1.5 sm:px-4 sm:py-2.5"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full items-center justify-between gap-2.5 max-[390px]:gap-2 sm:gap-4">
          <div className="flex select-none items-center gap-2.5 max-[390px]:gap-2 sm:gap-3">
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900/85 shadow-[0_8px_18px_rgba(2,6,23,0.24)] max-[390px]:h-8.5 max-[390px]:w-8.5 sm:h-11 sm:w-11 sm:rounded-2xl">
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
              <p className="text-sm font-bold tracking-tight text-slate-50 max-[390px]:text-[13px] sm:text-base md:text-lg">
                THR Gateway
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/65 px-2 py-1 shadow-[0_8px_18px_rgba(2,6,23,0.24)] max-[390px]:px-1.5 max-[390px]:py-0.5 sm:px-2.5 sm:py-1.5 lg:hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/25 bg-amber-300/10 text-[11px] font-semibold text-amber-100 sm:h-9 sm:w-9 sm:text-xs">
              {avatarLabel || "TG"}
            </span>
            <span className="hidden max-w-[120px] truncate text-sm font-semibold text-slate-100 sm:block">
              {userName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 lg:justify-end">
          <nav className="flex w-full items-center gap-1 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 p-1 text-xs font-medium shadow-[0_8px_20px_rgba(2,6,23,0.2)] backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-[390px]:gap-0.5 max-[390px]:p-0.5 sm:rounded-2xl sm:p-1.5 sm:text-sm lg:w-auto lg:self-end">
            {SECTIONS.map((section) => {
              const isActive = activeSection === section.id;

              return (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative shrink-0 rounded-lg px-2.5 py-1.5 text-center transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-amber-300/45 max-[390px]:px-2 max-[390px]:py-1 max-[390px]:text-[11px] sm:rounded-xl sm:px-3.5 sm:py-2 ${
                    isActive
                      ? "bg-amber-300/10 text-amber-200 ring-1 ring-amber-300/30"
                      : "text-slate-300 hover:bg-slate-800/55 hover:text-slate-100"
                  }`}
                  whileHover={
                    shouldReduceMotion || isActive ? undefined : { y: -1 }
                  }
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                >
                  <span className="inline-flex items-center whitespace-nowrap">
                    {section.label}
                  </span>
                </motion.a>
              );
            })}
          </nav>
          <div className="hidden items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/65 px-3 py-2 shadow-[0_8px_18px_rgba(2,6,23,0.24)] lg:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/25 bg-amber-300/10 text-xs font-semibold text-amber-100">
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

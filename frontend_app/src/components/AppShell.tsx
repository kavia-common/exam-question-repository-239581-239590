"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";
import { SubtleButton } from "@/components/ui";
import { PreferencesPill } from "@/components/PreferencesPill";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type NavItem = { href: string; label: string };

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse" },
  { href: "/upload", label: "Upload" },
  { href: "/library", label: "Recent" },
];

export function AppShell(props: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const active = useMemo(() => pathname ?? "/", [pathname]);

  return (
    <div
      className={cn(
        "min-h-screen",
        // Soft “Spotify-like” glow, but study-friendly (no harsh green).
        "bg-[radial-gradient(1100px_700px_at_12%_0%,rgba(17,18,20,0.06),transparent),radial-gradient(900px_620px_at_88%_8%,rgba(59,130,246,0.10),transparent)]"
      )}
    >
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 rounded-lg bg-white px-3 py-2 text-sm shadow"
      >
        Skip to content
      </a>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden",
          "transition-opacity duration-200 motion-reduce:transition-none",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[260px_1fr] md:gap-6 md:px-6 md:py-6">
        <aside
          className={cn(
            "z-50",
            "rounded-2xl border border-black/10",
            "bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(255,255,255,0.55))] backdrop-blur",
            "shadow-[var(--shadow-md)] md:shadow-[var(--shadow-sm)]",
            "md:sticky md:top-6 md:h-[calc(100vh-3rem)]",
            // Mobile drawer behavior
            "fixed left-4 right-4 top-4 md:static md:left-auto md:right-auto md:top-auto",
            "md:block",
            mobileOpen
              ? "calm-slide-in translate-x-0 opacity-100"
              : "pointer-events-none -translate-x-2 opacity-0 md:pointer-events-auto md:translate-x-0 md:opacity-100"
          )}
          aria-label="Primary navigation"
        >
          <div className="flex items-center justify-between px-4 py-4">
            <div className="leading-tight">
              <div className="text-xs tracking-wide text-black/55">
                Academic Gallery
              </div>
              <div className="text-lg tracking-tight">Past Papers</div>
            </div>

            <button
              className="md:hidden rounded-xl border border-black/10 bg-white/40 px-3 py-2 text-sm hover:bg-black/5 backdrop-blur transition motion-reduce:transition-none"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              Close
            </button>
          </div>

          <nav className="px-2 pb-3">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = active === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center justify-between rounded-xl px-3 py-2 text-sm",
                        "transition duration-200 motion-reduce:transition-none",
                        isActive
                          ? "bg-black text-white shadow-sm"
                          : "text-black/80 hover:bg-black/5"
                      )}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span>{item.label}</span>
                      <span
                        className={cn(
                          "text-xs opacity-0 transition duration-200 motion-reduce:transition-none",
                          isActive ? "opacity-100" : "group-hover:opacity-60"
                        )}
                      >
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-2 px-4 pb-4">
            <div className="calm-divider" />
            <div className="mt-4">
              <div className="text-xs text-black/60">Context</div>
              <div className="mt-2">
                <PreferencesPill />
              </div>
              <p className="mt-2 text-xs text-black/55">
                Set University → Stream → (optional) College for more relevant
                results.
              </p>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <header
            className={cn(
              "mb-4 md:mb-6",
              "flex items-center justify-between gap-3",
              "rounded-2xl border border-black/10",
              "bg-[linear-gradient(180deg,rgba(255,255,255,0.70),rgba(255,255,255,0.55))] backdrop-blur",
              "px-4 py-3 shadow-[var(--shadow-sm)]"
            )}
          >
            <div className="flex items-center gap-2 min-w-0">
              <button
                className="md:hidden rounded-xl border border-black/10 bg-white/40 px-3 py-2 text-sm hover:bg-black/5 backdrop-blur transition motion-reduce:transition-none"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                Menu
              </button>

              <div className="min-w-0">
                <div className="text-xs text-black/60">Browse calmly</div>
                <div className="truncate text-base tracking-tight text-black/90">
                  Find subjects, open papers, or upload
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/browse">
                <SubtleButton variant="ghost">Search</SubtleButton>
              </Link>
              <Link href="/upload">
                <SubtleButton variant="primary">Upload</SubtleButton>
              </Link>
            </div>
          </header>

          <main id="content" className="min-w-0 calm-pop">
            {props.children}
          </main>

          <footer className="py-8 text-center text-xs text-black/45">
            Built for static export • Mock data • Calm UI
          </footer>
        </div>
      </div>
    </div>
  );
}

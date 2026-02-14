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
    <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_10%_0%,rgba(0,0,0,0.06),transparent),radial-gradient(900px_600px_at_90%_10%,rgba(0,0,0,0.04),transparent)]">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 rounded-lg bg-white px-3 py-2 text-sm shadow"
      >
        Skip to content
      </a>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[240px_1fr] md:gap-6 md:px-6 md:py-6">
        <aside
          className={cn(
            "rounded-2xl border border-black/10 bg-white/60 backdrop-blur",
            "shadow-[0_1px_0_rgba(0,0,0,0.04)]",
            "md:sticky md:top-6 md:h-[calc(100vh-3rem)]",
            mobileOpen ? "block" : "hidden md:block"
          )}
          aria-label="Primary navigation"
        >
          <div className="flex items-center justify-between px-4 py-4">
            <div className="leading-tight">
              <div className="text-sm text-black/60">Academic Gallery</div>
              <div className="text-lg tracking-tight">Past Papers</div>
            </div>

            <button
              className="md:hidden rounded-lg border border-black/10 px-2 py-1 text-sm hover:bg-black/5"
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
                        "block rounded-xl px-3 py-2 text-sm transition motion-reduce:transition-none",
                        isActive ? "bg-black text-white" : "text-black/80 hover:bg-black/5"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-2 border-t border-black/10 px-4 py-4">
            <div className="text-xs text-black/60">Context</div>
            <div className="mt-2">
              <PreferencesPill />
            </div>
            <p className="mt-2 text-xs text-black/55">
              Set University → Stream → (optional) College for more relevant results.
            </p>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white/60 px-4 py-3 backdrop-blur md:mb-6">
            <div className="flex items-center gap-2">
              <button
                className="md:hidden rounded-xl border border-black/10 px-3 py-2 text-sm hover:bg-black/5"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Open menu"
              >
                Menu
              </button>
              <div className="hidden md:block">
                <div className="text-xs text-black/60">Browse calmly</div>
                <div className="text-base tracking-tight">Find subjects, open papers, or upload</div>
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

          <main id="content" className="min-w-0">
            {props.children}
          </main>

          <footer className="py-8 text-center text-xs text-black/50">
            Built for static export • Mock data • Calm UI
          </footer>
        </div>
      </div>
    </div>
  );
}

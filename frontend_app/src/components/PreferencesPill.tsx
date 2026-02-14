"use client";

import Link from "next/link";
import React from "react";
import { usePreferences } from "@/lib/usePreferences";
import { findUniversity, streams, colleges } from "@/lib/mockData";

function nameById<T extends { id: string; name: string }>(items: T[], id?: string) {
  if (!id) return null;
  return items.find((x) => x.id === id)?.name ?? null;
}

export function PreferencesPill() {
  const prefs = usePreferences();

  if (!prefs.isReady) {
    return (
      <div className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black/60">
        Loading…
      </div>
    );
  }

  const uni = findUniversity(prefs.universityId)?.name ?? "Select university";
  const stream = nameById(streams, prefs.streamId) ?? (prefs.universityId ? "Select stream" : "Set context");
  const college = nameById(colleges, prefs.collegeId);

  return (
    <Link
      href="/preferences"
      className="block rounded-xl border border-black/10 bg-white px-3 py-2 text-sm transition hover:bg-black/5 motion-reduce:transition-none"
      aria-label="Open preferences"
    >
      <div className="truncate">{uni}</div>
      <div className="truncate text-xs text-black/60">
        {stream}
        {college ? ` • ${college}` : ""}
      </div>
    </Link>
  );
}

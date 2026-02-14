"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Card, SubtleButton, TextInput } from "@/components/ui";
import { getSubjectsForStream, subjects, type Subject } from "@/lib/mockData";
import { usePreferences } from "@/lib/usePreferences";

function subjectLabel(s: Subject) {
  return `${s.code ? `${s.code} • ` : ""}${s.name}${s.semester ? ` • ${s.semester}` : ""}`;
}

export default function BrowsePage() {
  const prefs = usePreferences();
  const [query, setQuery] = useState("");

  const scopedSubjects = useMemo(() => {
    if (prefs.streamId) return getSubjectsForStream(prefs.streamId);
    // If no stream selected, allow browsing everything (FR-1)
    return subjects;
  }, [prefs.streamId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return scopedSubjects;
    return scopedSubjects.filter((s) => subjectLabel(s).toLowerCase().includes(q));
  }, [query, scopedSubjects]);

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl tracking-tight">Browse</h1>
            <p className="mt-2 text-sm text-black/65">
              Search subjects and open past papers. Set preferences for better relevance.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/preferences">
              <SubtleButton variant="ghost">Preferences</SubtleButton>
            </Link>
            <Link href="/upload">
              <SubtleButton variant="primary">Upload</SubtleButton>
            </Link>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <TextInput
            label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “Operating Systems”, “DBMS”, “Sem 5”…"
            hint={prefs.streamId ? "Searching within your selected stream." : "No stream set — searching across all subjects."}
          />
          <div className="rounded-xl border border-black/10 bg-white px-3 py-3 text-sm text-black/70">
            <div className="text-xs text-black/55">Results</div>
            <div className="mt-1 text-base tracking-tight">{filtered.length}</div>
            <div className="mt-2 text-xs text-black/55">
              Calm filters only. More filters can be added later.
            </div>
          </div>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card className="p-5">
          <h2 className="text-lg tracking-tight">No matches</h2>
          <p className="mt-2 text-sm text-black/65">
            Try a broader search, or set your preferences to see relevant subjects.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/preferences">
              <SubtleButton variant="primary">Set preferences</SubtleButton>
            </Link>
            <Link href="/upload">
              <SubtleButton variant="ghost">Upload a paper</SubtleButton>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {filtered.map((s) => (
            <Link key={s.id} href={`/subjects/${encodeURIComponent(s.id)}`} className="group">
              <Card className="p-5">
                <div className="text-xs text-black/55">Subject</div>
                <div className="mt-1 text-lg tracking-tight">{s.name}</div>
                <div className="mt-2 text-sm text-black/65">
                  {s.code ? <span>{s.code}</span> : <span className="italic">Code missing</span>}
                  {s.semester ? <span>{` • ${s.semester}`}</span> : <span className="italic">{` • Semester missing`}</span>}
                </div>
                <div className="mt-4 text-sm text-black/70 transition group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:transform-none">
                  Open papers →
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

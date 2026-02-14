"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import { Card, Select, SubtleButton, Skeleton } from "@/components/ui";
import { colleges, getCollegesForUniversity, getStreamsForUniversity, universities } from "@/lib/mockData";
import { usePreferences } from "@/lib/usePreferences";

export default function PreferencesPage() {
  const prefs = usePreferences();

  const availableStreams = useMemo(
    () => getStreamsForUniversity(prefs.universityId),
    [prefs.universityId]
  );
  const availableColleges = useMemo(
    () => getCollegesForUniversity(prefs.universityId),
    [prefs.universityId]
  );

  const streamDisabled = !prefs.universityId;
  const collegeDisabled = !prefs.universityId;

  const selectedCollegeName = prefs.collegeId
    ? colleges.find((c) => c.id === prefs.collegeId)?.name
    : null;

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <h1 className="text-2xl tracking-tight">Preferences</h1>
        <p className="mt-2 text-sm text-black/65">
          Choose your study context. We use it to show more relevant subjects and papers.
        </p>
      </Card>

      <Card className="p-5">
        {!prefs.isReady ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Select
              label="University (required for relevance)"
              value={prefs.universityId ?? ""}
              onChange={(e) => prefs.setUniversityId(e.target.value || undefined)}
            >
              <option value="">— Select —</option>
              {universities.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </Select>

            <Select
              label="Stream (required)"
              value={prefs.streamId ?? ""}
              disabled={streamDisabled}
              hint={streamDisabled ? "Select a university first." : undefined}
              onChange={(e) => prefs.setStreamId(e.target.value || undefined)}
            >
              <option value="">— Select —</option>
              {availableStreams.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </Select>

            <Select
              label="College (optional)"
              value={prefs.collegeId ?? ""}
              disabled={collegeDisabled}
              hint={
                collegeDisabled
                  ? "Select a university first."
                  : "Optional — you can skip this and still browse."
              }
              onChange={(e) => prefs.setCollegeId(e.target.value || undefined)}
            >
              <option value="">— Skip —</option>
              {availableColleges.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>

            <div className="flex items-end gap-2">
              <SubtleButton variant="ghost" onClick={() => prefs.reset()}>
                Reset
              </SubtleButton>
              <Link href="/browse" className="w-full md:w-auto">
                <SubtleButton variant="primary" className="w-full md:w-auto">
                  Continue to browse
                </SubtleButton>
              </Link>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-5">
        <h2 className="text-lg tracking-tight">Current</h2>
        <p className="mt-2 text-sm text-black/70">
          University: <span className="text-black">{prefs.universityId ?? "Not set"}</span>
          <br />
          Stream: <span className="text-black">{prefs.streamId ?? "Not set"}</span>
          <br />
          College: <span className="text-black">{selectedCollegeName ?? "Not set"}</span>
        </p>
      </Card>
    </div>
  );
}

"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import { Card, SubtleButton } from "@/components/ui";
import { getPapersForSubject, papers as allPapers, subjects as allSubjects } from "@/lib/mockData";

export function SubjectPageClient(props: { subjectId: string }) {
  const subjectId = props.subjectId;

  const subject = useMemo(() => allSubjects.find((s) => s.id === subjectId) ?? null, [subjectId]);
  const papers = useMemo(() => getPapersForSubject(subjectId), [subjectId]);

  if (!subject) {
    return (
      <Card className="p-5">
        <h1 className="text-2xl tracking-tight">Subject not found</h1>
        <p className="mt-2 text-sm text-black/65">
          This link might be outdated. You can go back to Browse.
        </p>
        <div className="mt-4 flex gap-2">
          <Link href="/browse">
            <SubtleButton variant="primary">Back to Browse</SubtleButton>
          </Link>
        </div>
      </Card>
    );
  }

  const totalPapers = allPapers.filter((p) => p.subjectId === subjectId).length;

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs text-black/55">Subject</div>
            <h1 className="text-2xl tracking-tight">{subject.name}</h1>
            <p className="mt-2 text-sm text-black/65">
              {subject.code ? subject.code : "Code missing"}{" "}
              {subject.semester ? `• ${subject.semester}` : ""}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/browse">
              <SubtleButton variant="ghost">Browse</SubtleButton>
            </Link>
            <Link href="/upload">
              <SubtleButton variant="primary">Upload</SubtleButton>
            </Link>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-black/55">Papers</div>
            <div className="text-base tracking-tight">{totalPapers}</div>
          </div>
        </div>
      </Card>

      {papers.length === 0 ? (
        <Card className="p-5">
          <h2 className="text-lg tracking-tight">No papers yet</h2>
          <p className="mt-2 text-sm text-black/65">
            Be the first to contribute. Minimal upload works even if you don’t know every field.
          </p>
          <div className="mt-4">
            <Link href="/upload">
              <SubtleButton variant="primary">Upload a paper</SubtleButton>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {papers.map((p) => (
            <Card key={p.id} className="p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <div className="text-xs text-black/55">{p.type}</div>
                  <div className="mt-1 truncate text-lg tracking-tight">{p.title}</div>
                  <div className="mt-1 text-sm text-black/65">
                    {p.year ? String(p.year) : "Year missing"}
                    {p.exam ? ` • ${p.exam}` : ""}
                    {p.uploadedBy ? ` • by ${p.uploadedBy}` : ""}
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  {p.fileUrl ? (
                    <a href={p.fileUrl} className="inline-flex">
                      <SubtleButton variant="primary">Open</SubtleButton>
                    </a>
                  ) : (
                    <SubtleButton variant="ghost" disabled>
                      No file
                    </SubtleButton>
                  )}
                  <Link href="/upload">
                    <SubtleButton variant="ghost">Upload another</SubtleButton>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

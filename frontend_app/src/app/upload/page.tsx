"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Card, Select, SubtleButton, TextInput } from "@/components/ui";
import { getSubjectsForStream, subjects, type PaperType } from "@/lib/mockData";
import { usePreferences } from "@/lib/usePreferences";

type UploadForm = {
  subjectId: string;
  title: string;
  year: string;
  exam: string;
  type: PaperType;
  fileName: string; // static-export friendly stand-in (we don't actually upload in base version)
  minimal: boolean;
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default function UploadPage() {
  const prefs = usePreferences();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const availableSubjects = useMemo(() => {
    if (prefs.streamId) return getSubjectsForStream(prefs.streamId);
    return subjects;
  }, [prefs.streamId]);

  const [form, setForm] = useState<UploadForm>({
    subjectId: "",
    title: "",
    year: "",
    exam: "",
    type: "Question Paper",
    fileName: "",
    minimal: true,
  });

  const requiredOk = useMemo(() => {
    // Minimal upload: subjectId + title are required.
    if (!form.subjectId) return false;
    if (!form.title.trim()) return false;
    return true;
  }, [form.subjectId, form.title]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (!requiredOk) {
      setStatus("error");
      setErrorMsg("Please select a subject and add a title. (Minimal upload)");
      return;
    }

    setStatus("submitting");
    try {
      // Mock "upload" — local-only and static-export friendly
      await sleep(650);

      // Simulate an occasional failure to demonstrate graceful error + retry UX
      const shouldFail = form.title.toLowerCase().includes("fail");
      if (shouldFail) throw new Error("Mock upload failed. Remove “fail” from title and retry.");

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Upload failed. Please retry.");
    }
  }

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl tracking-tight">Upload</h1>
            <p className="mt-2 text-sm text-black/65">
              Guided and low-friction. This base version stores nothing on a server yet.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/browse">
              <SubtleButton variant="ghost">Browse</SubtleButton>
            </Link>
            <Link href="/preferences">
              <SubtleButton variant="ghost">Preferences</SubtleButton>
            </Link>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Select
              label="Subject (required)"
              value={form.subjectId}
              onChange={(e) => setForm((p) => ({ ...p, subjectId: e.target.value }))}
              hint={prefs.streamId ? "Subjects are scoped to your stream." : "No stream set — choose any subject."}
            >
              <option value="">— Select —</option>
              {availableSubjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code ? `${s.code} • ` : ""}
                  {s.name}
                  {s.semester ? ` • ${s.semester}` : ""}
                </option>
              ))}
            </Select>

            <Select
              label="Type"
              value={form.type}
              onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as PaperType }))}
            >
              <option value="Question Paper">Question Paper</option>
              <option value="Solution">Solution</option>
              <option value="Notes">Notes</option>
            </Select>

            <TextInput
              label="Title (required)"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder='e.g. "Operating Systems – Final Exam"'
              hint="Tip: if you include “fail” in the title, this mock upload demonstrates the error state."
            />

            <TextInput
              label="File (optional in base version)"
              value={form.fileName}
              onChange={(e) => setForm((p) => ({ ...p, fileName: e.target.value }))}
              placeholder="e.g. os-final-2022.pdf"
              hint="Static export base: we only capture a filename placeholder."
            />

            <TextInput
              label="Year (optional)"
              value={form.year}
              onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))}
              placeholder="2023"
            />

            <TextInput
              label="Exam (optional)"
              value={form.exam}
              onChange={(e) => setForm((p) => ({ ...p, exam: e.target.value }))}
              placeholder="Midterm / Final / Term 1..."
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3">
            <div className="text-sm text-black/70">
              Minimal upload: <span className="text-black">Subject + Title</span>
              <div className="text-xs text-black/55">
                Add Year/Exam/File when you can—optional for now.
              </div>
            </div>

            <div className="flex gap-2">
              <SubtleButton
                type="button"
                variant="ghost"
                onClick={() => {
                  setStatus("idle");
                  setErrorMsg(null);
                  setForm({
                    subjectId: "",
                    title: "",
                    year: "",
                    exam: "",
                    type: "Question Paper",
                    fileName: "",
                    minimal: true,
                  });
                }}
              >
                Clear
              </SubtleButton>

              <SubtleButton type="submit" variant="primary" disabled={status === "submitting"}>
                {status === "submitting" ? "Uploading…" : "Upload"}
              </SubtleButton>
            </div>
          </div>

          {status === "success" ? (
            <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm">
              <div className="text-black">Uploaded (mock) successfully.</div>
              <div className="text-black/65">
                In a future backend version, this would create a real listing and store the file.
              </div>
            </div>
          ) : null}

          {status === "error" ? (
            <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm" role="alert">
              <div className="text-black">Upload failed (mock)</div>
              <div className="mt-1 text-black/65">{errorMsg ?? "Please retry."}</div>
              <div className="mt-3">
                <SubtleButton
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setStatus("idle");
                    setErrorMsg(null);
                  }}
                >
                  Try again
                </SubtleButton>
              </div>
            </div>
          ) : null}
        </form>
      </Card>
    </div>
  );
}

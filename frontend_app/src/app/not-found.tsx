import Link from "next/link";
import React from "react";
import { Card, SubtleButton } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <Card className="p-5" role="alert" aria-live="polite">
        <h1 className="text-2xl tracking-tight">404 — Not found</h1>
        <p className="mt-2 text-sm text-black/65">
          The page you’re looking for doesn’t exist. Try browsing subjects instead.
        </p>
        <div className="mt-4 flex gap-2">
          <Link href="/browse">
            <SubtleButton variant="primary">Go to Browse</SubtleButton>
          </Link>
          <Link href="/">
            <SubtleButton variant="ghost">Home</SubtleButton>
          </Link>
        </div>
      </Card>
    </div>
  );
}

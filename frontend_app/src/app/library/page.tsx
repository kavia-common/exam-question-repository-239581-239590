import Link from "next/link";
import { Card, SubtleButton } from "@/components/ui";

export default function LibraryPage() {
  return (
    <div className="space-y-4">
      <Card className="p-5">
        <h1 className="text-2xl tracking-tight">Recent</h1>
        <p className="mt-2 text-sm text-black/65">
          In the base version, recents aren’t tracked yet. This page is ready for a future local-history feature.
        </p>
        <div className="mt-4 flex gap-2">
          <Link href="/browse">
            <SubtleButton variant="primary">Browse</SubtleButton>
          </Link>
          <Link href="/upload">
            <SubtleButton variant="ghost">Upload</SubtleButton>
          </Link>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="text-lg tracking-tight">Planned</h2>
        <ul className="mt-3 space-y-2 text-sm text-black/70">
          <li>• Recently viewed subjects</li>
          <li>• Recently opened papers</li>
          <li>• Quick return to your study context</li>
        </ul>
      </Card>
    </div>
  );
}

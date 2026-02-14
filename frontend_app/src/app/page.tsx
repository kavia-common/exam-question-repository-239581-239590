import Link from "next/link";
import { Card, SubtleButton } from "@/components/ui";

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="p-5">
          <h1 className="text-2xl tracking-tight">Find past papers, calmly.</h1>
          <p className="mt-2 text-sm text-black/65">
            Set your context (University → Stream → optional College), browse subjects, and open question papers.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/preferences">
              <SubtleButton variant="primary">Set preferences</SubtleButton>
            </Link>
            <Link href="/browse">
              <SubtleButton variant="ghost">Browse subjects</SubtleButton>
            </Link>
            <Link href="/upload">
              <SubtleButton variant="ghost">Upload a paper</SubtleButton>
            </Link>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-lg tracking-tight">How it works</h2>
          <ol className="mt-3 space-y-2 text-sm text-black/70">
            <li>
              <span className="text-black">1.</span> Choose your university, then stream (college is optional).
            </li>
            <li>
              <span className="text-black">2.</span> Browse or search subjects.
            </li>
            <li>
              <span className="text-black">3.</span> Open papers, or upload one with minimal friction.
            </li>
          </ol>
          <p className="mt-4 text-xs text-black/55">
            This base version uses local mock data and stores preferences on your device.
          </p>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="p-5">
          <h3 className="text-sm text-black/60">Tip</h3>
          <p className="mt-2 text-sm">
            If you skip preferences, you can still browse — but results won’t be filtered.
          </p>
        </Card>
        <Card className="p-5">
          <h3 className="text-sm text-black/60">Smooth UX</h3>
          <p className="mt-2 text-sm">
            Subtle motion, low-contrast UI, and readable serif typography for long study sessions.
          </p>
        </Card>
        <Card className="p-5">
          <h3 className="text-sm text-black/60">Contribute</h3>
          <p className="mt-2 text-sm">
            Upload papers with required basics only, and add extra metadata when you can.
          </p>
        </Card>
      </section>
    </div>
  );
}

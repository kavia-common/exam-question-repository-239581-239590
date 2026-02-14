import { SubjectPageClient } from "./SubjectPageClient";
import { subjects as allSubjects } from "@/lib/mockData";

type SubjectPageParams = { subjectId: string };

// PUBLIC_INTERFACE
export function generateStaticParams(): SubjectPageParams[] {
  /** Required for `output: "export"` with dynamic routes; enumerates all subject pages from mock data. */
  return allSubjects.map((s) => ({ subjectId: s.id }));
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<SubjectPageParams>;
}) {
  const resolved = await params;

  return <SubjectPageClient subjectId={decodeURIComponent(resolved.subjectId)} />;
}

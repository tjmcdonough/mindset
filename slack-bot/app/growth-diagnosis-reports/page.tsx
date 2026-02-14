import fs from "fs";
import path from "path";
import { Metadata } from "next";
import { Container, Title, Text } from "@mantine/core";
import { CASE_STUDIES } from "../data/case-studies";
import { ReportsTable } from "./ReportsTable";

export const metadata: Metadata = {
  title: "Diagnosis Reports (Internal)",
  robots: { index: false, follow: false },
};

/** Map folder names to display names using case-studies data, with fallback */
function getDisplayName(folder: string): string {
  const match = CASE_STUDIES.find(
    (cs) => cs.slug === folder || cs.slug.replace(/-/g, "") === folder
  );
  if (match) return match.company;
  return folder.charAt(0).toUpperCase() + folder.slice(1);
}

/** Check if a folder has a matching case study */
function getCaseStudySlug(folder: string): string | undefined {
  const match = CASE_STUDIES.find(
    (cs) => cs.slug === folder || cs.slug.replace(/-/g, "") === folder
  );
  return match?.slug;
}

export default function GrowthDiagnosisReportsPage() {
  const reportsDir = path.join(process.cwd(), "public", "growth-diagnosis-reports");
  const folders = fs.readdirSync(reportsDir).filter((f) =>
    fs.statSync(path.join(reportsDir, f)).isDirectory()
  );

  const reports = folders.map((folder) => {
    const files = fs.readdirSync(path.join(reportsDir, folder));
    const htmlFile = files.find((f) => f.endsWith(".html"));
    return {
      folder,
      displayName: getDisplayName(folder),
      caseStudySlug: getCaseStudySlug(folder),
      reportUrl: htmlFile
        ? `/growth-diagnosis-reports/${folder}/${htmlFile}`
        : null,
    };
  });

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="xs">
        Growth Diagnosis Reports
      </Title>
      <Text c="dimmed" mb="xl">
        Internal index — {reports.length} reports
      </Text>
      <ReportsTable reports={reports} />
    </Container>
  );
}

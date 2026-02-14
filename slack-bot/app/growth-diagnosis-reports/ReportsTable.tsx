"use client";

import { Table, Anchor, Text, Badge } from "@mantine/core";

interface Report {
  folder: string;
  displayName: string;
  caseStudySlug?: string;
  reportUrl: string | null;
}

export function ReportsTable({ reports }: { reports: Report[] }) {
  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Company</Table.Th>
          <Table.Th>Report</Table.Th>
          <Table.Th>Case Study</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {reports.map((r) => (
          <Table.Tr key={r.folder}>
            <Table.Td>{r.displayName}</Table.Td>
            <Table.Td>
              {r.reportUrl ? (
                <Anchor href={r.reportUrl} target="_blank" size="sm">
                  View report
                </Anchor>
              ) : (
                <Text size="sm" c="dimmed">
                  No HTML file
                </Text>
              )}
            </Table.Td>
            <Table.Td>
              {r.caseStudySlug ? (
                <Anchor href={`/case-studies/${r.caseStudySlug}`} size="sm">
                  <Badge variant="light" size="sm">
                    Published
                  </Badge>
                </Anchor>
              ) : (
                <Text size="sm" c="dimmed">
                  —
                </Text>
              )}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

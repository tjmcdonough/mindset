"use client";

import Link from "next/link";
import {
  IconArrowLeft,
  IconExternalLink,
  IconFileAnalytics,
} from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { WebsiteCTA } from "../../components/WebsiteCTA";
import type { CaseStudy } from "../../data/case-studies";
import classes from "../../website.module.css";

interface CaseStudyDetailClientProps {
  study: CaseStudy;
  content: string;
}

export function CaseStudyDetailClient({
  study,
  content,
}: CaseStudyDetailClientProps) {
  const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n*/, "");
  const contentWithoutTitle = contentWithoutFrontmatter.replace(
    /^#\s+.+\n+/,
    "",
  );

  const verdictColor =
    study.verdict === "GO"
      ? "green"
      : study.verdict === "CONDITIONAL"
        ? "yellow"
        : "red";

  return (
    <Box className={classes.root}>
      <Header />

      {/* Hero */}
      <Box className={classes.articleHero}>
        <Container size="md">
          <Stack gap="lg">
            <Button
              component={Link}
              href="/case-studies"
              variant="subtle"
              leftSection={<IconArrowLeft size={16} />}
              className={classes.backLink}
            >
              All Case Studies
            </Button>

            {study.logo && (
              <Image
                src={study.logo}
                alt={`${study.company} logo`}
                h={48}
                w="auto"
                fit="contain"
              />
            )}

            <Group gap="xs">
              <Badge variant="light" color="cyan" size="sm">
                {study.industryTag}
              </Badge>
              <Badge variant="light" color={verdictColor} size="sm">
                {study.verdict === "CONDITIONAL"
                  ? "CONDITIONAL GO"
                  : study.verdict}
              </Badge>
            </Group>

            <Title order={1} className={classes.articleTitle}>
              {study.company}
            </Title>
            <Text size="xl" c="dimmed" lh={1.6}>
              {study.title}
            </Text>

            <Group gap="lg">
              <Group gap={4}>
                <Text size="sm" fw={700} c="primary">
                  {study.demandScore}
                </Text>
                <Text size="sm" c="dimmed">
                  /100 Demand Score
                </Text>
              </Group>
              <Text size="sm" c="dimmed">
                {study.stage}
              </Text>
              <Text size="sm" c="dimmed">
                {new Date(study.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </Text>
            </Group>

            <Group gap="md">
              {study.website && (
                <Anchor
                  href={study.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  c="primary"
                >
                  <Group gap={4}>
                    <IconExternalLink size={14} />
                    {study.website.replace(/^https?:\/\/(www\.)?/, "")}
                  </Group>
                </Anchor>
              )}
              {study.diagnosisUrl && (
                <Anchor
                  href={study.diagnosisUrl}
                  target="_blank"
                  size="sm"
                  c="dimmed"
                >
                  <Group gap={4}>
                    <IconFileAnalytics size={14} />
                    View full diagnosis report
                  </Group>
                </Anchor>
              )}
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* Article Content */}
      <Box className={classes.articleContent}>
        <Container size="md">
          <Card className={classes.articleCard} p="xl">
            <Box className={classes.markdownContent}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {contentWithoutTitle}
              </ReactMarkdown>
            </Box>
          </Card>
        </Container>
      </Box>

      <WebsiteCTA
        title="Want your startup diagnosed?"
        subtitle="18 AI agents. 80+ data points. One honest diagnosis. $10."
        primaryAction={{ label: "Get Your Diagnosis", href: "/diagnosis" }}
        secondaryAction={{ label: "See All Case Studies", href: "/case-studies" }}
      />
      <Footer />
    </Box>
  );
}

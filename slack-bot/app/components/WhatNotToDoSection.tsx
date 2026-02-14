"use client";

import { useRef } from "react";
import { IconBan, IconCheck, IconClock, IconX } from "@tabler/icons-react";
import { motion, useInView } from "framer-motion";
import {
  Badge,
  Box,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { FadeInUp, GradientText } from "./animations";
import classes from "../website.module.css";

interface AntiRecommendation {
  id: string;
  tactic: string;
  stage: string;
  reason: string;
  instead: string;
  savedTime: string;
}

const ANTI_RECOMMENDATIONS: AntiRecommendation[] = [
  {
    id: "seo-early",
    tactic: "SEO Content Strategy",
    stage: "Pre-validation stage",
    reason:
      "SEO compounds over 6-12 months. If you pivot in 3 months, you've built content for a business that won't exist.",
    instead:
      "Direct outreach to 50 potential customers to validate demand first",
    savedTime: "3 months",
  },
  {
    id: "ads-no-pmf",
    tactic: "Paid Advertising",
    stage: "No product-market fit",
    reason:
      "You'd be paying to learn your funnel is broken. Ads amplify what's already working — they don't create product-market fit.",
    instead: "Manual, high-touch sales to understand why people buy (or don't)",
    savedTime: "$5-15k",
  },
  {
    id: "social-presence",
    tactic: "Social Media Presence",
    stage: "Idea stage",
    reason:
      "Building an audience for a product you haven't validated is building an audience you might never need.",
    instead: "Find 10 people with the problem and talk to them directly",
    savedTime: "2 months",
  },
  {
    id: "content-calendar",
    tactic: "Content Calendar",
    stage: "Unknown ICP",
    reason:
      "You're guessing who to write for. Every post is a lottery ticket instead of a targeted experiment.",
    instead: "Customer interviews to define exactly who you're talking to",
    savedTime: "40+ wasted posts",
  },
  {
    id: "funnel-optimization",
    tactic: "Funnel Optimization",
    stage: "Low traffic",
    reason:
      "Optimizing a funnel with 100 visitors/month is statistical noise. You're A/B testing randomness.",
    instead: "Focus on driving traffic first, optimize later",
    savedTime: "2 months",
  },
  {
    id: "automation",
    tactic: "Marketing Automation",
    stage: "Early stage",
    reason:
      "Automating broken processes just makes them break faster. You need to understand what works manually first.",
    instead: "Do things that don't scale to learn what actually works",
    savedTime: "Setup time + wrong lessons",
  },
];

function AntiRecommendationCard({
  item,
  index,
}: {
  item: AntiRecommendation;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <Card className={classes.featureCard} data-color="red" p="lg" h="100%">
        <Stack gap="md" h="100%">
          <Group justify="space-between" align="flex-start">
            <Group gap="sm">
              <ThemeIcon size={36} radius="md" color="red" variant="light">
                <IconBan size={18} />
              </ThemeIcon>
              <Box>
                <Text
                  fw={600}
                  size="md"
                  style={{ textDecoration: "line-through", opacity: 0.7 }}
                >
                  {item.tactic}
                </Text>
                <Badge color="gray" variant="light" size="xs">
                  {item.stage}
                </Badge>
              </Box>
            </Group>
            <Badge
              color="green"
              variant="light"
              size="sm"
              leftSection={<IconClock size={10} />}
            >
              Saved: {item.savedTime}
            </Badge>
          </Group>

          <Box
            p="sm"
            style={{
              background: "rgba(239, 68, 68, 0.05)",
              borderRadius: "var(--mantine-radius-md)",
              borderLeft: "3px solid var(--mantine-color-red-6)",
            }}
          >
            <Text size="xs" fw={600} c="red" mb={4}>
              <IconX
                size={12}
                style={{ verticalAlign: "middle", marginRight: 4 }}
              />
              WHY NOT
            </Text>
            <Text size="sm">{item.reason}</Text>
          </Box>

          <Box
            p="sm"
            style={{
              background: "rgba(34, 197, 94, 0.05)",
              borderRadius: "var(--mantine-radius-md)",
              borderLeft: "3px solid var(--mantine-color-green-6)",
              marginTop: "auto",
            }}
          >
            <Text size="xs" fw={600} c="green" mb={4}>
              <IconCheck
                size={12}
                style={{ verticalAlign: "middle", marginRight: 4 }}
              />
              DO THIS INSTEAD
            </Text>
            <Text size="sm" fw={500}>
              {item.instead}
            </Text>
          </Box>
        </Stack>
      </Card>
    </motion.div>
  );
}

export function WhatNotToDoSection() {
  const ref = useRef(null);
  const _isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box component="section" className={classes.loopSection} ref={ref}>
      <Container size="xl">
        <Stack align="center" mb={60}>
          <FadeInUp>
            <Badge color="red" variant="light" size="lg" mb="md">
              The Anti-Todo List
            </Badge>
          </FadeInUp>
          <FadeInUp>
            <Title order={2} ta="center">
              What We Tell You <GradientText animate>Not To Do</GradientText>
            </Title>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Text size="xl" c="dimmed" ta="center" maw={700}>
              Most tools help you do more. We help you do less of the wrong
              things. Here&apos;s what Growthmind has told real users to stop
              doing.
            </Text>
          </FadeInUp>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {ANTI_RECOMMENDATIONS.map((item, index) => (
            <AntiRecommendationCard key={item.id} item={item} index={index} />
          ))}
        </SimpleGrid>

        {/* Bottom callout */}
        <FadeInUp delay={0.6}>
          <Box
            mt={60}
            p="xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)",
              borderRadius: "var(--mantine-radius-lg)",
              border: "1px solid var(--website-border)",
              textAlign: "center",
            }}
          >
            <Text fw={700} size="lg" mb="sm">
              Why No Other Tool Does This
            </Text>
            <Text size="md" c="dimmed" maw={600} mx="auto">
              Tools that charge per campaign, per post, or per action have zero
              incentive to tell you &ldquo;don&apos;t do this.&rdquo; Their
              business model requires you to do more. Ours requires you to make
              progress.
            </Text>
          </Box>
        </FadeInUp>
      </Container>
    </Box>
  );
}

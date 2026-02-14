"use client";

import {
  IconAlertTriangle,
  IconCash,
  IconFlame,
  IconQuote,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  Badge,
  Box,
  Card,
  Container,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  FadeInUp,
  GradientText,
  StaggerContainer,
  StaggerItem,
} from "./animations";
import classes from "../website.module.css";

/** Pain points sourced from Reddit founder research - using their actual language */
const PROBLEMS = [
  {
    icon: IconCash,
    title: "Burning Runway on Guesswork",
    quote:
      "We spent over $15K on marketing agencies and got no results. Years of trying and getting nothing back.",
    source: "r/marketing",
    description:
      "Agencies charge $10k+/mo and still guess. Most businesses burn budget before finding what works.",
    color: "red",
    stat: "$15k+",
    statLabel: "wasted on agencies",
  },
  {
    icon: IconFlame,
    title: "DIY = Burnout",
    quote:
      "You're basically running endless experiments, shooting in the dark with a gun that has 5 bullets.",
    source: "r/startup",
    description:
      "Growth leaders are burned out. Decisions become impossible when you're exhausted from guessing.",
    color: "orange",
    stat: "50%",
    statLabel: "founder burnout",
  },
  {
    icon: IconAlertTriangle,
    title: "Copying Tactics That Flop",
    quote:
      "I'd copy what worked for someone else to the letter and it'd just... flop. Every time.",
    source: "r/LeadGeneration",
    description:
      "Generic playbooks don't work because your context is different. You need a system that learns YOU.",
    color: "yellow",
    stat: "9/10",
    statLabel: "tactics fail",
  },
];

export function ProblemSection() {
  return (
    <Box component="section" id="features" className={classes.featuresSection}>
      <Container size="xl">
        <Stack align="center" mb={60}>
          <FadeInUp>
            <Badge color="red" variant="light" size="lg" mb="md">
              The Core Problem
            </Badge>
          </FadeInUp>
          <FadeInUp>
            <Title order={2} ta="center">
              Why Growth is{" "}
              <GradientText animate>So Hard</GradientText> Pre Product-Market Fit
            </Title>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Text size="xl" c="dimmed" ta="center" maw={650}>
              Traction failure kills more businesses than product failure. Before
              product-market fit, every growth decision is a gamble — agencies
              guess with your money, generic playbooks miss your context, and
              burnout sets in fast. The problem isn&apos;t effort. It&apos;s
              that growth without diagnosis is just noise.
            </Text>
          </FadeInUp>
        </Stack>

        <StaggerContainer staggerDelay={0.15}>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
            {PROBLEMS.map((problem) => (
              <StaggerItem key={problem.title} direction="up">
                <motion.div
                  whileHover={{
                    y: -8,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                >
                  <Card
                    className={classes.featureCard}
                    data-color={problem.color}
                    padding="xl"
                    style={{ height: "100%" }}
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <ThemeIcon
                        size={56}
                        radius="md"
                        variant="light"
                        color={problem.color}
                        mb="md"
                      >
                        <problem.icon size={28} />
                      </ThemeIcon>
                    </motion.div>

                    {/* Animated stat */}
                    <Box mb="sm">
                      <Text
                        size="2rem"
                        fw={700}
                        style={{
                          color: `var(--mantine-color-${problem.color}-6)`,
                        }}
                      >
                        {problem.stat}
                      </Text>
                      <Text size="xs" c="dimmed" tt="uppercase">
                        {problem.statLabel}
                      </Text>
                    </Box>

                    <Title order={3} size="h4" mb="sm">
                      {problem.title}
                    </Title>

                    {/* Reddit quote */}
                    <Box
                      mb="md"
                      p="sm"
                      style={{
                        background: "var(--website-muted-bg)",
                        borderRadius: "var(--mantine-radius-sm)",
                        borderLeft: `3px solid var(--mantine-color-${problem.color}-6)`,
                      }}
                    >
                      <IconQuote
                        size={14}
                        style={{
                          color: `var(--mantine-color-${problem.color}-6)`,
                          marginBottom: 4,
                        }}
                      />
                      <Text size="sm" fs="italic" c="dimmed" lh={1.5}>
                        &quot;{problem.quote}&quot;
                      </Text>
                      <Text size="xs" c="dimmed" mt={4}>
                        — {problem.source}
                      </Text>
                    </Box>

                    <Text c="dimmed" size="sm">
                      {problem.description}
                    </Text>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </SimpleGrid>
        </StaggerContainer>
      </Container>
    </Box>
  );
}

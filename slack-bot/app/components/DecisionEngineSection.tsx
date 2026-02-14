"use client";

import { useRef } from "react";
import {
  IconArrowDown,
  IconBrain,
  IconChecklist,
  IconCircleCheck,
  IconCircleX,
  IconFilter,
  IconQuestionMark,
  IconTarget,
} from "@tabler/icons-react";
import { motion, useInView } from "framer-motion";
import {
  Badge,
  Box,
  Card,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { FadeInUp, GradientText } from "./animations";
import classes from "../website.module.css";

interface DecisionStep {
  id: string;
  title: string;
  question: string;
  output: string;
  icon: React.ElementType;
  color: string;
}

const DECISION_STEPS: DecisionStep[] = [
  {
    id: "truth",
    title: "What Must Be True",
    question: "What assumptions must hold for this to work?",
    output: "List of critical assumptions that underpin your strategy",
    icon: IconTarget,
    color: "cyan",
  },
  {
    id: "evidence",
    title: "What Evidence Exists",
    question: "Do you have proof these assumptions are valid?",
    output: "Gap analysis between beliefs and verified facts",
    icon: IconChecklist,
    color: "violet",
  },
  {
    id: "falsify",
    title: "What Would Falsify This",
    question: "What outcome would prove this direction wrong?",
    output: "Clear failure criteria so you know when to pivot",
    icon: IconQuestionMark,
    color: "orange",
  },
  {
    id: "constrain",
    title: "Constrain to What Matters",
    question: "Given all this, what should you actually do?",
    output: "Actions filtered to only what tests your assumptions",
    icon: IconFilter,
    color: "green",
  },
];

function DecisionStepCard({
  step,
  index,
  isLast,
}: {
  step: DecisionStep;
  index: number;
  isLast: boolean;
}) {
  return (
    <Box style={{ position: "relative" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 }}
      >
        <Card className={classes.featureCard} data-color={step.color} p="lg">
          <Group gap="md" align="flex-start">
            <ThemeIcon size={48} radius="md" variant="light" color={step.color}>
              <step.icon size={24} />
            </ThemeIcon>
            <Box style={{ flex: 1 }}>
              <Badge color={step.color} variant="light" size="sm" mb="xs">
                Step {index + 1}
              </Badge>
              <Text fw={700} size="lg" mb="xs">
                {step.title}
              </Text>
              <Text size="sm" c="dimmed" mb="md" fs="italic">
                &ldquo;{step.question}&rdquo;
              </Text>
              <Box
                p="sm"
                style={{
                  background: `rgba(var(--mantine-color-${step.color}-light), 0.1)`,
                  borderRadius: "var(--mantine-radius-md)",
                  borderLeft: `3px solid var(--mantine-color-${step.color}-6)`,
                }}
              >
                <Text size="xs" fw={600} c="dimmed" mb={2}>
                  OUTPUT
                </Text>
                <Text size="sm">{step.output}</Text>
              </Box>
            </Box>
          </Group>
        </Card>
      </motion.div>

      {/* Connector arrow */}
      {!isLast && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.3 }}
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "12px 0",
          }}
        >
          <IconArrowDown
            size={24}
            style={{ color: "var(--website-primary)", opacity: 0.5 }}
          />
        </motion.div>
      )}
    </Box>
  );
}

export function DecisionEngineSection() {
  const ref = useRef(null);
  const _isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box
      component="section"
      py={100}
      style={{ background: "var(--website-bg)" }}
      ref={ref}
    >
      <Container size="lg">
        <Stack align="center" mb={60}>
          <FadeInUp>
            <Badge color="cyan" variant="light" size="lg" mb="md">
              Decision Engine
            </Badge>
          </FadeInUp>
          <FadeInUp>
            <Title order={2} ta="center">
              Decisions <GradientText animate>Before Tactics</GradientText>
            </Title>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Text size="xl" c="dimmed" ta="center" maw={700}>
              Before we generate a single piece of content or recommend a single
              channel, we run your situation through a decision framework. The
              output isn&apos;t a to-do list — it&apos;s a filtered set of
              actions that actually test what matters.
            </Text>
          </FadeInUp>
        </Stack>

        <Grid gutter="xl">
          {/* Decision flow */}
          <Grid.Col span={{ base: 12, lg: 7 }}>
            <Stack gap={0}>
              {DECISION_STEPS.map((step, index) => (
                <DecisionStepCard
                  key={step.id}
                  step={step}
                  index={index}
                  isLast={index === DECISION_STEPS.length - 1}
                />
              ))}
            </Stack>
          </Grid.Col>

          {/* Side comparison */}
          <Grid.Col span={{ base: 12, lg: 5 }}>
            <FadeInUp delay={0.4}>
              <Card className={classes.chartCard} p="xl" h="100%">
                <Group gap="xs" mb="lg">
                  <IconBrain
                    size={20}
                    style={{ color: "var(--website-primary)" }}
                  />
                  <Text fw={600}>The Difference</Text>
                </Group>

                <Stack gap="lg">
                  {/* What others do */}
                  <Box>
                    <Group gap="xs" mb="sm">
                      <IconCircleX
                        size={16}
                        style={{ color: "var(--mantine-color-red-6)" }}
                      />
                      <Text size="sm" fw={600} c="red">
                        What Most Tools Do
                      </Text>
                    </Group>
                    <Box
                      p="md"
                      style={{
                        background: "rgba(239, 68, 68, 0.05)",
                        borderRadius: "var(--mantine-radius-md)",
                      }}
                    >
                      <Stack gap="xs">
                        <Text size="sm">
                          1. You say &ldquo;I need content&rdquo;
                        </Text>
                        <Text size="sm">2. They generate content</Text>
                        <Text size="sm">3. You publish content</Text>
                        <Text size="sm">4. You measure content</Text>
                        <Text size="sm" c="dimmed" fs="italic">
                          (Whether content was the right move is never
                          questioned)
                        </Text>
                      </Stack>
                    </Box>
                  </Box>

                  {/* What Growthmind does */}
                  <Box>
                    <Group gap="xs" mb="sm">
                      <IconCircleCheck
                        size={16}
                        style={{ color: "var(--mantine-color-green-6)" }}
                      />
                      <Text size="sm" fw={600} c="green">
                        What Growthmind Does
                      </Text>
                    </Group>
                    <Box
                      p="md"
                      style={{
                        background: "rgba(34, 197, 94, 0.05)",
                        borderRadius: "var(--mantine-radius-md)",
                      }}
                    >
                      <Stack gap="xs">
                        <Text size="sm">
                          1. You say &ldquo;I need content&rdquo;
                        </Text>
                        <Text size="sm">
                          2. We ask &ldquo;Why do you think that?&rdquo;
                        </Text>
                        <Text size="sm">3. We diagnose your actual stage</Text>
                        <Text size="sm">4. We determine what must be true</Text>
                        <Text size="sm">5. We find gaps in your evidence</Text>
                        <Text size="sm fw={500}">
                          6. We might say &ldquo;Content isn&apos;t the move.
                          Here&apos;s what is.&rdquo;
                        </Text>
                      </Stack>
                    </Box>
                  </Box>

                  <Box
                    p="md"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0, 217, 255, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)",
                      borderRadius: "var(--mantine-radius-md)",
                      border: "1px solid var(--website-primary)",
                    }}
                  >
                    <Text size="sm" ta="center" fw={500}>
                      The goal isn&apos;t to help you do marketing better.
                      <br />
                      It&apos;s to help you figure out whether your marketing
                      should exist at all.
                    </Text>
                  </Box>
                </Stack>
              </Card>
            </FadeInUp>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}

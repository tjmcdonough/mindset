"use client";

import {
  IconBrain,
  IconCheck,
  IconMessageQuestion,
  IconTarget,
  IconUserCheck,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
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

interface InterrogationStep {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const INTERROGATION_STEPS: InterrogationStep[] = [
  {
    icon: IconMessageQuestion,
    title: "AI-Led Analysis & Targeted Questions",
    description:
      "The AI first researches your market, competitors, and positioning. Based on its findings, it asks targeted questions to fill the gaps only you can answer. It's not a long survey — it's a structured diagnostic where the AI does the heavy lifting.",
    color: "cyan",
  },
  {
    icon: IconTarget,
    title: "Stage Diagnosis",
    description:
      "Based on your answers, the AI determines your actual growth stage — Idea, Validation, or Early Traction — and constrains all future advice to only what works at that stage. No premature scaling.",
    color: "violet",
  },
  {
    icon: IconBrain,
    title: "Personalised Growth Profile",
    description:
      "You receive a complete growth profile: your stage, riskiest assumptions, strongest channels, blindspots, and a prioritised experiment plan. This profile persists and evolves as you run experiments.",
    color: "orange",
  },
  {
    icon: IconUserCheck,
    title: "Ongoing System, Not One-Off Advice",
    description:
      "Growthmind isn't a report you read once. It's a weekly experiment system that learns from every result. Each week the AI proposes new experiments, you approve them, and the system compounds learnings over time.",
    color: "green",
  },
];

const KEY_ANSWERS = [
  {
    question: "What do I get after the assessment?",
    answer:
      "A personalised growth profile, stage diagnosis, your riskiest assumptions identified, and your first experiment plan — all tailored to your specific business context.",
  },
  {
    question: "Is this advice, a plan, or an ongoing system?",
    answer:
      "All three. You get immediate diagnostic insights, a concrete weekly experiment plan, and an ongoing AI-powered system that compounds learnings as you execute.",
  },
  {
    question: "Is this personalised or pattern-based?",
    answer:
      "Deeply personalised. The interrogation captures your unique context — your market, stage, competitors, past experiments — and every recommendation is grounded in YOUR reality, not generic templates.",
  },
];

export function InterrogationExplainerSection() {
  return (
    <Box component="section" className={classes.altSection}>
      <Container size="lg">
        <Stack align="center" mb={60}>
          <FadeInUp>
            <Badge color="cyan" variant="light" size="lg" mb="md">
              Interrogation-First AI
            </Badge>
          </FadeInUp>
          <FadeInUp>
            <Title order={2} ta="center">
              What <GradientText animate>Interrogation AI</GradientText> Actually
              Means
            </Title>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Text size="xl" c="dimmed" ta="center" maw={700}>
              Most AI tools accept your inputs and optimise from there. We flip
              that. Before giving you anything, Growthmind interrogates your
              assumptions — because the biggest growth mistakes start with the
              wrong questions.
            </Text>
          </FadeInUp>
        </Stack>

        {/* How Interrogation AI works — step by step */}
        <Grid gutter="xl" mb={60}>
          <Grid.Col span={{ base: 12, lg: 7 }}>
            <Stack gap="lg">
              {INTERROGATION_STEPS.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={classes.featureCard}
                    data-color={step.color}
                    p="lg"
                  >
                    <Group gap="md" align="flex-start">
                      <ThemeIcon
                        size={48}
                        radius="md"
                        variant="light"
                        color={step.color}
                      >
                        <step.icon size={24} />
                      </ThemeIcon>
                      <Box style={{ flex: 1 }}>
                        <Text fw={700} size="lg" mb={4}>
                          {step.title}
                        </Text>
                        <Text size="sm" c="dimmed" lh={1.6}>
                          {step.description}
                        </Text>
                      </Box>
                    </Group>
                  </Card>
                </motion.div>
              ))}
            </Stack>
          </Grid.Col>

          {/* Key questions answered */}
          <Grid.Col span={{ base: 12, lg: 5 }}>
            <FadeInUp delay={0.3}>
              <Card className={classes.chartCard} p="xl" h="100%">
                <Text fw={700} size="lg" mb="lg">
                  Common Questions, Honest Answers
                </Text>
                <Stack gap="lg">
                  {KEY_ANSWERS.map((item) => (
                    <Box key={item.question}>
                      <Group gap="xs" mb="xs">
                        <IconCheck
                          size={16}
                          style={{ color: "var(--website-primary)" }}
                        />
                        <Text size="sm" fw={600}>
                          {item.question}
                        </Text>
                      </Group>
                      <Text size="sm" c="dimmed" lh={1.6} pl={24}>
                        {item.answer}
                      </Text>
                    </Box>
                  ))}
                </Stack>
              </Card>
            </FadeInUp>
          </Grid.Col>
        </Grid>

        {/* The uncomfortable truth callout */}
        <FadeInUp delay={0.5}>
          <Box
            p="xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 217, 255, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)",
              borderRadius: "var(--mantine-radius-lg)",
              border: "1px solid var(--website-border)",
              textAlign: "center",
            }}
          >
            <Group justify="center" gap="xs" mb="sm">
              <IconMessageQuestion
                size={20}
                style={{ color: "var(--website-primary)" }}
              />
              <Text fw={600}>The Uncomfortable Truth</Text>
            </Group>
            <Text size="lg" maw={650} mx="auto">
              &ldquo;We&apos;ve told teams to stop marketing entirely and fix
              their product first. No tool that charges per campaign would ever do
              that.&rdquo;
            </Text>
          </Box>
        </FadeInUp>
      </Container>
    </Box>
  );
}

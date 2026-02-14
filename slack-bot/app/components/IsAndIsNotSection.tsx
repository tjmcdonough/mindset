"use client";

import { IconCheck, IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  Badge,
  Box,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { FadeInUp, GradientText } from "./animations";
import classes from "../website.module.css";

interface IsItem {
  text: string;
  detail: string;
}

const WHAT_IT_IS: IsItem[] = [
  {
    text: "A growth decision system",
    detail:
      "Diagnoses your stage, identifies your riskiest assumptions, and designs focused experiments to test them.",
  },
  {
    text: "Personalised to your business",
    detail:
      "Every recommendation is grounded in your context — your market, stage, competitors, and past experiments.",
  },
  {
    text: "An ongoing weekly experiment loop",
    detail:
      "Not a one-time report. A repeating cycle of hypothesis, test, learn, iterate that compounds over time.",
  },
  {
    text: "Interrogation-first AI",
    detail:
      "Challenges your assumptions before acting. Asks what must be true, what evidence exists, and what would prove you wrong.",
  },
  {
    text: "Human-in-the-loop",
    detail:
      "AI proposes experiments and generates assets. Nothing goes live until you review and approve it.",
  },
  {
    text: "Better than an agency — at a fraction of the cost",
    detail:
      "Agencies execute playbooks without questioning them. Growthmind diagnoses first, tests what works, doubles down on winners, and kills what doesn't.",
  },
];

const WHAT_IT_IS_NOT: IsItem[] = [
  {
    text: "Not a chatbot",
    detail:
      "Ask ChatGPT \"how do I grow?\" and you get a listicle. Growthmind finds out why you're not growing, runs experiments to prove what works, and kills what doesn't.",
  },
  {
    text: "Not a content calendar",
    detail:
      "We don't churn out posts and hope. We tell you exactly what content to create, why it will work for your audience, and which channel to put it on — backed by data, not guesswork.",
  },
  {
    text: "Not an analytics dashboard",
    detail:
      "We don't just tell you what happened. We tell you what to do next and what evidence would prove it wrong.",
  },
  {
    text: "Not a generic marketing automation tool",
    detail:
      "Automation without diagnosis is automating the wrong things. We diagnose first, automate only what's validated.",
  },
  {
    text: "Your AI growth team",
    detail:
      "Test channels fast, see what works, kill what doesn't, double down on winners. The growth engine that scales with you — from first user to explosive growth.",
  },
];

export function IsAndIsNotSection() {
  return (
    <Box
      component="section"
      py={100}
      style={{ background: "var(--website-bg)" }}
    >
      <Container size="xl">
        <Stack align="center" mb={60}>
          <FadeInUp>
            <Badge color="gray" variant="light" size="lg" mb="md">
              Category Clarity
            </Badge>
          </FadeInUp>
          <FadeInUp>
            <Title order={2} ta="center">
              What Growthmind <GradientText animate>Is</GradientText> and{" "}
              <GradientText animate>Isn&apos;t</GradientText>
            </Title>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Text size="xl" c="dimmed" ta="center" maw={700}>
              When people hear &ldquo;AI for growth,&rdquo; they assume we&apos;re
              another tool in an existing category. We&apos;re not. Here&apos;s
              exactly what Growthmind is — and what it deliberately isn&apos;t.
            </Text>
          </FadeInUp>
        </Stack>

        <Grid gutter="xl">
          {/* What it IS */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <FadeInUp delay={0.2}>
              <Box className={classes.isColumn} h="100%">
                <Group gap="sm" mb="xl">
                  <IconCheck
                    size={24}
                    style={{ color: "var(--mantine-color-green-6)" }}
                  />
                  <Title order={3} size="h4">
                    What Growthmind Is
                  </Title>
                </Group>
                <Stack gap="md">
                  {WHAT_IT_IS.map((item, index) => (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.08 }}
                    >
                      <Box>
                        <Group gap="xs" mb={4}>
                          <IconCheck
                            size={14}
                            style={{ color: "var(--mantine-color-green-6)" }}
                          />
                          <Text size="sm" fw={600}>
                            {item.text}
                          </Text>
                        </Group>
                        <Text size="sm" c="dimmed" pl={22} lh={1.5}>
                          {item.detail}
                        </Text>
                      </Box>
                    </motion.div>
                  ))}
                </Stack>
              </Box>
            </FadeInUp>
          </Grid.Col>

          {/* What it IS NOT */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <FadeInUp delay={0.3}>
              <Box className={classes.isNotColumn} h="100%">
                <Group gap="sm" mb="xl">
                  <IconX
                    size={24}
                    style={{ color: "var(--mantine-color-red-6)" }}
                  />
                  <Title order={3} size="h4">
                    What Growthmind Isn&apos;t
                  </Title>
                </Group>
                <Stack gap="md">
                  {WHAT_IT_IS_NOT.map((item, index) => (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.08 }}
                    >
                      <Box>
                        <Group gap="xs" mb={4}>
                          <IconX
                            size={14}
                            style={{ color: "var(--mantine-color-red-6)" }}
                          />
                          <Text size="sm" fw={600}>
                            {item.text}
                          </Text>
                        </Group>
                        <Text size="sm" c="dimmed" pl={22} lh={1.5}>
                          {item.detail}
                        </Text>
                      </Box>
                    </motion.div>
                  ))}
                </Stack>
              </Box>
            </FadeInUp>
          </Grid.Col>
        </Grid>

        {/* One-line difference */}
        <FadeInUp delay={0.5}>
          <Box
            mt={60}
            p="xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 217, 255, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)",
              borderRadius: "var(--mantine-radius-lg)",
              border: "2px solid var(--website-primary)",
              textAlign: "center",
            }}
          >
            <Text size="sm" fw={600} c="dimmed" mb="sm">
              THE ONE-LINE DIFFERENCE
            </Text>
            <Text
              size="xl"
              fw={700}
              style={{
                background:
                  "linear-gradient(45deg, var(--website-primary), var(--website-secondary))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              &ldquo;Most tools help you do marketing. Growthmind helps you
              find what actually works — then doubles down on it.&rdquo;
            </Text>
          </Box>
        </FadeInUp>
      </Container>
    </Box>
  );
}

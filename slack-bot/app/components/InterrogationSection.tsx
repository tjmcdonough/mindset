"use client";

import { useRef, useState } from "react";
import {
  IconAlertTriangle,
  IconBulb,
  IconMessageQuestion,
  IconQuestionMark,
  IconX,
} from "@tabler/icons-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
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

interface HardQuestion {
  id: string;
  question: string;
  whyItMatters: string;
  whatMostToolsDo: string;
  icon: React.ElementType;
  color: string;
}

const HARD_QUESTIONS: HardQuestion[] = [
  {
    id: "stage",
    question:
      "Are you actually Pre-Product Market Fit, or are you lying to yourself about traction?",
    whyItMatters:
      "80% of founders waste months on the wrong growth tactics. We diagnose first, then help you find what actually works.",
    whatMostToolsDo: "Accept whatever you tell them and optimize from there.",
    icon: IconAlertTriangle,
    color: "orange",
  },
  {
    id: "channel",
    question:
      "Should content marketing even exist for your business right now?",
    whyItMatters:
      "Content is a compounding channel. If you pivot in 3 months, you've wasted 3 months.",
    whatMostToolsDo: "Generate blog posts because you asked for blog posts.",
    icon: IconQuestionMark,
    color: "violet",
  },
  {
    id: "evidence",
    question: "What evidence would make you abandon this direction?",
    whyItMatters:
      "If nothing can falsify your strategy, it's not a strategy — it's a hope.",
    whatMostToolsDo: "Never ask. Just execute whatever you request.",
    icon: IconBulb,
    color: "cyan",
  },
  {
    id: "problem",
    question:
      "Is this a distribution problem or a product problem wearing a marketing costume?",
    whyItMatters: "No amount of marketing fixes a product people don't want.",
    whatMostToolsDo:
      "Assume it's a marketing problem because they're marketing tools.",
    icon: IconX,
    color: "red",
  },
];

function QuestionCard({
  question,
  index,
}: {
  question: HardQuestion;
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card
        className={classes.featureCard}
        data-color={question.color}
        p="lg"
        style={{ cursor: "pointer" }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Stack gap="md">
          <Group gap="md" align="flex-start">
            <ThemeIcon
              size={40}
              radius="md"
              variant="light"
              color={question.color}
            >
              <question.icon size={20} />
            </ThemeIcon>
            <Box style={{ flex: 1 }}>
              <Text fw={600} size="md" style={{ lineHeight: 1.4 }}>
                &ldquo;{question.question}&rdquo;
              </Text>
            </Box>
          </Group>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: "hidden" }}
              >
                <Stack gap="sm" mt="sm">
                  <Box
                    p="sm"
                    style={{
                      background: `rgba(0, 217, 255, 0.05)`,
                      borderRadius: "var(--mantine-radius-md)",
                      borderLeft: "3px solid var(--website-primary)",
                    }}
                  >
                    <Text size="xs" fw={600} c="dimmed" mb={4}>
                      WHY THIS MATTERS
                    </Text>
                    <Text size="sm">{question.whyItMatters}</Text>
                  </Box>
                  <Box
                    p="sm"
                    style={{
                      background: "rgba(239, 68, 68, 0.05)",
                      borderRadius: "var(--mantine-radius-md)",
                      borderLeft: "3px solid var(--mantine-color-red-6)",
                    }}
                  >
                    <Text size="xs" fw={600} c="dimmed" mb={4}>
                      WHAT MOST TOOLS DO
                    </Text>
                    <Text size="sm" c="dimmed">
                      {question.whatMostToolsDo}
                    </Text>
                  </Box>
                </Stack>
              </motion.div>
            )}
          </AnimatePresence>

          <Text size="xs" c="dimmed" ta="center">
            {isExpanded ? "Click to collapse" : "Click to expand"}
          </Text>
        </Stack>
      </Card>
    </motion.div>
  );
}

export function InterrogationSection() {
  const ref = useRef(null);
  const _isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box component="section" className={classes.loopSection} ref={ref}>
      <Container size="lg">
        <Stack align="center" mb={60}>
          <FadeInUp>
            <Badge color="orange" variant="light" size="lg" mb="md">
              Interrogation-First AI
            </Badge>
          </FadeInUp>
          <FadeInUp>
            <Title order={2} ta="center">
              We <GradientText animate>Ask Before</GradientText> We Act
            </Title>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Text size="xl" c="dimmed" ta="center" maw={700}>
              Most AI tools accept your inputs and optimize from there. We
              challenge your assumptions first — because bad questions are more
              dangerous than bad answers.
            </Text>
          </FadeInUp>
        </Stack>

        <Grid gutter="lg">
          {HARD_QUESTIONS.map((question, index) => (
            <Grid.Col key={question.id} span={{ base: 12, md: 6 }}>
              <QuestionCard question={question} index={index} />
            </Grid.Col>
          ))}
        </Grid>

        {/* Bottom insight */}
        <FadeInUp delay={0.5}>
          <Box
            mt="xl"
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
            <Text size="lg" maw={600} mx="auto">
              &ldquo;We&apos;ve told teams to stop marketing entirely and fix
              their product first. No tool that charges per campaign would ever
              do that.&rdquo;
            </Text>
          </Box>
        </FadeInUp>
      </Container>
    </Box>
  );
}

"use client";

import { useRef } from "react";
import {
  IconArrowRight,
  IconCheck,
  IconFlask,
  IconRocket,
  IconSearch,
  IconSeedling,
  IconX,
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

interface Stage {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  signals: string[];
  wrongMoves: string[];
  rightMoves: string[];
}

const STAGES: Stage[] = [
  {
    id: "idea",
    name: "Idea Stage",
    description: "You have a hypothesis but no evidence",
    icon: IconSeedling,
    color: "cyan",
    signals: [
      "No paying customers yet",
      "Building based on assumptions",
      "Haven't talked to 20+ potential users",
    ],
    wrongMoves: ["SEO strategy", "Content calendar", "Social media presence"],
    rightMoves: [
      "Customer discovery interviews",
      "Problem validation",
      "Finding first 10 users manually",
    ],
  },
  {
    id: "validation",
    name: "Validation Stage",
    description: "You have signals but not proof",
    icon: IconFlask,
    color: "violet",
    signals: [
      "Some users, unclear if they'd pay",
      "Engagement but no revenue",
      "Interest but no commitment",
    ],
    wrongMoves: ["Scaling ads", "Hiring marketers", "Building fancy funnels"],
    rightMoves: [
      "Getting first paying customer",
      "Testing price points",
      "Identifying repeatable acquisition",
    ],
  },
  {
    id: "traction",
    name: "Early Traction",
    description: "Revenue exists but growth is manual",
    icon: IconSearch,
    color: "orange",
    signals: [
      "Paying customers (but few)",
      "Acquisition works but doesn't scale",
      "Product-market fit feels close",
    ],
    wrongMoves: [
      "Premature optimization",
      "Building for scale",
      "Diversifying channels too early",
    ],
    rightMoves: [
      "Finding one channel that works",
      "Understanding why customers buy",
      "Systematizing what's working",
    ],
  },
  {
    id: "growth",
    name: "Growth Stage",
    description: "PMF achieved, ready to scale",
    icon: IconRocket,
    color: "green",
    signals: [
      "Clear product-market fit",
      "Repeatable acquisition channel",
      "Unit economics work",
    ],
    wrongMoves: [
      "Growthmind isn't for you at this stage — you need execution tools now",
    ],
    rightMoves: [
      "Scale what's working",
      "Build growth team",
      "Optimize conversion",
    ],
  },
];

function StageCard({ stage, index }: { stage: Stage; index: number }) {
  const isGrowthStage = stage.id === "growth";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      style={{ height: "100%" }}
    >
      <Card
        className={classes.featureCard}
        data-color={stage.color}
        p="lg"
        style={{
          height: "100%",
          opacity: isGrowthStage ? 0.6 : 1,
        }}
      >
        <Stack gap="md" h="100%">
          <Group gap="md">
            <ThemeIcon
              size={48}
              radius="md"
              variant="light"
              color={stage.color}
            >
              <stage.icon size={24} />
            </ThemeIcon>
            <Box>
              <Text fw={700} size="lg">
                {stage.name}
              </Text>
              <Text size="sm" c="dimmed">
                {stage.description}
              </Text>
            </Box>
          </Group>

          <Box>
            <Text size="xs" fw={600} c="dimmed" mb="xs">
              SIGNALS YOU&apos;RE HERE
            </Text>
            <Stack gap={4}>
              {stage.signals.map((signal) => (
                <Group key={signal} gap="xs" align="flex-start">
                  <Box
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: `var(--mantine-color-${stage.color}-6)`,
                      marginTop: 6,
                      flexShrink: 0,
                    }}
                  />
                  <Text size="sm">{signal}</Text>
                </Group>
              ))}
            </Stack>
          </Box>

          {!isGrowthStage && (
            <>
              <Box>
                <Text size="xs" fw={600} c="red" mb="xs">
                  <IconX
                    size={12}
                    style={{ verticalAlign: "middle", marginRight: 4 }}
                  />
                  WRONG MOVES AT THIS STAGE
                </Text>
                <Stack gap={4}>
                  {stage.wrongMoves.map((move) => (
                    <Text
                      key={move}
                      size="sm"
                      c="dimmed"
                      style={{ textDecoration: "line-through" }}
                    >
                      {move}
                    </Text>
                  ))}
                </Stack>
              </Box>

              <Box style={{ marginTop: "auto" }}>
                <Text size="xs" fw={600} c="green" mb="xs">
                  <IconCheck
                    size={12}
                    style={{ verticalAlign: "middle", marginRight: 4 }}
                  />
                  WHAT ACTUALLY MOVES THE NEEDLE
                </Text>
                <Stack gap={4}>
                  {stage.rightMoves.map((move) => (
                    <Text key={move} size="sm" fw={500}>
                      {move}
                    </Text>
                  ))}
                </Stack>
              </Box>
            </>
          )}

          {isGrowthStage && (
            <Box
              p="md"
              style={{
                background: "rgba(34, 197, 94, 0.1)",
                borderRadius: "var(--mantine-radius-md)",
                marginTop: "auto",
              }}
            >
              <Text size="sm" ta="center">
                {stage.wrongMoves[0]}
              </Text>
            </Box>
          )}
        </Stack>
      </Card>
    </motion.div>
  );
}

export function DiagnosisSection() {
  const ref = useRef(null);
  const _isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box
      component="section"
      py={100}
      style={{ background: "var(--website-bg)" }}
      ref={ref}
    >
      <Container size="xl">
        <Stack align="center" mb={60}>
          <FadeInUp>
            <Badge color="violet" variant="light" size="lg" mb="md">
              Stage Diagnosis
            </Badge>
          </FadeInUp>
          <FadeInUp>
            <Title order={2} ta="center">
              Know Your <GradientText animate>Real Stage</GradientText>
            </Title>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Text size="xl" c="dimmed" ta="center" maw={700}>
              80% of founders waste months on the wrong growth tactics.
              We figure out exactly where you are, what channels work for
              your business, and what to do next — then help you execute.
            </Text>
          </FadeInUp>
        </Stack>

        <Grid gutter="lg">
          {STAGES.map((stage, index) => (
            <Grid.Col key={stage.id} span={{ base: 12, sm: 6, lg: 3 }}>
              <StageCard stage={stage} index={index} />
            </Grid.Col>
          ))}
        </Grid>

        {/* The misdiagnosis problem */}
        <FadeInUp delay={0.5}>
          <Box mt={60} p="xl" className={classes.chartCard}>
            <Grid gutter="xl" align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Text fw={700} size="lg" mb="md">
                  The Misdiagnosis Trap
                </Text>
                <Text size="sm" c="dimmed" mb="md">
                  A team with 50 users and no revenue asks for an &ldquo;SEO
                  strategy.&rdquo;
                </Text>
                <Stack gap="sm">
                  <Group gap="xs">
                    <Badge color="red" variant="light" size="sm">
                      What most tools do
                    </Badge>
                    <Text size="sm">Generate an SEO strategy</Text>
                  </Group>
                  <Group gap="xs">
                    <Badge color="green" variant="light" size="sm">
                      What Growthmind does
                    </Badge>
                    <Text size="sm">
                      &ldquo;You&apos;re at validation stage. SEO takes 6+
                      months to compound. You need to know if this idea works in
                      6 weeks. Let&apos;s talk about what would actually
                      validate demand.&rdquo;
                    </Text>
                  </Group>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Box
                  p="lg"
                  style={{
                    background: "rgba(239, 68, 68, 0.05)",
                    borderRadius: "var(--mantine-radius-md)",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                  }}
                >
                  <Text size="sm" fw={600} c="red" mb="sm">
                    The Cost of Wrong-Stage Tactics
                  </Text>
                  <Stack gap="xs">
                    <Group gap="xs">
                      <IconArrowRight
                        size={14}
                        style={{ color: "var(--mantine-color-red-6)" }}
                      />
                      <Text size="sm">3-6 months of misdirected effort</Text>
                    </Group>
                    <Group gap="xs">
                      <IconArrowRight
                        size={14}
                        style={{ color: "var(--mantine-color-red-6)" }}
                      />
                      <Text size="sm">$10-50k burned on premature tactics</Text>
                    </Group>
                    <Group gap="xs">
                      <IconArrowRight
                        size={14}
                        style={{ color: "var(--mantine-color-red-6)" }}
                      />
                      <Text size="sm">
                        False confidence from vanity metrics
                      </Text>
                    </Group>
                    <Group gap="xs">
                      <IconArrowRight
                        size={14}
                        style={{ color: "var(--mantine-color-red-6)" }}
                      />
                      <Text size="sm">
                        Delayed learning about what actually matters
                      </Text>
                    </Group>
                  </Stack>
                </Box>
              </Grid.Col>
            </Grid>
          </Box>
        </FadeInUp>
      </Container>
    </Box>
  );
}

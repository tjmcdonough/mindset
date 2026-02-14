"use client";

import { useRef, useState } from "react";
import {
  IconBulb,
  IconCheck,
  IconChevronRight,
  IconFileText,
  IconFlask,
  IconRefresh,
  IconTarget,
  IconTrendingUp,
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

interface ExperimentPhase {
  phase: number;
  title: string;
  type: "define" | "build" | "measure" | "learn";
  description: string;
  loopDescriptionLines: readonly string[];
  outcomes: string[];
  icon: typeof IconTarget;
}

const EXPERIMENT_PHASES: ExperimentPhase[] = [
  {
    phase: 1,
    title: "Define",
    type: "define",
    description: "Identify your riskiest assumption",
    loopDescriptionLines: ["Identify your", "riskiest assumption"],
    outcomes: ["Clear hypothesis", "Success criteria", "Falsifiable prediction"],
    icon: IconTarget,
  },
  {
    phase: 2,
    title: "Build",
    type: "build",
    description: "Create minimum viable test",
    loopDescriptionLines: ["Create minimum", "viable test"],
    outcomes: ["Landing page", "Outreach campaign", "Quick prototype"],
    icon: IconFlask,
  },
  {
    phase: 3,
    title: "Measure",
    type: "measure",
    description: "Collect real market signal", 
    loopDescriptionLines: ["Collect real", "market signal"],
    outcomes: ["Conversion data", "User feedback", "Behavioral insights"],
    icon: IconTrendingUp,
  },
  {
    phase: 4,
    title: "Learn",
    type: "learn",
    description: "Interpret results, decide next move",
    loopDescriptionLines: ["Interpret results,", "decide next move"],
    outcomes: ["Validated assumption", "Next experiment", "Pivot or persevere"],
    icon: IconBulb,
  },
];

const PHASE_COLORS: Record<ExperimentPhase["type"], string> = {
  define: "cyan",
  build: "violet",
  measure: "orange",
  learn: "green",
};

const LOOP_VIEWBOX_SIZE = 460;
const LOOP_CENTER = LOOP_VIEWBOX_SIZE / 2;
const LOOP_RADIUS = 130;
const NODE_SIZE = 64;
const NODE_RADIUS = NODE_SIZE / 2;
const NODE_ICON_SIZE = 28;
const CENTER_BUBBLE_SIZE = 100;
const CENTER_BUBBLE_RADIUS = CENTER_BUBBLE_SIZE / 2;

export function DeliverablePreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activePhase, setActivePhase] = useState<number | null>(null);

  return (
    <Box component="section" className={classes.loopSection} ref={ref}>
      <Container size="xl">
        <Stack align="center" mb={60}>
          <FadeInUp>
            <Badge color="cyan" variant="light" size="lg" mb="md">
              Weekly Experiment Cycle
            </Badge>
          </FadeInUp>
          <FadeInUp>
            <Title order={2} ta="center">
              The <GradientText animate>Week Experiment</GradientText> Framework
            </Title>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Text size="xl" c="dimmed" ta="center" maw={700}>
              Not a 14-day plan. Not a roadmap. A repeating cycle of
              hypothesis → test → learn → iterate. Find product-market fit
              through fast, focused experiments.
            </Text>
          </FadeInUp>
        </Stack>

        <Grid gutter="xl">
          {/* Experiment Loop Visualization */}
          <Grid.Col span={{ base: 12, lg: 7 }}>
            <Card className={classes.chartCard} p="xl">
              <Group justify="space-between" mb="lg">
                <Group gap="xs">
                  <IconRefresh
                    size={20}
                    style={{ color: "var(--website-primary)" }}
                  />
                  <Text fw={600}>Your Weekly Experiment Cycle</Text>
                </Group>
                <Badge color="cyan" variant="light" size="sm">
                  REPEATS EVERY WEEK
                </Badge>
              </Group>

              {/* Circular Loop Visualization */}
              <Box
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 480,
                  margin: "20px auto",
                  aspectRatio: "1",
                }}
              >
                <svg
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  viewBox={`0 0 ${LOOP_VIEWBOX_SIZE} ${LOOP_VIEWBOX_SIZE}`}
                >
                  {/* Center bubble (single coordinate system with ring + nodes) */}
                  <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    style={{ transformOrigin: `${LOOP_CENTER}px ${LOOP_CENTER}px` }}
                  >
                    <circle
                      cx={LOOP_CENTER}
                      cy={LOOP_CENTER}
                      r={CENTER_BUBBLE_RADIUS}
                      fill="var(--website-muted-bg)"
                      stroke="var(--website-border)"
                      strokeWidth={2}
                    />

                    <motion.g
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        transformOrigin: `${LOOP_CENTER}px ${LOOP_CENTER}px`,
                      }}
                    >
                      <g
                        transform={`translate(${LOOP_CENTER - NODE_ICON_SIZE / 2}, ${
                          LOOP_CENTER - 18 - NODE_ICON_SIZE / 2
                        })`}
                      >
                        <IconRefresh
                          size={NODE_ICON_SIZE}
                          style={{ color: "var(--website-primary)" }}
                        />
                      </g>
                    </motion.g>

                    <text
                      x={LOOP_CENTER}
                      y={LOOP_CENTER + 22}
                      textAnchor="middle"
                      fontSize={12}
                      fill="var(--website-muted)"
                    >
                      Weekly
                    </text>
                  </motion.g>

                  <motion.circle
                    cx={LOOP_CENTER}
                    cy={LOOP_CENTER}
                    r={LOOP_RADIUS}
                    fill="none"
                    stroke="var(--website-border)"
                    strokeWidth="2"
                    strokeDasharray="8 8"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                  {/* Animated progress arc */}
                  <motion.circle
                    cx={LOOP_CENTER}
                    cy={LOOP_CENTER}
                    r={LOOP_RADIUS}
                    fill="none"
                    stroke="url(#loopGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 2, delay: 0.5 }}
                    style={{
                      transform: "rotate(-90deg)",
                      transformOrigin: "center",
                    }}
                  />
                  <defs>
                    <linearGradient
                      id="loopGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="var(--mantine-color-cyan-6)" />
                      <stop offset="33%" stopColor="var(--mantine-color-violet-6)" />
                      <stop offset="66%" stopColor="var(--mantine-color-orange-6)" />
                      <stop offset="100%" stopColor="var(--mantine-color-green-6)" />
                    </linearGradient>
                  </defs>

                  {/* Phase nodes + labels (same SVG coordinate system as ring) */}
                  {EXPERIMENT_PHASES.map((phase, index) => {
                    const angle = (index * 90 - 90) * (Math.PI / 180);
                    const x = LOOP_CENTER + LOOP_RADIUS * Math.cos(angle);
                    const y = LOOP_CENTER + LOOP_RADIUS * Math.sin(angle);
                    const isActive = activePhase === phase.phase;
                    const phaseColor = PHASE_COLORS[phase.type];
                    // Position labels: top/left/right have labels below node, bottom has labels above
                    const isTopNode = index === 0;
                    const labelY = isTopNode
                      ? y - NODE_RADIUS - 55 // Above the node for top position
                      : y + NODE_RADIUS + 22; // Below the node for others
                    
                    const descriptionStartY = labelY + 18;

                    return (
                      <motion.g
                        key={phase.phase}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          delay: index * 0.15 + 0.3,
                          type: "spring",
                          stiffness: 300,
                        }}
                        onMouseEnter={() => setActivePhase(phase.phase)}
                        onMouseLeave={() => setActivePhase(null)}
                        style={{
                          cursor: "pointer",
                          transformOrigin: `${x}px ${y}px`,
                        }}
                      >
                        <circle
                          cx={x}
                          cy={y}
                          r={NODE_RADIUS}
                          fill={
                            isActive
                              ? `var(--mantine-color-${phaseColor}-filled)`
                              : "var(--website-card-bg)"
                          }
                          stroke={`var(--mantine-color-${phaseColor}-6)`}
                          strokeWidth={2}
                        />

                        <g
                          transform={`translate(${x - NODE_ICON_SIZE / 2}, ${
                            y - NODE_ICON_SIZE / 2
                          })`}
                        >
                          <phase.icon
                            size={NODE_ICON_SIZE}
                            style={{
                              color: isActive
                                ? "white"
                                : `var(--mantine-color-${phaseColor}-6)`,
                            }}
                          />
                        </g>

                        <text
                          x={x}
                          y={labelY}
                          textAnchor="middle"
                          fontSize={14}
                          fontWeight={600}
                          fill={
                            isActive
                              ? `var(--mantine-color-${phaseColor}-6)`
                              : "var(--website-foreground)"
                          }
                        >
                          {phase.title}
                        </text>

                        {phase.loopDescriptionLines.map((line, lineIndex) => (
                          <text
                            key={line}
                            x={x}
                            y={descriptionStartY + lineIndex * 16}
                            textAnchor="middle"
                            fontSize={12}
                            fill="currentColor" opacity={0.75}
                          >
                            {line}
                          </text>
                        ))}
                      </motion.g>
                    );
                  })}
                </svg>
              </Box>

              {/* Phase details on hover/active */}
              <Box mt={60}>
                <motion.div
                  initial={false}
                  animate={{
                    opacity: activePhase ? 1 : 0.6,
                    y: activePhase ? 0 : 5,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {activePhase ? (
                    <Box
                      p="md"
                      style={{
                        background: "var(--website-muted-bg)",
                        borderRadius: "var(--mantine-radius-md)",
                        border: `1px solid var(--mantine-color-${PHASE_COLORS[EXPERIMENT_PHASES[activePhase - 1].type]}-6)`,
                      }}
                    >
                      <Text fw={600} mb="xs">
                        {EXPERIMENT_PHASES[activePhase - 1].title} Phase Outcomes:
                      </Text>
                      <Group gap="xs">
                        {EXPERIMENT_PHASES[activePhase - 1].outcomes.map(
                          (outcome) => (
                            <Badge
                              key={outcome}
                              variant="light"
                              color={
                                PHASE_COLORS[
                                  EXPERIMENT_PHASES[activePhase - 1].type
                                ]
                              }
                              size="sm"
                            >
                              {outcome}
                            </Badge>
                          ),
                        )}
                      </Group>
                    </Box>
                  ) : (
                    <Text size="sm" c="dimmed" ta="center">
                      Hover over a phase to see what you&apos;ll achieve
                    </Text>
                  )}
                </motion.div>
              </Box>
            </Card>
          </Grid.Col>

          {/* What you get */}
          <Grid.Col span={{ base: 12, lg: 5 }}>
            <Stack gap="md">
              <FadeInUp delay={0.2}>
                <Card className={classes.featureCard} data-color="cyan" p="lg">
                  <Group gap="md">
                    <ThemeIcon
                      size={48}
                      radius="md"
                      variant="light"
                      color="cyan"
                    >
                      <IconTarget size={24} />
                    </ThemeIcon>
                    <Box style={{ flex: 1 }}>
                      <Title order={4} size="h5" mb={4}>
                        Clear Hypotheses
                      </Title>
                      <Text size="sm" c="dimmed">
                        Stop guessing. Each experiment starts with a specific,
                        falsifiable assumption about your market.
                      </Text>
                    </Box>
                    <IconChevronRight
                      size={20}
                      style={{ color: "var(--website-muted)" }}
                    />
                  </Group>
                </Card>
              </FadeInUp>

              <FadeInUp delay={0.3}>
                <Card
                  className={classes.featureCard}
                  data-color="violet"
                  p="lg"
                >
                  <Group gap="md">
                    <ThemeIcon
                      size={48}
                      radius="md"
                      variant="light"
                      color="violet"
                    >
                      <IconFileText size={24} />
                    </ThemeIcon>
                    <Box style={{ flex: 1 }}>
                      <Title order={4} size="h5" mb={4}>
                        Minimum Viable Tests
                      </Title>
                      <Text size="sm" c="dimmed">
                        Landing pages, outreach sequences, quick prototypes—built
                        to test demand, not impress investors.
                      </Text>
                    </Box>
                    <IconChevronRight
                      size={20}
                      style={{ color: "var(--website-muted)" }}
                    />
                  </Group>
                </Card>
              </FadeInUp>

              <FadeInUp delay={0.4}>
                <Card
                  className={classes.featureCard}
                  data-color="orange"
                  p="lg"
                >
                  <Group gap="md">
                    <ThemeIcon
                      size={48}
                      radius="md"
                      variant="light"
                      color="orange"
                    >
                      <IconTrendingUp size={24} />
                    </ThemeIcon>
                    <Box style={{ flex: 1 }}>
                      <Title order={4} size="h5" mb={4}>
                        Real Market Signal
                      </Title>
                      <Text size="sm" c="dimmed">
                        Not vanity metrics. Actual evidence that people want what
                        you&apos;re building—or proof they don&apos;t.
                      </Text>
                    </Box>
                    <IconChevronRight
                      size={20}
                      style={{ color: "var(--website-muted)" }}
                    />
                  </Group>
                </Card>
              </FadeInUp>

              <FadeInUp delay={0.5}>
                <Card className={classes.featureCard} data-color="green" p="lg">
                  <Group gap="md">
                    <ThemeIcon
                      size={48}
                      radius="md"
                      variant="light"
                      color="green"
                    >
                      <IconBulb size={24} />
                    </ThemeIcon>
                    <Box style={{ flex: 1 }}>
                      <Title order={4} size="h5" mb={4}>
                        Actionable Learnings
                      </Title>
                      <Text size="sm" c="dimmed">
                        Every week ends with clarity: validated assumption, next
                        experiment, or pivot decision.
                      </Text>
                    </Box>
                    <IconChevronRight
                      size={20}
                      style={{ color: "var(--website-muted)" }}
                    />
                  </Group>
                </Card>
              </FadeInUp>
            </Stack>
          </Grid.Col>
        </Grid>

        {/* Bottom CTA */}
        <FadeInUp delay={0.6}>
          <Box ta="center" mt="xl">
            <Group gap="xs" justify="center">
              <IconCheck
                size={18}
                style={{ color: "var(--mantine-color-green-6)" }}
              />
              <Text size="sm" c="dimmed">
                No credit card required. Run your first experiment this week.
              </Text>
            </Group>
          </Box>
        </FadeInUp>
      </Container>
    </Box>
  );
}

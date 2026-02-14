"use client";

import { useRef } from "react";
import {
  IconArrowRight,
  IconBrain,
  IconChartBar,
  IconPencil,
  IconTarget,
} from "@tabler/icons-react";
import { motion, useInView } from "framer-motion";
import {
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
import { FadeInLeft, FadeInRight, FadeInUp, GradientText } from "./animations";
import classes from "../website.module.css";

const LOOP_STEPS = [
  {
    step: 1,
    icon: IconBrain,
    title: "Market Intelligence",
    subtitle: "The Brain",
    description:
      "We analyze your website, competitors, and market signals in 3 minutes. We find your ideal customer profile (ICP) and the exact channels where they hang out.",
    color: "cyan",
  },
  {
    step: 2,
    icon: IconTarget,
    title: "A Roadmap to PMF",
    subtitle: "The Plan",
    description:
      "No generic advice. We generate a hyper-personalized sprint plan focused on one thing: what to validate next. We tell you exactly what to do, week by week.",
    color: "violet",
  },
  {
    step: 3,
    icon: IconPencil,
    title: "Content at Scale",
    subtitle: "The Hands",
    description:
      "Growthmind drafts your blog posts, social threads, and email sequences in your unique brand voice. You just review and approve.",
    color: "orange",
  },
  {
    step: 4,
    icon: IconChartBar,
    title: "Smarter Every Day",
    subtitle: "The Optimization",
    description:
      "Connect your analytics. As we see what drives traffic and signups, the AI refines your strategy automatically.",
    color: "cyan",
  },
];

function GrowthLoopVisualization() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Constants for positioning
  const containerSize = 280;
  const center = containerSize / 2;
  const orbitRadius = 110;
  const nodeSize = 48;
  const nodeOffset = nodeSize / 2;

  return (
    <Card
      ref={ref}
      className={classes.chartCard}
      h={450}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Animated circular flow */}
      <Box
        style={{
          position: "relative",
          width: containerSize,
          height: containerSize,
        }}
      >
        {/* Rotating ring */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px dashed var(--website-border)",
          }}
        />

        {/* Center icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          style={{
            position: "absolute",
            top: center - 40,
            left: center - 40,
          }}
        >
          <ThemeIcon size={80} radius="xl" variant="light" color="cyan">
            <IconBrain size={40} />
          </ThemeIcon>
        </motion.div>

        {/* Orbiting nodes - positioned at cardinal directions */}
        {LOOP_STEPS.map((step, index) => {
          // Position nodes at: top (0), right (1), bottom (2), left (3)
          const angle = (index * 90 - 90) * (Math.PI / 180);
          const x = center + Math.cos(angle) * orbitRadius - nodeOffset;
          const y = center + Math.sin(angle) * orbitRadius - nodeOffset;

          return (
            <motion.div
              key={step.step}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                delay: 0.5 + index * 0.15,
                type: "spring",
                stiffness: 150,
              }}
              style={{
                position: "absolute",
                top: y,
                left: x,
                zIndex: 10,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                animate={isInView ? { y: [0, -4, 0] } : {}}
                transition={{
                  y: {
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.4,
                    ease: "easeInOut",
                  },
                }}
              >
                <ThemeIcon
                  size={nodeSize}
                  radius="xl"
                  variant="filled"
                  color={step.color}
                >
                  <step.icon size={24} />
                </ThemeIcon>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Connecting flow arrows between nodes */}
        {LOOP_STEPS.map((_, index) => {
          // Position arrows between nodes (at 45°, 135°, 225°, 315°)
          const angle = (index * 90 - 45) * (Math.PI / 180);
          const arrowRadius = 95;
          const x = center + Math.cos(angle) * arrowRadius;
          const y = center + Math.sin(angle) * arrowRadius;
          // Rotate arrow to point along the circle (tangent)
          const rotation = index * 90 + 45;

          return (
            <motion.div
              key={`arrow-${index}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 0.6, scale: 1 } : {}}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
              style={{
                position: "absolute",
                top: y - 8,
                left: x - 8,
                transform: `rotate(${rotation}deg)`,
              }}
            >
              <IconArrowRight
                size={16}
                style={{ color: "var(--website-primary)" }}
              />
            </motion.div>
          );
        })}
      </Box>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: 30,
          textAlign: "center",
        }}
      >
        <Text c="dimmed" size="sm">
          <GradientText animate>Continuous Growth Loop</GradientText>
        </Text>
      </motion.div>
    </Card>
  );
}

export function SolutionSection() {
  return (
    <Box component="section" id="process" className={classes.loopSection}>
      <Container size="xl">
        <Stack align="center" mb={60}>
          <FadeInUp>
            <Title order={2} ta="center">
              Your AI Head of Growth.{" "}
              <GradientText animate>Hired in seconds.</GradientText>
            </Title>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Text size="xl" c="dimmed" ta="center" maw={600}>
              Growthmind isn&apos;t just a chatbot. It&apos;s a multi-agent
              system that researches, strategizes, and executes — so you can
              focus on decisions, not busywork.
            </Text>
          </FadeInUp>
        </Stack>

        <Grid gutter={60} align="center">
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <FadeInLeft>
              <Stack gap="xl">
                {LOOP_STEPS.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <Group align="flex-start" gap="md">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <ThemeIcon
                          size={56}
                          radius="md"
                          variant="light"
                          color={step.color}
                        >
                          <step.icon size={28} />
                        </ThemeIcon>
                      </motion.div>
                      <Box style={{ flex: 1 }}>
                        <Group gap="xs" mb={4}>
                          <Text
                            size="xs"
                            fw={600}
                            tt="uppercase"
                            style={{
                              color: `var(--mantine-color-${step.color}-6)`,
                            }}
                          >
                            Step {step.step}
                          </Text>
                          <Text size="xs" c="dimmed">
                            — {step.subtitle}
                          </Text>
                        </Group>
                        <Title order={3} size="h4" mb="xs">
                          {step.title}
                        </Title>
                        <Text c="dimmed" size="sm">
                          {step.description}
                        </Text>
                      </Box>
                    </Group>
                  </motion.div>
                ))}
              </Stack>
            </FadeInLeft>
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 6 }}>
            <FadeInRight delay={0.3}>
              <GrowthLoopVisualization />
            </FadeInRight>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}

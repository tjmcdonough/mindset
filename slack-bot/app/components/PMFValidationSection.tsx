"use client";

/**
 * PMFValidationSection
 *
 * Showcases Growthmind's 5-step PMF validation process.
 * Emphasizes that validation comes BEFORE marketing tactics.
 * Features GO/PIVOT/NO-GO verdict badges on the final step.
 */
import {
  IconBuilding,
  IconCheck,
  IconGavel,
  IconMapPin,
  IconTarget,
  IconUsers,
  IconX,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  Badge,
  Box,
  Button,
  Container,
  Group,
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

// ============================================
// VALIDATION STEPS DATA
// ============================================

const VALIDATION_STEPS = [
  {
    step: 1,
    icon: IconTarget,
    title: "Product Market Fit Analysis",
    description:
      "We identify your target audience and customer segments to understand who you're really building for.",
    color: "cyan",
  },
  {
    step: 2,
    icon: IconBuilding,
    title: "Foundation Analysis",
    description:
      "Business identity, company stage, and team analysis to understand your starting point.",
    color: "violet",
  },
  {
    step: 3,
    icon: IconUsers,
    title: "Customer Discovery",
    description:
      "Identifying pain points and validating user needs through market research and signal analysis.",
    color: "blue",
  },
  {
    step: 4,
    icon: IconMapPin,
    title: "Initial Users Discovery",
    description:
      "Finding where potential users are actively seeking solutions—Reddit, forums, communities.",
    color: "teal",
  },
  {
    step: 5,
    icon: IconGavel,
    title: "Business Idea Assessment",
    description:
      "The moment of truth: Demand validation with a clear verdict on your idea.",
    color: "orange",
    isVerdict: true,
  },
];

// ============================================
// VERDICT BADGES COMPONENT
// ============================================

function VerdictBadges() {
  return (
    <Group gap="xs" mt="sm">
      <Badge
        size="lg"
        variant="light"
        color="green"
        leftSection={<IconCheck size={14} />}
        styles={{
          root: {
            textTransform: "uppercase",
            fontWeight: 700,
            letterSpacing: "0.05em",
          },
        }}
      >
        GO
      </Badge>
      <Badge
        size="lg"
        variant="light"
        color="orange"
        styles={{
          root: {
            textTransform: "uppercase",
            fontWeight: 700,
            letterSpacing: "0.05em",
          },
        }}
      >
        PIVOT
      </Badge>
      <Badge
        size="lg"
        variant="light"
        color="red"
        leftSection={<IconX size={14} />}
        styles={{
          root: {
            textTransform: "uppercase",
            fontWeight: 700,
            letterSpacing: "0.05em",
          },
        }}
      >
        NO-GO
      </Badge>
    </Group>
  );
}

// ============================================
// TIMELINE STEP COMPONENT
// ============================================

interface TimelineStepProps {
  step: (typeof VALIDATION_STEPS)[number];
  index: number;
  isLast: boolean;
}

function TimelineStep({ step, index, isLast }: TimelineStepProps) {
  const StepIcon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Group align="flex-start" gap="lg" wrap="nowrap">
        {/* Timeline connector */}
        <Box
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Step number circle */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <ThemeIcon
              size={56}
              radius="xl"
              variant={step.isVerdict ? "filled" : "light"}
              color={step.color}
              style={{
                boxShadow: step.isVerdict
                  ? `0 0 20px var(--mantine-color-${step.color}-4)`
                  : undefined,
              }}
            >
              <StepIcon size={28} />
            </ThemeIcon>
          </motion.div>

          {/* Vertical connector line */}
          {!isLast && (
            <Box
              style={{
                width: 2,
                height: 60,
                background: `linear-gradient(to bottom, var(--mantine-color-${step.color}-6), var(--website-border))`,
                marginTop: 8,
              }}
            />
          )}
        </Box>

        {/* Step content */}
        <Box style={{ flex: 1, paddingBottom: isLast ? 0 : 40 }}>
          <Group gap="xs" mb={4}>
            <Text
              size="xs"
              fw={700}
              tt="uppercase"
              style={{ color: `var(--mantine-color-${step.color}-5)` }}
            >
              Step {step.step}
            </Text>
            {step.isVerdict && (
              <Badge size="xs" variant="outline" color={step.color}>
                Validation Gate
              </Badge>
            )}
          </Group>

          <Title order={4} mb="xs" c="white">
            {step.title}
          </Title>

          <Text c="dimmed" size="sm" maw={400}>
            {step.description}
          </Text>

          {/* Show verdict badges on the final step */}
          {step.isVerdict && <VerdictBadges />}
        </Box>
      </Group>
    </motion.div>
  );
}

// ============================================
// MAIN SECTION COMPONENT
// ============================================

export function PMFValidationSection() {
  return (
    <Box
      component="section"
      id="validation"
      py={80}
      style={{
        position: "relative",
        borderTop: "1px solid var(--website-border)",
        borderBottom: "1px solid var(--website-border)",
      }}
    >
      {/* Subtle background gradient */}
      <Box
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(124, 58, 237, 0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <Container size="lg" style={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <Stack align="center" mb={60}>
          <FadeInUp>
            <Badge
              size="lg"
              variant="light"
              color="violet"
              mb="md"
              styles={{
                root: {
                  textTransform: "uppercase",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                },
              }}
            >
              Step Zero
            </Badge>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <Title order={2} ta="center" maw={700}>
              Before We Help You Grow,{" "}
              <GradientText animate>We Validate Your Foundation</GradientText>
            </Title>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <Text size="lg" c="dimmed" ta="center" maw={600}>
              Most teams waste months building the wrong thing. Our AI runs a
              5-step validation in minutes—and{" "}
              <Text span fw={600} c="white">
                we&apos;ll tell you to pivot if the data says so.
              </Text>
            </Text>
          </FadeInUp>
        </Stack>

        {/* Timeline */}
        <Box maw={600} mx="auto">
          <StaggerContainer>
            {VALIDATION_STEPS.map((step, index) => (
              <StaggerItem key={step.step}>
                <TimelineStep
                  step={step}
                  index={index}
                  isLast={index === VALIDATION_STEPS.length - 1}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Box>

        {/* CTA */}
        <FadeInUp delay={0.5}>
          <Stack align="center" mt={60}>
            <Text size="sm" c="dimmed" ta="center">
              No credit card required. Get your reality check in under 3
              minutes.
            </Text>
            <Button
              size="lg"
              className={classes.ctaButton}
              component="a"
              href="/onboarding"
              rightSection={<IconTarget size={18} />}
            >
              Get Your PMF Reality Check
            </Button>
          </Stack>
        </FadeInUp>
      </Container>
    </Box>
  );
}

"use client";

import {
  IconBolt,
  IconClock,
  IconCurrencyPound,
  IconTrendingUp,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  Badge,
  Box,
  Card,
  Container,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { FadeInUp, GradientText } from "./animations";
import { InterrogationIllustration } from "./InterrogationIllustration";
import classes from "../website.module.css";

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  timing: string;
  color: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Sign Up & Let the AI Analyse",
    description:
      "Create your free account. The AI researches your market, competitors, and positioning, then asks targeted questions based on what it finds. You fill in the gaps — the AI does the heavy lifting.",
    timing: "~10 minutes",
    color: "cyan",
  },
  {
    step: 2,
    title: "Receive Your Growth Profile",
    description:
      "Instantly receive your personalised stage diagnosis, growth profile, riskiest assumptions identified, and your first experiment plan — all tailored to your specific business context.",
    timing: "Instant",
    color: "violet",
  },
  {
    step: 3,
    title: "Run Weekly Experiments",
    description:
      "Each week, the AI designs a focused experiment to test your riskiest assumption. You review and approve — the AI generates all the test assets you need.",
    timing: "2-3 hrs/week",
    color: "orange",
  },
  {
    step: 4,
    title: "Learn, Adapt & Compound",
    description:
      "Every experiment feeds back into your growth profile. Recommendations get sharper over time. Real market knowledge, not vanity metrics.",
    timing: "Ongoing",
    color: "green",
  },
];

interface StatCard {
  stat: string;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const STAT_CARDS: StatCard[] = [
  {
    stat: "10 min",
    label: "Initial Setup",
    description:
      "That's it. 10 minutes upfront to save months of guessing. The AI handles the research — you just confirm the gaps.",
    icon: IconClock,
    color: "cyan",
  },
  {
    stat: "$200",
    label: "/mo vs $10-20k Agency",
    description:
      "Get the growth intelligence of a full team for 1% of the cost. No retainers, no lock-in, cancel anytime.",
    icon: IconCurrencyPound,
    color: "green",
  },
  {
    stat: "7 days",
    label: "To First Growth Signal",
    description:
      "From sign-up to your first validated experiment result. Not months of strategy decks — real market signal in a week.",
    icon: IconBolt,
    color: "orange",
  },
];

export function HowItWorksSection() {
  return (
    <Box component="section" className={classes.loopSection}>
      <Container size="lg">
        <Stack align="center" mb={60}>
          <FadeInUp>
            <Badge color="cyan" variant="light" size="lg" mb="md">
              How It Works
            </Badge>
          </FadeInUp>
          <FadeInUp>
            <Title order={2} ta="center">
              From Sign-Up to{" "}
              <GradientText animate>Growth Signal</GradientText> in One Week
            </Title>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Text size="lg" c="dimmed" ta="center" maw={700}>
              10 minutes of setup. No credit card. No consultant calls. Your
              first experiment plan the same day.
            </Text>
          </FadeInUp>
        </Stack>

        <Grid gutter="xl" mb={60}>
          {/* Video embed area */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <FadeInUp delay={0.2}>
              <Box className={classes.videoEmbed}>
                <InterrogationIllustration />
              </Box>
            </FadeInUp>
          </Grid.Col>

          {/* Step-by-step process */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Stack gap={0}>
              {PROCESS_STEPS.map((step, index) => (
                <Box key={step.step}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12 }}
                  >
                    <Group gap="md" align="flex-start">
                      <Box className={classes.stepNumber}>{step.step}</Box>
                      <Box style={{ flex: 1 }} pb="md">
                        <Group gap="sm" mb={4}>
                          <Text fw={700} size="md">
                            {step.title}
                          </Text>
                          <Badge
                            color={step.color}
                            variant="light"
                            size="sm"
                          >
                            {step.timing}
                          </Badge>
                        </Group>
                        <Text size="sm" c="dimmed" lh={1.6}>
                          {step.description}
                        </Text>
                      </Box>
                    </Group>
                  </motion.div>
                  {index < PROCESS_STEPS.length - 1 && (
                    <Box className={classes.stepConnector} />
                  )}
                </Box>
              ))}
            </Stack>
          </Grid.Col>
        </Grid>

        {/* Big stat cards — cost, time, speed */}
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
          {STAT_CARDS.map((item, index) => (
            <FadeInUp key={item.stat} delay={0.4 + index * 0.1}>
              <Card
                className={classes.featureCard}
                data-color={item.color}
                p="xl"
                h="100%"
              >
                <Stack gap="sm" align="center" ta="center">
                  <ThemeIcon
                    size={48}
                    radius="md"
                    variant="light"
                    color={item.color}
                  >
                    <item.icon size={24} />
                  </ThemeIcon>
                  <Text
                    fw={800}
                    style={{
                      fontSize: "2.5rem",
                      lineHeight: 1,
                      color: `var(--mantine-color-${item.color}-6)`,
                    }}
                  >
                    {item.stat}
                  </Text>
                  <Text fw={600} size="sm" c="dimmed" tt="uppercase">
                    {item.label}
                  </Text>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    {item.description}
                  </Text>
                </Stack>
              </Card>
            </FadeInUp>
          ))}
        </SimpleGrid>

        {/* Time-upfront callout */}
        <FadeInUp delay={0.7}>
          <Box
            mt="xl"
            p="lg"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 217, 255, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)",
              borderRadius: "var(--mantine-radius-md)",
              border: "1px solid var(--website-border)",
              textAlign: "center",
            }}
          >
            <Group justify="center" gap="xs">
              <IconTrendingUp
                size={18}
                style={{ color: "var(--website-primary)" }}
              />
              <Text size="md" fw={500}>
                10 minutes upfront. Months of guesswork saved. Your product in
                front of the right people, faster.
              </Text>
            </Group>
          </Box>
        </FadeInUp>
      </Container>
    </Box>
  );
}

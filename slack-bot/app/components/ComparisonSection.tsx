"use client";

import { useRef } from "react";
import {
  IconBrain,
  IconChartBar,
  IconCheck,
  IconMessage,
  IconPencil,
  IconUsers,
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
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { FadeInUp, GradientText } from "./animations";
import classes from "../website.module.css";

interface CompetitorCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  examples: string;
  whatTheyDo: string;
  limitation: string;
}

const COMPETITOR_CATEGORIES: CompetitorCategory[] = [
  {
    id: "execution",
    name: "Marketing Execution Tools",
    icon: IconPencil,
    examples: "Jasper, Copy.ai, Buffer, Hootsuite",
    whatTheyDo: "Generate content, schedule posts, automate campaigns",
    limitation:
      "Optimize output, not understanding. They assume you know what to say and to whom.",
  },
  {
    id: "analytics",
    name: "Analytics & Dashboards",
    icon: IconChartBar,
    examples: "Mixpanel, Amplitude, GA4 with AI",
    whatTheyDo: "Tell you what happened, sometimes why",
    limitation:
      "Rarely tell you what to do next. Data without decision framework.",
  },
  {
    id: "agencies",
    name: "Agencies & Consultants",
    icon: IconUsers,
    examples: "Growth agencies, fractional CMOs",
    whatTheyDo: "Humans with decks and strategies",
    limitation:
      "Expensive, slow, and still guessing — just with better vocabulary.",
  },
  {
    id: "wrappers",
    name: "ChatGPT Wrappers",
    icon: IconMessage,
    examples: "Generic AI assistants, prompt tools",
    whatTheyDo: "Respond to whatever you ask",
    limitation:
      "Don't question whether the question itself is wrong. Garbage in, confident garbage out.",
  },
];

interface GrowthmindDifference {
  trait: string;
  description: string;
}

const GROWTHMIND_DIFFERENCES: GrowthmindDifference[] = [
  {
    trait: "Questions your questions",
    description:
      "Before answering 'how do I do X', we ask 'should X exist at all'",
  },
  {
    trait: "Diagnoses before prescribing",
    description:
      "Determines your actual stage and constrains advice to what works there",
  },
  {
    trait: "Tells you what NOT to do",
    description:
      "Our business model doesn't depend on you doing more, so we can say 'stop'",
  },
  {
    trait: "Makes failure explicit",
    description:
      "Defines what would falsify your direction so you know when to pivot",
  },
  {
    trait: "Takes responsibility for deciding",
    description:
      "Doesn't just execute requests — decides what requests should exist",
  },
];

function CategoryCard({
  category,
  index,
}: {
  category: CompetitorCategory;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className={classes.featureCard} data-color="gray" p="lg" h="100%">
        <Stack gap="md">
          <Group gap="md">
            <ThemeIcon size={40} radius="md" variant="light" color="gray">
              <category.icon size={20} />
            </ThemeIcon>
            <Box>
              <Text fw={600}>{category.name}</Text>
              <Text size="xs" c="dimmed">
                {category.examples}
              </Text>
            </Box>
          </Group>

          <Box>
            <Text size="xs" fw={600} c="dimmed" mb={4}>
              WHAT THEY DO
            </Text>
            <Text size="sm">{category.whatTheyDo}</Text>
          </Box>

          <Box
            p="sm"
            style={{
              background: "rgba(239, 68, 68, 0.05)",
              borderRadius: "var(--mantine-radius-md)",
              marginTop: "auto",
            }}
          >
            <Text size="xs" fw={600} c="red" mb={4}>
              <IconX
                size={12}
                style={{ verticalAlign: "middle", marginRight: 4 }}
              />
              THE LIMITATION
            </Text>
            <Text size="sm" c="dimmed">
              {category.limitation}
            </Text>
          </Box>
        </Stack>
      </Card>
    </motion.div>
  );
}

export function ComparisonSection() {
  const ref = useRef(null);
  const _isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box component="section" className={classes.loopSection} ref={ref}>
      <Container size="xl">
        <Stack align="center" mb={60}>
          <FadeInUp>
            <Badge color="gray" variant="light" size="lg" mb="md">
              Category Clarity
            </Badge>
          </FadeInUp>
          <FadeInUp>
            <Title order={2} ta="center">
              What We&apos;re <GradientText animate>Not</GradientText>
            </Title>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Text size="xl" c="dimmed" ta="center" maw={700}>
              When people hear &ldquo;AI for growth,&rdquo; they bucket us with
              tools we don&apos;t compete with. Here&apos;s why Growthmind
              doesn&apos;t fit cleanly in any existing category.
            </Text>
          </FadeInUp>
        </Stack>

        {/* Competitor categories */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" mb={60}>
          {COMPETITOR_CATEGORIES.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </SimpleGrid>

        {/* Growthmind differentiation */}
        <FadeInUp delay={0.4}>
          <Card
            p="xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 217, 255, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)",
              border: "2px solid var(--website-primary)",
              borderRadius: "var(--mantine-radius-lg)",
            }}
          >
            <Group gap="md" mb="xl" justify="center">
              <ThemeIcon size={48} radius="md" color="cyan" variant="light">
                <IconBrain size={24} />
              </ThemeIcon>
              <Box>
                <Text fw={700} size="xl">
                  What Growthmind Actually Is
                </Text>
                <Text size="sm" c="dimmed">
                  Growth Decision Intelligence for Teams Without a Growth Team
                </Text>
              </Box>
            </Group>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md" mb="xl">
              {GROWTHMIND_DIFFERENCES.map((diff, index) => (
                <motion.div
                  key={diff.trait}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Box
                    p="md"
                    h="100%"
                    style={{
                      background: "var(--website-muted-bg)",
                      borderRadius: "var(--mantine-radius-md)",
                    }}
                  >
                    <Group gap="xs" mb="xs">
                      <IconCheck
                        size={16}
                        style={{ color: "var(--website-primary)" }}
                      />
                      <Text size="sm" fw={600}>
                        {diff.trait}
                      </Text>
                    </Group>
                    <Text size="xs" c="dimmed">
                      {diff.description}
                    </Text>
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>

            {/* The positioning statement */}
            <Box
              p="lg"
              style={{
                background: "var(--website-card-bg)",
                borderRadius: "var(--mantine-radius-md)",
                textAlign: "center",
              }}
            >
              <Text size="lg" fw={500} mb="md">
                The One-Line Difference
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
                &ldquo;Most tools help you do marketing better.
                <br />
                Growthmind helps you figure out whether your marketing should
                exist at all.&rdquo;
              </Text>
            </Box>
          </Card>
        </FadeInUp>

        {/* Who this is for */}
        <FadeInUp delay={0.6}>
          <Box mt={60}>
            <Text fw={600} ta="center" mb="lg">
              Who Growthmind Is For
            </Text>
            <Grid gutter="md">
              {[
                {
                  title: "Founders Finding PMF",
                  description:
                    "Building something but not sure if people want it yet",
                  searching: '"why isn\'t this working"',
                },
                {
                  title: "Solo Marketers & Fractional CMOs",
                  description:
                    "Managing growth for multiple clients without a growth team behind them",
                  searching: '"what should I prioritize next"',
                },
                {
                  title: "Small Teams Running Experiments",
                  description:
                    "Want the truth about their direction, not confirmation bias",
                  searching: '"are we focused on the right things"',
                },
              ].map((persona, index) => (
                <Grid.Col key={persona.title} span={{ base: 12, md: 4 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <Box
                      p="lg"
                      h="100%"
                      style={{
                        background: "var(--website-card-bg)",
                        borderRadius: "var(--mantine-radius-md)",
                        border: "1px solid var(--website-border)",
                      }}
                    >
                      <Text fw={600} mb="xs">
                        {persona.title}
                      </Text>
                      <Text size="sm" c="dimmed" mb="md">
                        {persona.description}
                      </Text>
                      <Badge variant="light" color="gray" size="sm">
                        Searching: {persona.searching}
                      </Badge>
                    </Box>
                  </motion.div>
                </Grid.Col>
              ))}
            </Grid>
          </Box>
        </FadeInUp>
      </Container>
    </Box>
  );
}

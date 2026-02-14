"use client";

import Link from "next/link";
import {
  IconArrowRight,
  IconBook,
  IconBrain,
  IconBrandLinkedin,
  IconBriefcase,
  IconBulb,
  IconChartBar,
  IconCheck,
  IconChevronRight,
  IconCloud,
  IconCoin,
  IconDeviceAnalytics,
  IconFileText,
  IconFlask,
  IconMessageChatbot,
  IconPlugConnected,
  IconSearch,
  IconTarget,
  IconUserCheck,
  IconVideo,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  List,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import classes from "../website.module.css";

const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Interrogation",
    description:
      "We start by asking the hard questions. Before giving you any advice, the AI challenges your assumptions about your product, market, customers, and stage. This isn't onboarding — it's a stress test for your thinking.",
    details: [
      "20+ deep questions about your business and market",
      "Assumption identification and challenge",
      "Stage diagnosis (idea, validation, or early traction)",
      "Blind spot surfacing — what you're not seeing",
    ],
    icon: IconMessageChatbot,
    color: "orange",
  },
  {
    step: 2,
    title: "Market Research & Diagnosis",
    description:
      "AI analyses your market, competitors, and positioning using live data. The output isn't a generic report — it's a diagnosis specific to your stage and situation, with clear constraints on what's relevant now.",
    details: [
      "Company stage analysis",
      "ICP and pain point discovery",
      "Competitive landscape mapping",
      "Channel opportunity identification",
      "Stage-constrained recommendations",
    ],
    icon: IconSearch,
    color: "cyan",
  },
  {
    step: 3,
    title: "Experiment Design",
    description:
      "Based on your diagnosis, the AI identifies your riskiest assumption and designs a focused experiment to test it. You get a clear hypothesis, success criteria, and a falsifiable prediction — not a vague plan.",
    details: [
      "Riskiest assumption identification",
      "Hypothesis formulation with success criteria",
      "Minimum viable test design",
      "What-would-falsify-this framing",
      "Effort estimates and timeline",
    ],
    icon: IconFlask,
    color: "violet",
  },
  {
    step: 4,
    title: "Test Asset Creation",
    description:
      "The AI generates the specific assets you need to run the experiment — landing pages, outreach sequences, social posts, email drafts — all tailored to your brand voice and ICP. You review and approve everything before it goes anywhere.",
    details: [
      "Landing page copy and structure",
      "Outreach messages and sequences",
      "Social media content",
      "Email campaigns",
      "Human-in-the-loop review queue",
    ],
    icon: IconUserCheck,
    color: "cyan",
  },
  {
    step: 5,
    title: "Measure, Learn, Iterate",
    description:
      "After the experiment runs, the AI helps you interpret results. Did you get signal? What did you learn? Should you double down, iterate, or pivot? Every outcome feeds back into your growth profile, making the next cycle sharper.",
    details: [
      "Result interpretation and signal extraction",
      "Learning capture (what worked, what didn't)",
      "Next experiment recommendation",
      "Growth profile update with new context",
      "Weekly cadence — repeat the cycle",
    ],
    icon: IconBulb,
    color: "orange",
  },
];

const AI_CAPABILITIES = [
  {
    category: "Research & Diagnosis",
    description: "Deep-dive analysis of your market reality",
    icon: IconSearch,
    color: "cyan",
    highlights: [
      {
        name: "Competitive Intelligence",
        purpose: "Maps competitor strategies and finds positioning gaps",
      },
      {
        name: "ICP Discovery",
        purpose: "Identifies and profiles your ideal customers",
      },
      {
        name: "Stage Diagnosis",
        purpose: "Determines your real stage and constrains advice accordingly",
      },
    ],
    summary:
      "Plus brand positioning analysis, pain point extraction, channel opportunity mapping, and industry context",
  },
  {
    category: "Strategy & Experiment Design",
    description: "Convert diagnosis into focused experiments",
    icon: IconTarget,
    color: "violet",
    highlights: [
      {
        name: "Assumption Identifier",
        purpose: "Finds your riskiest assumption to test next",
      },
      {
        name: "Experiment Designer",
        purpose: "Creates falsifiable hypotheses with clear success criteria",
      },
      {
        name: "Stage-Constrained Planner",
        purpose: "Only recommends tactics that work at your actual stage",
      },
    ],
    summary:
      "Plus channel prioritisation, execution planning, and KPI framework generation",
  },
  {
    category: "Test Asset Generation",
    description: "Create the assets needed to run experiments",
    icon: IconFileText,
    color: "orange",
    highlights: [
      {
        name: "Content Drafter",
        purpose: "Landing pages, blog posts, and email sequences",
      },
      {
        name: "Outreach Builder",
        purpose: "Cold outreach, DM sequences, and partnership messages",
      },
      {
        name: "Social Content",
        purpose: "Platform-optimised posts for LinkedIn, Twitter/X, and more",
      },
    ],
    summary:
      "All content is tailored to your brand voice and optimised for your ICP",
  },
  {
    category: "Learning & Insights",
    description: "Extract signal from experiments and compound learnings",
    icon: IconBulb,
    color: "cyan",
    highlights: [
      {
        name: "Result Interpreter",
        purpose: "Separates signal from noise in experiment outcomes",
      },
      {
        name: "Insight Surfacer",
        purpose: "Identifies patterns across experiments you might miss",
      },
      {
        name: "Assumption Tracker",
        purpose: "Tracks which assumptions have been validated or falsified",
      },
    ],
    summary:
      "Every experiment feeds back into your growth profile — recommendations get sharper over time",
  },
];

const INTEGRATIONS = [
  {
    category: "Analytics",
    icon: IconChartBar,
    platforms: ["Google Analytics 4", "Plausible"],
    description:
      "Connect your analytics so experiment results are grounded in real traffic data",
  },
  {
    category: "Product Analytics",
    icon: IconDeviceAnalytics,
    platforms: ["Mixpanel"],
    description:
      "User behaviour data shapes experiment design and targeting",
  },
  {
    category: "Revenue",
    icon: IconCoin,
    platforms: ["Stripe"],
    description:
      "Revenue data helps validate whether experiments are moving the needle",
  },
  {
    category: "Email",
    icon: IconFileText,
    platforms: ["SendGrid"],
    description: "Send outreach and email experiments directly",
  },
  {
    category: "CMS",
    icon: IconCloud,
    platforms: ["Webflow", "WordPress"],
    description: "Publish experiment landing pages and content",
  },
  {
    category: "Meetings",
    icon: IconVideo,
    platforms: ["Zoom", "Fireflies", "Fathom", "Loom"],
    description:
      "Extract customer insights from calls to inform experiment design",
  },
  {
    category: "Social",
    icon: IconBrandLinkedin,
    platforms: ["LinkedIn", "Twitter/X"],
    description: "Run social experiments and track engagement",
  },
  {
    category: "Team",
    icon: IconBriefcase,
    platforms: ["Slack"],
    description:
      "Get experiment updates and review notifications where you work",
  },
];

const CONCEPTS = [
  {
    term: "Interrogation-First AI",
    definition:
      "Our core philosophy: AI should challenge your assumptions before giving advice. Unlike generic AI tools that accept whatever you tell them, Growthmind questions whether you're asking the right thing — because bad questions are more dangerous than bad answers.",
    why: "Eliminates the 'garbage in, confident garbage out' problem of most AI tools.",
  },
  {
    term: "Stage Diagnosis",
    definition:
      "Before recommending any tactic, the AI determines your actual stage — idea, validation, or early traction. Each stage has fundamentally different priorities, and applying the wrong tactics wastes months. 80% of growth teams misdiagnose their stage.",
    why: "Stop wasting months on the wrong growth tactics for your stage.",
  },
  {
    term: "Weekly Experiment Cycle",
    definition:
      "A repeating loop of hypothesis, test, learn, iterate. Each week you identify your riskiest assumption, design a minimum viable test, run it, collect signal, and decide next steps. The cadence compounds learning over time.",
    why: "Fast learning loops beat long plans. Find what works before you scale.",
  },
  {
    term: "Human-in-the-Loop",
    definition:
      "AI proposes experiments, generates test assets, and recommends decisions — but nothing happens without your approval. You review, edit, and approve everything. The AI does the research and heavy lifting; you make the calls.",
    why: "Maintains quality control without bottlenecking execution.",
  },
  {
    term: "Growth Profile",
    definition:
      "Your business context persisted across sessions — your stage, brand voice, ICP, past experiments, validated assumptions, and failed hypotheses. The AI references this for every recommendation, so advice compounds instead of resetting.",
    why: "No more starting from scratch every time. The system remembers and learns.",
  },
  {
    term: "Reality-Anchored Strategy",
    definition:
      "Every recommendation combines your unique business context with live market data. No hallucinated advice. No generic playbooks. If the AI doesn't have evidence, it tells you instead of guessing.",
    why: "Growth plans grounded in what's actually true, not wishful thinking.",
  },
];

export function DocsClient() {
  return (
    <Box className={classes.root}>
      <Header />

      {/* Hero Section */}
      <Box
        className={classes.hero}
        style={{ minHeight: "400px", paddingTop: "120px" }}
      >
        <div className={classes.gridBg} />
        <div className={classes.floatingOrb1} />
        <div className={classes.floatingOrb2} />

        <Container size="lg" className={classes.heroContent}>
          <Stack align="center" gap="xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge size="lg" variant="light" color="cyan" mb="md">
                Documentation
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Title order={1} ta="center" className={classes.heroTitle}>
                How{" "}
                <Text
                  component="span"
                  inherit
                  style={{
                    background:
                      "linear-gradient(45deg, var(--website-primary), var(--website-secondary))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Growthmind
                </Text>{" "}
                Works
              </Title>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Text size="xl" c="dimmed" ta="center" maw={700}>
                Interrogation-first AI that diagnoses your stage, challenges
                assumptions, and runs focused weekly experiments.
              </Text>
            </motion.div>
          </Stack>
        </Container>
      </Box>

      {/* Quick Navigation */}
      <Box py={40} style={{ background: "var(--website-muted-bg)" }}>
        <Container size="lg">
          <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
            {[
              {
                label: "The Experiment Loop",
                href: "#how-it-works",
                icon: IconFlask,
              },
              {
                label: "AI Capabilities",
                href: "#capabilities",
                icon: IconBrain,
              },
              {
                label: "Integrations",
                href: "#integrations",
                icon: IconPlugConnected,
              },
              { label: "Key Concepts", href: "#concepts", icon: IconBook },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Anchor href={item.href} underline="never">
                  <Paper
                    className={classes.featureCard}
                    p="md"
                    style={{ cursor: "pointer" }}
                  >
                    <Group gap="sm" wrap="nowrap">
                      <ThemeIcon
                        size={36}
                        radius="md"
                        variant="light"
                        color="cyan"
                      >
                        <item.icon size={18} />
                      </ThemeIcon>
                      <Text fw={500} size="sm">
                        {item.label}
                      </Text>
                      <IconChevronRight
                        size={16}
                        style={{ marginLeft: "auto", opacity: 0.5 }}
                      />
                    </Group>
                  </Paper>
                </Anchor>
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box py={80} id="how-it-works">
        <Container size="lg">
          <Stack align="center" mb={60}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={2} ta="center">
                The Weekly{" "}
                <Text
                  component="span"
                  inherit
                  style={{
                    background:
                      "linear-gradient(45deg, var(--website-primary), var(--website-secondary))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Experiment Loop
                </Text>
              </Title>
            </motion.div>
            <Text size="lg" c="dimmed" ta="center" maw={600}>
              From first question to validated learning — here&apos;s exactly
              what happens each week
            </Text>
          </Stack>

          <Stack gap="xl">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={classes.featureCard} padding="xl">
                  <Grid gutter="xl" align="center">
                    <Grid.Col span={{ base: 12, md: 1 }}>
                      <ThemeIcon
                        size={60}
                        radius="xl"
                        variant="light"
                        color={step.color}
                        style={{ margin: "0 auto" }}
                      >
                        <Text fw={700} size="xl">
                          {step.step}
                        </Text>
                      </ThemeIcon>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 11 }}>
                      <Group gap="md" mb="md" wrap="nowrap">
                        <ThemeIcon
                          size={40}
                          radius="md"
                          variant="light"
                          color={step.color}
                        >
                          <step.icon size={20} />
                        </ThemeIcon>
                        <Title order={3}>{step.title}</Title>
                      </Group>
                      <Text c="dimmed" mb="md">
                        {step.description}
                      </Text>
                      <List
                        spacing="xs"
                        size="sm"
                        icon={
                          <ThemeIcon
                            size={20}
                            radius="xl"
                            variant="light"
                            color={step.color}
                          >
                            <IconCheck size={12} />
                          </ThemeIcon>
                        }
                      >
                        {step.details.map((detail) => (
                          <List.Item key={detail}>{detail}</List.Item>
                        ))}
                      </List>
                    </Grid.Col>
                  </Grid>
                </Card>
              </motion.div>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* AI Capabilities Directory */}
      <Box
        py={80}
        id="capabilities"
        style={{ background: "var(--website-muted-bg)" }}
      >
        <Container size="lg">
          <Stack align="center" mb={60}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={2} ta="center">
                Specialized{" "}
                <Text
                  component="span"
                  inherit
                  style={{
                    background:
                      "linear-gradient(45deg, var(--website-primary), var(--website-secondary))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  AI Capabilities
                </Text>
              </Title>
            </motion.div>
            <Text size="lg" c="dimmed" ta="center" maw={600}>
              Not one generic AI — specialised capabilities for each stage of
              the experiment loop
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            {AI_CAPABILITIES.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <Card className={classes.featureCard} padding="xl" h="100%">
                  <Stack gap="md" h="100%">
                    <Group gap="md">
                      <ThemeIcon
                        size={40}
                        radius="md"
                        variant="light"
                        color={category.color}
                      >
                        <category.icon size={20} />
                      </ThemeIcon>
                      <div>
                        <Text fw={600}>{category.category}</Text>
                        <Text size="sm" c="dimmed">
                          {category.description}
                        </Text>
                      </div>
                    </Group>

                    <Divider />

                    <Stack gap="sm" style={{ flex: 1 }}>
                      {category.highlights.map((item) => (
                        <Group
                          key={item.name}
                          gap="xs"
                          wrap="nowrap"
                          align="flex-start"
                        >
                          <ThemeIcon
                            size={24}
                            radius="sm"
                            variant="light"
                            color={category.color}
                          >
                            <IconCheck size={14} />
                          </ThemeIcon>
                          <div>
                            <Text size="sm" fw={500}>
                              {item.name}
                            </Text>
                            <Text size="xs" c="dimmed">
                              {item.purpose}
                            </Text>
                          </div>
                        </Group>
                      ))}
                    </Stack>

                    {category.summary && (
                      <Text size="xs" c="dimmed" fs="italic">
                        {category.summary}
                      </Text>
                    )}
                  </Stack>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Integrations Section */}
      <Box py={80} id="integrations">
        <Container size="lg">
          <Stack align="center" mb={60}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={2} ta="center">
                <Text
                  component="span"
                  inherit
                  style={{
                    background:
                      "linear-gradient(45deg, var(--website-primary), var(--website-secondary))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Integrations
                </Text>{" "}
                That Power Experiments
              </Title>
            </motion.div>
            <Text size="lg" c="dimmed" ta="center" maw={600}>
              Connect your existing tools — experiments are grounded in real
              data, not guesses
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
            {INTEGRATIONS.map((integration, index) => (
              <motion.div
                key={integration.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={classes.featureCard} padding="lg" h="100%">
                  <Stack gap="sm" h="100%">
                    <Group gap="sm">
                      <ThemeIcon
                        size={36}
                        radius="md"
                        variant="light"
                        color="cyan"
                      >
                        <integration.icon size={18} />
                      </ThemeIcon>
                      <Text fw={600}>{integration.category}</Text>
                    </Group>
                    <Text size="sm" c="dimmed" style={{ flex: 1 }}>
                      {integration.description}
                    </Text>
                    <Group gap="xs" wrap="wrap">
                      {integration.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" size="sm">
                          {platform}
                        </Badge>
                      ))}
                    </Group>
                  </Stack>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Concepts Glossary */}
      <Box
        py={80}
        id="concepts"
        style={{ background: "var(--website-muted-bg)" }}
      >
        <Container size="lg">
          <Stack align="center" mb={60}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={2} ta="center">
                Key{" "}
                <Text
                  component="span"
                  inherit
                  style={{
                    background:
                      "linear-gradient(45deg, var(--website-primary), var(--website-secondary))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Concepts
                </Text>
              </Title>
            </motion.div>
            <Text size="lg" c="dimmed" ta="center" maw={600}>
              Understand the methodology behind our approach
            </Text>
          </Stack>

          <Stack gap="lg">
            {CONCEPTS.map((concept, index) => (
              <motion.div
                key={concept.term}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={classes.featureCard} padding="xl">
                  <Group gap="md" mb="md" wrap="nowrap" align="flex-start">
                    <ThemeIcon
                      size={40}
                      radius="md"
                      variant="light"
                      color="cyan"
                    >
                      <IconBulb size={20} />
                    </ThemeIcon>
                    <div>
                      <Title order={4} mb={4}>
                        {concept.term}
                      </Title>
                      <Text c="dimmed">{concept.definition}</Text>
                    </div>
                  </Group>
                  <Paper
                    p="sm"
                    style={{
                      background: "rgba(0, 217, 255, 0.05)",
                      borderLeft: "3px solid var(--website-primary)",
                    }}
                  >
                    <Group gap="xs" wrap="nowrap">
                      <Text size="sm" fw={500} c="cyan">
                        Why it matters:
                      </Text>
                      <Text size="sm">{concept.why}</Text>
                    </Group>
                  </Paper>
                </Card>
              </motion.div>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={100}>
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card
              padding={60}
              style={{
                background:
                  "linear-gradient(135deg, var(--website-card-bg) 0%, rgba(0, 217, 255, 0.05) 100%)",
                border: "1px solid var(--website-primary)",
                textAlign: "center",
              }}
            >
              <Stack align="center" gap="xl">
                <ThemeIcon size={64} radius="xl" className={classes.logoIcon}>
                  <IconBrain size={32} />
                </ThemeIcon>

                <Title order={2}>Ready to Run Your First Experiment?</Title>

                <Text size="lg" c="dimmed" maw={500}>
                  Start with a free assessment. Get your stage diagnosis and
                  first experiment plan — no credit card required.
                </Text>

                <Group gap="md">
                  <Button
                    component="a"
                    href="/diagnosis"
                    size="lg"
                    className={classes.ctaButton}
                    rightSection={<IconArrowRight size={18} />}
                  >
                    Start Free
                  </Button>
                  <Button
                    component={Link}
                    href="/how-it-works"
                    size="lg"
                    variant="outline"
                    className={classes.outlineButton}
                  >
                    How It Works
                  </Button>
                </Group>
              </Stack>
            </Card>
          </motion.div>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

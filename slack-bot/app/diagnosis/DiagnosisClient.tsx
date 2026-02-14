"use client";

import Link from "next/link";
import {
  IconArrowRight,
  IconBrain,
  IconBriefcase,
  IconChartBar,
  IconCheck,
  IconClock,
  IconFlask,
  IconMap,
  IconRocket,
  IconScale,
  IconSend,
  IconSpeakerphone,
  IconSpy,
  IconUser,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  Accordion,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import {
  FadeInUp,
  GradientText,
} from "../components/animations";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SectionHeader } from "../components/SectionHeader";
import { SubpageHero } from "../components/SubpageHero";
import { DiagnosisForm } from "../components/forms/DiagnosisForm";
import {
  CASE_STUDIES,
  DIAGNOSIS_SECTIONS,
  DIAGNOSIS_FAQ,
  DIAGNOSIS_STATS,
} from "../data/case-studies";
import classes from "../website.module.css";

// Helper to map section titles to icons
const getSectionIcon = (title: string) => {
  if (title.includes("Stage")) return <IconChartBar size={32} />;
  if (title.includes("Market")) return <IconSpy size={32} />;
  if (title.includes("Strategic")) return <IconScale size={32} />;
  if (title.includes("Experiments")) return <IconFlask size={32} />;
  if (title.includes("Content")) return <IconSpeakerphone size={32} />;
  if (title.includes("Founder")) return <IconUser size={32} />;
  if (title.includes("Roadmap")) return <IconMap size={32} />;
  if (title.includes("Domain")) return <IconBriefcase size={32} />;
  return <IconCheck size={32} />;
};

export function DiagnosisClient() {
  return (
    <Box className={classes.root}>
      <Header />

      {/* Hero */}
      <SubpageHero
        badge={{
          text: "30 Minutes • Comprehensive • $10",
          icon: <IconClock size={14} />,
        }}
        title={
          <>
            Your Startup,{" "}
            <GradientText animate>Decoded</GradientText>
          </>
        }
        subtitle="Stop guessing. Get a comprehensive breakdown of your market demand, competitive gaps, and growth potential. No fluff, just data-backed direction in 30 minutes."
        actions={
          <Group>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                component="a"
                href="#get-diagnosed"
                size="lg"
                className={classes.ctaButton}
                rightSection={<IconArrowRight size={18} />}
              >
                Get Diagnosed — $10
              </Button>
            </motion.div>
            <Button
              component={Link}
              href="/case-studies"
              size="lg"
              variant="outline"
              className={classes.outlineButton}
            >
              See Examples
            </Button>
          </Group>
        }
        minHeight={550}
      />

      {/* What You Get */}
      <Box py={80}>
        <Container size="lg">
          <SectionHeader
            title="What You"
            highlightedText="Get"
            subtitle="A complete strategic assessment covering every dimension of your startup's growth potential"
          />

          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
            {DIAGNOSIS_SECTIONS.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                whileHover={{
                  y: -4,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <Card
                  className={classes.featureCard}
                  padding="lg"
                  style={{ height: "100%" }}
                  data-color="cyan"
                >
                  <Stack gap="sm">
                    <ThemeIcon
                      size={50}
                      radius="md"
                      variant="light"
                      color="cyan"
                      style={{ background: "rgba(0, 217, 255, 0.1)" }}
                    >
                      {getSectionIcon(section.title)}
                    </ThemeIcon>
                    <Text fw={600} size="sm">
                      {section.title}
                    </Text>
                    <Text size="xs" c="dimmed" lh={1.5}>
                      {section.description}
                    </Text>
                  </Stack>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* How It Works */}
      <Box py={80} style={{ background: "var(--website-muted-bg)" }}>
        <Container size="md">
          <SectionHeader
            title="Four Steps to"
            highlightedText="Clarity"
            subtitle="No meetings. No sales calls. Submit your URL and we'll have questions for you within 10 minutes."
          />

          <Stack gap={0}>
            {[
              {
                step: "1",
                icon: IconSend,
                title: "Submit Your URL",
                desc: "Tell us your company name, website, and stage. Within 10 minutes, our 18 AI agents build a deep profile from every public data point available.",
              },
              {
                step: "2",
                icon: IconBrain,
                title: "Answer 5-10 Questions",
                desc: "We'll send you targeted questions that only you can answer — revenue, pricing, what's working, what isn't. The things no amount of research can uncover.",
              },
              {
                step: "3",
                icon: IconFlask,
                title: "We Go Deep",
                desc: "Your answers unlock the full analysis. We stress-test your value proposition against real market demand, competitor positioning, and channel saturation.",
              },
              {
                step: "4",
                icon: IconRocket,
                title: "Get Your Report",
                desc: "Receive your Demand Score, a definitive Go/No-Go verdict, growth experiments, and a 90-day roadmap — typically within 30 minutes of answering.",
              },
            ].map((item, index) => (
              <FadeInUp key={item.step} delay={index * 0.1}>
                <Group gap="xl" align="flex-start" mb={index < 3 ? "xl" : 0}>
                  <Stack gap={0} align="center">
                    <div className={classes.stepNumber}>{item.step}</div>
                    {index < 3 && <div className={classes.stepConnector} />}
                  </Stack>
                  <Box pb="md">
                    <Group gap="sm" mb="xs">
                      <ThemeIcon size={28} radius="md" variant="light" color="cyan">
                        <item.icon size={16} />
                      </ThemeIcon>
                      <Text fw={600}>{item.title}</Text>
                    </Group>
                    <Text size="sm" c="dimmed" maw={500}>
                      {item.desc}
                    </Text>
                  </Box>
                </Group>
              </FadeInUp>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Case Study Snippets */}
      <Box py={80}>
        <Container size="lg">
          <SectionHeader
            title="Real Companies,"
            highlightedText="Real Results"
            subtitle="See actual diagnoses, demand scores, and strategic verdicts."
          />

          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
            {CASE_STUDIES.map((study, index) => {
              const verdictColor =
                study.verdict === "GO"
                  ? "green"
                  : study.verdict === "CONDITIONAL"
                    ? "yellow"
                    : "red";

              return (
                <motion.div
                  key={study.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={classes.featureCard} padding="lg">
                    <Stack gap="sm">
                      <Group justify="space-between" align="flex-start">
                        <Box>
                          <Text fw={600} size="md">
                            {study.company}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {study.industry}
                          </Text>
                        </Box>
                        <Badge
                          size="sm"
                          variant="filled"
                          color={verdictColor}
                        >
                          {study.verdict}
                        </Badge>
                      </Group>

                      {/* Title Quote */}
                      <Text
                        size="sm"
                        fw={500}
                        c="dimmed"
                        lh={1.4}
                        style={{ fontStyle: "italic" }}
                      >
                        &ldquo;{study.title}&rdquo;
                      </Text>

                      <Group gap="xs" mt="auto">
                        <Badge size="xs" variant="light" color="cyan">
                          {study.industryTag}
                        </Badge>
                        <Badge size="xs" variant="outline" color="gray">
                          Score: {study.demandScore}
                        </Badge>
                      </Group>
                    </Stack>
                  </Card>
                </motion.div>
              );
            })}
          </SimpleGrid>

          <FadeInUp delay={0.3}>
            <Group justify="center" mt="xl">
              <Button
                component={Link}
                href="/case-studies"
                variant="outline"
                className={classes.outlineButton}
                rightSection={<IconArrowRight size={16} />}
              >
                See all case studies
              </Button>
            </Group>
          </FadeInUp>
        </Container>
      </Box>

      {/* By The Numbers */}
      <Box py={80} style={{ background: "var(--website-muted-bg)" }}>
        <Container size="md">
          <SectionHeader
            title="By The"
            highlightedText="Numbers"
          />

          <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="xl">
            {DIAGNOSIS_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
              >
                <Stack align="center" gap={4}>
                  <Text
                    size="2.5rem"
                    fw={700}
                    style={{ color: "var(--website-primary)" }}
                    lh={1}
                  >
                    {stat.value}
                  </Text>
                  <Text size="sm" c="dimmed" ta="center">
                    {stat.label}
                  </Text>
                </Stack>
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* FAQ */}
      <Box py={80}>
        <Container size="md">
          <SectionHeader
            title="Frequently Asked"
            highlightedText="Questions"
          />

          <Accordion
            variant="separated"
            styles={{
              item: {
                background: "var(--website-card-bg)",
                border: "1px solid var(--website-border)",
              },
              label: {
                fontWeight: 500,
              },
            }}
          >
            {DIAGNOSIS_FAQ.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Accordion.Item value={item.question}>
                  <Accordion.Control>{item.question}</Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm" c="dimmed">
                      {item.answer}
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion>
        </Container>
      </Box>

      {/* Final CTA with Form */}
      <Box
        id="get-diagnosed"
        py={100}
        style={{ background: "var(--website-muted-bg)" }}
      >
        <Container size="sm">
          <FadeInUp>
            <Card
              padding="xl"
              style={{
                background: "var(--website-card-bg)",
                border: "1px solid var(--website-primary)",
                boxShadow: "0 0 40px rgba(0, 217, 255, 0.1)",
              }}
            >
              <DiagnosisForm />
            </Card>
          </FadeInUp>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

"use client";

import Link from "next/link";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { FadeInUp, GradientText } from "../components/animations";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SectionHeader } from "../components/SectionHeader";
import { SubpageHero } from "../components/SubpageHero";
import { WebsiteCTA } from "../components/WebsiteCTA";
import { CORE_FEATURES, DIFFERENTIATORS } from "../data/features";
import classes from "../website.module.css";

export function ProductClient() {
  return (
    <Box className={classes.root}>
      <Header />

      {/* Hero Section */}
      <SubpageHero
        badge={{ text: "Interrogation-First AI" }}
        title={
          <>
            Know What to Validate. <br />
            <GradientText animate>Stop Guessing.</GradientText>
          </>
        }
        subtitle="Growthmind diagnoses your stage, challenges your assumptions, and designs focused weekly experiments — whether you're a founder, a solo marketer, or a small growth team."
        actions={
          <Group gap="md">
            <Button
              component={Link}
              href="/diagnosis"
              size="lg"
              className={classes.ctaButton}
              rightSection={<IconArrowRight size={18} />}
            >
              Get Free Strategy
            </Button>
            <Button
              component={Link}
              href="/blogs"
              size="lg"
              variant="outline"
              className={classes.outlineButton}
            >
              Read Our Blog
            </Button>
          </Group>
        }
      />

      {/* Key Differentiators */}
      <Box py={60} style={{ background: "var(--website-muted-bg)" }}>
        <Container size="xl">
          <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing="lg">
            {DIFFERENTIATORS.map((diff, index) => (
              <motion.div
                key={diff.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Stack align="center" gap="xs" ta="center">
                  <ThemeIcon size={48} radius="md" variant="light" color="cyan">
                    <diff.icon size={24} />
                  </ThemeIcon>
                  <Text fw={600} size="sm">
                    {diff.title}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {diff.description}
                  </Text>
                </Stack>
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* The Loop */}
      <Box py={80}>
        <Container size="lg">
          <SectionHeader
            title={
              <>
                The Experiment <GradientText animate>Loop</GradientText>
              </>
            }
            subtitle="One repeating cycle: interrogate, diagnose, experiment, learn. Every week you get closer to what actually works."
          />

          <FadeInUp delay={0.1}>
            <Box
              mb={60}
              p="xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0, 217, 255, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)",
                border: "1px solid var(--website-border)",
                borderRadius: "var(--mantine-radius-lg)",
                textAlign: "center",
              }}
            >
              <Text size="lg" c="dimmed" maw={700} mx="auto" lh={1.8}>
                You answer hard questions about your business. AI diagnoses your
                real stage, identifies your riskiest assumption, and designs one
                focused experiment. You approve. It builds the test assets. You
                run it. Results come in. AI interprets them and picks the next
                experiment.{" "}
                <Text span fw={600} style={{ color: "var(--website-primary)" }}>
                  Repeat weekly.
                </Text>
              </Text>
            </Box>
          </FadeInUp>
        </Container>
      </Box>

      {/* Core Features Grid */}
      <Box py={80} style={{ background: "var(--website-muted-bg)" }}>
        <Container size="xl">
          <SectionHeader
            title={
              <>
                What Powers the <GradientText animate>Loop</GradientText>
              </>
            }
            subtitle="Every capability exists to serve one goal: helping you run better experiments faster"
          />

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {CORE_FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                style={{ height: "100%" }}
              >
                <Card
                  className={classes.featureCard}
                  data-color={feature.color}
                  padding="xl"
                  h="100%"
                >
                  <Stack gap="md" h="100%">
                    <Group gap="sm" wrap="nowrap" align="flex-start">
                      <ThemeIcon
                        size={40}
                        radius="md"
                        variant="light"
                        color={feature.color}
                        style={{ flexShrink: 0 }}
                      >
                        <feature.icon size={20} />
                      </ThemeIcon>
                      <Title order={4} style={{ lineHeight: 1.3 }}>
                        {feature.title}
                      </Title>
                    </Group>

                    <Text size="sm" c="dimmed" style={{ flex: 1 }}>
                      {feature.description}
                    </Text>

                    <Group gap="xs" mt="auto" wrap="nowrap" align="flex-start">
                      <IconCheck
                        size={16}
                        color="var(--website-primary)"
                        style={{ flexShrink: 0, marginTop: 2 }}
                      />
                      <Text size="sm" fw={500} c="cyan">
                        {feature.benefit}
                      </Text>
                    </Group>
                  </Stack>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <WebsiteCTA
        title="Ready to Run Your First Experiment?"
        subtitle="Stop guessing. Get your free growth assessment and run a focused experiment this week."
        primaryAction={{
          label: "Start Free",
          href: "/diagnosis",
        }}
        secondaryAction={{ label: "How It Works", href: "/how-it-works" }}
      />

      <Footer />
    </Box>
  );
}

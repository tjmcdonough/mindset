"use client";

import { Box, Container, Stack, Text, Title } from "@mantine/core";
import { FadeInUp, GradientText } from "../components/animations";
import { Footer } from "../components/Footer";
import { FounderStorySection } from "../components/FounderStorySection";
import { Header } from "../components/Header";
import { TrustSection } from "../components/TrustSection";
import { WebsiteCTA } from "../components/WebsiteCTA";
import classes from "../website.module.css";

function HowItWorksHero() {
  return (
    <Box
      component="section"
      className={classes.hero}
      style={{ minHeight: "60vh" }}
    >
      <Container size="md" className={classes.heroContent}>
        <Stack align="center" gap="lg">
          <FadeInUp>
            <Title order={1} ta="center" className={classes.heroTitle}>
              How <GradientText animate>Growthmind</GradientText> Works
            </Title>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <Text size="xl" c="dimmed" ta="center" maw={700}>
              We help founders, marketers, and small teams rigorously assess
              what&apos;s working (and what isn&apos;t), then run focused
              experiments to find what actually resonates.
            </Text>
          </FadeInUp>
        </Stack>
      </Container>
    </Box>
  );
}

function MissionSection() {
  return (
    <Box component="section" py={100}>
      <Container size="md">
        <Stack gap="xl">
          <FadeInUp>
            <Title order={2} mb="md">
              The Mission
            </Title>
            <Text size="lg" c="dimmed" mb="lg">
              Most businesses fail at growth because they scale before
              they&apos;re ready. They pour money into marketing channels that
              don&apos;t convert, build features nobody wants, and burn through
              budget chasing vanity metrics.
            </Text>
            <Text size="lg" c="dimmed">
              Growthmind exists to change that. We work with founders,
              marketers, and small teams to challenge their assumptions,
              diagnose their real stage, and run focused weekly experiments that
              produce real market signal. Our mission is simple: help growth
              teams stop guessing and start validating.
            </Text>
          </FadeInUp>
        </Stack>
      </Container>
    </Box>
  );
}

export function HowItWorksClient() {
  return (
    <Box className={classes.wrapper}>
      <Header />
      <main>
        <HowItWorksHero />
        <TrustSection />
        <MissionSection />
        <FounderStorySection />
        <WebsiteCTA
          title="Ready to Find What Actually Works?"
          subtitle="Stop guessing. Run your first focused experiment this week."
          primaryAction={{
            label: "Start Free",
            href: "/diagnosis",
          }}
          secondaryAction={{ label: "Read the Docs", href: "/docs" }}
        />
      </main>
      <Footer />
    </Box>
  );
}

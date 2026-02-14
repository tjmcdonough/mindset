"use client";

import { Box, Container, Stack, Text, Title } from "@mantine/core";
import { FadeInUp, GradientText } from "../components/animations";
import { Footer } from "../components/Footer";
import { FounderStorySection } from "../components/FounderStorySection";
import { Header } from "../components/Header";
import { TrustSection } from "../components/TrustSection";
import { WebsiteCTA } from "../components/WebsiteCTA";
import classes from "../website.module.css";

function AboutHero() {
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
              About <GradientText animate>Growthmind</GradientText>
            </Title>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <Text size="xl" c="dimmed" ta="center" maw={700}>
              We help founders, solo marketers, and small teams stop guessing
              and start validating — with clarity on what to do next.
            </Text>
          </FadeInUp>
        </Stack>
      </Container>
    </Box>
  );
}

function OurStorySection() {
  return (
    <Box component="section" py={100}>
      <Container size="md">
        <Stack gap="xl">
          <FadeInUp>
            <Title order={2} mb="md">
              Our Story
            </Title>
            <Text size="lg" c="dimmed" mb="lg">
              Growthmind was born from a simple observation: the best products
              don&apos;t always win. Too many brilliant teams build incredible
              technology only to watch it fail because they couldn&apos;t figure
              out what to validate next.
            </Text>
            <Text size="lg" c="dimmed">
              We&apos;ve been there. We&apos;ve spent months building things
              nobody asked for, burned money on agencies that guessed, and
              tried every tactic on Reddit. That experience
              taught us that growth isn&apos;t about tactics or shortcuts —
              it&apos;s about asking the right questions, diagnosing your real
              stage, and running focused experiments that give you signal.
            </Text>
          </FadeInUp>
        </Stack>
      </Container>
    </Box>
  );
}

function OurApproachSection() {
  return (
    <Box component="section" py={100} className={classes.altSection}>
      <Container size="md">
        <Stack gap="xl">
          <FadeInUp>
            <Title order={2} mb="md">
              Our Approach
            </Title>
            <Text size="lg" c="dimmed" mb="lg">
              We don&apos;t believe in one-size-fits-all playbooks. Every
              business is different, and what works for a B2B SaaS company
              won&apos;t work for a consumer marketplace.
            </Text>
            <Text size="lg" c="dimmed">
              That&apos;s why we start with interrogation — deep questions that
              challenge your assumptions and surface blind spots. Then we
              diagnose your actual stage and constrain advice to only what works
              there. Every week, you run one focused experiment designed to test
              your riskiest assumption. The result is clarity, not more noise.
            </Text>
          </FadeInUp>
        </Stack>
      </Container>
    </Box>
  );
}

/**
 * About page client component.
 * Displays company information, story, and team.
 */
export function AboutClient() {
  return (
    <Box className={classes.wrapper}>
      <Header />
      <main>
        <AboutHero />
        <TrustSection />
        <OurStorySection />
        <OurApproachSection />
        <FounderStorySection />
        <WebsiteCTA
          title="Ready to find clarity?"
          subtitle="Get your free assessment and see what you should actually be working on."
          primaryAction={{
            label: "Start Free",
            href: "/diagnosis",
          }}
          secondaryAction={{ label: "Contact Us", href: "/contact" }}
        />
      </main>
      <Footer />
    </Box>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  IconArrowRight,
  IconEye,
  IconBrain,
  IconTarget,
  IconCalendar,
  IconQuote,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { FadeInUp, GradientText } from "../components/animations";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SectionHeader } from "../components/SectionHeader";
import classes from "../website.module.css";

const MIRROR_QUOTES = [
  {
    quote:
      "You're building a growth tool while avoiding growth.",
    tag: "B2B SaaS • Growth Tools",
  },
  {
    quote:
      "A brilliant product that nobody knows exists is a failed business.",
    tag: "Consumer • Creative Tools",
  },
  {
    quote:
      "You've got Boeing on the customer list and no idea how to get the next 10 deals.",
    tag: "B2B SaaS • Manufacturing",
  },
];

const MIRROR_FEATURES = [
  {
    icon: IconEye,
    title: "Blind Spot Detection",
    description:
      "Cognitive biases you can't see from inside your own company. We surface the patterns you're too close to notice.",
  },
  {
    icon: IconBrain,
    title: "The Hard Question",
    description:
      "The one thing you're avoiding. Every founder has it. We find it and put it in front of you.",
  },
  {
    icon: IconTarget,
    title: "Reality Check",
    description:
      "Where you think you are vs where you actually are. The gap between your narrative and the market's reality.",
  },
  {
    icon: IconCalendar,
    title: "What To Do Monday",
    description:
      "One concrete action for next week. Not a 90-day roadmap — just the single highest-leverage move right now.",
  },
];

function UrlInputSection({
  url,
  setUrl,
  onSubmit,
  loading,
  autoFocus,
}: {
  url: string;
  setUrl: (v: string) => void;
  onSubmit: () => void;
  loading: boolean;
  autoFocus?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      // Small delay to ensure animation/mounting is complete
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  return (
    <Stack gap="xs" align="center" w="100%" maw={520}>
      <Group w="100%" gap="xs" wrap="nowrap">
        <TextInput
          ref={inputRef}
          placeholder="https://yourcompany.com"
          value={url}
          onChange={(e) => setUrl(e.currentTarget.value)}
          size="lg"
          style={{ flex: 1 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmit();
          }}
          styles={{
            input: {
              background: "var(--website-card-bg)",
              border: "1px solid var(--website-border)",
              color: "var(--website-foreground)",
            },
          }}
        />
        <Button
          size="lg"
          className={classes.ctaButton}
          onClick={onSubmit}
          loading={loading}
          rightSection={<IconArrowRight size={18} />}
        >
          Get My Mirror
        </Button>
      </Group>
      <Text size="sm" c="dimmed">
        No payment. Just truth.
      </Text>
    </Stack>
  );
}

export function FounderMirrorClient() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    if (!url.trim()) return;
    setLoading(true);
    // Navigate to results page with URL param
    const encoded = encodeURIComponent(
      url.startsWith("http") ? url : `https://${url}`,
    );
    router.push(`/founder-mirror/results?url=${encoded}`);
  };

  return (
    <Box className={classes.root}>
      <Header />
      <main>
        {/* Hero */}
        <Box className={classes.hero} style={{ minHeight: 700, paddingTop: "120px" }}>
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
                <Badge size="lg" variant="light" color="cyan">
                  Free • 60 Seconds • No Signup Required
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Title order={1} ta="center" className={classes.heroTitle}>
                  Your Founder{" "}
                  <GradientText animate>Mirror</GradientText>
                </Title>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Text size="xl" c="dimmed" ta="center" maw={650}>
                  Enter your URL for instant insights. Answer 5 questions to
                  unlock the truths only you can reveal.
                </Text>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ width: "100%", display: "flex", justifyContent: "center" }}
              >
                <UrlInputSection
                  url={url}
                  setUrl={setUrl}
                  onSubmit={handleSubmit}
                  loading={loading}
                  autoFocus={true}
                />
              </motion.div>
            </Stack>
          </Container>
        </Box>

        {/* Social Proof */}
        <Box py={80} style={{ background: "var(--website-muted-bg)" }}>
          <Container size="lg">
            <SectionHeader
              title={
                <>
                  Built on the Same System That{" "}
                  <GradientText animate>Diagnosed 9+ Startups</GradientText>
                </>
              }
              subtitle="Real uncomfortable truths from real diagnoses"
            />

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
              {MIRROR_QUOTES.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={classes.featureCard}
                    padding="xl"
                    data-color="cyan"
                    style={{ height: "100%" }}
                  >
                    <Stack gap="md">
                      <ThemeIcon
                        size={36}
                        radius="md"
                        variant="light"
                        color="cyan"
                        style={{ background: "rgba(0, 217, 255, 0.1)" }}
                      >
                        <IconQuote size={20} />
                      </ThemeIcon>
                      <Text
                        size="lg"
                        fw={600}
                        lh={1.4}
                        style={{ fontStyle: "italic" }}
                      >
                        &ldquo;{item.quote}&rdquo;
                      </Text>
                      <Badge size="sm" variant="light" color="gray">
                        {item.tag}
                      </Badge>
                    </Stack>
                  </Card>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* What You'll See */}
        <Box py={80}>
          <Container size="lg">
            <SectionHeader
              title="What You'll"
              highlightedText="See"
              subtitle="Four dimensions of uncomfortable clarity, delivered in 60 seconds"
            />

            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
              {MIRROR_FEATURES.map((feature, index) => (
                <motion.div
                  key={feature.title}
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
                    data-color="cyan"
                    style={{ height: "100%" }}
                  >
                    <Stack gap="sm">
                      <ThemeIcon
                        size={50}
                        radius="md"
                        variant="light"
                        color="cyan"
                        style={{ background: "rgba(0, 217, 255, 0.1)" }}
                      >
                        <feature.icon size={28} />
                      </ThemeIcon>
                      <Text fw={600}>{feature.title}</Text>
                      <Text size="sm" c="dimmed" lh={1.5}>
                        {feature.description}
                      </Text>
                    </Stack>
                  </Card>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Bottom CTA */}
        <Box py={100} style={{ background: "var(--website-muted-bg)" }}>
          <Container size="md">
            <Stack align="center" gap="xl">
              <FadeInUp>
                <Title order={2} ta="center">
                  Ready to Look in the{" "}
                  <GradientText animate>Mirror</GradientText>?
                </Title>
              </FadeInUp>
              <FadeInUp delay={0.1}>
                <Text size="lg" c="dimmed" ta="center" maw={500}>
                  60 seconds. Zero cost. The truths your team won&apos;t tell
                  you and your investors can&apos;t see.
                </Text>
              </FadeInUp>
              <FadeInUp delay={0.2}>
                <UrlInputSection
                  url={url}
                  setUrl={setUrl}
                  onSubmit={handleSubmit}
                  loading={loading}
                />
              </FadeInUp>
            </Stack>
          </Container>
        </Box>
      </main>
      <Footer />
    </Box>
  );
}

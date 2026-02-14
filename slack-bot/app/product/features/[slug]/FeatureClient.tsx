"use client";

import Link from "next/link";
import { IconArrowLeft, IconArrowRight, IconCheck } from "@tabler/icons-react";
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
import { GradientText } from "../../../components/animations";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { SectionHeader } from "../../../components/SectionHeader";
import { SubpageHero } from "../../../components/SubpageHero";
import { WebsiteCTA } from "../../../components/WebsiteCTA";
import type { CoreFeature } from "../../../data/features";
import { CORE_FEATURES } from "../../../data/features";
import classes from "../../../website.module.css";

interface FeatureClientProps {
  slug: string;
}

/**
 * Get feature by slug from CORE_FEATURES array
 */
function getFeatureBySlug(slug: string): CoreFeature | undefined {
  return CORE_FEATURES.find((f) => f.slug === slug);
}

/**
 * Get adjacent features for navigation
 */
function getAdjacentFeatures(currentSlug: string) {
  const currentIndex = CORE_FEATURES.findIndex((f) => f.slug === currentSlug);
  const prevFeature = currentIndex > 0 ? CORE_FEATURES[currentIndex - 1] : null;
  const nextFeature =
    currentIndex < CORE_FEATURES.length - 1
      ? CORE_FEATURES[currentIndex + 1]
      : null;

  return { prevFeature, nextFeature };
}

/**
 * Get related features (same color/category, excluding current)
 */
function getRelatedFeatures(feature: CoreFeature) {
  return CORE_FEATURES.filter(
    (f) => f.color === feature.color && f.slug !== feature.slug
  ).slice(0, 3);
}

/**
 * FeatureClient - Detailed feature page with hero, description, and related features
 */
export function FeatureClient({ slug }: FeatureClientProps) {
  const feature = getFeatureBySlug(slug);

  // This should never happen since we validate in the server component,
  // but TypeScript requires the check
  if (!feature) {
    return null;
  }

  const { prevFeature, nextFeature } = getAdjacentFeatures(feature.slug);
  const relatedFeatures = getRelatedFeatures(feature);

  return (
    <Box className={classes.root}>
      <Header />

      {/* Hero Section */}
      <SubpageHero
        badge={{ text: "Feature Spotlight", color: feature.color }}
        title={
          <>
            <GradientText animate>{feature.title}</GradientText>
          </>
        }
        subtitle={feature.description}
        actions={
          <Group gap="md">
            <Button
              component={Link}
              href="/diagnosis"
              size="lg"
              className={classes.ctaButton}
              rightSection={<IconArrowRight size={18} />}
            >
              Get Started Free
            </Button>
            <Button
              component={Link}
              href="/product"
              size="lg"
              variant="outline"
              className={classes.outlineButton}
              leftSection={<IconArrowLeft size={18} />}
            >
              All Features
            </Button>
          </Group>
        }
      />

      {/* Key Benefit */}
      <Box py={60} style={{ background: "var(--website-muted-bg)" }}>
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className={classes.featureCard} data-color={feature.color} padding="xl">
              <Group gap="md" align="center" justify="center">
                <ThemeIcon size={48} radius="md" variant="light" color={feature.color}>
                  <feature.icon size={24} />
                </ThemeIcon>
                <Stack gap={4}>
                  <Text size="sm" c="dimmed" tt="uppercase" fw={500}>
                    Key Benefit
                  </Text>
                  <Group gap="xs">
                    <IconCheck size={20} color="var(--website-primary)" />
                    <Text size="lg" fw={600} c="cyan">
                      {feature.benefit}
                    </Text>
                  </Group>
                </Stack>
              </Group>
            </Card>
          </motion.div>
        </Container>
      </Box>

      {/* Coming Soon - Detailed Content */}
      <Box py={80}>
        <Container size="lg">
          <SectionHeader
            title={
              <>
                Coming <GradientText animate>Soon</GradientText>
              </>
            }
            subtitle="Detailed feature documentation and tutorials are being prepared. Check back soon for in-depth guides."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className={classes.featureCard} padding="xl" ta="center">
              <Stack align="center" gap="md">
                <ThemeIcon size={64} radius="xl" variant="light" color={feature.color}>
                  <feature.icon size={32} />
                </ThemeIcon>
                <Title order={3}>Feature Details Coming Soon</Title>
                <Text c="dimmed" maw={500}>
                  We&apos;re preparing detailed documentation, use cases, and tutorials for{" "}
                  {feature.title}. In the meantime, start your free trial to experience it firsthand.
                </Text>
                <Button
                  component={Link}
                  href="/diagnosis"
                  size="md"
                  className={classes.ctaButton}
                  rightSection={<IconArrowRight size={16} />}
                >
                  Try It Now
                </Button>
              </Stack>
            </Card>
          </motion.div>
        </Container>
      </Box>

      {/* Related Features */}
      {relatedFeatures.length > 0 && (
        <Box py={80} style={{ background: "var(--website-muted-bg)" }}>
          <Container size="lg">
            <SectionHeader
              title={
                <>
                  Related <GradientText animate>Features</GradientText>
                </>
              }
              subtitle="Explore other capabilities that work great with this feature"
            />

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
              {relatedFeatures.map((related, index) => (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{ height: "100%" }}
                >
                  <Card
                    component={Link}
                    href={`/product/features/${related.slug}`}
                    className={classes.featureCard}
                    data-color={related.color}
                    padding="xl"
                    h="100%"
                    style={{ textDecoration: "none" }}
                  >
                    <Stack gap="md">
                      <Group gap="sm" wrap="nowrap" align="flex-start">
                        <ThemeIcon
                          size={40}
                          radius="md"
                          variant="light"
                          color={related.color}
                          style={{ flexShrink: 0 }}
                        >
                          <related.icon size={20} />
                        </ThemeIcon>
                        <Title order={4} style={{ lineHeight: 1.3 }}>
                          {related.title}
                        </Title>
                      </Group>
                      <Text size="sm" c="dimmed" lineClamp={2}>
                        {related.description}
                      </Text>
                      <Group gap="xs" mt="auto">
                        <IconCheck size={16} color="var(--website-primary)" />
                        <Text size="sm" fw={500} c="cyan">
                          {related.benefit}
                        </Text>
                      </Group>
                    </Stack>
                  </Card>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>
      )}

      {/* Feature Navigation */}
      <Box py={40}>
        <Container size="lg">
          <Group justify="space-between">
            {prevFeature ? (
              <Button
                component={Link}
                href={`/product/features/${prevFeature.slug}`}
                variant="subtle"
                leftSection={<IconArrowLeft size={16} />}
                className={classes.navLink}
              >
                {prevFeature.title}
              </Button>
            ) : (
              <div />
            )}
            {nextFeature && (
              <Button
                component={Link}
                href={`/product/features/${nextFeature.slug}`}
                variant="subtle"
                rightSection={<IconArrowRight size={16} />}
                className={classes.navLink}
              >
                {nextFeature.title}
              </Button>
            )}
          </Group>
        </Container>
      </Box>

      {/* CTA Section */}
      <WebsiteCTA
        title="Ready to Run Your First Experiment?"
        subtitle="Stop guessing. Get your free assessment and run a focused experiment this week."
        primaryAction={{ label: "Start Free", href: "/diagnosis" }}
      />

      <Footer />
    </Box>
  );
}

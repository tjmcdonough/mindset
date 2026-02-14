"use client";

import Link from "next/link";
import { IconChevronDown } from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  Anchor,
  Box,
  Divider,
  Group,
  HoverCard,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { CORE_FEATURES } from "../data/features";
import classes from "../website.module.css";

/**
 * Before Product-Market Fit feature categories for the mega menu.
 * Focused on validation, discovery, and early-stage growth needs.
 */
const PRE_PMF_CATEGORIES = [
  {
    label: "Discover",
    description: "Validate assumptions with AI research",
    slugs: ["market-research", "interrogation-ai"],
  },
  {
    label: "Strategize",
    description: "Build your path to PMF",
    slugs: ["strategy-generation", "bespoke-agent-builder", "reality-anchored-strategies"],
  },
  {
    label: "Execute",
    description: "Turn insights into action",
    slugs: ["task-execution", "content-generation"],
  },
  {
    label: "Learn",
    description: "Iterate based on evidence",
    slugs: ["review-queue", "feedback-loop"],
  },
] as const;

/**
 * Get feature by slug from CORE_FEATURES array
 */
function getFeatureBySlug(slug: string) {
  return CORE_FEATURES.find((f) => f.slug === slug);
}

interface ProductMenuProps {
  /** Custom class name for nav link styling */
  navLinkClassName?: string;
}

/**
 * ProductMenu - Mega menu dropdown for Product navigation.
 * Displays growth features organized by journey stage.
 */
export function ProductMenu({ navLinkClassName }: ProductMenuProps) {
  return (
    <HoverCard
      width={680}
      position="bottom"
      radius="md"
      shadow="lg"
      withinPortal
      transitionProps={{ transition: "pop-top-left", duration: 150 }}
    >
      <HoverCard.Target>
        <UnstyledButton className={navLinkClassName}>
          <Group gap={4}>
            <span>Product</span>
            <IconChevronDown size={14} style={{ opacity: 0.7 }} />
          </Group>
        </UnstyledButton>
      </HoverCard.Target>

      <HoverCard.Dropdown
        style={{
          background: "var(--mantine-color-body)",
          border: "1px solid var(--website-border)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Box p="md">
          {/* Feature Categories Grid */}
          <SimpleGrid cols={2} spacing="lg">
            {PRE_PMF_CATEGORIES.map((category) => (
              <Stack key={category.label} gap="xs">
                <Box mb={4}>
                  <Text size="xs" fw={600} c="dimmed" tt="uppercase">
                    {category.label}
                  </Text>
                  <Text size="xs" c="dimmed" opacity={0.7}>
                    {category.description}
                  </Text>
                </Box>
                {category.slugs.map((slug) => {
                  const feature = getFeatureBySlug(slug);
                  if (!feature) return null;

                  return (
                    <motion.div
                      key={slug}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.15 }}
                    >
                      <UnstyledButton
                        component={Link}
                        href={`/product/features/${slug}`}
                        style={{
                          display: "block",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          transition: "background 0.15s ease",
                        }}
                        className={classes.productMenuItem}
                      >
                        <Group gap="sm" wrap="nowrap" align="flex-start">
                          <ThemeIcon
                            size={32}
                            radius="md"
                            variant="light"
                            color={feature.color}
                            style={{ flexShrink: 0 }}
                          >
                            <feature.icon size={16} />
                          </ThemeIcon>
                          <Box>
                            <Text size="sm" fw={500} lh={1.3}>
                              {feature.title}
                            </Text>
                            <Text size="xs" c="dimmed" lh={1.4} lineClamp={1}>
                              {feature.benefit}
                            </Text>
                          </Box>
                        </Group>
                      </UnstyledButton>
                    </motion.div>
                  );
                })}
              </Stack>
            ))}
          </SimpleGrid>

          {/* Footer CTA */}
          <Divider my="md" color="var(--website-border)" />
          <Group justify="center">
            <Anchor
              component={Link}
              href="/diagnosis"
              size="sm"
              fw={500}
              c="cyan"
              style={{ textDecoration: "none" }}
            >
              Get Free Strategy →
            </Anchor>
          </Group>
        </Box>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}

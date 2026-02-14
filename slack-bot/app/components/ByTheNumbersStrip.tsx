"use client";

import { motion } from "framer-motion";
import { Box, Container, SimpleGrid, Stack, Text } from "@mantine/core";
import { FadeInUp } from "./animations";

interface NumberStat {
  value: string;
  label: string;
  color: string;
}

const STATS: NumberStat[] = [
  {
    value: "80%",
    label: "of teams misdiagnose their growth stage",
    color: "var(--mantine-color-red-6)",
  },
  {
    value: "$15k+",
    label: "average wasted on agencies before finding what works",
    color: "var(--mantine-color-orange-6)",
  },
  {
    value: "9/10",
    label: "generic tactics fail when copied without context",
    color: "var(--mantine-color-yellow-6)",
  },
  {
    value: "6 mo",
    label: "of misdirected effort from wrong-stage tactics",
    color: "var(--mantine-color-violet-6)",
  },
];

/**
 * A high-impact stat strip that breaks up text-heavy sections
 * with bold, digit-first data points.
 */
export function ByTheNumbersStrip() {
  return (
    <Box
      component="section"
      py={60}
      style={{
        background:
          "linear-gradient(135deg, rgba(0, 217, 255, 0.03) 0%, rgba(124, 58, 237, 0.03) 100%)",
        borderTop: "1px solid var(--website-border)",
        borderBottom: "1px solid var(--website-border)",
      }}
    >
      <Container size="lg">
        <FadeInUp>
          <Text
            fw={600}
            size="xs"
            c="dimmed"
            ta="center"
            tt="uppercase"
            mb="xl"
            style={{ letterSpacing: 2 }}
          >
            The Cost of Growing Without a System
          </Text>
        </FadeInUp>

        <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="xl">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Stack align="center" gap={4} ta="center">
                <Text
                  fw={800}
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    lineHeight: 1,
                    color: stat.color,
                  }}
                >
                  {stat.value}
                </Text>
                <Text size="sm" c="dimmed" lh={1.4} maw={180}>
                  {stat.label}
                </Text>
              </Stack>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

"use client";

import {
  IconFlask,
  IconTargetArrow,
  IconBrain,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Group,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { FadeInUp } from "./animations";

const TRUST_SIGNALS = [
  {
    icon: IconBrain,
    label: "Interrogation-first — we question before we act",
  },
  {
    icon: IconTargetArrow,
    label: "Stage-aware — advice constrained to what works now",
  },
  {
    icon: IconFlask,
    label: "Experiment-driven — weekly hypothesis-test-learn cycles",
  },
];

export function TrustSection() {
  return (
    <Box
      component="section"
      py="xl"
      style={{
        borderBottom: "1px solid var(--website-border)",
        overflow: "hidden",
      }}
    >
      <Container size="xl">
        <FadeInUp>
          <Group justify="center" gap={40} wrap="wrap">
            {TRUST_SIGNALS.map((signal, index) => (
              <motion.div
                key={signal.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.15 }}
              >
                <Group gap="sm" wrap="nowrap">
                  <ThemeIcon
                    size={32}
                    radius="md"
                    variant="light"
                    color="cyan"
                  >
                    <signal.icon size={16} />
                  </ThemeIcon>
                  <Text size="sm" c="dimmed">
                    {signal.label}
                  </Text>
                </Group>
              </motion.div>
            ))}
          </Group>
        </FadeInUp>
      </Container>
    </Box>
  );
}

"use client";

import { IconBulb, IconCode, IconHeart, IconRocket } from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  Avatar,
  Box,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { FadeInUp, GradientText } from "./animations";
import classes from "../website.module.css";

const FOUNDER_VALUES = [
  {
    icon: IconCode,
    title: "Built by Technical Founders",
    description:
      "We know the pain of being great at code but terrible at marketing. We lived it.",
    color: "cyan",
  },
  {
    icon: IconBulb,
    title: "Learned the Hard Way",
    description:
      'We tried agencies ($15k+ wasted), random tactics, and generic playbooks that flopped.',
    color: "violet",
  },
  {
    icon: IconHeart,
    title: "Radically Transparent",
    description:
      "We publish our own AI's critique of our business model. No smoke and mirrors.",
    color: "orange",
  },
  {
    icon: IconRocket,
    title: "Skin in the Game",
    description:
      "Growthmind powers our own growth. If it doesn't work for us, we fix it.",
    color: "cyan",
  },
];

export function FounderStorySection() {
  return (
    <Box component="section" className={classes.loopSection}>
      <Container size="lg">
        <Stack align="center" mb={60}>
          <FadeInUp>
            <Title order={2} ta="center">
              Built by People Who{" "}
              <GradientText animate>Lived the Pain</GradientText>
            </Title>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Text size="xl" c="dimmed" ta="center" maw={700}>
              We&apos;re not a VC-backed team building another AI wrapper.
              We&apos;re technical founders who got tired of guessing our way
              through growth — and built the tool we wished existed.
            </Text>
          </FadeInUp>
        </Stack>

        {/* Founder quote */}
        <FadeInUp delay={0.2}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              className={classes.featureCard}
              p="xl"
              mb={60}
              style={{ borderRadius: "var(--mantine-radius-lg)" }}
            >
              <Group align="flex-start" gap="lg">
                <Avatar
                  size={64}
                  radius="md"
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                  alt="Founder"
                />
                <Stack gap="xs" style={{ flex: 1 }}>
                  <Text size="lg" fs="italic" c="dimmed" lh={1.7}>
                    &quot;I spent 6 months building a product nobody asked for.
                    Then I spent another 6 months trying everything—Reddit,
                    LinkedIn, cold DMs—just shooting in the dark. I realized the
                    problem wasn&apos;t my product. It was that I was trying to
                    grow without first proving what actually resonated.&quot;
                  </Text>
                  <Group gap="xs">
                    <Text fw={600} size="sm">
                      Thomas McDonough
                    </Text>
                    <Text size="sm" c="dimmed">
                      · Founder, Growthmind
                    </Text>
                  </Group>
                </Stack>
              </Group>
            </Box>
          </motion.div>
        </FadeInUp>

        {/* Values grid */}
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          {FOUNDER_VALUES.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Box
                className={classes.featureCard}
                data-color={value.color}
                p="lg"
                style={{
                  borderRadius: "var(--mantine-radius-md)",
                  height: "100%",
                }}
              >
                <Group align="flex-start" gap="md">
                  <ThemeIcon
                    size={48}
                    radius="md"
                    variant="light"
                    color={value.color}
                  >
                    <value.icon size={24} />
                  </ThemeIcon>
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Title order={4} size="h5">
                      {value.title}
                    </Title>
                    <Text c="dimmed" size="sm">
                      {value.description}
                    </Text>
                  </Stack>
                </Group>
              </Box>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

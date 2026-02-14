"use client";

import {
  IconBulb,
  IconCode,
  IconRocket,
  IconUsers,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  Avatar,
  Badge,
  Box,
  Card,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { FadeInUp, GradientText } from "./animations";
import classes from "../website.module.css";

interface Persona {
  icon: React.ElementType;
  title: string;
  description: string;
  searching: string;
  color: string;
}

const PERSONAS: Persona[] = [
  {
    icon: IconRocket,
    title: "Founders Finding Product-Market Fit",
    description:
      "You're building something you believe in, but you're not sure if people want it yet. You need structured experiments, not more guesswork.",
    searching: "\"why isn't this working?\"",
    color: "cyan",
  },
  {
    icon: IconCode,
    title: "Solo Founders & Technical Makers",
    description:
      "You're great at building but growth feels like a foreign language. You need a system that tells you what to focus on — and what to ignore.",
    searching: "\"what should I prioritize next?\"",
    color: "violet",
  },
  {
    icon: IconUsers,
    title: "Small Teams Without a Growth Team",
    description:
      "You don't have a CMO or a growth team. You need the intelligence of one without the $10k+/mo price tag.",
    searching: "\"are we focused on the right things?\"",
    color: "orange",
  },
];

export function WhoIsThisForSection() {
  return (
    <Box component="section" className={classes.featuresSection}>
      <Container size="lg">
        <Stack align="center" mb={60}>
          <FadeInUp>
            <Badge color="violet" variant="light" size="lg" mb="md">
              Who It&apos;s For
            </Badge>
          </FadeInUp>
          <FadeInUp>
            <Title order={2} ta="center">
              Built for People Who{" "}
              <GradientText animate>Need Answers</GradientText>, Not More Noise
            </Title>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Text size="xl" c="dimmed" ta="center" maw={700}>
              Growthmind is built for founders and teams who need to find
              what works — and double down on it. From first user to
              explosive growth, we scale with you.
            </Text>
          </FadeInUp>
        </Stack>

        <Grid gutter="xl">
          {PERSONAS.map((persona, index) => (
            <Grid.Col key={persona.title} span={{ base: 12, md: 4 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                style={{ height: "100%" }}
              >
                <Card
                  className={classes.featureCard}
                  data-color={persona.color}
                  p="xl"
                  h="100%"
                >
                  <Stack gap="md" h="100%">
                    <ThemeIcon
                      size={48}
                      radius="md"
                      variant="light"
                      color={persona.color}
                    >
                      <persona.icon size={24} />
                    </ThemeIcon>
                    <Text fw={700} size="lg">
                      {persona.title}
                    </Text>
                    <Text size="sm" c="dimmed" lh={1.6} style={{ flex: 1 }}>
                      {persona.description}
                    </Text>
                    <Badge variant="light" color="gray" size="sm">
                      Searching: {persona.searching}
                    </Badge>
                  </Stack>
                </Card>
              </motion.div>
            </Grid.Col>
          ))}
        </Grid>

        {/* Founder quote as trust signal */}
        <FadeInUp delay={0.4}>
          <Box
            mt={60}
            className={classes.featureCard}
            p="xl"
            style={{ borderRadius: "var(--mantine-radius-lg)" }}
          >
            <Group align="flex-start" gap="lg">
              <Avatar
                size={56}
                radius="md"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                alt="Thomas McDonough, Founder"
              />
              <Stack gap="xs" style={{ flex: 1 }}>
                <Text size="md" fs="italic" c="dimmed" lh={1.7}>
                  &quot;I spent 6 months building a product nobody asked for,
                  then another 6 months trying every tactic in the dark. The
                  problem wasn&apos;t effort — it was that I was trying to grow
                  without first proving what actually resonated. That&apos;s why
                  we built Growthmind.&quot;
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
        </FadeInUp>

        {/* Inclusive note for established companies */}
        <FadeInUp delay={0.5}>
          <Box ta="center" mt="xl">
            <Group justify="center" gap="xs">
              <IconBulb
                size={16}
                style={{ color: "var(--website-primary)" }}
              />
              <Text size="sm" c="dimmed">
                Already established but struggling with growth? Growthmind works
                for any team that needs to validate new channels or
                re-diagnose stalled traction.
              </Text>
            </Group>
          </Box>
        </FadeInUp>
      </Container>
    </Box>
  );
}

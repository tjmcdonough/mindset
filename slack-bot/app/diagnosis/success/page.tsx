"use client";

import Link from "next/link";
import { IconCheck, IconArrowRight } from "@tabler/icons-react";
import {
  Box,
  Button,
  Card,
  Container,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import classes from "../../website.module.css";

export default function DiagnosisSuccessPage() {
  return (
    <Box className={classes.root}>
      <Header />

      <Box py={120}>
        <Container size="sm">
          <Card
            padding="xl"
            style={{
              background: "var(--website-card-bg)",
              border: "1px solid var(--website-primary)",
              boxShadow: "0 0 40px rgba(0, 217, 255, 0.1)",
            }}
          >
            <Stack align="center" justify="center" gap="md" py="xl">
              <ThemeIcon
                size={64}
                radius="xl"
                variant="light"
                color="green"
                style={{ background: "rgba(64, 192, 87, 0.1)" }}
              >
                <IconCheck size={32} />
              </ThemeIcon>

              <Title order={2} ta="center" mt="md">
                Thank You!
              </Title>

              <Text c="dimmed" ta="center" maw={440} size="lg">
                Payment received! Our 18 AI agents are building your company
                profile. Expect targeted questions via email within 10 minutes.
              </Text>

              <Group mt="xl">
                <Button
                  component={Link}
                  href="/"
                  size="lg"
                  className={classes.ctaButton}
                  rightSection={<IconArrowRight size={18} />}
                >
                  Back to Homepage
                </Button>
              </Group>
            </Stack>
          </Card>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

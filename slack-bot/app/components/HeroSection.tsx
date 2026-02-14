"use client";

import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Container,
  Group,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FadeInUp, StaggerContainer, StaggerItem } from "./animations";
import { FreeGrowthForm } from "./forms/FreeGrowthForm";
import classes from "../website.module.css";

const HERO_FEATURES = [
  "Diagnoses Before Prescriptions",
  "Personalised Weekly Experiments",
  "No Credit Card Required",
];

export function HeroSection() {
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

  return (
    <Box component="section" className={classes.hero}>
      {/* Animated background elements */}
      <motion.div
        className={classes.gridBg}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
      />

      {/* Floating orbs with enhanced animation */}
      <motion.div
        className={classes.floatingOrb1}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
      />
      <motion.div
        className={classes.floatingOrb2}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
      />
      <motion.div
        className={classes.floatingOrb3}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
      />

      <Container size="md" className={classes.heroContent}>
        <Stack align="center" gap="lg" className={classes.heroStack}>
          {/* Hero title with animated gradient - Broad positioning */}
          <FadeInUp delay={0.3}>
            <Title order={1} ta="center" className={classes.heroTitle}>
              Stop Guessing. Start Growing.
            </Title>
          </FadeInUp>

          {/* Subtitle — what Growthmind IS in one sentence + why it exists */}
          <FadeInUp delay={0.4}>
            <Text size="xl" c="dimmed" ta="center" maw={680}>
              Growthmind is the AI growth system that questions your
              assumptions, diagnoses your stage, and runs weekly experiments to
              find what actually works.
            </Text>
          </FadeInUp>

          {/* CTA Buttons */}
          <FadeInUp delay={0.5}>
            <Group gap="lg" mt="md" justify="center" wrap="wrap">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={openModal}
                  size="lg"
                  className={classes.ctaButton}
                >
                  Get More Customers
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  component="a"
                  href="#how-it-works"
                  variant="subtle"
                  size="lg"
                  rightSection={<IconArrowRight size={16} />}
                  className={classes.navLink}
                >
                  See How It Works
                </Button>
              </motion.div>
            </Group>
          </FadeInUp>

          {/* Feature badges */}
          <StaggerContainer staggerDelay={0.1} delayChildren={0.6}>
            <Group gap="xl" mt="lg" justify="center" wrap="wrap">
              {HERO_FEATURES.map((item) => (
                <StaggerItem key={item}>
                  <Group gap="xs">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                      }}
                    >
                      <IconCheck size={16} className={classes.checkIcon} />
                    </motion.div>
                    <Text size="sm" c="dimmed">
                      {item}
                    </Text>
                  </Group>
                </StaggerItem>
              ))}
            </Group>
          </StaggerContainer>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            style={{ marginTop: 60 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Box
                style={{
                  width: 24,
                  height: 40,
                  borderRadius: 12,
                  border: "2px solid var(--website-border)",
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: 8,
                }}
              >
                <motion.div
                  animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    width: 4,
                    height: 8,
                    borderRadius: 2,
                    background: "var(--website-primary)",
                  }}
                />
              </Box>
            </motion.div>
          </motion.div>
        </Stack>
      </Container>

      {/* Free Growth Form Modal */}
      <Modal
        opened={modalOpened}
        onClose={closeModal}
        title=""
        size="lg"
        centered
        styles={{
          content: { background: "var(--mantine-color-body)" },
          header: { background: "var(--mantine-color-body)" },
        }}
      >
        <FreeGrowthForm onSuccess={closeModal} />
      </Modal>
    </Box>
  );
}

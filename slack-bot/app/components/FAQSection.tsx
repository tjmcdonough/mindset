"use client";

import { useState } from "react";
import { IconChevronDown, IconShieldCheck } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Badge,
  Box,
  Container,
  Group,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { FAQS } from "../data/faq";
import { FadeInUp, GradientText } from "./animations";
import classes from "../website.module.css";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  highlight?: boolean;
}

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
  highlight,
}: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
    >
      <Box
        className={classes.featureCard}
        style={{
          borderRadius: "var(--mantine-radius-md)",
          overflow: "hidden",
          borderColor:
            highlight && isOpen ? "var(--website-primary)" : undefined,
          boxShadow:
            highlight && isOpen
              ? "0 0 20px rgba(0, 217, 255, 0.15)"
              : undefined,
        }}
      >
        <UnstyledButton
          onClick={onToggle}
          w="100%"
          p="lg"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Group gap="sm">
            {highlight && (
              <Badge color="cyan" variant="light" size="sm">
                Most Asked
              </Badge>
            )}
            <Text
              fw={500}
              size="lg"
              style={{ color: "var(--website-foreground)" }}
            >
              {question}
            </Text>
          </Group>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <IconChevronDown
              size={20}
              style={{ color: "var(--website-muted)" }}
            />
          </motion.div>
        </UnstyledButton>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <Box px="lg" pb="lg">
                <Text c="dimmed" size="sm" lh={1.7}>
                  {answer}
                </Text>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </motion.div>
  );
}

export function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>("wrapper");

  return (
    <Box component="section" id="faq" className={classes.testimonialsSection}>
      <Container size="md">
        <Stack align="center" mb={60}>
          <FadeInUp>
            <Group gap="xs" mb="sm">
              <IconShieldCheck
                size={24}
                style={{ color: "var(--website-primary)" }}
              />
              <Text
                size="sm"
                c="dimmed"
                tt="uppercase"
                style={{ letterSpacing: 1 }}
              >
                Addressing Your Skepticism
              </Text>
            </Group>
          </FadeInUp>
          <FadeInUp>
            <Title order={2} ta="center">
              <GradientText animate>Frequently Asked</GradientText> Questions
            </Title>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Text size="lg" c="dimmed" ta="center" maw={600}>
              We know you&apos;ve been burned before. Here are the honest
              answers to what you&apos;re probably thinking.
            </Text>
          </FadeInUp>
        </Stack>

        <Stack gap="md">
          {FAQS.map((faq, index) => (
            <FAQItem
              key={faq.value}
              question={faq.question}
              answer={faq.answer}
              isOpen={openItem === faq.value}
              onToggle={() =>
                setOpenItem(openItem === faq.value ? null : faq.value)
              }
              index={index}
              highlight={faq.highlight}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

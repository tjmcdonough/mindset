"use client";

import { IconCheck } from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  Accordion,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { GradientText } from "../components/animations";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SectionHeader } from "../components/SectionHeader";
import { SubpageHero } from "../components/SubpageHero";
import { WebsiteCTA } from "../components/WebsiteCTA";
import { FreeGrowthForm } from "../components/forms/FreeGrowthForm";
import { FREE_TIER, GUARANTEE, PRICING_PLANS } from "../data/pricing";
import classes from "../website.module.css";

const FAQ_ITEMS = [
  {
    question: "How is this different from ChatGPT or other AI tools?",
    answer:
      "ChatGPT answers whatever you ask. Growthmind questions whether you're asking the right thing. We start with an interrogation that challenges your assumptions, diagnoses your stage, and identifies what you should actually be testing. We persist your full business context across sessions — past experiments, what worked, what failed — so every recommendation builds on what came before.",
  },
  {
    question: "What happens after I sign up?",
    answer:
      "You'll start with an interrogation — 20+ deep questions about your business, market, and assumptions. Within minutes, you'll have your stage diagnosis, growth profile, and first experiment plan. From there, the system helps you run one focused experiment per week: hypothesis, test, measure, learn, repeat.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, absolutely. We offer monthly billing with no long-term contracts. You can cancel anytime from your account settings. We also offer a 7-day money-back guarantee if you're not satisfied.",
  },
  {
    question: "Do I need technical skills to use Growthmind?",
    answer:
      "Not at all. Growthmind is designed for growth-focused people, not developers. The AI handles the research, experiment design, and asset creation — you answer questions, review recommendations, and approve experiments. If you can use email, you can use Growthmind.",
  },
  {
    question: "What if the AI tells me to stop marketing?",
    answer:
      "That's the point. If your stage diagnosis reveals you have a product problem, not a distribution problem, we'll tell you. Most tools can't do this — their business model depends on you doing more. Ours depends on you making progress. Sometimes the most valuable advice is 'stop and fix your product first.'",
  },
  {
    question: "How long before I see results?",
    answer:
      "You'll have your stage diagnosis and first experiment plan within your first session (about 10 minutes). Each weekly experiment is designed to produce clear signal — either validating or invalidating an assumption. Most users report meaningful clarity on their direction within 2-4 experiment cycles.",
  },
];

export function PricingClient() {
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

  return (
    <Box className={classes.root}>
      <Header />

      {/* Hero Section */}
      <SubpageHero
        title={
          <>
            Invest in Clarity, <GradientText animate>Not Overhead</GradientText>
          </>
        }
        subtitle="Compare with $10k/mo agencies that guess. Start free, upgrade when it's earning its keep. Built for founders, marketers, and small teams."
        minHeight={400}
      />

      {/* Free Tier Callout */}
      <Box py={40}>
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Box
              p="xl"
              style={{
                background: "var(--website-muted-bg)",
                borderRadius: "var(--mantine-radius-md)",
                border: "1px solid var(--website-border)",
                textAlign: "center",
              }}
            >
              <Text size="xl" fw={600} mb={4}>
                {FREE_TIER.title}
              </Text>
              <Text size="md" c="dimmed" mb="lg">
                {FREE_TIER.description}
              </Text>
              <Button
                onClick={openModal}
                size="lg"
                variant="outline"
                className={classes.outlineButton}
              >
                {FREE_TIER.cta}
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Pricing Cards */}
      <Box py={60}>
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
            {PRICING_PLANS.map((plan, index) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 300 },
                }}
                style={{ height: "100%" }}
              >
                <Card
                  className={classes.featureCard}
                  padding="xl"
                  style={{
                    height: "100%",
                    position: "relative",
                    overflow: "visible",
                    borderColor: plan.highlight
                      ? "var(--website-primary)"
                      : undefined,
                    boxShadow: plan.highlight
                      ? "0 0 40px rgba(0, 217, 255, 0.15)"
                      : undefined,
                  }}
                >
                  {plan.badge && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      style={{
                        position: "absolute",
                        top: -12,
                        right: 20,
                      }}
                    >
                      <Badge
                        color="cyan"
                        variant="filled"
                        size="lg"
                        style={{
                          boxShadow: "0 4px 12px rgba(0, 217, 255, 0.3)",
                        }}
                      >
                        {plan.badge}
                      </Badge>
                    </motion.div>
                  )}

                  <Stack gap="md" h="100%">
                    <Group gap="sm">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <ThemeIcon
                          size={40}
                          radius="md"
                          variant="light"
                          color={plan.color}
                        >
                          <plan.icon size={20} />
                        </ThemeIcon>
                      </motion.div>
                      <Box>
                        <Title order={3} size="h4">
                          {plan.title}
                        </Title>
                        <Text size="sm" c="dimmed">
                          {plan.description}
                        </Text>
                      </Box>
                    </Group>

                    <Group align="flex-end" gap={4}>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <Text
                          size="3rem"
                          fw={700}
                          lh={1}
                          style={{
                            color: plan.highlight
                              ? "var(--website-primary)"
                              : "var(--website-foreground)",
                          }}
                        >
                          {plan.price}
                        </Text>
                      </motion.span>
                      <Text c="dimmed" mb={8}>
                        /mo
                      </Text>
                    </Group>

                    <Stack gap="md">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: featureIndex * 0.05 + 0.5 }}
                        >
                          <Group gap="sm" wrap="nowrap">
                            <ThemeIcon color={plan.color} size={20} radius="xl">
                              <IconCheck size={12} />
                            </ThemeIcon>
                            <Text size="sm">{feature}</Text>
                          </Group>
                        </motion.div>
                      ))}
                    </Stack>

                    <Box mt="auto" pt="md">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          component="a"
                          href="/diagnosis"
                          fullWidth
                          size="lg"
                          variant={plan.highlight ? "filled" : "outline"}
                          className={
                            plan.highlight
                              ? classes.ctaButton
                              : classes.outlineButton
                          }
                        >
                          {plan.cta}
                        </Button>
                      </motion.div>
                    </Box>
                  </Stack>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Box ta="center" mt="xl">
              <Text size="sm" c="dimmed">
                {GUARANTEE.text}
              </Text>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box py={80} style={{ background: "var(--website-muted-bg)" }}>
        <Container size="md">
          <SectionHeader title="Frequently Asked" highlightedText="Questions" />

          <Accordion
            variant="separated"
            styles={{
              item: {
                background: "var(--website-card-bg)",
                border: "1px solid var(--website-border)",
                "&[data-active]": {
                  borderColor: "var(--website-primary)",
                },
              },
              control: {
                "&:hover": {
                  background: "transparent",
                },
              },
              label: {
                fontWeight: 500,
              },
              panel: {
                color: "var(--website-muted)",
              },
            }}
          >
            {FAQ_ITEMS.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Accordion.Item value={item.question}>
                  <Accordion.Control>{item.question}</Accordion.Control>
                  <Accordion.Panel>{item.answer}</Accordion.Panel>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion>
        </Container>
      </Box>

      {/* CTA Section */}
      <WebsiteCTA
        title="Still Have Questions?"
        subtitle="See exactly how Growthmind works with a free assessment — no credit card required."
        primaryAction={{
          label: "Start Free",
          href: "/diagnosis",
        }}
        secondaryAction={{ label: "How It Works", href: "/product" }}
      />

      <Footer />

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

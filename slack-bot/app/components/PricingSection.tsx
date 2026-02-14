"use client";

import { IconCheck } from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
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
import { FREE_TIER, GUARANTEE, PRICING_PLANS } from "../data/pricing";
import {
  FadeInUp,
  GradientText,
  StaggerContainer,
  StaggerItem,
} from "./animations";
import { FreeGrowthForm } from "./forms/FreeGrowthForm";
import classes from "../website.module.css";

export function PricingSection() {
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

  return (
    <Box component="section" id="pricing" className={classes.featuresSection}>
      <Container size="lg">
        <Stack align="center" mb={60}>
          <FadeInUp>
            <Badge color="cyan" variant="light" size="lg" mb="md">
              Cost &amp; Packages
            </Badge>
          </FadeInUp>
          <FadeInUp>
            <Title order={2} ta="center">
              Invest in Growth,{" "}
              <GradientText animate>Not Overhead</GradientText>
            </Title>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <Text size="xl" c="dimmed" ta="center" maw={650}>
              No commitment required. Start with a free assessment (~10
              minutes), get your growth profile, and upgrade only when
              it&apos;s earning its keep.
            </Text>
          </FadeInUp>
        </Stack>

        {/* Free tier callout — concrete and specific */}
        <FadeInUp delay={0.15}>
          <Box
            mb="xl"
            p="lg"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 217, 255, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)",
              borderRadius: "var(--mantine-radius-md)",
              border: "2px solid var(--website-primary)",
              textAlign: "center",
            }}
          >
            <Text size="lg" fw={700} mb={4}>
              {FREE_TIER.title}
            </Text>
            <Text size="sm" c="dimmed" mb="xs">
              {FREE_TIER.description}
            </Text>
            <Text size="xs" c="dimmed" mb="md">
              ~10 min to complete &middot; No credit card &middot; No commitment
              &middot; No sales call
            </Text>
            <Button
              onClick={openModal}
              size="lg"
              className={classes.ctaButton}
            >
              {FREE_TIER.cta}
            </Button>
          </Box>
        </FadeInUp>

        <StaggerContainer staggerDelay={0.15}>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
            {PRICING_PLANS.map((plan, index) => (
              <StaggerItem key={plan.title} direction="up">
                <motion.div
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
                    {/* Popular badge */}
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

                      {/* Price with animation */}
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

                      {/* Features list with padding */}
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
                              <ThemeIcon
                                color={plan.color}
                                size={20}
                                radius="xl"
                              >
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
              </StaggerItem>
            ))}
          </SimpleGrid>
        </StaggerContainer>

        {/* Money-back guarantee + reassurance */}
        <FadeInUp delay={0.5}>
          <Box ta="center" mt="xl">
            <Text size="sm" c="dimmed" mb="xs">
              {GUARANTEE.text}
            </Text>
            <Text size="xs" c="dimmed">
              Start free. Upgrade when you&apos;re ready. Cancel anytime.
            </Text>
          </Box>
        </FadeInUp>
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

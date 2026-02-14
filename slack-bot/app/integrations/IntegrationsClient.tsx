"use client";

import { useState } from "react";
import Image from "next/image";
import { IconCheck } from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  Badge,
  Box,
  Card,
  Container,
  Group,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { GradientText } from "../components/animations";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SubpageHero } from "../components/SubpageHero";
import { WebsiteCTA } from "../components/WebsiteCTA";
import {
  CATEGORY_META,
  CATEGORY_ORDER,
  getTotalIntegrationsCount,
  INTEGRATIONS,
} from "../data/integrations";
import classes from "../website.module.css";

function IntegrationCard({
  integration,
  index,
}: {
  integration: {
    id: string;
    name: string;
    description: string;
    logo?: string;
    comingSoon?: boolean;
  };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className={classes.featureCard} padding="lg" h="100%">
        <Group align="flex-start" gap="md" wrap="nowrap">
          <Box
            w={48}
            h={48}
            style={{
              borderRadius: "var(--mantine-radius-md)",
              background: "var(--website-muted-bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {integration.logo ? (
              <Image
                src={integration.logo}
                alt={integration.name}
                width={28}
                height={28}
                style={{
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                  opacity: 0.9,
                }}
              />
            ) : (
              <Text size="lg" fw={700} c="dimmed">
                {integration.name.charAt(0)}
              </Text>
            )}
          </Box>
          <Stack gap={4} style={{ flex: 1 }}>
            <Group gap="xs">
              <Text fw={600} size="sm">
                {integration.name}
              </Text>
              {integration.comingSoon && (
                <Badge size="xs" variant="light" color="orange">
                  Coming Soon
                </Badge>
              )}
            </Group>
            <Text size="xs" c="dimmed" lh={1.5}>
              {integration.description}
            </Text>
          </Stack>
        </Group>
      </Card>
    </motion.div>
  );
}

export function IntegrationsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const totalIntegrations = getTotalIntegrationsCount();

  // Filter integrations based on search and category
  const filteredCategories = CATEGORY_ORDER.filter((categoryKey) => {
    if (selectedCategory !== "all" && categoryKey !== selectedCategory) {
      return false;
    }

    if (searchQuery) {
      const integrations = INTEGRATIONS[categoryKey] || [];
      return integrations.some(
        (integration) =>
          integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          integration.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    return true;
  });

  // Get filtered integrations for search
  const getFilteredIntegrations = (categoryKey: string) => {
    const integrations = INTEGRATIONS[categoryKey] || [];
    if (!searchQuery) return integrations;
    return integrations.filter(
      (integration) =>
        integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        integration.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
    );
  };

  return (
    <Box className={classes.root}>
      <Header />

      {/* Hero Section */}
      <SubpageHero
        badge={{
          text: `${totalIntegrations}+ Integrations`,
          icon: <IconCheck size={14} />,
        }}
        title={
          <>
            Connect Your <GradientText animate>Entire Stack</GradientText>
          </>
        }
        subtitle="Growthmind connects to all your tools to build a complete picture of your business—from analytics to payments to customer conversations."
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ width: "100%", maxWidth: 500 }}
        >
          <TextInput
            placeholder="Search integrations..."
            size="lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            styles={{
              input: {
                background: "var(--website-card-bg)",
                border: "1px solid var(--website-border)",
                color: "var(--website-foreground)",
                "&::placeholder": {
                  color: "var(--website-muted)",
                },
              },
            }}
          />
        </motion.div>
      </SubpageHero>

      {/* Category Filter */}
      <Box py="xl" style={{ background: "var(--website-muted-bg)" }}>
        <Container size="xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Box style={{ overflowX: "auto" }}>
              <SegmentedControl
                value={selectedCategory}
                onChange={setSelectedCategory}
                data={[
                  { label: "All Categories", value: "all" },
                  { label: "Analytics", value: "analytics" },
                  { label: "Revenue", value: "revenue" },
                  { label: "Social", value: "social" },
                  { label: "Email", value: "email" },
                  { label: "CMS", value: "cms" },
                  { label: "CRM", value: "crm" },
                  { label: "Support", value: "support" },
                  { label: "Meetings", value: "meetings" },
                ]}
                size="md"
                styles={{
                  root: {
                    background: "var(--website-card-bg)",
                    border: "1px solid var(--website-border)",
                  },
                }}
              />
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Integrations Grid */}
      <Box py={80}>
        <Container size="xl">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((categoryKey, index) => {
              const filteredIntegrations = getFilteredIntegrations(categoryKey);
              if (filteredIntegrations.length === 0) return null;

              const meta = CATEGORY_META[categoryKey];
              if (!meta) return null;

              const Icon = meta.icon;

              return (
                <motion.div
                  key={categoryKey}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box mb={60}>
                    <Group gap="md" mb="lg">
                      <ThemeIcon
                        size={48}
                        radius="md"
                        variant="light"
                        color={meta.color}
                      >
                        <Icon size={24} />
                      </ThemeIcon>
                      <Box>
                        <Title order={3} size="h4">
                          {meta.title}
                        </Title>
                        <Text size="sm" c="dimmed" maw={500}>
                          {meta.description}
                        </Text>
                      </Box>
                    </Group>

                    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                      {filteredIntegrations.map((integration, idx) => (
                        <IntegrationCard
                          key={integration.id}
                          integration={integration}
                          index={idx}
                        />
                      ))}
                    </SimpleGrid>
                  </Box>
                </motion.div>
              );
            })
          ) : (
            <Box ta="center" py={60}>
              <Text size="lg" c="dimmed">
                No integrations found matching &quot;{searchQuery}&quot;
              </Text>
            </Box>
          )}
        </Container>
      </Box>

      {/* CTA Section */}
      <WebsiteCTA
        title="Missing an Integration?"
        subtitle="We're constantly adding new integrations. Let us know what tools you use and we'll prioritize them."
        primaryAction={{
          label: "Request an Integration",
          href: "mailto:support@growthmind.ai?subject=Integration Request",
        }}
        withBackground
        icon={null}
      />

      <Footer />
    </Box>
  );
}

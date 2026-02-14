"use client";

import { motion } from "framer-motion";
import {
  Anchor,
  Box,
  Container,
  List,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import classes from "../website.module.css";

export function TermsClient() {
  return (
    <Box className={classes.root}>
      <Header />

      {/* Hero Section */}
      <Box
        className={classes.hero}
        style={{ minHeight: "300px", paddingTop: "120px" }}
      >
        <div className={classes.gridBg} />
        <div className={classes.floatingOrb1} />
        <div className={classes.floatingOrb2} />

        <Container size="lg" className={classes.heroContent}>
          <Stack align="center" gap="xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Title order={1} ta="center" className={classes.heroTitle}>
                Terms and Conditions
              </Title>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Text size="lg" c="dimmed" ta="center">
                Last updated: 19th January 2026
              </Text>
            </motion.div>
          </Stack>
        </Container>
      </Box>

      {/* Content */}
      <Box py={80}>
        <Container size="md">
          <Stack gap="xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Text size="lg" c="dimmed">
                These Terms and Conditions (&quot;Terms&quot;) govern your use
                of the Growthmind website and platform (together, the
                &quot;Services&quot;). By accessing or using Growthmind, you
                agree to be bound by these Terms. If you do not agree, you must
                not use the Services.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                About Growthmind
              </Title>
              <Text c="dimmed">
                Growthmind is an AI-powered growth platform designed to help
                businesses plan, execute, and optimise growth activities. The
                Services are provided for business and informational purposes
                only.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                Use of the Services
              </Title>
              <Text c="dimmed" mb="md">
                You agree to use Growthmind only for lawful purposes and in
                accordance with these Terms.
              </Text>
              <Text c="dimmed" mb="md">
                You must not:
              </Text>
              <List withPadding spacing="xs" mb="md">
                <List.Item>
                  <Text c="dimmed">
                    Use the Services in any way that is unlawful, fraudulent, or
                    harmful
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Attempt to gain unauthorised access to the platform,
                    systems, or data
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Interfere with or disrupt the integrity or performance of
                    the Services
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Reverse engineer, decompile, or attempt to extract source
                    code or models
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Use the Services to infringe the rights of others or
                    transmit malicious content
                  </Text>
                </List.Item>
              </List>
              <Text c="dimmed">
                We reserve the right to suspend or terminate access if these
                Terms are breached.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                Accounts and Access
              </Title>
              <Text c="dimmed" mb="md">
                If you create an account, you are responsible for:
              </Text>
              <List withPadding spacing="xs" mb="md">
                <List.Item>
                  <Text c="dimmed">
                    Maintaining the confidentiality of your login credentials
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    All activity that occurs under your account
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Ensuring information provided is accurate and up to date
                  </Text>
                </List.Item>
              </List>
              <Text c="dimmed">
                You must notify us promptly of any unauthorised use of your
                account.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                AI-Generated Outputs
              </Title>
              <Text c="dimmed" mb="md">
                Growthmind uses AI and automated systems to generate strategies,
                recommendations, tasks, and content based on user inputs.
              </Text>
              <Text c="dimmed" mb="md">
                You acknowledge and agree that:
              </Text>
              <List withPadding spacing="xs" mb="md">
                <List.Item>
                  <Text c="dimmed">
                    Outputs are generated algorithmically and may not always be
                    accurate, complete, or suitable for your specific
                    circumstances
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Growthmind does not provide legal, financial, or
                    professional advice
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    You are responsible for reviewing, validating, and deciding
                    how to use any outputs
                  </Text>
                </List.Item>
              </List>
              <Text c="dimmed">
                Use of AI-generated outputs is at your own risk.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                Intellectual Property
              </Title>
              <Text c="dimmed" mb="md">
                All intellectual property rights in the Growthmind platform,
                including software, models, design, text, graphics, and
                branding, are owned by Growthmind or its licensors.
              </Text>
              <Text c="dimmed" mb="md">
                You are granted a limited, non-exclusive, non-transferable
                licence to use the Services for your internal business purposes
                only.
              </Text>
              <Text c="dimmed">
                You must not copy, modify, distribute, sell, or create
                derivative works from any part of the Services without prior
                written permission.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                User Content
              </Title>
              <Text c="dimmed" mb="md">
                If you submit content to Growthmind (including data, text, or
                materials), you:
              </Text>
              <List withPadding spacing="xs" mb="md">
                <List.Item>
                  <Text c="dimmed">Retain ownership of your content</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Grant Growthmind a non-exclusive, royalty-free licence to
                    use, process, and display it solely to provide and improve
                    the Services
                  </Text>
                </List.Item>
              </List>
              <Text c="dimmed">
                You confirm that you have the right to submit such content and
                that it does not infringe third-party rights or applicable laws.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                Third-Party Services and Integrations
              </Title>
              <Text c="dimmed" mb="md">
                The Services may integrate with or link to third-party tools,
                platforms, or websites.
              </Text>
              <Text c="dimmed" mb="md">
                Growthmind is not responsible for:
              </Text>
              <List withPadding spacing="xs" mb="md">
                <List.Item>
                  <Text c="dimmed">
                    The availability or performance of third-party services
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    The content, policies, or practices of third parties
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Any loss or damage arising from third-party integrations
                  </Text>
                </List.Item>
              </List>
              <Text c="dimmed">
                Your use of third-party services is governed by their own terms
                and policies.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                Availability and Changes
              </Title>
              <Text c="dimmed" mb="md">
                We aim to provide a reliable service but do not guarantee
                uninterrupted or error-free operation.
              </Text>
              <Text c="dimmed" mb="md">
                We may:
              </Text>
              <List withPadding spacing="xs" mb="md">
                <List.Item>
                  <Text c="dimmed">
                    Modify, update, or discontinue features or parts of the
                    Services
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Carry out maintenance or updates that affect availability
                  </Text>
                </List.Item>
              </List>
              <Text c="dimmed">
                We are not liable for any resulting downtime or changes.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                Limitation of Liability
              </Title>
              <Text c="dimmed" mb="md">
                To the maximum extent permitted by law:
              </Text>
              <List withPadding spacing="xs" mb="md">
                <List.Item>
                  <Text c="dimmed">
                    Growthmind shall not be liable for any indirect, incidental,
                    consequential, or special damages
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Growthmind shall not be liable for loss of profits, revenue,
                    data, or business opportunities
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Use of the Services is at your own risk
                  </Text>
                </List.Item>
              </List>
              <Text c="dimmed">
                Nothing in these Terms excludes liability that cannot be
                excluded under applicable law.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                Indemnity
              </Title>
              <Text c="dimmed" mb="md">
                You agree to indemnify and hold Growthmind harmless from any
                claims, damages, or losses arising from:
              </Text>
              <List withPadding spacing="xs">
                <List.Item>
                  <Text c="dimmed">Your misuse of the Services</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">Your content</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">Your breach of these Terms</Text>
                </List.Item>
              </List>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                Termination
              </Title>
              <Text c="dimmed" mb="md">
                We may suspend or terminate your access to the Services at any
                time if you breach these Terms or misuse the platform.
              </Text>
              <Text c="dimmed">
                Upon termination, your right to use the Services will cease
                immediately.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                Governing Law
              </Title>
              <Text c="dimmed" mb="md">
                These Terms are governed by and construed in accordance with the
                laws of <strong>England and Wales</strong>.
              </Text>
              <Text c="dimmed">
                The courts of England and Wales shall have exclusive
                jurisdiction.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                Changes to These Terms
              </Title>
              <Text c="dimmed">
                We may update these Terms from time to time. Any changes will be
                posted on this page and will take effect immediately upon
                publication. Continued use of the Services constitutes
                acceptance of the updated Terms.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                Contact Us
              </Title>
              <Text c="dimmed" mb="md">
                If you have any questions about these Terms and Conditions,
                please contact us at:
              </Text>
              <Text c="dimmed">
                <strong>Email:</strong>{" "}
                <Anchor href="mailto:support@growthmind.ai">
                  support@growthmind.ai
                </Anchor>
              </Text>
            </motion.div>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

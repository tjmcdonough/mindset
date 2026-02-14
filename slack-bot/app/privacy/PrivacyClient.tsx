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

export function PrivacyClient() {
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
                Privacy Policy
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
                This Privacy Policy explains how Growthmind (&quot;we&quot;,
                &quot;us&quot;, or &quot;our&quot;) collects, uses, stores, and
                protects personal data when you visit our website or use the
                Growthmind platform and services.
              </Text>
              <Text size="lg" c="dimmed" mt="md">
                We are committed to protecting your privacy and handling your
                personal data in a transparent and secure manner, in accordance
                with the UK General Data Protection Regulation (UK GDPR) and
                applicable data protection laws.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                Who We Are
              </Title>
              <Text c="dimmed">
                Growthmind is an AI-powered growth platform designed to help
                startups and businesses plan, execute, and optimise growth
                activities.
              </Text>
              <Text c="dimmed" mt="md">
                For the purposes of data protection law, Growthmind acts as a{" "}
                <strong>data controller</strong> in relation to personal data
                collected through our website and platform.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                Information We Collect
              </Title>

              <Title order={4} mb="sm">
                Information You Provide to Us
              </Title>
              <Text c="dimmed" mb="md">
                We may collect personal information when you:
              </Text>
              <List withPadding spacing="xs" mb="md">
                <List.Item>
                  <Text c="dimmed">Create an account</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">Submit forms on our website</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">Contact us for support or enquiries</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Use features of the Growthmind platform
                  </Text>
                </List.Item>
              </List>
              <Text c="dimmed" mb="md">
                This information may include:
              </Text>
              <List withPadding spacing="xs">
                <List.Item>
                  <Text c="dimmed">Name</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">Email address</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">Company name</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">Role or job title</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Any other information you choose to provide
                  </Text>
                </List.Item>
              </List>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={4} mb="sm">
                Information Collected Automatically
              </Title>
              <Text c="dimmed" mb="md">
                When you access our website or platform, we may automatically
                collect:
              </Text>
              <List withPadding spacing="xs" mb="md">
                <List.Item>
                  <Text c="dimmed">IP address</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">Browser type and version</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Device and operating system information
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Usage data, interaction logs, and feature activity
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">Date and time of access</Text>
                </List.Item>
              </List>
              <Text c="dimmed">
                This data helps us understand how Growthmind is used and improve
                performance and reliability.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                How We Use Your Information
              </Title>
              <Text c="dimmed" mb="md">
                We use personal data for the following purposes:
              </Text>
              <List withPadding spacing="xs" mb="md">
                <List.Item>
                  <Text c="dimmed">
                    To provide, operate, and maintain the Growthmind platform
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    To generate strategies, tasks, and insights based on user
                    inputs
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    To communicate with you, including support and
                    service-related messages
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    To improve our product, features, and user experience
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    To monitor usage, performance, and security
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    To comply with legal and regulatory obligations
                  </Text>
                </List.Item>
              </List>
              <Text c="dimmed">
                We only process personal data where we have a lawful basis to do
                so, such as performance of a contract, legitimate interests,
                consent, or legal obligation.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                AI and Automated Processing
              </Title>
              <Text c="dimmed" mb="md">
                Growthmind uses AI and automated systems to analyse inputs and
                generate outputs such as strategies, recommendations, and
                content.
              </Text>
              <Text c="dimmed">
                These systems operate based on the data provided by users and
                platform activity. Growthmind does not use personal data to make
                automated decisions that produce legal or similarly significant
                effects on individuals.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                Cookies
              </Title>
              <Text c="dimmed" mb="md">
                We use cookies and similar technologies to:
              </Text>
              <List withPadding spacing="xs" mb="md">
                <List.Item>
                  <Text c="dimmed">Enable core website functionality</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">Analyse usage and performance</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">Improve user experience</Text>
                </List.Item>
              </List>
              <Text c="dimmed">
                You can manage or disable cookies through your browser settings.
                Disabling cookies may limit certain functionality of the website
                or platform.
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
                We may use trusted third-party providers to support our
                services, such as:
              </Text>
              <List withPadding spacing="xs" mb="md">
                <List.Item>
                  <Text c="dimmed">Hosting and infrastructure providers</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">Analytics tools</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">Authentication services</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">Payment processors</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Integrated marketing or CRM platforms (when enabled by
                    users)
                  </Text>
                </List.Item>
              </List>
              <Text c="dimmed" mb="md">
                These providers process data only as necessary to provide their
                services and are subject to contractual data protection
                obligations.
              </Text>
              <Text c="dimmed">
                Each third party operates under its own privacy policy.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                Data Security
              </Title>
              <Text c="dimmed" mb="md">
                We implement appropriate technical and organisational measures
                to protect personal data against unauthorised access, loss,
                misuse, alteration, or disclosure.
              </Text>
              <Text c="dimmed">
                While we take security seriously, no system is completely
                secure, and we cannot guarantee absolute security of data
                transmitted over the internet.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                Data Retention
              </Title>
              <Text c="dimmed" mb="md">
                We retain personal data only for as long as necessary to:
              </Text>
              <List withPadding spacing="xs" mb="md">
                <List.Item>
                  <Text c="dimmed">Provide our services</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Fulfil the purposes described in this policy
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Comply with legal, accounting, or regulatory requirements
                  </Text>
                </List.Item>
              </List>
              <Text c="dimmed">
                When data is no longer required, it is securely deleted or
                anonymised.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                Your Rights
              </Title>
              <Text c="dimmed" mb="md">
                Under UK data protection law, you have the right to:
              </Text>
              <List withPadding spacing="xs" mb="md">
                <List.Item>
                  <Text c="dimmed">Access your personal data</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Request correction of inaccurate or incomplete data
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">Request deletion of your personal data</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Restrict or object to certain processing
                  </Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">Request data portability</Text>
                </List.Item>
                <List.Item>
                  <Text c="dimmed">
                    Withdraw consent where processing is based on consent
                  </Text>
                </List.Item>
              </List>
              <Text c="dimmed">
                To exercise these rights, please contact us using the details
                below.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                International Data Transfers
              </Title>
              <Text c="dimmed">
                If personal data is transferred outside the UK, we ensure
                appropriate safeguards are in place, such as standard
                contractual clauses or equivalent protections.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Title order={3} mb="md">
                Changes to This Policy
              </Title>
              <Text c="dimmed">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page, and the &quot;last updated&quot;
                date will be updated accordingly.
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
                If you have any questions about this Privacy Policy or how
                Growthmind handles personal data, please contact us at:
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

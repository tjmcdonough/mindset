"use client";

import { useState, useCallback } from "react";
import { Container, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { FadeInLeft, FadeInRight, FadeInUp } from "../components/animations";
import { ContactInfoCard } from "../components/ContactInfoCard";
import { ContactForm, FormSuccessMessage } from "../components/forms";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SubpageHero } from "../components/SubpageHero";
import { GradientText } from "../components/animations";
import { CONTACT_INFO, CONTACT_PAGE } from "../data/contact";
import classes from "../website.module.css";

/** Base animation delay for staggered contact cards */
const CARD_ANIMATION_BASE_DELAY = 0.4;
/** Delay increment between each contact card */
const CARD_ANIMATION_STAGGER = 0.1;

/**
 * Contact page client component.
 * Displays contact information and a contact form with animations.
 */
export function ContactClient() {
  const [submitted, setSubmitted] = useState(false);

  const handleFormSuccess = useCallback(() => {
    setSubmitted(true);
  }, []);

  const handleReset = useCallback(() => {
    setSubmitted(false);
  }, []);

  return (
    <main className={classes.root}>
      <Header />

      {/* Hero Section */}
      <SubpageHero
        badge={{ text: CONTACT_PAGE.badge }}
        title={
          <>
            {CONTACT_PAGE.title.split(" ").slice(0, -1).join(" ")}{" "}
            <GradientText>
              {CONTACT_PAGE.title.split(" ").slice(-1)}
            </GradientText>
          </>
        }
        subtitle={CONTACT_PAGE.subtitle}
        minHeight={400}
      />

      <Container size="xl" pb={80}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60}>
          {/* Contact Info Sidebar */}
          <FadeInLeft delay={0.2}>
            <Stack gap="xl">
              <Text size="lg" fw={500}>
                {CONTACT_PAGE.sidebarTitle}
              </Text>
              <Text c="dimmed">{CONTACT_PAGE.sidebarDescription}</Text>

              <Stack gap="md" mt="xl">
                {CONTACT_INFO.map((contact, index) => (
                  <ContactInfoCard
                    key={contact.title}
                    contact={contact}
                    delay={
                      CARD_ANIMATION_BASE_DELAY + index * CARD_ANIMATION_STAGGER
                    }
                  />
                ))}
              </Stack>
            </Stack>
          </FadeInLeft>

          {/* Contact Form */}
          <FadeInRight delay={0.2}>
            <Paper p="xl" className={classes.featureCard} radius="lg">
              {submitted ? (
                <FormSuccessMessage
                  title="Message received!"
                  description="Thanks for reaching out. We'll get back to you shortly."
                  onReset={handleReset}
                />
              ) : (
                <FadeInUp>
                  <ContactForm onSuccess={handleFormSuccess} />
                </FadeInUp>
              )}
            </Paper>
          </FadeInRight>
        </SimpleGrid>
      </Container>

      <Footer />
    </main>
  );
}

"use client";

import { Box } from "@mantine/core";
import { ByTheNumbersStrip } from "./ByTheNumbersStrip";
import { FAQSection } from "./FAQSection";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { InterrogationExplainerSection } from "./InterrogationExplainerSection";
import { IsAndIsNotSection } from "./IsAndIsNotSection";
import { ProblemSection } from "./ProblemSection";
import { WebsiteCTA } from "./WebsiteCTA";
import { WhoIsThisForSection } from "./WhoIsThisForSection";
import classes from "../website.module.css";

export function HomeClient() {
  return (
    <Box className={classes.root}>
      <Header />

      {/* 1. Hero - What is Growthmind & why it exists */}
      <HeroSection />

      {/* Section divider */}
      <Box className={classes.sectionDivider} />

      {/* 2. Core Problem - Why growth is challenging for founders */}
      <ProblemSection />

      {/* 2b. Big numbers strip - breaks up text, reinforces the pain */}
      <ByTheNumbersStrip />

      {/* 3. What Interrogation AI actually is and means */}
      <InterrogationExplainerSection />

      {/* Section divider */}
      <Box className={classes.sectionDivider} />

      {/* 4. What Growthmind IS and IS NOT */}
      <IsAndIsNotSection />

      {/* Section divider */}
      <Box className={classes.sectionDivider} />

      {/* 5. How Growthmind works & what you get */}
      <Box id="how-it-works">
        <HowItWorksSection />
      </Box>

      {/* Section divider */}
      <Box className={classes.sectionDivider} />

      {/* 6. Who is this for */}
      <WhoIsThisForSection />

      {/* Section divider */}
      <Box className={classes.sectionDivider} />

      {/* 8. FAQ */}
      <FAQSection />

      {/* 9. Final CTA - concrete, no commitment, time estimate */}
      <WebsiteCTA
        title="Ready to Get More Customers?"
        subtitle="Start your growth engine today. Join the founders using Growthmind to build what people want."
        primaryAction={{
          label: "Get More Customers",
          href: "/diagnosis",
        }}
        secondaryAction={{
          label: "See Example Reports",
          href: "/case-studies",
        }}
      />

      <Footer />
    </Box>
  );
}

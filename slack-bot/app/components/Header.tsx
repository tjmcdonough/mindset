"use client";

import Image from "next/image";
import Link from "next/link";
import {
  IconMoon,
  IconSun,
  IconDeviceDesktop,
  IconChevronRight,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ActionIcon,
  Anchor,
  Burger,
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  Modal,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import { useSyncExternalStore } from "react";
import { ProductMenu } from "./ProductMenu";
import { FreeGrowthForm } from "./forms/FreeGrowthForm";
import classes from "../website.module.css";

const COLOR_SCHEME_CYCLE = ["light", "dark", "auto"] as const;
type ColorScheme = (typeof COLOR_SCHEME_CYCLE)[number];

const COLOR_SCHEME_CONFIG: Record<
  ColorScheme,
  { icon: typeof IconSun; label: string }
> = {
  light: { icon: IconSun, label: "Light mode" },
  dark: { icon: IconMoon, label: "Dark mode" },
  auto: { icon: IconDeviceDesktop, label: "System preference" },
};

/**
 * Navigation links for the header (excluding Product which uses a mega menu)
 */
const NAV_LINKS = [
  { label: "Founder Mirror", href: "/founder-mirror" },
  { label: "Integrations", href: "/integrations" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blogs" },
];

/**
 * All navigation links including Product (used for mobile menu)
 */
const ALL_NAV_LINKS = [
  { label: "Product", href: "/product" },
  ...NAV_LINKS,
];

export function Header() {
  const [scroll] = useWindowScroll();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isScrolled = scroll.y > 50;

  const cycleColorScheme = () => {
    const currentIndex = COLOR_SCHEME_CYCLE.indexOf(
      colorScheme as ColorScheme,
    );
    const nextScheme =
      COLOR_SCHEME_CYCLE[(currentIndex + 1) % COLOR_SCHEME_CYCLE.length];
    setColorScheme(nextScheme);
  };

  const effectiveColorScheme = mounted
    ? (colorScheme as ColorScheme)
    : ("auto" as ColorScheme);
  const { icon: SchemeIcon, label: schemeLabel } =
    COLOR_SCHEME_CONFIG[effectiveColorScheme] ?? COLOR_SCHEME_CONFIG.auto;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={classes.header}
        style={{
          background: isScrolled
            ? "var(--website-header-bg-scrolled)"
            : "var(--website-header-bg)",
          borderBottomColor: isScrolled
            ? "var(--website-border)"
            : "transparent",
        }}
      >
        <Container size="xl">
          <Group justify="space-between">
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none" }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/logo.svg"
                  alt="Growthmind"
                  width={160}
                  height={40}
                  priority
                  style={{ cursor: "pointer" }}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <Group gap="xl" visibleFrom="md">
              {/* Product Mega Menu */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -2 }}
              >
                <ProductMenu navLinkClassName={classes.navLink} />
              </motion.div>

              {/* Other nav links */}
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1) + 0.3 }}
                  whileHover={{ y: -2 }}
                >
                  <Anchor href={link.href} className={classes.navLink}>
                    {link.label}
                  </Anchor>
                </motion.div>
              ))}
            </Group>

            {/* CTA Buttons — Desktop */}
            <Group gap="md">
              <Tooltip label={schemeLabel} position="bottom" withArrow>
                <ActionIcon
                  variant="subtle"
                  size="lg"
                  onClick={cycleColorScheme}
                  aria-label={`Current: ${schemeLabel}. Click to cycle theme.`}
                  color="gray"
                  visibleFrom="md"
                >
                  <SchemeIcon size={18} />
                </ActionIcon>
              </Tooltip>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={openModal}
                  className={classes.ctaButton}
                  visibleFrom="md"
                >
                  Get Free Strategy
                </Button>
              </motion.div>

              {/* Mobile menu button */}
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="md"
                size="sm"
                color="var(--website-foreground)"
              />
            </Group>
          </Group>
        </Container>
      </motion.header>

      {/* Mobile Drawer — Premium UX */}
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size="320"
        withCloseButton={false}
        styles={{
          content: {
            background: "var(--mantine-color-body)",
          },
          body: {
            padding: 0,
          },
          header: { display: "none" },
        }}
      >
        {/* Drawer header */}
        <Group justify="space-between" px="lg" pt="lg" pb="sm">
          <Link href="/" onClick={close} style={{ textDecoration: "none" }}>
            <Image
              src="/logo.svg"
              alt="Growthmind"
              width={130}
              height={32}
              priority
            />
          </Link>
          <ActionIcon
            variant="subtle"
            size="lg"
            onClick={close}
            aria-label="Close menu"
            color="gray"
            radius="xl"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </ActionIcon>
        </Group>

        <Divider color="var(--website-border)" />

        {/* Navigation links */}
        <Stack gap={0} px="sm" pt="sm">
          <AnimatePresence>
            {ALL_NAV_LINKS.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.25 }}
              >
                <UnstyledButton
                  component="a"
                  href={link.href}
                  onClick={close}
                  className={classes.mobileDrawerLink}
                >
                  <Text fw={500} size="md">
                    {link.label}
                  </Text>
                  <IconChevronRight size={16} style={{ opacity: 0.4 }} />
                </UnstyledButton>
              </motion.div>
            ))}
          </AnimatePresence>

          <Divider color="var(--website-border)" my="sm" mx="sm" />

          {/* Theme toggle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.25 }}
          >
            <UnstyledButton
              onClick={cycleColorScheme}
              className={classes.mobileDrawerLink}
            >
              <Group gap="xs">
                <SchemeIcon size={18} />
                <Text fw={500} size="md">
                  {schemeLabel}
                </Text>
              </Group>
            </UnstyledButton>
          </motion.div>
        </Stack>
      </Drawer>

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
    </>
  );
}

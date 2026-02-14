"use client";

import Image from "next/image";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  ActionIcon,
  Anchor,
  Box,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import classes from "../website.module.css";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

const FOOTER_LINKS: FooterLinkGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Product", href: "/product" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Integrations", href: "/integrations" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blogs" },
      { label: "Documentation", href: "/docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    icon: IconBrandTwitter,
    href: "https://twitter.com/growthmind-ai",
    label: "Twitter",
  },
  {
    icon: IconBrandLinkedin,
    href: "https://linkedin.com/company/growthmind-inc",
    label: "LinkedIn",
  },
  {
    icon: IconBrandGithub,
    href: "https://github.com/growthmind",
    label: "GitHub",
  },
];

export function Footer() {
  return (
    <Box component="footer" className={classes.footer}>
      <Container size="xl">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 5 }} spacing="xl" mb="xl">
          {/* Brand column */}
          <Stack gap="md">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Image src="/logo.svg" alt="Growthmind" width={140} height={35} />
            </motion.div>
            <Text size="sm" c="dimmed" maw={200}>
              Know what to validate next. Built for teams without a growth team.
            </Text>
            <Group gap="xs">
              {SOCIAL_LINKS.map((social) => (
                <motion.div
                  key={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ActionIcon
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="subtle"
                    size="lg"
                    className={classes.socialIcon}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </ActionIcon>
                </motion.div>
              ))}
            </Group>
          </Stack>

          {/* Link columns */}
          {FOOTER_LINKS.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1 }}
            >
              <Stack gap="xs">
                <Text fw={600} size="sm" mb="xs">
                  {group.title}
                </Text>
                {group.links.map((link) => (
                  <motion.div key={link.label} whileHover={{ x: 3 }}>
                    <Anchor
                      href={link.href}
                      className={classes.footerLink}
                      {...(link.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      {link.label}
                    </Anchor>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          ))}
        </SimpleGrid>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Box className={classes.footerBottom}>
            <Text size="sm" c="dimmed">
              © {new Date().getFullYear()} Growthmind. All rights reserved.
            </Text>
            <Group gap="md">
              <Text size="xs" c="dimmed">
                Built with ❤️ for teams who ship
              </Text>
            </Group>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

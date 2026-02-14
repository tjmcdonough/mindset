"use client";

import Link from "next/link";
import { IconArrowLeft, IconClock } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import type { BlogPost } from "../blog.data";
import classes from "../blogs.module.css";

interface BlogDetailClientProps {
  post: BlogPost;
  content: string;
}

export function BlogDetailClient({ post, content }: BlogDetailClientProps) {
  // Remove YAML frontmatter and first H1 from content since we display the title separately
  const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n*/, "");
  const contentWithoutTitle = contentWithoutFrontmatter.replace(
    /^#\s+.+\n+/,
    "",
  );

  return (
    <Box className={classes.root}>
      <Header />

      {/* Article Hero */}
      <Box className={classes.articleHero}>
        <Container size="md">
          <Stack gap="lg">
            <Button
              component={Link}
              href="/blogs"
              variant="subtle"
              leftSection={<IconArrowLeft size={16} />}
              className={classes.backLink}
            >
              Back to Blog
            </Button>

            <Group gap="xs">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="light" color="cyan" size="sm">
                  {tag}
                </Badge>
              ))}
            </Group>

            <Title order={1} className={classes.articleTitle}>
              {post.title}
            </Title>

            <Group justify="space-between" wrap="wrap">
              <Group gap="md">
                <Avatar src={post.authorAvatar} size="md" radius="xl" />
                <Box>
                  <Text fw={600}>{post.author}</Text>
                  <Text size="sm" c="dimmed">
                    {post.authorRole}
                  </Text>
                </Box>
              </Group>

              <Group gap="lg">
                <Group gap="xs">
                  <IconClock size={16} className={classes.mutedIcon} />
                  <Text size="sm" c="dimmed">
                    {post.readTime}
                  </Text>
                </Group>
                <Text size="sm" c="dimmed">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Text>
              </Group>
            </Group>

            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                radius="md"
                mt="md"
              />
            )}
          </Stack>
        </Container>
      </Box>

      {/* Article Content */}
      <Box className={classes.articleContent}>
        <Container size="md">
          <Card className={classes.articleCard} p="xl">
            <Box className={classes.markdownContent}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {contentWithoutTitle}
              </ReactMarkdown>
            </Box>

            <Divider my="xl" />

            {/* Author Bio */}
            <Group gap="md">
              <Avatar src={post.authorAvatar} size="lg" radius="xl" />
              <Box>
                <Text fw={600}>{post.author}</Text>
                <Text size="sm" c="dimmed">
                  {post.authorRole} at Growthmind
                </Text>
              </Box>
            </Group>
          </Card>

          {/* CTA */}
          <Card className={classes.articleCard} mt="xl" p="xl">
            <Stack align="center" gap="md">
              <Title order={3} ta="center">
                Ready to stop guessing?
              </Title>
              <Text c="dimmed" ta="center">
                Get your free assessment and run your first focused experiment
                this week.
              </Text>
              <Button
                component="a"
                href="/diagnosis"
                size="lg"
                className={classes.ctaButton}
              >
                Start Free Trial
              </Button>
            </Stack>
          </Card>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

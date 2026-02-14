"use client";

import Link from "next/link";
import { IconArrowLeft, IconClock } from "@tabler/icons-react";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import type { BlogPost } from "./blog.data";
import classes from "./blogs.module.css";

interface BlogsClientProps {
  posts: BlogPost[];
}

export function BlogsClient({ posts }: BlogsClientProps) {
  return (
    <Box className={classes.root}>
      <Header />

      {/* Hero Section */}
      <Box className={classes.heroSection}>
        <Container size="lg">
          <Stack align="center" gap="md">
            <Button
              component={Link}
              href="/"
              variant="subtle"
              leftSection={<IconArrowLeft size={16} />}
              className={classes.backLink}
            >
              Back to Home
            </Button>
            <Title order={1} ta="center" className={classes.pageTitle}>
              <span className={classes.gradientText}>Growthmind</span> Blog
            </Title>
            <Text size="xl" c="dimmed" ta="center" maw={600}>
              Insights on AI-powered growth, product design, and building
              focused experiments for startups
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* Blog Posts Grid */}
      <Box className={classes.postsSection}>
        <Container size="xl">
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {posts.map((post) => (
              <Card
                key={post.slug}
                component={Link}
                href={`/blogs/${post.slug}`}
                className={classes.postCard}
              >
                <Stack gap="md">
                  <Group gap="xs">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="light" color="cyan" size="sm">
                        {tag}
                      </Badge>
                    ))}
                    {post.featured && (
                      <Badge variant="filled" color="violet" size="sm">
                        Featured
                      </Badge>
                    )}
                  </Group>

                  <Title order={3} className={classes.postTitle}>
                    {post.title}
                  </Title>

                  <Text c="dimmed" lineClamp={3}>
                    {post.summary}
                  </Text>

                  <Group justify="space-between" mt="auto">
                    <Group gap="xs">
                      <IconClock size={14} className={classes.mutedIcon} />
                      <Text size="sm" c="dimmed">
                        {post.readTime}
                      </Text>
                    </Group>
                    <Text size="sm" c="dimmed">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </Text>
                  </Group>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>

          {posts.length === 0 && (
            <Box ta="center" py="xl">
              <Text c="dimmed">No blog posts yet. Check back soon!</Text>
            </Box>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

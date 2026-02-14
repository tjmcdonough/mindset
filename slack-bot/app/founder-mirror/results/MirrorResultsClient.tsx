"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { IconArrowRight, IconLock } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { GradientText } from "../../components/animations";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import classes from "../../website.module.css";

interface Insight {
  severity: "critical" | "warning" | "strength";
  headline: string;
  detail: string;
}

interface MirrorResult {
  companyName: string;
  insights: Insight[];
  findings?: string[];
  checkpoints?: Checkpoint[];
  tier: number;
}

interface AnswerEntry {
  selected: string;
  detail: string | null;
}

interface CheckpointOption {
  label: string;
  reveals_textarea: boolean;
  textarea_placeholder?: string;
}

interface Checkpoint {
  key: string;
  finding: string;
  question: string;
  options: CheckpointOption[];
}

const FALLBACK_CHECKPOINTS: Checkpoint[] = [
  {
    key: "traction",
    finding: "Based on our analysis of your website...",
    question: "How many people are actually using this?",
    options: [
      { label: "Nobody yet", reveals_textarea: false },
      { label: "A handful of early users", reveals_textarea: false },
      { label: "20+", reveals_textarea: true, textarea_placeholder: "Tell us more - paying? Free? Active?" },
    ],
  },
  {
    key: "customer_contact",
    finding: "Looking at your market positioning...",
    question: "When did you last talk to someone who might pay?",
    options: [
      { label: "This week", reveals_textarea: false },
      { label: "It's been a while", reveals_textarea: true, textarea_placeholder: "What's been stopping you?" },
      { label: "I haven't yet", reveals_textarea: false },
    ],
  },
  {
    key: "commitment",
    finding: "From what we can see publicly...",
    question: "What would make you walk away from this?",
    options: [
      { label: "No traction after 6 months", reveals_textarea: false },
      { label: "Running out of money", reveals_textarea: false },
      { label: "Nothing - I'm all in", reveals_textarea: true, textarea_placeholder: "What keeps you going?" },
    ],
  },
];

const PROCESSING_STEPS = [
  { emoji: "🔍", text: "Scanning website..." },
  { emoji: "📊", text: "Analysing market position..." },
  { emoji: "🧠", text: "Profiling founder psychology..." },
  { emoji: "⚡", text: "Generating uncomfortable truths..." },
  { emoji: "✅", text: "Mirror ready." },
];

const DEEP_PROCESSING_STEPS = [
  { emoji: "🔬", text: "Cross-referencing your answers..." },
  { emoji: "💀", text: "Finding contradictions..." },
  { emoji: "🪞", text: "Generating your real mirror..." },
];

const SEVERITY_CONFIG = {
  critical: { emoji: "🔴", color: "red", label: "Critical" },
  warning: { emoji: "🟡", color: "yellow", label: "Warning" },
  strength: { emoji: "🟢", color: "green", label: "Strength" },
};

type Phase = "processing" | "tier1Results" | "interrogation" | "deepProcessing" | "tier2Results";

function MirrorResultsInner() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "";

  const [phase, setPhase] = useState<Phase>("processing");
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [result, setResult] = useState<MirrorResult | null>(null);
  const [visibleInsights, setVisibleInsights] = useState(0);
  const [websiteContent, setWebsiteContent] = useState("");

  // Findings from tier 1
  const [findings, setFindings] = useState<string[]>([]);

  // Dynamic checkpoints from Gemini
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);

  // Interrogation state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerEntry>>({});

  // Deep results state
  const [deepResult, setDeepResult] = useState<{ insights: Insight[]; tier: number } | null>(null);
  const [deepStep, setDeepStep] = useState(0);
  const [deepCompletedSteps, setDeepCompletedSteps] = useState<number[]>([]);
  const [deepVisibleInsights, setDeepVisibleInsights] = useState(0);

  // Fetch mirror data
  const fetchMirror = useCallback(async () => {
    try {
      const res = await fetch("/api/mirror", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (res.ok) {
        const data = await res.json();
        setResult(data as MirrorResult);
        const findings = (data.findings || []).map((f: unknown) =>
          typeof f === "object" && f !== null && "finding" in f ? (f as Record<string, string>).finding : f
        );
        setFindings(findings);
        // Store checkpoints from Gemini
        const cp = data.checkpoints && data.checkpoints.length > 0 ? data.checkpoints : FALLBACK_CHECKPOINTS;
        setCheckpoints(cp);
        // Store website content for tier 2
        setWebsiteContent(data.websiteContent || "");
      }
    } catch {
      setResult({
        companyName: "Your Startup",
        insights: [
          {
            severity: "warning",
            headline: "Your website is doing the talking, but is anyone listening?",
            detail:
              "Most startups build beautiful sites that speak to themselves. The question isn't whether your product is good — it's whether anyone who needs it can find it, understand it, and trust it in under 10 seconds.",
          },
          {
            severity: "critical",
            headline: "You're optimising for features when you should be optimising for signal",
            detail:
              "Every feature you add without customer validation is a bet. How many of those bets have you validated? If the answer is 'we'll know when we launch' - that's the problem.",
          },
        ],
        tier: 1,
      });
    }
  }, [url]);

  // Processing animation sequence
  useEffect(() => {
    if (phase !== "processing") return;

    fetchMirror();

    const stepDurations = [2000, 2000, 2000, 2000, 1000];
    let elapsed = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < PROCESSING_STEPS.length; i++) {
      timers.push(setTimeout(() => setCurrentStep(i), elapsed));
      timers.push(setTimeout(() => setCompletedSteps((prev) => [...prev, i]), elapsed + stepDurations[i] - 400));
      elapsed += stepDurations[i];
    }

    timers.push(setTimeout(() => setPhase("tier1Results"), elapsed + 500));

    return () => timers.forEach(clearTimeout);
  }, [phase, fetchMirror]);

  // Reveal tier 1 insights one by one
  useEffect(() => {
    if (phase !== "tier1Results" || !result) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const maxVisible = Math.min(result.insights.length, 3);

    for (let i = 0; i < maxVisible; i++) {
      timers.push(setTimeout(() => setVisibleInsights(i + 1), i * 1200));
    }

    return () => timers.forEach(clearTimeout);
  }, [phase, result]);

  // Deep processing animation
  useEffect(() => {
    if (phase !== "deepProcessing") return;

    const stepDurations = [1500, 1500, 1000];
    let elapsed = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < DEEP_PROCESSING_STEPS.length; i++) {
      timers.push(setTimeout(() => setDeepStep(i), elapsed));
      timers.push(setTimeout(() => setDeepCompletedSteps((prev) => [...prev, i]), elapsed + stepDurations[i] - 400));
      elapsed += stepDurations[i];
    }

    timers.push(setTimeout(() => setPhase("tier2Results"), elapsed + 500));

    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // Reveal tier 2 insights
  useEffect(() => {
    if (phase !== "tier2Results" || !deepResult) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const maxVisible = Math.min(deepResult.insights.length, 3);

    for (let i = 0; i < maxVisible; i++) {
      timers.push(setTimeout(() => setDeepVisibleInsights(i + 1), i * 1200));
    }

    return () => timers.forEach(clearTimeout);
  }, [phase, deepResult]);

  const allQuestionsAnswered = checkpoints.length > 0 && checkpoints.every((cp) => {
    const answer = answers[cp.key];
    return answer && answer.selected;
  });

  const handleDeepSubmit = async () => {
    if (!allQuestionsAnswered) return;

    setPhase("deepProcessing");

    try {
      const res = await fetch("/api/mirror/deep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, websiteContent, checkpoints, answers, findings }),
      });
      if (res.ok) {
        const data = await res.json();
        setDeepResult(data as { insights: Insight[]; tier: number });
      }
    } catch {
      const firstAnswer = Object.values(answers)[0];
      setDeepResult({
        insights: [
          {
            severity: "critical",
            headline: "The gap between your website and reality is your biggest risk",
            detail: firstAnswer ? `You said '${firstAnswer.selected}'. That honesty is rare - but the question is what you're doing about it.` : "The disconnect between your website and reality is where startups die.",
          },
          {
            severity: "warning",
            headline: "Your answers reveal more than you think",
            detail: "The pattern in your answers tells a story about where you really are versus where you think you are.",
          },
          {
            severity: "strength",
            headline: "You answered honestly. Most founders can't.",
            detail: "Self-awareness is the prerequisite for everything else. You have it.",
          },
        ],
        tier: 2,
      });
    }
  };

  const renderInsightCard = (insight: Insight, index: number, tier2 = false) => {
    const config = SEVERITY_CONFIG[insight.severity];
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card
          className={classes.featureCard}
          padding="xl"
          data-color={
            insight.severity === "critical" ? "red" : insight.severity === "warning" ? "yellow" : "green"
          }
          style={
            tier2
              ? {
                border: "1px solid rgba(255, 100, 50, 0.3)",
                boxShadow: "0 0 30px rgba(255, 80, 30, 0.08)",
              }
              : undefined
          }
        >
          <Stack gap="sm">
            <Group gap="sm">
              <Text size="xl">{config.emoji}</Text>
              <Badge size="sm" variant="light" color={config.color}>
                {config.label}
              </Badge>
              {tier2 && (
                <Badge size="xs" variant="light" color="orange">
                  Deep Mirror
                </Badge>
              )}
            </Group>
            <Text size="lg" fw={700} lh={1.3}>
              {insight.headline}
            </Text>
            <Text size="sm" c="dimmed" lh={1.6}>
              {insight.detail}
            </Text>
          </Stack>
        </Card>
      </motion.div>
    );
  };

  const renderLockedInsights = (count: number, tier2 = false) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <Card
        padding="xl"
        style={{
          background: "var(--website-card-bg)",
          border: tier2 ? "1px solid rgba(255, 100, 50, 0.2)" : "1px solid var(--website-border)",
          filter: "blur(2px)",
          position: "relative",
          userSelect: "none",
        }}
      >
        <Stack gap="sm">
          <Group gap="sm">
            <Text size="xl">🔴</Text>
            <Badge size="sm" variant="light" color="red">
              Critical
            </Badge>
          </Group>
          <Text size="lg" fw={700}>
            ████████ ████ ██████ ████████
          </Text>
          <Text size="sm" c="dimmed">
            ██████████ ████ ██████ ████████ ██████ ████ ██████████ ████ ██████ ████████ ██████.
          </Text>
        </Stack>
      </Card>

      <Group justify="center" mt="sm">
        <Group gap="xs">
          <IconLock size={16} style={{ color: "var(--website-muted)" }} />
          <Text size="sm" c="dimmed">
            {count} more insight{count !== 1 ? "s" : ""} locked
          </Text>
        </Group>
      </Group>
    </motion.div>
  );

  return (
    <Box className={classes.root}>
      <Header />
      <main>
        <Box
          style={{
            minHeight: "100vh",
            paddingTop: "120px",
            paddingBottom: "80px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className={classes.gridBg} />
          <div className={classes.floatingOrb1} />
          <div className={classes.floatingOrb2} />

          <Container size="md" style={{ position: "relative", zIndex: 10 }}>
            <AnimatePresence mode="wait">
              {/* Phase 1: Processing */}
              {phase === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Stack align="center" gap="xl" pt={60}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Title order={2} ta="center">
                        Analysing{" "}
                        <GradientText animate>
                          {url ? new URL(url).hostname.replace("www.", "") : "your startup"}
                        </GradientText>
                      </Title>
                    </motion.div>

                    <Stack gap="md" w="100%" maw={500} mt="xl">
                      {PROCESSING_STEPS.map((step, index) => (
                        <AnimatePresence key={index}>
                          {currentStep >= index && (
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                              <Group gap="md">
                                <Text size="xl">{step.emoji}</Text>
                                <Text
                                  size="lg"
                                  fw={500}
                                  style={{
                                    color: completedSteps.includes(index)
                                      ? "var(--website-primary)"
                                      : "var(--website-foreground)",
                                    transition: "color 0.3s ease",
                                  }}
                                >
                                  {step.text}
                                </Text>
                                {completedSteps.includes(index) && (
                                  <motion.span
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                    style={{ color: "var(--website-primary)" }}
                                  >
                                    ✓
                                  </motion.span>
                                )}
                              </Group>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      ))}
                    </Stack>

                    <motion.div
                      style={{
                        width: "100%",
                        maxWidth: 500,
                        height: 2,
                        background: "linear-gradient(90deg, transparent, var(--website-primary), transparent)",
                        borderRadius: 1,
                      }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </Stack>
                </motion.div>
              )}

              {/* Phase 2: Tier 1 Results */}
              {phase === "tier1Results" && result && (
                <motion.div
                  key="tier1results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                >
                  <Stack gap="xl" pt={40}>
                    <Stack align="center" gap="sm">
                      <Badge size="lg" variant="light" color="cyan">
                        🪞 Founder Mirror - Level 1
                      </Badge>
                      <Title order={2} ta="center">
                        {result.companyName}
                      </Title>
                      <Text c="dimmed" ta="center">
                        Here&apos;s what we found. Brace yourself.
                      </Text>
                    </Stack>

                    <Stack gap="lg">
                      {result.insights.slice(0, 3).map((insight, index) => (
                        <AnimatePresence key={index}>
                          {visibleInsights > index && renderInsightCard(insight, index)}
                        </AnimatePresence>
                      ))}
                    </Stack>

                    {/* Show interrogation prompt after insights revealed */}
                    {visibleInsights >= Math.min(result.insights.length, 3) && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                      >
                        {renderLockedInsights(3)}

                        <Card
                          padding="xl"
                          mt="xl"
                          style={{
                            background: "var(--website-card-bg)",
                            border: "1px solid rgba(255, 100, 50, 0.3)",
                            boxShadow: "0 0 40px rgba(255, 80, 30, 0.08)",
                          }}
                        >
                          <Stack align="center" gap="md">
                            <Text size="2rem">🔥</Text>
                            <Title order={3} ta="center">
                              Want the real mirror? Answer {checkpoints.length || 5} questions.
                            </Title>
                            <Text c="dimmed" ta="center" maw={500}>
                              These unlock insights no website scan can find.
                            </Text>
                            <Button
                              size="lg"
                              className={classes.ctaButton}
                              onClick={() => {
                                setPhase("interrogation");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              rightSection={<IconArrowRight size={18} />}
                              style={{
                                background: "linear-gradient(135deg, #ff6b35, #ff4500)",
                              }}
                            >
                              Go Deeper
                            </Button>
                          </Stack>
                        </Card>
                      </motion.div>
                    )}
                  </Stack>
                </motion.div>
              )}

              {/* Phase 3: Interrogation */}
              {phase === "interrogation" && (
                <motion.div
                  key="interrogation"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                >
                  <Stack gap="xl" pt={40}>
                    <Stack align="center" gap="sm">
                      <Badge size="lg" variant="light" color="orange">
                        🔥 Deep Mirror
                      </Badge>
                      <Title order={2} ta="center">
                        Want the <GradientText animate>real</GradientText> mirror?
                      </Title>
                      <Text c="dimmed" ta="center" maw={500}>
                        Answer {checkpoints.length} questions. These unlock insights no website scan can find.
                      </Text>
                      <Text size="sm" c="dimmed">
                        {currentQuestion + 1} / {checkpoints.length}
                      </Text>
                    </Stack>

                    <Stack gap="lg" maw={600} mx="auto" w="100%">
                      <AnimatePresence mode="wait">
                        {checkpoints.map((cp, index) => {
                          if (index !== currentQuestion) return null;
                          const answer = answers[cp.key] || { selected: "", detail: null };
                          const selectedOption = cp.options.find((o) => o.label === answer.selected);

                          return (
                            <motion.div
                              key={cp.key}
                              initial={{ opacity: 0, x: 40 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -40 }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                              <Card
                                padding="xl"
                                style={{
                                  background: "var(--website-card-bg)",
                                  border: "1px solid var(--website-border)",
                                }}
                              >
                                <Stack gap="md">
                                  <Text
                                    size="sm"
                                    fs="italic"
                                    style={{ color: "rgba(0, 217, 255, 0.6)" }}
                                  >
                                    &ldquo;{cp.finding}&rdquo;
                                  </Text>
                                  <Text size="lg" fw={700}>
                                    {cp.question}
                                  </Text>
                                  <Stack gap="xs">
                                    {cp.options.map((option) => {
                                      const isSelected = answer.selected === option.label;
                                      return (
                                        <Box key={option.label}>
                                          <Button
                                            fullWidth
                                            variant="outline"
                                            onClick={() => {
                                              setAnswers((prev) => ({
                                                ...prev,
                                                [cp.key]: {
                                                  selected: option.label,
                                                  detail: isSelected ? prev[cp.key]?.detail || null : null,
                                                },
                                              }));
                                              // Auto-advance if no textarea reveal needed
                                              if (!option.reveals_textarea && index < checkpoints.length - 1) {
                                                setTimeout(() => setCurrentQuestion(index + 1), 300);
                                              }
                                            }}
                                            styles={{
                                              root: {
                                                justifyContent: "flex-start",
                                                height: "auto",
                                                padding: "12px 16px",
                                                background: isSelected
                                                  ? "rgba(0, 217, 255, 0.15)"
                                                  : "rgba(255, 255, 255, 0.06)",
                                                border: isSelected
                                                  ? "2px solid rgba(0, 217, 255, 0.7)"
                                                  : "1px solid rgba(255, 255, 255, 0.2)",
                                                boxShadow: isSelected
                                                  ? "0 0 20px rgba(0, 217, 255, 0.15)"
                                                  : "none",
                                                color: isSelected
                                                  ? "#00d9ff"
                                                  : "rgba(255, 255, 255, 0.9)",
                                                fontSize: "15px",
                                                transition: "all 0.2s ease",
                                                whiteSpace: "normal",
                                                textAlign: "left",
                                              },
                                            }}
                                          >
                                            {option.label}
                                          </Button>
                                          <AnimatePresence>
                                            {isSelected && option.reveals_textarea && (
                                              <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3, ease: "easeOut" }}
                                                style={{ overflow: "hidden" }}
                                              >
                                                <Textarea
                                                  mt="xs"
                                                  placeholder={option.textarea_placeholder || "Tell us more..."}
                                                  value={answer.detail || ""}
                                                  onChange={(e) => {
                                                    const value = e.currentTarget.value;
                                                    setAnswers((prev) => ({
                                                      ...prev,
                                                      [cp.key]: {
                                                        ...prev[cp.key],
                                                        detail: value,
                                                      },
                                                    }));
                                                  }}
                                                  autosize
                                                  minRows={2}
                                                  styles={{
                                                    input: {
                                                      background: "rgba(0,0,0,0.3)",
                                                      border: "1px solid var(--website-border)",
                                                    },
                                                  }}
                                                />
                                              </motion.div>
                                            )}
                                          </AnimatePresence>
                                        </Box>
                                      );
                                    })}
                                  </Stack>
                                </Stack>
                              </Card>

                              {/* Navigation */}
                              <Group justify="space-between" mt="md">
                                <Button
                                  variant="subtle"
                                  size="sm"
                                  onClick={() => setCurrentQuestion(Math.max(0, index - 1))}
                                  disabled={index === 0}
                                  style={{ opacity: index === 0 ? 0 : 1 }}
                                >
                                  ← Back
                                </Button>
                                {answer.selected && (selectedOption?.reveals_textarea || index === checkpoints.length - 1) && (
                                  <Button
                                    variant="subtle"
                                    size="sm"
                                    onClick={() => {
                                      if (index < checkpoints.length - 1) {
                                        setCurrentQuestion(index + 1);
                                      }
                                    }}
                                    style={{
                                      display: index === checkpoints.length - 1 ? "none" : undefined,
                                    }}
                                  >
                                    Next →
                                  </Button>
                                )}
                              </Group>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>

                      {/* Reveal button after all answered */}
                      <AnimatePresence>
                        {allQuestionsAnswered && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <Button
                              size="lg"
                              fullWidth
                              onClick={handleDeepSubmit}
                              rightSection={<IconArrowRight size={18} />}
                              style={{
                                background: "linear-gradient(135deg, #ff6b35, #ff4500)",
                                border: "none",
                              }}
                            >
                              Reveal My Real Mirror
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Stack>
                  </Stack>
                </motion.div>
              )}

              {/* Phase 3.5: Deep Processing */}
              {phase === "deepProcessing" && (
                <motion.div
                  key="deepProcessing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Stack align="center" gap="xl" pt={60}>
                    <Title order={2} ta="center">
                      Building your{" "}
                      <GradientText animate>real mirror</GradientText>...
                    </Title>

                    <Stack gap="md" w="100%" maw={500} mt="xl">
                      {DEEP_PROCESSING_STEPS.map((step, index) => (
                        <AnimatePresence key={index}>
                          {deepStep >= index && (
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                              <Group gap="md">
                                <Text size="xl">{step.emoji}</Text>
                                <Text
                                  size="lg"
                                  fw={500}
                                  style={{
                                    color: deepCompletedSteps.includes(index)
                                      ? "#ff6b35"
                                      : "var(--website-foreground)",
                                    transition: "color 0.3s ease",
                                  }}
                                >
                                  {step.text}
                                </Text>
                                {deepCompletedSteps.includes(index) && (
                                  <motion.span
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                    style={{ color: "#ff6b35" }}
                                  >
                                    ✓
                                  </motion.span>
                                )}
                              </Group>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      ))}
                    </Stack>

                    <motion.div
                      style={{
                        width: "100%",
                        maxWidth: 500,
                        height: 2,
                        background: "linear-gradient(90deg, transparent, #ff6b35, transparent)",
                        borderRadius: 1,
                      }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </Stack>
                </motion.div>
              )}

              {/* Phase 4: Tier 2 Results */}
              {phase === "tier2Results" && deepResult && (
                <motion.div
                  key="tier2results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Stack gap="xl" pt={40}>
                    <Stack align="center" gap="sm">
                      <Badge
                        size="lg"
                        variant="light"
                        color="orange"
                        style={{ boxShadow: "0 0 20px rgba(255, 100, 50, 0.2)" }}
                      >
                        🔥 Deep Mirror - The Real Stuff
                      </Badge>
                      <Title order={2} ta="center">
                        The truths only{" "}
                        <GradientText animate>you</GradientText> can reveal
                      </Title>
                      <Text c="dimmed" ta="center">
                        Based on your answers + your website. No hiding now.
                      </Text>
                    </Stack>

                    {/* Revealed deep insights */}
                    <Stack gap="lg">
                      {deepResult.insights.slice(0, 3).map((insight, index) => (
                        <AnimatePresence key={index}>
                          {deepVisibleInsights > index && renderInsightCard(insight, index, true)}
                        </AnimatePresence>
                      ))}
                    </Stack>

                    {/* Locked deep insights + CTA */}
                    {deepVisibleInsights >= Math.min(deepResult.insights.length, 3) && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                      >
                        {renderLockedInsights(deepResult.insights.length > 3 ? deepResult.insights.length - 3 : 2, true)}

                        {/* Primary CTA */}
                        <Card
                          padding="xl"
                          mt="xl"
                          style={{
                            background: "var(--website-card-bg)",
                            border: "1px solid var(--website-primary)",
                            boxShadow: "0 0 40px rgba(0, 217, 255, 0.1)",
                          }}
                        >
                          <Stack align="center" gap="md">
                            <Title order={3} ta="center">
                              Sign up to unlock your full Founder Mirror + weekly growth accountability
                            </Title>
                            <Text c="dimmed" ta="center" maw={440}>
                              Get all insights unlocked, plus ongoing accountability to actually act on them.
                            </Text>
                            <Button
                              component="a"
                              href="https://unicorn.growthmind.ai"
                              target="_blank"
                              size="lg"
                              className={classes.ctaButton}
                              rightSection={<IconArrowRight size={18} />}
                            >
                              Sign Up for GrowthMind
                            </Button>
                            <Text size="sm" c="dimmed" ta="center">
                              Or{" "}
                              <Text
                                component={Link}
                                href="/diagnosis"
                                c="cyan"
                                td="underline"
                                inherit
                              >
                                get a one-time Growth Diagnosis - £10
                              </Text>
                            </Text>
                          </Stack>
                        </Card>
                      </motion.div>
                    )}
                  </Stack>
                </motion.div>
              )}
            </AnimatePresence>
          </Container>
        </Box>
      </main>
      <Footer />
    </Box>
  );
}

export function MirrorResultsClient() {
  return (
    <Suspense
      fallback={
        <Box className={classes.root}>
          <Header />
          <Box style={{ minHeight: "100vh", paddingTop: "120px" }}>
            <Container size="md">
              <Stack align="center" pt={60}>
                <Title order={2}>Loading...</Title>
              </Stack>
            </Container>
          </Box>
          <Footer />
        </Box>
      }
    >
      <MirrorResultsInner />
    </Suspense>
  );
}

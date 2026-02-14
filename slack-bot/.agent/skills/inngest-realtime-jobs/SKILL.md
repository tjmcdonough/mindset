---
name: inngest-realtime-jobs
description: Reference for implementing real-time job progress using Inngest Realtime and useInngestJob hook. Auto-invoked when building features with background jobs needing live UI updates.
---

# Inngest Realtime Job Pattern

Reference for implementing real-time job progress updates using Inngest Realtime and useInngestJob hook. **NEVER use polling** for job status.

## Architecture

```
Provider Layer (1 per app)
  RealtimeProvider → Single WebSocket per user, auto token refresh
    ↓
Generic Hook Layer
  useRealtimeTopic<T>(topics) → Filters by topic, typed payload
    ↓
Domain Hook Layer
  useInngestJob({ jobId, onProgress, onSuccess, onError }) → Filters by jobId, deduplicates
    ↓
Component Layer
  Components call useInngestJob with specific jobId
```

## Client-Side Pattern

```tsx
const [jobId, setJobId] = useState<string | null>(null);
const { isLoading, isCompleted, isFailed } = useInngestJob<MyResult>({
  jobId,
  enabled: !!jobId,
  onProgress: (message, percent) => { /* update UI */ },
  onSuccess: (data) => { setJobId(null); /* invalidate queries */ },
  onError: (error) => { setJobId(null); },
});
```

## Server-Side Pattern

1. API returns `job_id` to client
2. Service emits event with `job_id` and `user_id`
3. Inngest function publishes progress via `userChannel(user_id).job()` inside `step.run()`

## Common Mistakes

| Wrong | Correct |
|-------|---------|
| Polling with setInterval | `useInngestJob` hook |
| `publish()` outside `step.run()` | Always wrap in `step.run()` |
| Single step with work + publish | Separate steps |
| Missing `job_id` in events | Always include `job_id` |

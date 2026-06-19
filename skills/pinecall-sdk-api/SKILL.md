---
name: pinecall-sdk-api
description: >-
  @pinecall/sdk API reference — Pinecall, Agent, Call, ReplyStream. Use when the user is building, configuring, or debugging with @pinecall/sdk. Keywords: api, pc.agent, agent.dial, call object, reply stream, replyStream, server sdk surface.
license: MIT
---

# @pinecall/sdk (Node.js)

@pinecall/sdk API reference — Pinecall, Agent, Call, ReplyStream.

This skill bundles the official Pinecall documentation for **@pinecall/sdk (Node.js)**. The
table below indexes every page; open the `references/…` file for the full text
(loaded on demand). Source of truth: <https://docs.pinecall.io>.

| Page | What it covers | Open |
|------|----------------|------|
| **Pinecall** | The WebSocket client. Manages auth, reconnection, and agent multiplexing. | [`references/api/pinecall.md`](references/api/pinecall.md) · [docs](https://docs.pinecall.io/api/pinecall) |
| **Agent** | Owns channels, routes call events, stores defaults, dials outbound calls. | [`references/api/agent.md`](references/api/agent.md) · [docs](https://docs.pinecall.io/api/agent) |
| **Call** | Per-session handle. Speak, control, update, read state. | [`references/api/call.md`](references/api/call.md) · [docs](https://docs.pinecall.io/api/call) |
| **ReplyStream** | Token-by-token streaming for client-side LLM responses. | [`references/api/reply-stream.md`](references/api/reply-stream.md) · [docs](https://docs.pinecall.io/api/reply-stream) |

## Canonical agent

```typescript
import { Pinecall } from "@pinecall/sdk";

const pc = new Pinecall(); // reads PINECALL_API_KEY, auto-connects

const agent = pc.agent("mara", {
  prompt: "You are Mara, a friendly voice assistant. Be concise.",
  llm: "openai/gpt-5-chat-latest",
  voice: "elevenlabs/sarah",
  stt: "deepgram/flux",
  language: "en",
  greeting: "Hello! How can I help?",
});
```

## House rules — always apply

- **Example defaults** (use these exact strings unless the user asks otherwise):
  `stt: "deepgram/flux"`, `llm: "openai/gpt-5-chat-latest"`, `voice: "elevenlabs/sarah"`.
  **NEVER use `deepgram/nova-2`** — it is not supported. Use `deepgram/nova-3`
  only for languages Flux doesn't support (e.g. Arabic).
- **Turn detection & VAD are auto-derived from the STT provider — never set
  `turnDetection` or `vad` manually.** Flux → native turns + native VAD;
  every other STT → `smart_turn` + `silero`.
- **Greeting**: inbound → `greeting` field in `pc.agent()`; outbound → `greeting`
  field in `agent.dial()`. It is sugar for `call.say()` in `call.started`.
- **Auth**: `new Pinecall()` reads `PINECALL_API_KEY` from env and auto-connects.
- Full documentation: <https://docs.pinecall.io>

---
*Generated from `sdk/docs/` by `@pinecall/skills` — do not edit by hand; edit the
docs and re-run `node build.mjs`.*

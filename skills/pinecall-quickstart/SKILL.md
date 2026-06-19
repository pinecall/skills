---
name: pinecall-quickstart
description: >-
  Install @pinecall/sdk and build your first voice agent in minutes. Use when the user is building, configuring, or debugging with @pinecall/sdk. Keywords: install, quickstart, first agent, pc.agent, PINECALL_API_KEY, pinecall run.
license: MIT
---

# Get Started

Install @pinecall/sdk and build your first voice agent in minutes.

This skill bundles the official Pinecall documentation for **Get Started**. The
table below indexes every page; open the `references/…` file for the full text
(loaded on demand). Source of truth: <https://docs.pinecall.io>.

| Page | What it covers | Open |
|------|----------------|------|
| **Pinecall SDK** | Build real-time voice & messaging AI agents in TypeScript. | [`references/index.md`](references/index.md) · [docs](https://docs.pinecall.io/index) |
| **Quickstart** | From zero to a working voice agent in under 5 minutes. | [`references/quickstart.md`](references/quickstart.md) · [docs](https://docs.pinecall.io/quickstart) |

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
- **TTS model is auto-derived from `language`** — non-English agents (e.g.
  `language: "es"`) default ElevenLabs to `eleven_multilingual_v2` so numbers,
  dates and currency are pronounced correctly (flash/turbo don't normalize text).
  English stays on `eleven_flash_v2_5`. Override with `voice: { ..., model: "..." }`.
- **Greeting**: inbound → `greeting` field in `pc.agent()`; outbound → `greeting`
  field in `agent.dial()`. It is sugar for `call.say()` in `call.started`.
- **Auth**: `new Pinecall()` reads `PINECALL_API_KEY` from env and auto-connects.
- Full documentation: <https://docs.pinecall.io>

---
*Generated from `sdk/docs/` by `@pinecall/skills` — do not edit by hand; edit the
docs and re-run `node build.mjs`.*

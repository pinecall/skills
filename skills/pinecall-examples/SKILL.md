---
name: pinecall-examples
description: >-
  Copy-paste recipes — full working agents for common scenarios. Use when the user is building, configuring, or debugging with @pinecall/sdk. Keywords: example, recipe, sample, outbound dispatch, chat bot, browser widget, multi-channel, headless.
license: MIT
---

# Examples

Copy-paste recipes — full working agents for common scenarios.

This skill bundles the official Pinecall documentation for **Examples**. The
table below indexes every page; open the `references/…` file for the full text
(loaded on demand). Source of truth: <https://docs.pinecall.io>.

| Page | What it covers | Open |
|------|----------------|------|
| **Examples** | Runnable examples showing Pinecall SDK features in action. | [`references/examples/index.md`](references/examples/index.md) · [docs](https://docs.pinecall.io/examples/index) |
| **Outbound Dispatch** | CSV-driven outbound campaign with rate limiting, dedup, and result writeback. | [`references/examples/outbound-dispatch.md`](references/examples/outbound-dispatch.md) · [docs](https://docs.pinecall.io/examples/outbound-dispatch) |
| **Example: Turn Detection** | Debug turn events in real-time — per-turn containers showing the full state machine lifecycle. | [`references/examples/turn-detection.md`](references/examples/turn-detection.md) · [docs](https://docs.pinecall.io/examples/turn-detection) |
| **Example: Headless Agent** | Complete runnable example — a phone support agent with zero web server. | [`references/examples/headless-agent.md`](references/examples/headless-agent.md) · [docs](https://docs.pinecall.io/examples/headless-agent) |
| **Example: Multi-Channel Bot** | One agent serving phone, WhatsApp, and browser WebRTC simultaneously. | [`references/examples/multi-channel-bot.md`](references/examples/multi-channel-bot.md) · [docs](https://docs.pinecall.io/examples/multi-channel-bot) |
| **Example: Chat Bot** | Text chat agent using @pinecall/web/chat — same agent, text instead of voice. | [`references/examples/chat-bot.md`](references/examples/chat-bot.md) · [docs](https://docs.pinecall.io/examples/chat-bot) |
| **Example: Browser Widget** | Express backend + React frontend with VoiceWidget. Click the orb, talk. | [`references/examples/browser-widget.md`](references/examples/browser-widget.md) · [docs](https://docs.pinecall.io/examples/browser-widget) |

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

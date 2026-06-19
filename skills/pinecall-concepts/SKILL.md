---
name: pinecall-concepts
description: >-
  The mental model — Pinecall, Agent, Channel, Call; server- vs client-side LLM; hot reload; deployment topologies. Use when the user is building, configuring, or debugging with @pinecall/sdk. Keywords: agents and channels, server vs client llm, hot reload, deployment, mental model, architecture.
license: MIT
---

# Concepts

The mental model — Pinecall, Agent, Channel, Call; server- vs client-side LLM; hot reload; deployment topologies.

This skill bundles the official Pinecall documentation for **Concepts**. The
table below indexes every page; open the `references/…` file for the full text
(loaded on demand). Source of truth: <https://docs.pinecall.io>.

| Page | What it covers | Open |
|------|----------------|------|
| **Philosophy** | Why Pinecall is code-first and what that means for your architecture. | [`references/concepts/philosophy.md`](references/concepts/philosophy.md) · [docs](https://docs.pinecall.io/concepts/philosophy) |
| **Agents and Channels** | The mental model: how Pinecall, Agent, Channel, and Call fit together. | [`references/concepts/agents-and-channels.md`](references/concepts/agents-and-channels.md) · [docs](https://docs.pinecall.io/concepts/agents-and-channels) |
| **Server-side vs Client-side LLM** | The single most important architectural decision when building a Pinecall agent. | [`references/concepts/server-vs-client-llm.md`](references/concepts/server-vs-client-llm.md) · [docs](https://docs.pinecall.io/concepts/server-vs-client-llm) |
| **Hot-Reload** | Change voice, language, prompt, tools — even during an active call. | [`references/concepts/hot-reload.md`](references/concepts/hot-reload.md) · [docs](https://docs.pinecall.io/concepts/hot-reload) |
| **Deployment Topologies** | Embedded, standalone, or headless — pick the topology that fits your architecture. | [`references/concepts/deployment-topologies.md`](references/concepts/deployment-topologies.md) · [docs](https://docs.pinecall.io/concepts/deployment-topologies) |


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
  English stays on `eleven_flash_v2_5`. To keep flash on a non-English agent
  (lower latency/cost), set the top-level `flash: true` flag. To pin any model,
  use `voice: { ..., model: "..." }` (explicit model always wins over `flash`).
- **Greeting**: inbound → `greeting` field in `pc.agent()`; outbound → `greeting`
  field in `agent.dial()`. It is sugar for `call.say()` in `call.started`.
- **Auth**: `new Pinecall()` reads `PINECALL_API_KEY` from env and auto-connects.
- Full documentation: <https://docs.pinecall.io>

---
*Generated from `sdk/docs/` by `@pinecall/skills` — do not edit by hand; edit the
docs and re-run `node build.mjs`.*

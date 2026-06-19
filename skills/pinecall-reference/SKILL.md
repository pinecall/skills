---
name: pinecall-reference
description: >-
  Reference tables — CLI commands, STT/TTS/LLM providers, events, session limits, REST API. Use when the user is building, configuring, or debugging with @pinecall/sdk. Keywords: cli, commands, stt providers, tts providers, llm providers, events, session limits, rest api, reference.
license: MIT
---

# Reference

Reference tables — CLI commands, STT/TTS/LLM providers, events, session limits, REST API.

This skill bundles the official Pinecall documentation for **Reference**. The
table below indexes every page; open the `references/…` file for the full text
(loaded on demand). Source of truth: <https://docs.pinecall.io>.

| Page | What it covers | Open |
|------|----------------|------|
| **CLI** | Inspect agents, chat, test with specs, browse voices, and manage billing from the terminal. | [`references/reference/cli.md`](references/reference/cli.md) · [docs](https://docs.pinecall.io/reference/cli) |
| **Events** | Every event the SDK emits, with payload shapes and timing. | [`references/reference/events.md`](references/reference/events.md) · [docs](https://docs.pinecall.io/reference/events) |
| **STT Providers** | Speech-to-text providers, models, and tuning parameters. | [`references/reference/stt-providers.md`](references/reference/stt-providers.md) · [docs](https://docs.pinecall.io/reference/stt-providers) |
| **TTS Providers** | Text-to-speech providers, voices, and tuning parameters. | [`references/reference/tts-providers.md`](references/reference/tts-providers.md) · [docs](https://docs.pinecall.io/reference/tts-providers) |
| **LLM Providers** | Server-side LLM providers and configuration. | [`references/reference/llm-providers.md`](references/reference/llm-providers.md) · [docs](https://docs.pinecall.io/reference/llm-providers) |
| **Session Limits** | Safety limits to prevent runaway sessions. | [`references/reference/session-limits.md`](references/reference/session-limits.md) · [docs](https://docs.pinecall.io/reference/session-limits) |
| **REST API** | Static helpers for the Pinecall management API. No WebSocket needed. | [`references/reference/rest-api.md`](references/reference/rest-api.md) · [docs](https://docs.pinecall.io/reference/rest-api) |


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

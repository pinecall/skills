---
name: pinecall-observe
description: >-
  What happens during a call — events, call log, live listening, human takeover, live call apps, multi-tenant dashboards. Use when the user is building, configuring, or debugging with @pinecall/sdk. Keywords: events, call log, live listening, human takeover, live call app, multi-tenant, observe, monitor.
license: MIT
---

# Observe & Control

What happens during a call — events, call log, live listening, human takeover, live call apps, multi-tenant dashboards.

This skill bundles the official Pinecall documentation for **Observe & Control**. The
table below indexes every page; open the `references/…` file for the full text
(loaded on demand). Source of truth: <https://docs.pinecall.io>.

| Page | What it covers | Open |
|------|----------------|------|
| **Events Guide** | Complete guide to every event in the Pinecall SDK — lifecycle, speech, turn, bot, tools, session, WhatsApp, and more. | [`references/guides/events.md`](references/guides/events.md) · [docs](https://docs.pinecall.io/guides/events) |
| **The Call Log** | Every call is an append-only log with a cursor — live tail, late join, reconnect, replay and history are the same mechanism. | [`references/guides/call-log.md`](references/guides/call-log.md) · [docs](https://docs.pinecall.io/guides/call-log) |
| **Live Listening** | Listen to active calls in real-time from a browser or custom client. | [`references/guides/live-listening.md`](references/guides/live-listening.md) · [docs](https://docs.pinecall.io/guides/live-listening) |
| **Human Takeover** | Pause the AI agent so a human can intervene in real-time conversations. | [`references/guides/human-takeover.md`](references/guides/human-takeover.md) · [docs](https://docs.pinecall.io/guides/human-takeover) |
| **Build a Live Call App** | Step by step: a restaurant voice agent you can talk to from the browser, call by phone, and watch live — Soniox STT, Mistral Small, ElevenLabs. | [`references/guides/build-a-live-call-app.md`](references/guides/build-a-live-call-app.md) · [docs](https://docs.pinecall.io/guides/build-a-live-call-app) |
| **Multi-Tenant Dashboards** | Host many tenants on one Pinecall instance with scoped event streams. | [`references/guides/multi-tenant.md`](references/guides/multi-tenant.md) · [docs](https://docs.pinecall.io/guides/multi-tenant) |


## House rules — always apply

- **Example defaults** (use these exact strings unless the user asks otherwise):
  `stt: "deepgram/flux"`, `llm: "openai/gpt-5.4-nano"`, `voice: "elevenlabs/sarah"`.
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

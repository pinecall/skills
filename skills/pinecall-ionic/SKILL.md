---
name: pinecall-ionic
description: >-
  @pinecall/ionic — native voice calls in Ionic/Capacitor apps, CallKit, background and killed-app calls (PushKit). Use when the user is building, configuring, or debugging with @pinecall/sdk. Keywords: ionic, capacitor, callkit, pushkit, background calls, mobile, native call.
license: MIT
---

# @pinecall/ionic

@pinecall/ionic — native voice calls in Ionic/Capacitor apps, CallKit, background and killed-app calls (PushKit).

This skill bundles the official Pinecall documentation for **@pinecall/ionic**. The
table below indexes every page; open the `references/…` file for the full text
(loaded on demand). Source of truth: <https://docs.pinecall.io>.

| Page | What it covers | Open |
|------|----------------|------|
| **@pinecall/ionic** | Native WhatsApp-style AI voice calls for Ionic / Capacitor apps — CallKit UI, native WebRTC audio, headless call store. | [`references/mobile/ionic-overview.md`](references/mobile/ionic-overview.md) · [docs](https://docs.pinecall.io/mobile/ionic-overview) |
| **Background & killed-app calls** | Ring a backgrounded or killed iOS app with PushKit VoIP pushes — reference implementation for @pinecall/ionic. | [`references/mobile/background-calls-pushkit.md`](references/mobile/background-calls-pushkit.md) · [docs](https://docs.pinecall.io/mobile/background-calls-pushkit) |


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

---
name: pinecall-web-voice
description: >-
  @pinecall/web/core — browser WebRTC voice (VoiceSession, state & phases, DataChannel protocol). Use when the user is building, configuring, or debugging with @pinecall/sdk. Keywords: webrtc, voice session, browser voice, datachannel, @pinecall/web/core.
license: MIT
---

# Voice — core

@pinecall/web/core — browser WebRTC voice (VoiceSession, state & phases, DataChannel protocol).

This skill bundles the official Pinecall documentation for **Voice — core**. The
table below indexes every page; open the `references/…` file for the full text
(loaded on demand). Source of truth: <https://docs.pinecall.io>.

| Page | What it covers | Open |
|------|----------------|------|
| **@pinecall/web/core** | Framework-agnostic WebRTC voice session client. Zero dependencies. | [`references/web/core/overview.md`](references/web/core/overview.md) · [docs](https://docs.pinecall.io/web/core/overview) |
| **VoiceSession** | The core class: constructor, methods, and framework integration patterns. | [`references/web/core/voice-session.md`](references/web/core/voice-session.md) · [docs](https://docs.pinecall.io/web/core/voice-session) |
| **State and Phases** | The reactive state model: status, phases, transcript messages, and lifecycles. | [`references/web/core/state-and-phases.md`](references/web/core/state-and-phases.md) · [docs](https://docs.pinecall.io/web/core/state-and-phases) |
| **DataChannel Protocol** | The raw WebRTC DataChannel protocol — every server event and every client command. | [`references/web/core/datachannel-protocol.md`](references/web/core/datachannel-protocol.md) · [docs](https://docs.pinecall.io/web/core/datachannel-protocol) |


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

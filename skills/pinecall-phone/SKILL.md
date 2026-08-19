---
name: pinecall-phone
description: >-
  Phone channel — inbound voice, outbound calls (agent.dial), ringing and reject. Use when the user is building, configuring, or debugging with @pinecall/sdk. Keywords: inbound, outbound, agent.dial, twilio, phone number, ringing, reject, call.say.
license: MIT
---

# Phone

Phone channel — inbound voice, outbound calls (agent.dial), ringing and reject.

This skill bundles the official Pinecall documentation for **Phone**. The
table below indexes every page; open the `references/…` file for the full text
(loaded on demand). Source of truth: <https://docs.pinecall.io>.

| Page | What it covers | Open |
|------|----------------|------|
| **Inbound Voice** | Build a voice agent that answers phone calls. | [`references/guides/inbound-voice.md`](references/guides/inbound-voice.md) · [docs](https://docs.pinecall.io/guides/inbound-voice) |
| **Outbound Calls** | Make programmatic outbound phone calls with a greeting and metadata. | [`references/guides/outbound-calls.md`](references/guides/outbound-calls.md) · [docs](https://docs.pinecall.io/guides/outbound-calls) |
| **Call Ringing & Reject** | Screen incoming calls before answering — accept, reject, or route based on caller info. | [`references/guides/call-ringing.md`](references/guides/call-ringing.md) · [docs](https://docs.pinecall.io/guides/call-ringing) |


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

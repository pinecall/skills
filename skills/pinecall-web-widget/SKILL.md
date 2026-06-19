---
name: pinecall-web-widget
description: >-
  @pinecall/web React widget — VoiceWidget props, theming, useVoiceSession hook, client tools. Use when the user is building, configuring, or debugging with @pinecall/sdk. Keywords: react widget, voicewidget, useVoiceSession, theming, props, client tools, @pinecall/web.
license: MIT
---

# React widget

@pinecall/web React widget — VoiceWidget props, theming, useVoiceSession hook, client tools.

This skill bundles the official Pinecall documentation for **React widget**. The
table below indexes every page; open the `references/…` file for the full text
(loaded on demand). Source of truth: <https://docs.pinecall.io>.

| Page | What it covers | Open |
|------|----------------|------|
| **@pinecall/web** | Drop-in React voice widget with animated orb UI, live transcript, themes, and multi-language support. | [`references/web/widget/overview.md`](references/web/widget/overview.md) · [docs](https://docs.pinecall.io/web/widget/overview) |
| **Props** | Every prop the VoiceWidget accepts — including token security, tools, theming, and multi-language. | [`references/web/widget/props.md`](references/web/widget/props.md) · [docs](https://docs.pinecall.io/web/widget/props) |
| **Theming** | Theme presets, CSS variables, and full customization of the orb and transcript UI. | [`references/web/widget/theming.md`](references/web/widget/theming.md) · [docs](https://docs.pinecall.io/web/widget/theming) |
| **useVoiceSession hook** | Build a fully custom voice UI without giving up the widget's session management. | [`references/web/widget/use-voice-session-hook.md`](references/web/widget/use-voice-session-hook.md) · [docs](https://docs.pinecall.io/web/widget/use-voice-session-hook) |
| **Tools API** | Render interactive UI in response to LLM tool calls. Buttons, forms, pickers — all synced to the conversation. | [`references/web/widget/tools-api.md`](references/web/widget/tools-api.md) · [docs](https://docs.pinecall.io/web/widget/tools-api) |


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

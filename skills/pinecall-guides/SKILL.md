---
name: pinecall-guides
description: >-
  Task guides for building Pinecall agent features. Use when the user is building, configuring, or debugging with @pinecall/sdk. Keywords: inbound, outbound, whatsapp, tools, function calling, events, live listening, conversation history, human takeover, webrtc, multi-tenant, dev mode, testing, agent.dial, call.say, tool().
license: MIT
---

# Guides

Task guides for building Pinecall agent features.

This skill bundles the official Pinecall documentation for **Guides**. The
table below indexes every page; open the `references/…` file for the full text
(loaded on demand). Source of truth: <https://docs.pinecall.io>.

| Page | What it covers | Open |
|------|----------------|------|
| **Inbound Voice** | Build a voice agent that answers phone calls. | [`references/guides/inbound-voice.md`](references/guides/inbound-voice.md) · [docs](https://docs.pinecall.io/guides/inbound-voice) |
| **Outbound Calls** | Make programmatic outbound phone calls with a greeting and metadata. | [`references/guides/outbound-calls.md`](references/guides/outbound-calls.md) · [docs](https://docs.pinecall.io/guides/outbound-calls) |
| **Events Guide** | Complete guide to every event in the Pinecall SDK — lifecycle, speech, turn, bot, tools, session, WhatsApp, and more. | [`references/guides/events.md`](references/guides/events.md) · [docs](https://docs.pinecall.io/guides/events) |
| **Live Listening** | Listen to active calls in real-time from a browser or custom client. | [`references/guides/live-listening.md`](references/guides/live-listening.md) · [docs](https://docs.pinecall.io/guides/live-listening) |
| **WhatsApp** | Build a WhatsApp messaging agent using Meta's Cloud API. | [`references/guides/whatsapp.md`](references/guides/whatsapp.md) · [docs](https://docs.pinecall.io/guides/whatsapp) |
| **Conversation History** | Save and restore conversations across calls so your agent remembers returning contacts. | [`references/guides/conversation-history.md`](references/guides/conversation-history.md) · [docs](https://docs.pinecall.io/guides/conversation-history) |
| **Human Takeover** | Pause the AI agent so a human can intervene in real-time conversations. | [`references/guides/human-takeover.md`](references/guides/human-takeover.md) · [docs](https://docs.pinecall.io/guides/human-takeover) |
| **WebRTC in the Browser** | Embed a Pinecall voice agent in your web app using the React widget. | [`references/guides/webrtc-browser.md`](references/guides/webrtc-browser.md) · [docs](https://docs.pinecall.io/guides/webrtc-browser) |
| **Tools and Functions** | Let your agent take actions: look up data, transfer calls, book appointments. | [`references/guides/tools-and-functions.md`](references/guides/tools-and-functions.md) · [docs](https://docs.pinecall.io/guides/tools-and-functions) |
| **Knowledge bases (RAG)** | Tutorial — ground a voice or chat agent on your own documents with retrieval-augmented generation. | [`references/guides/knowledge-bases.md`](references/guides/knowledge-bases.md) · [docs](https://docs.pinecall.io/guides/knowledge-bases) |
| **Multi-Tenant Dashboards** | Host many tenants on one Pinecall instance with scoped event streams. | [`references/guides/multi-tenant.md`](references/guides/multi-tenant.md) · [docs](https://docs.pinecall.io/guides/multi-tenant) |
| **SSE Event Streaming** | Stream agent events to your frontend in real time with Server-Sent Events. | [`references/guides/sse-streaming.md`](references/guides/sse-streaming.md) · [docs](https://docs.pinecall.io/guides/sse-streaming) |
| **WebSocket Event Streaming** | Stream agent events over WebSocket for bidirectional, real-time communication with your frontend. | [`references/guides/ws-streaming.md`](references/guides/ws-streaming.md) · [docs](https://docs.pinecall.io/guides/ws-streaming) |
| **Dev Mode** | Run dev and production agents on the same phone number, with zero extra Twilio cost. | [`references/guides/dev-mode.md`](references/guides/dev-mode.md) · [docs](https://docs.pinecall.io/guides/dev-mode) |
| **Call Ringing & Reject** | Screen incoming calls before answering — accept, reject, or route based on caller info. | [`references/guides/call-ringing.md`](references/guides/call-ringing.md) · [docs](https://docs.pinecall.io/guides/call-ringing) |
| **Testing Agents** | Automated QA for voice agents using YAML specs and LLM judges. | [`references/guides/testing-agents.md`](references/guides/testing-agents.md) · [docs](https://docs.pinecall.io/guides/testing-agents) |

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

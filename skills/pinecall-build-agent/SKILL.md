---
name: pinecall-build-agent
description: >-
  What the agent knows and can do — tools, memory, conversation history, knowledge bases (RAG), website tap, skills, realtime speech, token metadata. Use when the user is building, configuring, or debugging with @pinecall/sdk. Keywords: tools, function calling, tool(), memory, conversation history, knowledge base, rag, tap, skills, realtime speech, token metadata.
license: MIT
---

# Build the Agent

What the agent knows and can do — tools, memory, conversation history, knowledge bases (RAG), website tap, skills, realtime speech, token metadata.

This skill bundles the official Pinecall documentation for **Build the Agent**. The
table below indexes every page; open the `references/…` file for the full text
(loaded on demand). Source of truth: <https://docs.pinecall.io>.

| Page | What it covers | Open |
|------|----------------|------|
| **Tools and Functions** | Let your agent take actions: look up data, transfer calls, book appointments. | [`references/guides/tools-and-functions.md`](references/guides/tools-and-functions.md) · [docs](https://docs.pinecall.io/guides/tools-and-functions) |
| **Memory** | Long-term memory per contact: facts learned across conversations, kept on the platform's semantic index, handed to you as they are learned. | [`references/guides/memory.md`](references/guides/memory.md) · [docs](https://docs.pinecall.io/guides/memory) |
| **Conversation History** | Save and restore conversations across calls so your agent remembers returning contacts. | [`references/guides/conversation-history.md`](references/guides/conversation-history.md) · [docs](https://docs.pinecall.io/guides/conversation-history) |
| **Knowledge Bases (RAG)** | Tutorial — ground a voice or chat agent on your own documents with retrieval-augmented generation. | [`references/guides/knowledge-bases.md`](references/guides/knowledge-bases.md) · [docs](https://docs.pinecall.io/guides/knowledge-bases) |
| **Tap a Website** | Guide — crawl a website client-side, extract it to clean markdown and pour it into a knowledge base, then keep it in sync. | [`references/guides/tap.md`](references/guides/tap.md) · [docs](https://docs.pinecall.io/guides/tap) |
| **Skills** | Bundle a prompt, tools and a knowledge base into a capability the agent loads on demand — progressive disclosure for voice & chat agents. | [`references/guides/skills.md`](references/guides/skills.md) · [docs](https://docs.pinecall.io/guides/skills) |
| **realtime-speech** | — | [`references/guides/realtime-speech.md`](references/guides/realtime-speech.md) · [docs](https://docs.pinecall.io/guides/realtime-speech) |
| **Passing Metadata to Browser Tokens** | Seal trusted per-user context into WebRTC & chat tokens with createToken — it arrives as call.metadata, unforgeable by the browser. | [`references/guides/token-metadata.md`](references/guides/token-metadata.md) · [docs](https://docs.pinecall.io/guides/token-metadata) |


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

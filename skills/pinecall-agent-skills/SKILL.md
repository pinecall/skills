---
name: pinecall-agent-skills
description: >-
  @pinecall/skills — install the Pinecall docs as Agent Skills into Claude Code, Cursor, Antigravity, Copilot. Use when the user is building, configuring, or debugging with @pinecall/sdk. Keywords: agent skills, @pinecall/skills, claude code, cursor, antigravity, copilot, skills add, install skills.
license: MIT
---

# Agent Skills

@pinecall/skills — install the Pinecall docs as Agent Skills into Claude Code, Cursor, Antigravity, Copilot.

This skill bundles the official Pinecall documentation for **Agent Skills**. The
table below indexes every page; open the `references/…` file for the full text
(loaded on demand). Source of truth: <https://docs.pinecall.io>.

| Page | What it covers | Open |
|------|----------------|------|
| **Agent Skills (@pinecall/skills)** | Drop the Pinecall docs into Claude Code, Cursor, Antigravity, Copilot or any agent that speaks the open Agent Skills format — so your coding agent builds voice & chat agents the right way, offline, with the correct defaults. | [`references/skills.md`](references/skills.md) · [docs](https://docs.pinecall.io/skills) |


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

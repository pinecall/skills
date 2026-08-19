# @pinecall/skills

**Agent Skills for the [Pinecall](https://pinecall.io) SDK.** Drop the Pinecall
docs into any agent (Claude Code, Google Antigravity, Cursor, GitHub Copilot,
Codex — anything that speaks the open [Agent Skills](https://github.com/agentskills/agentskills)
format) so it builds voice & chat agents the right way, offline, with the
correct defaults.

Each skill is a folder with a `SKILL.md` + a `references/` tree of the real docs
pages, loaded on demand (progressive disclosure). The whole package is
**generated from `sdk/docs/`** — one source of truth feeds the docs site, the
`/ask` knowledge base, and these skills.

## Install

```bash
# the open installer (softaworks/agent-toolkit) — picks an agent dir + symlinks
npx skills add pinecall/skills
```

Or manually copy the skills you want into your agent's skills directory:

| Agent | Directory |
|-------|-----------|
| Claude Code | `.claude/skills/` |
| Google Antigravity | `.agents/skills/` (or the plugin's `skills/`) |
| Cursor / others | per the agent's docs |

```bash
cp -R skills/pinecall-phone ~/your-project/.claude/skills/
```

## What's inside

| Skill | Covers |
|-------|--------|
| `pinecall-quickstart` | Install, first agent, project structure, dev mode, deployment |
| `pinecall-concepts` | Agents/Channels/Calls, server vs client LLM, turn detection, hot reload, managed vs BYOK |
| `pinecall-build-agent` | Tools, memory, conversation history, knowledge bases (RAG), tap, skills, realtime speech |
| `pinecall-phone` | Inbound voice, outbound calls, ringing & reject |
| `pinecall-messaging` | WhatsApp |
| `pinecall-browser-channel` | WebRTC in the browser |
| `pinecall-observe` | Events, call log, live listening, human takeover, live call apps, multi-tenant |
| `pinecall-streaming` | SSE / WebSocket event streaming to your backend |
| `pinecall-develop` | Testing agents, MCP server, security |
| `pinecall-sdk-api` | `@pinecall/sdk` API (Pinecall / Agent / Call / ReplyStream) |
| `pinecall-web-voice` | `@pinecall/web/core` — browser WebRTC voice |
| `pinecall-web-widget` | `@pinecall/web` React widget |
| `pinecall-web-chat` | `@pinecall/web/chat` — text chat |
| `pinecall-web-components` | Framework-agnostic web components |
| `pinecall-ionic` | `@pinecall/ionic` — native mobile calls, PushKit |
| `pinecall-react-native` | `@pinecall/react-native` |
| `pinecall-providers` | STT / TTS / LLM provider tables |
| `pinecall-reference` | CLI, events reference, session limits, REST API |


Every skill carries the **house rules** so the agent never drifts:
`stt: "deepgram/flux"`, `llm: "openai/gpt-5.4-nano"`, `voice: "elevenlabs/sarah"`,
never `nova-2`, and never set `turnDetection`/`vad` by hand.

## Regenerate (keep in sync with the docs)

The `skills/` tree is generated and committed. Whenever `sdk/docs/` changes,
re-run the generator and commit the result — same flow as re-pushing the docs KB.

```bash
node build.mjs                      # reads ../sdk/docs by default
DOCS_DIR=/path/to/sdk/docs node build.mjs
```

The generator maps each `docs.json` navigation group to one skill, copies that
group's pages into `references/`, and writes a `SKILL.md` index + the house
rules. No dependencies.

#!/usr/bin/env node
/**
 * @pinecall/skills — generator.
 *
 * Nourishes an Agent-Skills package straight from the SDK docs.
 * Reads `sdk/docs/docs.json` + each page's frontmatter and emits one skill per
 * docs group:  skills/<skill>/SKILL.md  +  skills/<skill>/references/<page>.md
 *
 * Re-run whenever `sdk/docs/` changes — same flow as the KB push. Output is
 * committed (so `npx skills add pinecall/skills` works offline).
 *
 *   node build.mjs            # default DOCS_DIR=../sdk/docs
 *   DOCS_DIR=/path node build.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = resolve(HERE, process.env.DOCS_DIR || "../sdk/docs");
const OUT_DIR = join(HERE, "skills");

// --- House rules: injected into every SKILL.md so each skill is self-correcting.
const HOUSE_RULES = `## House rules — always apply

- **Example defaults** (use these exact strings unless the user asks otherwise):
  \`stt: "deepgram/flux"\`, \`llm: "openai/gpt-5-chat-latest"\`, \`voice: "elevenlabs/sarah"\`.
  **NEVER use \`deepgram/nova-2\`** — it is not supported. Use \`deepgram/nova-3\`
  only for languages Flux doesn't support (e.g. Arabic).
- **Turn detection & VAD are auto-derived from the STT provider — never set
  \`turnDetection\` or \`vad\` manually.** Flux → native turns + native VAD;
  every other STT → \`smart_turn\` + \`silero\`.
- **Greeting**: inbound → \`greeting\` field in \`pc.agent()\`; outbound → \`greeting\`
  field in \`agent.dial()\`. It is sugar for \`call.say()\` in \`call.started\`.
- **Auth**: \`new Pinecall()\` reads \`PINECALL_API_KEY\` from env and auto-connects.
- Full documentation: <https://docs.pinecall.io>`;

// --- Canonical example every voice skill should anchor on.
const CANONICAL_EXAMPLE = `\`\`\`typescript
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
\`\`\``;

// --- docs.json group name -> skill metadata. Unknown groups fall back to slug.
const GROUP_MAP = {
  "Get Started": {
    slug: "pinecall-quickstart",
    blurb: "Install @pinecall/sdk and build your first voice agent in minutes.",
    keywords: "install, quickstart, first agent, pc.agent, PINECALL_API_KEY, pinecall run",
  },
  Concepts: {
    slug: "pinecall-concepts",
    blurb: "The mental model — Pinecall, Agent, Channel, Call; server- vs client-side LLM; hot reload; deployment topologies.",
    keywords: "agents and channels, server vs client llm, hot reload, deployment, mental model, architecture",
  },
  Guides: {
    slug: "pinecall-guides",
    blurb: "Task guides for building Pinecall agent features.",
    keywords: "inbound, outbound, whatsapp, tools, function calling, events, live listening, conversation history, human takeover, webrtc, multi-tenant, dev mode, testing, agent.dial, call.say, tool()",
  },
  Examples: {
    slug: "pinecall-examples",
    blurb: "Copy-paste recipes — full working agents for common scenarios.",
    keywords: "example, recipe, sample, outbound dispatch, chat bot, browser widget, multi-channel, headless",
  },
  "@pinecall/sdk (Node.js)": {
    slug: "pinecall-sdk-api",
    blurb: "@pinecall/sdk API reference — Pinecall, Agent, Call, ReplyStream.",
    keywords: "api, pc.agent, agent.dial, call object, reply stream, replyStream, server sdk surface",
  },
  "Voice — core": {
    slug: "pinecall-web-voice",
    blurb: "@pinecall/web/core — browser WebRTC voice (VoiceSession, state & phases, DataChannel protocol).",
    keywords: "webrtc, voice session, browser voice, datachannel, @pinecall/web/core",
  },
  "React widget": {
    slug: "pinecall-web-widget",
    blurb: "@pinecall/web React widget — VoiceWidget props, theming, useVoiceSession hook, client tools.",
    keywords: "react widget, voicewidget, useVoiceSession, theming, props, client tools, @pinecall/web",
  },
  "Text chat": {
    slug: "pinecall-web-chat",
    blurb: "@pinecall/web/chat — browser text chat (ChatSession, ChatView).",
    keywords: "chat, chatsession, text chat, @pinecall/web/chat",
  },
  "Web components": {
    slug: "pinecall-web-components",
    blurb: "@pinecall/web web components — framework-agnostic custom elements.",
    keywords: "web components, custom element, framework-agnostic widget",
  },
  "Agent Skills": {
    slug: "pinecall-agent-skills",
    blurb: "@pinecall/skills — install the Pinecall docs as Agent Skills into Claude Code, Cursor, Antigravity, Copilot.",
    keywords: "agent skills, @pinecall/skills, claude code, cursor, antigravity, copilot, skills add, install skills",
  },
  Reference: {
    slug: "pinecall-reference",
    blurb: "Reference tables — CLI commands, STT/TTS/LLM providers, events, session limits, REST API.",
    keywords: "cli, commands, stt providers, tts providers, llm providers, events, session limits, rest api, reference",
  },
};

const slugify = (s) =>
  "pinecall-" +
  s.toLowerCase().replace(/@pinecall\/?/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// Minimal frontmatter reader (title + description), no deps.
function frontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  const fm = {};
  if (m) {
    for (const line of m[1].split("\n")) {
      const kv = line.match(/^(\w+):\s*"?(.*?)"?\s*$/);
      if (kv) fm[kv[1]] = kv[2];
    }
  }
  return fm;
}

function loadPage(slug) {
  const file = join(DOCS_DIR, slug.endsWith(".md") ? slug : slug + ".md");
  if (!existsSync(file)) return null;
  const md = readFileSync(file, "utf8");
  const fm = frontmatter(md);
  return {
    slug,
    file,
    md,
    title: fm.title || slug.split("/").pop(),
    description: fm.description || "",
  };
}

// Flatten nested navigation groups into leaf groups (each with only page
// slugs). A parent group whose `pages` are sub-groups contributes its leaves,
// not itself — so one skill is still emitted per leaf section.
function leafGroups(groups) {
  const out = [];
  for (const g of groups) {
    const pages = g.pages || [];
    const subs = pages.filter((p) => p && typeof p === "object" && Array.isArray(p.pages));
    const slugs = pages.filter((p) => typeof p === "string");
    if (subs.length) {
      out.push(...leafGroups(subs));
      if (slugs.length) out.push({ group: g.group, pages: slugs });
    } else {
      out.push({ group: g.group, pages: slugs });
    }
  }
  return out;
}

// --- main
const docsJson = JSON.parse(readFileSync(join(DOCS_DIR, "..", "docs.json"), "utf8"));
const groups = leafGroups(docsJson.navigation.groups);

if (existsSync(OUT_DIR)) rmSync(OUT_DIR, { recursive: true });
mkdirSync(OUT_DIR, { recursive: true });

const built = [];
for (const group of groups) {
  const meta = GROUP_MAP[group.group] || { slug: slugify(group.group), blurb: group.group, keywords: "" };
  const skillDir = join(OUT_DIR, meta.slug);
  mkdirSync(join(skillDir, "references"), { recursive: true });

  const pages = group.pages.map(loadPage).filter(Boolean);

  // Copy each page into references/, build the index rows.
  const rows = [];
  for (const p of pages) {
    const refRel = join("references", p.slug + ".md");
    const refAbs = join(skillDir, refRel);
    mkdirSync(dirname(refAbs), { recursive: true });
    writeFileSync(refAbs, p.md);
    rows.push(
      `| **${p.title}** | ${p.description || "—"} | [\`${refRel}\`](${refRel}) · [docs](https://docs.pinecall.io/${p.slug}) |`
    );
  }

  const isVoice = /quickstart|guides|examples|sdk-api/.test(meta.slug);
  const description =
    `${meta.blurb} Use when the user is building, configuring, or debugging with @pinecall/sdk. ` +
    `Keywords: ${meta.keywords}.`;

  const body = `---
name: ${meta.slug}
description: >-
  ${description.replace(/\n/g, " ")}
license: MIT
---

# ${group.group}

${meta.blurb}

This skill bundles the official Pinecall documentation for **${group.group}**. The
table below indexes every page; open the \`references/…\` file for the full text
(loaded on demand). Source of truth: <https://docs.pinecall.io>.

| Page | What it covers | Open |
|------|----------------|------|
${rows.join("\n")}

${isVoice ? "## Canonical agent\n\n" + CANONICAL_EXAMPLE + "\n" : ""}
${HOUSE_RULES}

---
*Generated from \`sdk/docs/\` by \`@pinecall/skills\` — do not edit by hand; edit the
docs and re-run \`node build.mjs\`.*
`;

  writeFileSync(join(skillDir, "SKILL.md"), body);
  built.push({ slug: meta.slug, group: group.group, pages: pages.length });
}

// eslint-disable-next-line no-console
console.log(`Built ${built.length} skills from ${DOCS_DIR}:`);
for (const b of built) console.log(`  ${b.slug.padEnd(26)} ${String(b.pages).padStart(2)} pages  (${b.group})`);

# AIP-LLMWiki

Multi-agent collaborative knowledge base for cross-border e-commerce operations (LILIS) and Palantir AIP platform knowledge. Built with [LLM Wiki](https://github.com/nashsu/llm_wiki) + [Obsidian](https://obsidian.md), designed as a shared workspace where different AI Agents extract information, contribute results, and continuously improve through an experience feedback loop.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Knowledge Base                     │
│                                                     │
│  ┌──────────┐   ┌──────────┐   ┌────────────────┐  │
│  │  raw/    │──▶│  wiki/   │◀──│  schema/       │  │
│  │ (read-   │   │ (agent   │   │  (rules &      │  │
│  │  only)   │   │  output) │   │   standards)   │  │
│  └──────────┘   └────┬─────┘   └────────────────┘  │
│                      │                              │
│         ┌────────────┼────────────┐                 │
│         ▼            ▼            ▼                 │
│  ┌────────────┐ ┌──────────┐ ┌──────────┐          │
│  │Experience  │ │  Agent   │ │  Handoff │          │
│  │  Index     │ │ Protocol │ │ Protocol │          │
│  └────────────┘ └──────────┘ └──────────┘          │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │  AGENTS.md / CLAUDE.md / .cursorrules        │   │
│  │  (enforced rules for every agent)            │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
         ▲              ▲              ▲
         │              │              │
    ┌────┴───┐    ┌─────┴────┐   ┌────┴────┐
    │LLM Wiki│    │QoderWork │   │ Cursor  │
    │ Agent  │    │  Agent   │   │  Agent  │
    └────────┘    └──────────┘   └─────────┘
```

## How It Works

Inspired by Karpathy's [autoresearch](https://github.com/karpathy/autoresearch), this knowledge base applies the same loop pattern to operational knowledge:

1. **Human defines the arena** — protocols, SOPs, templates in `AGENTS.md` and wiki pages
2. **Agent executes** — checks experience index before starting, records results after finishing
3. **System evolves** — good results are kept (`verified: true`), failures are documented to prevent repetition
4. **Loop repeats** — next Agent starts from the best known practice, not from scratch

## Directory Structure

| Directory | Access | Purpose |
|-----------|--------|---------|
| `wiki/` | Read + Write | 178 structured knowledge pages with bidirectional `[[wikilinks]]` |
| `raw/` | **Read-only** | Source materials (PDFs, reports, data exports) |
| `schema/` | Human Editor only | Rules, standards, tag taxonomy |
| `.obsidian/` | Do not touch | Obsidian configuration (graph view, plugins) |

## Agent Setup

### QoderWork

Install the `aip-llmwiki` skill (SKILL.md in this repo), or clone this vault and select it as your working folder.

### Claude

Place `CLAUDE.md` (already in repo root) in your project root. Claude will automatically read it.

### Cursor

`.cursorrules` is already in repo root. Cursor will pick it up automatically.

### Other Agents

Read `AGENTS.md` in the repo root — it contains the universal enforced rules.

## Mandatory Rules (All Agents)

Every Agent must follow this 3-step loop:

**Before task** — Read `wiki/经验索引.md` (Experience Index). Check for relevant historical experience, especially failures.

**During task** — Record key decisions and unexpected findings.

**After task** — Create an experience record using `wiki/经验记录模板.md` (template). Update the Experience Index.

## Key Protocol Documents

| Document | Purpose |
|----------|---------|
| `wiki/Agent工作流协议.md` | Full agent workflow protocol |
| `wiki/Agent-Handoff协议.md` | Inter-agent handoff format |
| `wiki/知识库维护SOP.md` | Daily / weekly / monthly maintenance SOP |
| `wiki/经验索引.md` | Central experience index |
| `wiki/经验记录模板.md` | Standard experience recording template |
| `wiki/实战避坑指南.md` | Known pitfalls for Alibaba ICBM operations |

## Knowledge Domains

- **Palantir AIP Platform** — Ontology, AIP Logic, Evals, Observability, Foundry, developer toolchain
- **LILIS Operations** — Wedding/party supplies brand on Alibaba ICBM, P4P advertising, product optimization
- **Cross-border E-commerce** — SEO, conversion optimization, store operations, AI search impact
- **Agent Architecture** — Multi-agent collaboration, prompt augmentation, execution path optimization

## Stats

| Metric | Value |
|--------|-------|
| Total pages | 178 |
| Total wikilinks | 2,439 |
| Bidirectional coverage | 84.2% |
| Verified experiments | 2 (PAP A/B test, ImageReplace PostMortem) |
| Experience records | 16+ documented failures and lessons learned |

## Quick Start

```bash
git clone https://github.com/croosel/AIP-LLMWiki.git
cd AIP-LLMWiki
# Open as Obsidian vault, or point your Agent here
```

## License

MIT

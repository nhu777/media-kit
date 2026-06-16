---
alwaysApply: false
---

# Updating AGENTS.md

Guidelines for agents when editing the main `AGENTS.mdc` file. Read this before making changes.

## Core Principles

Based on [Writing a good CLAUDE.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md):

1. **Less is more** — Frontier models reliably follow ~150-200 instructions. Agent harnesses already use ~50 in their system prompt, leaving limited headroom. Every line in AGENTS.md competes for attention.

2. **Universal applicability** — AGENTS.md loads into _every_ session. Only include content that applies to _every_ task. Domain-specific guidance belongs in separate files.

3. **Progressive disclosure** — Keep detailed instructions in dedicated files and reference them. Let agents pull context when needed rather than front-loading everything.

4. **Pointers over copies** — Reference files (`agent-rules/ARBOR.mdc`) instead of embedding code snippets. Inline examples become stale; file references stay current.

5. **Highest leverage point** — AGENTS.md affects every phase of work. A bad line here creates compounding problems. Craft deliberately.

## When to Add to AGENTS.md

Add content if it meets ALL criteria:

- Applies to every task regardless of domain
- Cannot be discovered by reading the codebase
- Is actionable (commands, patterns, gotchas)
- Fits in ≤3 lines

**Good additions:**

- Project purpose and constraints
- Tech stack overview
- Essential commands (`yarn dev`, `yarn build`)
- Critical gotchas (e.g., `clsx` vs `cn()` for Arbor tokens)
- Pointers to domain-specific docs

## When NOT to Add

Move to domain-specific files in `agent-rules/` instead:

| Content Type                               | Target File               |
| ------------------------------------------ | ------------------------- |
| Typography, colors, shadows, design tokens | `ARBOR.mdc`               |
| Figma-to-code translation                  | `FIGMA.mdc`               |
| Interactions, a11y, animations, layout     | `web-best-practices.mdc`  |
| Code style rules                           | Linter/Prettier config    |
| Implementation examples                    | Inline comments in source |

**Anti-patterns to avoid:**

- Code snippets (use file references)
- Style guidelines (use linters)
- Task-specific instructions
- Hypothetical scenarios
- Redundant explanations

## Current Architecture

This repo uses progressive disclosure:

```
AGENTS.mdc (always loaded, ~60 lines)
├── Points to → ARBOR.mdc (design system details)
├── Points to → FIGMA.mdc (Figma workflow)
└── Points to → web-best-practices.mdc (interactions, a11y)
```

The table in AGENTS.mdc tells agents _when_ to read each file:

```markdown
| File                     | When to read                                            |
| ------------------------ | ------------------------------------------------------- |
| `ARBOR.mdc`              | Typography, colors, shadows, Arbor tokens over Tailwind |
| `FIGMA.mdc`              | Translating Figma designs to code                       |
| `web-best-practices.mdc` | Interactions, accessibility, animations, layout         |
```

## Editing Checklist

Before committing changes to AGENTS.mdc:

- [ ] Is this universally applicable? (If no → move to domain file)
- [ ] Is this discoverable from the codebase? (If yes → remove)
- [ ] Does this duplicate linter/formatter rules? (If yes → remove)
- [ ] Is this ≤300 total lines? (Current: ~60 lines)
- [ ] Did I use file references instead of code snippets?
- [ ] Did I update the domain file table if adding new files?

## Adding New Domain Files

When creating a new `agent-rules/*.mdc` file:

1. Use frontmatter with `alwaysApply: false`
2. Add an entry to the Guidelines table in AGENTS.mdc
3. Keep the new file focused on one domain
4. Prefer MUST/SHOULD/NEVER for clarity

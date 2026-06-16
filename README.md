# Baby Linktree Earn

A **design prototyping** project for exploring and iterating on Linktree admin experiences. This is not production code — it's a sandbox for visual experimentation and rapid iteration.

## Who This Is For

Designers using **Cursor with AI agents** to prototype UI changes. No coding experience required — the AI agent will write the code for you based on your descriptions.

---

## First-Time Setup

This project uses private `@linktr.ee` packages from npm. You'll need to authenticate once before installing dependencies.

### Step 1: Log in to npm

```bash
npm login
```

Follow the prompts to authenticate. This stores your token in `~/.npmrc` where both npm and yarn read it automatically for all future installs.

### Step 2: Install dependencies

```bash
yarn setup
```

That's it! Yarn automatically uses your npm login credentials — no need to manage `.env` files or sync tokens manually.

**Why this approach?** After running `npm login` once, npm remembers your authentication. The project `.npmrc` handles registry configuration, and yarn reads npm's credentials automatically. For CI/CD, the `ARBOR_TOKEN` environment variable is used instead.

---

## Linting

This project uses a **shared ESLint configuration** from `packages/eslint-config` to ensure consistent code style across all contributors.

### Running the Linter

```bash
yarn lint          # Check for issues
yarn lint:fix      # Auto-fix issues
```

### Deterministic Results

Running `yarn lint:fix` twice should produce **zero changes** on the second run. If you see different results than your teammates:

1. Ensure you're using the same Node version (check `.nvmrc` if present)
2. Run `yarn install --frozen-lockfile` instead of `yarn install` to get exact lockfile versions
3. Ensure you don't have global ESLint plugins that might interfere

### What the Linter Checks

- **TypeScript** best practices and type safety
- **React** hooks rules and component patterns
- **Accessibility** (jsx-a11y) - strict mode
- **Prettier** formatting enforcement
- **Import sorting** - auto-organized imports
- **Deprecation warnings** - flags deprecated APIs
- **Arbor design tokens** - warns when using legacy Tailwind classes instead of semantic tokens
- **Next.js** rules - Core Web Vitals and Next-specific patterns

---

## Starting the Dev Server

```bash
yarn dev
```

Or ask the AI agent: _"Start the dev server"_

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Git Branching for Designers

### What Are Branches?

Think of branches as **parallel versions** of the project — like "save slots" in a video game. Each branch lets you make changes without affecting anyone else's work.

- **`main`** is the primary branch where reviewed, approved work lives
- **Your branch** is your personal workspace for making changes

### Why Branches Matter

- Keeps your work **separate** until it's ready to be reviewed
- Prevents **conflicts** with other people's changes
- Allows teammates to **review your work** before it goes into main

### The Golden Rule

> **Never work directly on `main`** — always create your own branch first.

### Creating a Branch

**Quick reference (terminal commands):**

```bash
git checkout main                            # Switch to main branch
git pull                                     # Get latest changes
git checkout -b patrick/my-feature-name      # Create and switch to new branch
```

**Or ask the AI agent:**

> "Make sure I'm on the latest main branch, then create a new branch called `patrick/updated-button-styles`"

**Branch naming tips:**

- Start with your name: `patrick/`, `emily/`, `alex/`
- Add a short description: `header-redesign`, `new-link-card`, `color-updates`
- Use hyphens, not spaces: `my-cool-feature` not `my cool feature`

---

## Making Changes

### Best Practices for Working with AI Agents

#### 1. Start a New Chat for Each Task

Each time you begin a new group of changes, **start a fresh chat** (Cmd+N or Ctrl+N). This keeps the agent focused and prevents confusion from previous conversations.

**Good approach:**

- New chat → "Update button styles"
- New chat → "Add a new header component"

**Avoid:** Making many unrelated changes in a single long chat session.

#### 2. Use Plan Mode for Complex Changes

For anything beyond a simple tweak, use **Plan mode** to have the agent think through the approach before writing code.

In Cursor, type your request and then select "Plan" instead of "Agent" — the agent will outline what it intends to do and ask for your approval before making changes.

**When to use Plan mode:**

- Changes that touch multiple files
- New components or features
- Anything you're unsure about

#### 3. Be Specific About the Experience You Want

The more detail you provide, the better the results. Describe **what you want to see and how it should feel**, not just what to change.

**Vague (less helpful):**

> "Make the button look better"

**Specific (much better):**

> "Update the primary button to have rounded corners (8px radius), a subtle shadow on hover, and a 200ms ease-out transition"

**Great prompts include:**

- Specific values (colors, sizes, spacing)
- Interaction details (hover states, animations)
- References to existing patterns ("similar to the card component")

#### 4. Attach Context to Your Prompts

Help the agent understand what you're working with by attaching relevant context:

- **Files:** Use `@filename` to reference specific files (e.g., `@components/editor/shared/LinkBlock.tsx`)
- **Folders:** Reference entire folders for broader context (e.g., `@components/editor/components`)
- **Images:** Drag in screenshots to show what you're aiming for

**Essential context files to attach:**

- **`@agent-rules/arbor.mdc`** — Attach this when working on any visual styling. It contains our design system tokens for typography, colors, and shadows. This ensures the agent uses the correct design tokens instead of raw Tailwind values.

- **`@agent-rules/figma.mdc`** — Attach this when implementing designs from Figma. It tells the agent how to properly translate Figma designs into our codebase conventions.

**Using Figma designs directly:**

If you have a Figma design to implement, paste the **Figma frame URL** directly into your prompt. The agent will use the Figma MCP to fetch the design and translate it to code.

> "Implement this Figma design: https://figma.com/design/abc123/MyFile?node-id=12-34
> Use `@agent-rules/figma.mdc` and `@agent-rules/arbor.mdc` for the implementation rules."

**Example prompt with full context:**

> "Looking at `@components/editor/shared/LinkBlock.tsx` — update the hover state to match this Figma frame: [paste Figma URL]
>
> Follow the rules in `@agent-rules/figma.mdc` and `@agent-rules/arbor.mdc`."

### Preview Your Changes

Your changes appear automatically at [http://localhost:3000](http://localhost:3000). The page refreshes when files are saved.

---

## Submitting Your Work (Pull Requests)

When you're happy with your changes, you'll create a **Pull Request (PR)** — a request to merge your branch into main so others can review it.

**Quick reference (terminal commands):**

```bash
git add .                                    # Stage all changes
git commit -m "Description of your changes"  # Commit with a message
git push -u origin your-branch-name          # Push to GitHub
gh pr create --fill                          # Create a pull request
```

**Or ask the AI agent for each step:**

### Step 1: Commit Your Changes

> "Commit all my changes with a clear message describing what I changed"

### Step 2: Push to GitHub

> "Push my branch to GitHub"

### Step 3: Create the Pull Request

> "Create a pull request for my changes with a clear description of all commits in the branch"

### Step 4: Request Review

After the PR is created, go to GitHub and request a review from a teammate. They'll look at your changes and either approve them or leave feedback.

---

## Quick Reference

### Common Prompts for the AI Agent

| Task                        | Prompt                                                                                        |
| --------------------------- | --------------------------------------------------------------------------------------------- |
| Start fresh on a new branch | "Make sure I'm on the latest main branch, then create a new branch called `name/description`" |
| Start the dev server        | "Start the dev server"                                                                        |
| Save your work              | "Commit all my changes with a clear message"                                                  |
| Upload to GitHub            | "Push my branch to GitHub"                                                                    |
| Create a PR                 | "Create a pull request with a clear description"                                              |
| See what branch you're on   | "What branch am I on?"                                                                        |
| See what files changed      | "Show me what files I've changed"                                                             |
| Undo recent changes         | "Discard my uncommitted changes"                                                              |

### Project Structure (Simplified)

| What              | Where                           |
| ----------------- | ------------------------------- |
| Editor            | `app/editor/`                   |
| Editor components | `components/editor/components/` |
| Editor views      | `components/editor/views/`      |
| Shared components | `components/editor/shared/`     |

### More Information

For detailed guidance on design tokens, Figma translation, and code patterns, see [AGENTS.md](./agent-rules/AGENTS.mdc).

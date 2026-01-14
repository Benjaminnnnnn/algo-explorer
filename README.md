# AlgoExplorer

AlgoExplorer is an interactive algorithm playground with step-by-step visualizations and an AI tutor that explains each step. It covers searching, sorting, graphs, data structures, and more with detailed explanation and multi-language implementation support.

## Overview

- Step-by-step visualizations across core algorithm categories.
- Context-aware AI Tutor with streaming responses.
- Command palette for fast navigation.
- Responsive layout with a resizable chat panel.

## Demo

AI Studio: https://ai.studio/apps/drive/1VAr4LxK8TE32rqWWe7rWY3yhT14CioKU

## Quick Start

**Prerequisites:** Node.js 18+

```bash
npm install
```

Create `.env.local` (do not commit it):

```
GEMINI_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
```

Run the app:

```bash
npm run dev
```

Run the AI API server for ChatGPT:

```bash
npm run dev:server
```

## Project Structure

```
src/
  components/   # UI components (Visualizer, AIChat, etc.)
  hooks/        # Custom hooks
  lib/          # Algorithm data + generators
  services/     # AI providers and helpers
  types.ts      # Shared types
```

## Scripts

- `npm run dev`: start the Vite dev server.
- `npm run dev:server`: start the AI API server (ChatGPT).
- `npm run build`: create a production build.
- `npm run preview`: preview the production build.

## Tech Stack

- React 19 + TypeScript
- Vite 6
- Tailwind (via CDN) + Lucide + Framer Motion
- Gemini + OpenAI (server-side API endpoint)

## Roadmap

- [x] Add persistence for chat sessions and saved prompts.
- [ ] Expand algorithm catalog with dynamic programming and trees.
- [ ] Add test coverage for algorithm generators and UI flows.
- [ ] Provide exportable share links for visualizations.

## Contributing

PRs welcome. Please include a short summary, testing notes, and screenshots for UI changes.

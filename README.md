# Agent Dashboard

A modern, professional Agent Management Dashboard built with React + TypeScript + Tailwind CSS.

## Tech Stack

- **React 18** — UI library
- **TypeScript** — strict typing throughout
- **Tailwind CSS v3** — utility-first styling
- **Vite** — fast dev server & build tool

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/
│   ├── icons/
│   │   └── index.tsx        # All SVG icon components
│   ├── ui/
│   │   ├── Badge.tsx         # Role badge (Agent / Manager)
│   │   ├── StatusDot.tsx     # Active / Inactive indicator
│   │   ├── Toggle.tsx        # Toggle switch
│   │   ├── IconInput.tsx     # Input with leading icon
│   │   └── SectionLabel.tsx  # Form section heading
│   ├── AgentCard.tsx         # Agent card with edit/delete
│   ├── AgentDashboard.tsx    # Main page component
│   ├── AgentModal.tsx        # Create / Edit modal
│   ├── EmptyState.tsx        # Empty search results
│   ├── FilterBar.tsx         # Search + role filter tabs
│   ├── Header.tsx            # Top navigation bar
│   └── StatsBar.tsx          # Summary stat cards
├── data/
│   └── constants.ts          # Initial data & static constants
├── hooks/
│   ├── useAgents.ts          # Agent CRUD + filter state
│   └── useModal.ts           # Modal open/close + edit state
├── types/
│   └── index.ts              # All shared TypeScript types
├── App.tsx
├── main.tsx
└── index.css
```

## Features

- ✅ Responsive grid of agent cards
- ✅ Create / Edit / Delete agents
- ✅ Role selection (Agent / Manager) with visual toggle cards
- ✅ Active status toggle switch
- ✅ Form validation with inline errors
- ✅ Search + role filter
- ✅ Stats bar (total, active, managers, inactive)
- ✅ Smooth modal animation
- ✅ Hover lift effect on cards
- ✅ Fully typed with TypeScript strict mode

## Scripts

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start dev server         |
| `npm run build` | Production build         |
| `npm run lint`  | TypeScript type-check    |

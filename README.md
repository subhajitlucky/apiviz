# API Viz - Visual API Design Learning Platform

A visual-first, frontend-only educational microsite that teaches API Design through interactive visualizations. Explore REST, GraphQL, and modern API architecture from fundamentals to advanced concepts.

## Features

- **Interactive Visualizations**: Animated request-response flows, REST vs GraphQL comparisons, auth flows, caching simulations
- **Learning Paths**: Structured topics organized by category (Fundamentals, REST, GraphQL, Security, Performance, Evolution, Architecture)
- **Interactive Playground**: Simulated API environment to experiment with REST and GraphQL requests
- **Dark/Light Mode**: Toggle between themes with persistence
- **30+ Topic Pages**: Each with definition, analogies, key concepts, code examples, and interactive visualizers

## Tech Stack

- React 18 with Vite
- TailwindCSS v4
- React Router for navigation
- Framer Motion for animations
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Production Build

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx         # Main layout wrapper
│   ├── Navigation.jsx     # Navigation bar with theme toggle
│   └── visualizers/       # Interactive visualization components
│       ├── AuthFlow.jsx
│       ├── CachingFlow.jsx
│       ├── ClientServerFlow.jsx
│       ├── HttpFlow.jsx
│       └── RestVsGraphql.jsx
├── contexts/
│   └── ThemeContext.jsx   # Dark/light mode context
├── data/
│   └── topics.js          # All topic content and learning paths
├── pages/
│   ├── Home.jsx           # Landing page
│   ├── Learn.jsx          # Learning paths and topic browser
│   ├── Topic.jsx          # Individual topic page
│   ├── Playground.jsx     # Interactive API playground
│   └── About.jsx          # About page
└── App.jsx                # Main app with routing
```

## What is Simulated

This is a **frontend-only simulation**. All API interactions are simulated in the browser:

- **No real network requests**: All responses are mocked
- **Mock data**: Users, posts, and other resources are predefined
- **Simulated latency**: Request delays are artificial
- **No authentication persistence**: JWT tokens are visual demonstrations only

## Limitations

1. No real backend - all data is mocked
2. No actual network latency variations
3. No rate limiting enforcement
4. No database persistence
5. Authentication is visual only (not secure)

## Topics Covered

- API Fundamentals (What is an API, Client-Server Model, HTTP Basics)
- REST Design (Constraints, Resource Modeling, URL Design, Idempotency, Error Handling, HATEOAS, Versioning)
- GraphQL (Schema & Types, Queries & Mutations, Resolvers, N+1 Problem)
- Security (Authentication, Authorization, Rate Limiting)
- Performance (Caching, Performance Bottlenecks, Batching)
- Evolution (Backward Compatibility, Schema Evolution, Webhooks)
- Architecture (Documentation, Public/Private APIs, Gateway Patterns, BFF, Microservices)

## Accessibility

- Keyboard navigation supported
- ARIA labels on interactive elements
- Respects `prefers-reduced-motion`

## License

MIT - Built for educational purposes.

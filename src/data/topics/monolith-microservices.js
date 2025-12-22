export default {
  title: 'Monolith vs Microservices',
  path: 'architecture',
  definition: 'Monoliths combine all functionality in one deployable unit. Microservices split into independent, deployable services. Each approach has trade-offs in complexity, scaling, and development speed.',
  analogy: 'Like a small shop (monolith) vs a mall with specialized stores (microservices). The mall can scale individual stores but needs more coordination.',
  keyPoints: [
    '<span class="code-highlight">Monolith</span>: Simpler to develop, harder to scale',
    '<span class="code-highlight">Microservices</span>: Independent scaling, operational complexity',
    '<span class="code-highlight">Hybrid</span> approaches exist',
    '<span class="code-highlight">Start simple</span>, split when needed',
    '<span class="code-highlight">Communication</span> overhead in microservices'
  ],
  visualizer: 'architecture',
  codeExamples: {
    monolith: `// Single deployable unit
- One codebase
- One database
- One deployment
- Easy to develop initially
// Scaling: Scale entire application`,
    microservices: `// Multiple independent services
- User Service -> users database
- Order Service -> orders database
- Payment Service -> payments database
- Each deployable independently
// Scaling: Scale only what needs it`
  }
};

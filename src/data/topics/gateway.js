export default {
  title: 'API Gateway Patterns',
  path: 'architecture',
  definition: 'An API gateway is a server that acts as a single entry point for all API requests. It handles cross-cutting concerns like authentication, rate limiting, and request transformation.',
  analogy: 'Like a hotel concierge - they handle check-in, requests, and routing so you do not have to go to each department directly.',
  keyPoints: [
    '<span class="code-highlight">Centralized authentication</span>',
    '<span class="code-highlight">Rate limiting</span> and throttling',
    '<span class="code-highlight">Request/response transformation</span>',
    'Can <span class="code-highlight">aggregate</span> multiple services',
    'Provides <span class="code-highlight">analytics</span> and monitoring'
  ],
  visualizer: 'gateway',
  codeExamples: {
    architecture: `// Client -> Gateway -> Multiple Services
<span class="code-highlight">Client</span> ──> Gateway ──> Auth Service
                  ├──> User Service
                  └──> Order Service

// Gateway handles:
// - Authentication check
// - Rate limiting
// - Request routing
// - Response aggregation`
  }
};

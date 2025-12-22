export default {
  title: 'REST Constraints',
  path: 'rest-mastery',
  definition: 'REST (Representational State Transfer) is an architectural style defined by 6 constraints. These constraints ensure scalability, simplicity, and reliability. Following these constraints creates "RESTful" APIs that are predictable and easy to understand.',
  analogy: 'REST constraints are like the rules of a board game - they might seem restrictive, but they ensure fair play, prevent chaos, and make the game learnable.',
  keyPoints: [
    '<span class="code-highlight">Client-Server</span>: Separation of concerns',
    '<span class="code-highlight">Stateless</span>: Each request contains all needed info',
    '<span class="code-highlight">Cacheable</span>: Responses can be cached by clients',
    '<span class="code-highlight">Uniform Interface</span>: Consistent naming patterns',
    '<span class="code-highlight">Layered System</span>: Can have intermediaries',
    '<span class="code-highlight">Code on Demand</span>: Servers can send executable code (optional)'
  ],
  visualizer: 'restConstraints',
  codeExamples: {
    stateless: `// Each request is self-contained
<span class="code-highlight">GET</span> /users/123 HTTP/1.1
Host: api.example.com
<span class="code-highlight">Authorization: Bearer token-for-user-123</span>

// Server does NOT need to remember previous requests`,
    cacheable: `// Response includes cache headers
HTTP/1.1 200 OK
<span class="code-highlight">Cache-Control: max-age=3600</span>
<span class="code-highlight">ETag: "abc123"</span>

// Client can reuse this response for 1 hour`
  }
};

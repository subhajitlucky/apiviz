export default {
  title: 'What is an API?',
  path: 'fundamentals',
  definition: 'An API (Application Programming Interface) is a formally defined contract between two software systems that specifies how they communicate. It abstracts implementation details and exposes only the necessary interfaces for clients to interact with a service.',
  analogy: 'Think of an API like a restaurant menu - it tells you what options are available and how to order them, without you needing to know how the kitchen works internally.',
  keyPoints: [
    'APIs define request formats, response structures, and error formats',
    'They enable separation of concerns between client and server',
    'Well-designed APIs are consistent, predictable, and self-documenting',
    'APIs can be local (within an app) or remote (over a network)'
  ],
  visualizer: 'clientServer',
  codeExamples: {
    rest: `// Client requests user data
<span class="code-highlight">GET</span> /api/users/123 HTTP/1.1
Accept: application/json

// Server responds with JSON
HTTP/1.1 <span class="code-highlight">200 OK</span>
Content-Type: application/json

{"id": 123, "name": "Alice", "email": "alice@example.com"}`,
    graphql: `// Client requests specific fields
<span class="code-highlight">query</span> {
  <span class="code-highlight">user</span>(id: "123") {
    <span class="code-highlight">name</span>
    <span class="code-highlight">email</span>
  }
}

// Server responds with exactly what was requested
{
  "data": {
    "user": {
      "name": "Alice",
      "email": "alice@example.com"
    }
  }
}`
  }
};

export default {
  title: 'Batching & Aggregation',
  path: 'performance',
  definition: 'Batching combines multiple requests into one, reducing network overhead and improving efficiency. This is especially valuable when clients need data from multiple resources.',
  analogy: 'Like a school bus - one trip instead of 30 individual car rides, saving time and resources for everyone.',
  keyPoints: [
    '<span class="code-highlight">GraphQL</span> has native query batching',
    '<span class="code-highlight">REST</span> can use batch endpoints',
    'Trade-off: complexity vs performance',
    'Can combine with <span class="code-highlight">caching</span>',
    'Example: POST /api/batch with array of requests'
  ],
  codeExamples: {
    graphql: `# GraphQL query batching
<span class="code-highlight">query</span> {
  user(id: "1") { name }
  user(id: "2") { name }
  user(id: "3") { name }
}
// All 3 users fetched in single request`,
    rest: `# REST batch request
POST /api/batch
[
  {"method": "GET", "path": "/users/1"},
  {"method": "GET", "path": "/users/2"},
  {"method": "GET", "path": "/users/3"}
]

// Returns array of 3 responses`
  }
};

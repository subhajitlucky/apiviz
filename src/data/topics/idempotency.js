export default {
  title: 'Idempotency & Safety',
  path: 'rest-mastery',
  definition: 'Safety means a request does not modify state. Idempotency means making the same request multiple times has the same effect as making it once. These properties are crucial for reliable API design, especially in distributed systems.',
  analogy: 'Pressing the elevator button for floor 5 is idempotent - pressing it 10 times wont take you to floor 50. But pressing the door close button is not idempotent - it only works once.',
  keyPoints: [
    '<span class="code-highlight">Safe methods</span>: GET, HEAD, OPTIONS, TRACE (read-only)',
    '<span class="code-highlight">Idempotent methods</span>: GET, PUT, DELETE, HEAD, OPTIONS, TRACE',
    '<span class="code-highlight">POST</span> is NOT idempotent (creates new resources each time)',
    '<span class="code-highlight">PUT</span> is idempotent (same result each time)',
    'Use idempotency keys for unsafe operations in production'
  ],
  visualizer: 'idempotency',
  codeExamples: {
    idempotent: `// PUT is idempotent
<span class="code-highlight">PUT</span> /users/123 {"name": "Alice"}
<span class="code-highlight">PUT</span> /users/123 {"name": "Alice"}  // Same result`,
    nonIdempotent: `// POST is NOT idempotent
<span class="code-highlight">POST</span> /users {"name": "Alice"}  // Creates user 1
<span class="code-highlight">POST</span> /users {"name": "Alice"}  // Creates user 2`
  }
};

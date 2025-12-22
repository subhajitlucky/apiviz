export default {
  title: 'Schema Evolution',
  path: 'evolution',
  definition: 'Schema evolution is the process of safely changing API contracts over time. The key principle is that changes should not break existing clients, only additive changes are safe.',
  analogy: 'Like renovating a house while people still live in it - you need to be careful not to make the place unlivable for current occupants.',
  keyPoints: [
    '<span class="code-highlight">Additive changes</span> are safe',
    '<span class="code-highlight">Breaking changes</span> need new versions',
    'Use <span class="code-highlight">deprecation warnings</span>',
    '<span class="code-highlight">Document</span> migration paths',
    'Test against existing client behavior'
  ],
  visualizer: 'schemaEvolution',
  codeExamples: {
    additive: `# Safe additive changes
// Before
type User {
  id: ID!
  name: String!
}

// After - <span class="code-highlight">Safe!</span>
type User {
  id: ID!
  name: String!
  <span class="code-highlight">email: String</span>     // Added
  <span class="code-highlight">avatar: String</span>    // Added
}`,
    breaking: `# Breaking changes
// Before
type User {
  name: String!  // Required
}

// After - <span class="code-highlight">BREAKING!</span>
type User {
  <span class="code-highlight">name: String</span>   // Now optional
}`,
    migration: `// Versioned schema migration
// v1: { name, email }
// v2: { name, email, phone }
// v3: { firstName, lastName, email, phone }
//
// v3 client must handle v1 response:
// { name: "Alice" } -> use split to get first/last`
  }
};

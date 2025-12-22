export default {
  title: 'REST vs GraphQL Comparison',
  path: 'graphql-deep',
  definition: 'REST and GraphQL are different approaches to API design with distinct trade-offs. REST uses multiple endpoints with fixed responses; GraphQL uses a single endpoint with flexible responses. Neither is universally better - the choice depends on your use case.',
  analogy: 'REST is like ordering from a fixed menu where you get the whole plate. GraphQL is like customizing your order - you get exactly what you want, but the kitchen needs more information.',
  keyPoints: [
    '<span class="code-highlight">REST</span>: Multiple endpoints, fixed responses',
    '<span class="code-highlight">GraphQL</span>: Single endpoint, flexible responses',
    'REST often <span class="code-highlight">over-fetches</span> (all fields in response)',
    'REST often <span class="code-highlight">under-fetches</span> (multiple round trips)',
    'GraphQL requires <span class="code-highlight">careful schema design</span>'
  ],
  visualizer: 'restVsGraphql',
  codeExamples: {
    rest: `# REST: Multiple requests needed
<span class="code-highlight">GET</span> /users/123          // User data
<span class="code-highlight">GET</span> /users/123/posts    // User posts
<span class="code-highlight">GET</span> /posts/1,2,3        // Individual posts
// 3+ requests, likely over-fetching`,
    graphql: `# GraphQL: One flexible request
<span class="code-highlight">query</span> {
  user(id: "123") {
    name
    posts {
      title
    }
  }
}
// 1 request, exactly what you need`
  }
};

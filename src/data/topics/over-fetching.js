export default {
  title: 'Over-fetching vs Under-fetching',
  path: 'graphql-deep',
  definition: 'Over-fetching means receiving more data than needed. Under-fetching means making multiple requests to get all needed data. Both are common problems in REST that GraphQL solves with precise field selection.',
  analogy: 'Over-fetching is like buying a whole pizza when you only wanted one slice. Under-fetching is like going to 5 different stores to get ingredients for one meal.',
  keyPoints: [
    '<span class="code-highlight">Over-fetching</span>: Client receives unused data',
    '<span class="code-highlight">Under-fetching</span>: Multiple round trips needed',
    'REST commonly suffers from <span class="code-highlight">both problems</span>',
    'GraphQL solves by letting clients <span class="code-highlight">specify fields</span>',
    'Trade-off: GraphQL complexity vs network efficiency'
  ],
  visualizer: 'fetching',
  codeExamples: {
    rest: `# REST: User needs only name and post titles
<span class="code-highlight">GET</span> /users/123
// Returns: id, name, email, avatar, created_at, posts_count...
// <span class="code-highlight">Over-fetching</span>: Email, avatar unused

<span class="code-highlight">GET</span> /users/123/posts
// <span class="code-highlight">Under-fetching</span>: Another round trip needed`,
    graphql: `# GraphQL: Ask for exactly what you need
<span class="code-highlight">query</span> {
  user(id: "123") {
    <span class="code-highlight">name</span>
    <span class="code-highlight">posts</span> {
      <span class="code-highlight">title</span>
    }
  }
}
// Returns exactly: {name, posts: [{title}]}
// No over-fetching, no under-fetching`
  }
};

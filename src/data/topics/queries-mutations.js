export default {
  title: 'Queries & Mutations',
  path: 'graphql-deep',
  definition: 'Queries fetch data, mutations modify it. Both follow the schema structure and return predictable responses. GraphQL allows clients to request nested data in a single request.',
  analogy: 'Queries are like asking questions (read-only), mutations are like giving commands (write operations). Both get responses, but only mutations change state.',
  keyPoints: [
    '<span class="code-highlight">Queries</span> are read-only and parallelizable',
    '<span class="code-highlight">Mutations</span> execute sequentially (in order)',
    'Both return data in the <span class="code-highlight">same shape</span> as requested',
    'Nested fields return <span class="code-highlight">related data</span> automatically',
    'Use fragments to reuse field sets'
  ],
  codeExamples: {
    query: `// Query: Fetch user with posts
<span class="code-highlight">query</span> GetUserWithPosts($userId: ID!) {
  <span class="code-highlight">user</span>(id: $userId) {
    id
    name
    <span class="code-highlight">posts</span>(first: 5) {
      id
      title
    }
  }
}`,
    mutation: `// Mutation: Create a new post
<span class="code-highlight">mutation</span> CreatePost($input: CreatePostInput!) {
  <span class="code-highlight">createPost</span>(input: $input) {
    id
    title
    createdAt
  }
}`
  }
};

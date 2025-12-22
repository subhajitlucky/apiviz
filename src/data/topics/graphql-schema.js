export default {
  title: 'GraphQL Schema & Types',
  path: 'graphql-deep',
  definition: 'GraphQL schemas define the structure of available data using a strongly-typed type system. The schema serves as a contract between client and server, enabling clients to query exactly what they need and nothing more.',
  analogy: 'A GraphQL schema is like a restaurant menu with all ingredients listed - you can see everything available and request exactly what you want, including modifications.',
  keyPoints: [
    '<span class="code-highlight">Schema</span> defines types, queries, and mutations',
    '<span class="code-highlight">Types</span> can be objects, scalars, enums, or interfaces',
    'Everything is <span class="code-highlight">strongly typed</span>',
    'Schema is <span class="code-highlight">self-documenting</span> and queryable',
    '<span class="code-highlight">!</span> indicates non-nullable field'
  ],
  codeExamples: {
    schema: `type <span class="code-highlight">User</span> {
  id: <span class="code-highlight">ID!</span>
  name: <span class="code-highlight">String!</span>
  email: <span class="code-highlight">String!</span>
  posts: [<span class="code-highlight">Post</span>!]
}

type <span class="code-highlight">Post</span> {
  id: <span class="code-highlight">ID!</span>
  title: <span class="code-highlight">String!</span>
  content: String
  author: <span class="code-highlight">User!</span>
}

type Query {
  <span class="code-highlight">user</span>(id: ID!): User
  <span class="code-highlight">users</span>: [<span class="code-highlight">User!</span>!]!}`
  }
};

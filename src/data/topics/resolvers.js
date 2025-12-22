export default {
  title: 'Resolvers & Execution Flow',
  path: 'graphql-deep',
  definition: 'Resolvers are functions that fetch data for each field in a query. They execute in a tree pattern, with parent values flowing down to child resolvers. This enables efficient data fetching through batching.',
  analogy: 'Like a team of specialists - each person handles their specific task and reports back, coordinating to complete the overall job efficiently.',
  keyPoints: [
    'Each field has a <span class="code-highlight">resolver function</span>',
    '<span class="code-highlight">Parent value</span> flows down through the tree',
    '<span class="code-highlight">Independent resolvers</span> run in parallel',
    'Can batch requests for efficiency using DataLoader',
    'Resolver can return promises for async operations'
  ],
  visualizer: 'resolverFlow',
  codeExamples: {
    resolvers: `const resolvers = {
  Query: {
    <span class="code-highlight">user</span>: (_, { id }) => db.users.find(id),
  },
  User: {
    <span class="code-highlight">posts</span>: (parent) => db.posts.findByAuthor(parent.id),
    <span class="code-highlight">fullName</span>: (parent) => \`\${parent.first} \${parent.last}\`,
  },
};
// When querying user.posts, GraphQL:
// 1. Resolves user
// 2. Passes user to posts resolver
// 3. Returns posts for that user`
  }
};

export default {
  title: 'N+1 Problem',
  path: 'graphql-deep',
  definition: 'The N+1 problem occurs when fetching a list of items triggers additional requests for each items related data. This is common when resolvers fetch data individually instead of batching.',
  analogy: 'Like asking for a list of books and then making a separate trip to the library for each books details instead of checking all books at once.',
  keyPoints: [
    '<span class="code-highlight">N+1</span>: 1 query + N queries for related data',
    'Common in both REST and GraphQL',
    'GraphQL makes it more <span class="code-highlight">visible</span>',
    'Solutions: <span class="code-highlight">DataLoader</span> pattern, eager loading',
    'Monitoring helps identify the problem'
  ],
  visualizer: 'nPlusOne',
  codeExamples: {
    problem: `# Query fetching 100 users with their posts
<span class="code-highlight">query</span> {
  users {
    name
    posts {
      title
    }
  }
}
// Executes:
// 1. SELECT * FROM users
// 2. SELECT * FROM posts WHERE user_id = 1
// 3. SELECT * FROM posts WHERE user_id = 2
// ... (100 queries for posts!)`,
    solution: `// Using DataLoader to batch requests
const userLoader = new DataLoader(async (userIds) => {
  const users = await db.posts.where('user_id').in(userIds);
  // Single query: SELECT * FROM posts WHERE user_id IN (1,2,3...)
  return userIds.map(id => users.filter(u => u.user_id === id));
});
// Now all 100 posts fetched in 1 query!`
  }
};

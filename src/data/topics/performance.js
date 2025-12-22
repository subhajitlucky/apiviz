export default {
  title: 'API Performance Bottlenecks',
  path: 'performance',
  definition: 'Performance bottlenecks slow down API responses and affect user experience. Common culprits include slow database queries, large payloads, inefficient serialization, and lack of concurrency.',
  analogy: 'Like a highway bottleneck - even if most lanes are open, a single narrow section slows down all traffic.',
  keyPoints: [
    '<span class="code-highlight">Profile</span> to find real bottlenecks',
    '<span class="code-highlight">Database queries</span> are common culprits',
    '<span class="code-highlight">Compression</span> reduces payload size',
    '<span class="code-highlight">Connection pooling</span> helps',
    'Use <span class="code-highlight">async/parallel</span> for independent operations'
  ],
  visualizer: 'performance',
  codeExamples: {
    slow: `// Slow: Sequential queries
const user = await <span class="code-highlight">db.users.find(id)</span>;
const posts = await <span class="code-highlight">db.posts.find({userId: id})</span>;
const comments = await <span class="code-highlight">db.comments.find({userId: id})</span>;
// Total time: 100ms + 80ms + 80ms = 260ms`,
    fast: `// Fast: Parallel queries
const [user, posts, comments] = await Promise.all([
  <span class="code-highlight">db.users.find(id)</span>,
  <span class="code-highlight">db.posts.find({userId: id})</span>,
  <span class="code-highlight">db.comments.find({userId: id})</span>
]);
// Total time: max(100ms, 80ms, 80ms) = 100ms`
  }
};

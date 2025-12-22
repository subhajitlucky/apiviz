export default {
  title: 'Pagination, Filtering, Sorting',
  path: 'rest-mastery',
  definition: 'These techniques help clients retrieve large datasets efficiently. Pagination limits result sets, filtering selects specific items, and sorting orders results - all preventing overwhelming the server or network.',
  analogy: 'Like flipping through a book page by page instead of reading everything at once, or using a library catalog to find specific books.',
  keyPoints: [
    '<span class="code-highlight">Offset-based</span>: ?page=2&limit=20 (simple, but slow on large offsets)',
    '<span class="code-highlight">Cursor-based</span>: ?cursor=abc123 (efficient for infinite scroll)',
    '<span class="code-highlight">Filtering</span>: ?status=active&type=premium',
    '<span class="code-highlight">Sorting</span>: ?sort=-createdAt,name (descending, then ascending)'
  ],
  visualizer: 'pagination',
  codeExamples: {
    pagination: `// Offset-based pagination
<span class="code-highlight">GET</span> /posts?page=3&limit=10
// Returns posts 21-30

// Cursor-based pagination (more efficient)
<span class="code-highlight">GET</span> /posts?limit=10&cursor=eyJpZCI6IjM1In0
// Returns next 10 after cursor`,
    filtering: `// Combined query parameters
<span class="code-highlight">GET</span> /posts?
  status=published&
  author_id=123&
  <span class="code-highlight">sort</span>=-createdAt&
  <span class="code-highlight">limit</span>=20`
  }
};

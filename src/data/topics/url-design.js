export default {
  title: 'URL Design & Naming',
  path: 'rest-mastery',
  definition: 'URL design follows conventions that make APIs intuitive and predictable. Good URLs are clean, hierarchical, and use standard conventions that help developers understand the API structure at a glance.',
  analogy: 'Good URLs are like a well-organized filing cabinet - you can guess where things are located without needing a map.',
  keyPoints: [
    'Use <span class="code-highlight">kebab-case</span> for multi-word paths: /user-profiles',
    'Use <span class="code-highlight">plural nouns</span> for collections: /users',
    'Use <span class="code-highlight">query parameters</span> for filtering, sorting, pagination',
    'Keep URLs <span class="code-highlight">readable</span> and not overly deep',
    'Use <span class="code-highlight">hyphens</span> to separate words, not underscores'
  ],
  codeExamples: {
    naming: `// Good URL patterns
<span class="code-highlight">/users</span>                  // Collection
<span class="code-highlight">/users/123</span>              // Specific resource
<span class="code-highlight">/users/123/posts</span>        // Nested resource
<span class="code-highlight">/posts?status=published</span> // Filter
<span class="code-highlight">/posts?sort=-createdAt</span>  // Sort descending`,
    antiPatterns: `// Avoid these
<span class="code-highlight">/get_User_Data</span>          // Underscores, verb
<span class="code-highlight">/API/v1/users/get</span>       // Verb in URL
<span class="code-highlight">/users_posts</span>            // Underscores`
  }
};

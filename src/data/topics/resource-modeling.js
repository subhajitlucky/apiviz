export default {
  title: 'Resource Modeling',
  path: 'rest-mastery',
  definition: 'Resource modeling is the process of identifying data entities that can be addressed and manipulated via a consistent interface. Resources are the key abstractions in REST - they are nouns representing entities that can be identified, accessed, and modified.',
  analogy: 'Think of a library - each book is a resource with a unique location (URL), and you interact using standard actions (check out, return, etc.).',
  keyPoints: [
    'Resources are <span class="code-highlight">nouns</span>, not verbs (use /users, not /getUsers)',
    'Resources should have unique <span class="code-highlight">identifiers</span> (URLs)',
    'Use plural nouns for collections: <span class="code-highlight">/users</span>',
    'Resources can have relationships (nested URLs)',
    'Resources represent <span class="code-highlight">state</span>, actions are HTTP methods'
  ],
  codeExamples: {
    good: `// Good REST URL design
<span class="code-highlight">GET</span> /users              // List users
<span class="code-highlight">GET</span> /users/123          // Get user 123
<span class="code-highlight">GET</span> /users/123/orders   // Get user's orders
<span class="code-highlight">POST</span> /users             // Create user`,
    bad: `// Avoid these patterns
<span class="code-highlight">GET</span> /getUsers
<span class="code-highlight">GET</span> /getUserById?id=123
<span class="code-highlight">POST</span> /createNewUser`
  }
};

export default {
  title: 'Backward Compatibility',
  path: 'evolution',
  definition: 'Backward compatibility means existing clients continue working when the API evolves. This is achieved by adding new fields, never removing or changing existing ones, and deprecating before removing.',
  analogy: 'Like video game consoles - old games still work on new systems (usually), maintaining compatibility for existing investments.',
  keyPoints: [
    'Never <span class="code-highlight">remove fields</span>, add new ones',
    'Dont <span class="code-highlight">change field types</span>',
    '<span class="code-highlight">Deprecate</span> before removing',
    'Version <span class="code-highlight">major changes</span> for breaking changes',
    'Use <span class="code-highlight">additive changes</span> for new features'
  ],
  codeExamples: {
    good: `// Good: Add field, never remove
{
  "id": 123,
  "name": "Alice",
  <span class="code-highlight">"newField": "added value"</span>  // Old clients ignore this
}`,
    bad: `// Bad: Breaking change
{
  <span class="code-highlight">// "id" removed - breaks existing clients!</span>
  "name": "Alice"
}`,
    deprecation: `{
  "id": 123,
  "name": "Alice",
  <span class="code-highlight">"oldField": "deprecated"</span>,
  "_deprecated": {
    "oldField": "Use newField instead. Will be removed in v3.0"
  }
}`
  }
};

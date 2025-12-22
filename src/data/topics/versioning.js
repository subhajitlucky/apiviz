export default {
  title: 'Versioning Strategies',
  path: 'rest-mastery',
  definition: 'API versioning allows you to evolve your API without breaking existing client integrations. It signals when changes might affect compatibility, giving clients time to migrate.',
  analogy: 'Like software versions - you can have multiple versions running side by side, and users can choose when to upgrade.',
  keyPoints: [
    '<span class="code-highlight">URL versioning</span>: /api/v1/users vs /api/v2/users (most common)',
    '<span class="code-highlight">Header versioning</span>: Accept: application/vnd.api+json;version=2',
    '<span class="code-highlight">Query param</span>: /api/users?version=2',
    'Only use <span class="code-highlight">major versions</span> for breaking changes',
    'Maintain backward compatibility within major versions'
  ],
  visualizer: 'versioning',
  codeExamples: {
    urlVersioning: `# v1 API
<span class="code-highlight">GET</span> /api/v1/users

# v2 API (evolved)
<span class="code-highlight">GET</span> /api/v2/users`,
    headerVersioning: `# Using headers
<span class="code-highlight">GET</span> /api/users HTTP/1.1
Accept: application/vnd.api+json;<span class="code-highlight">version=2</span>`
  }
};

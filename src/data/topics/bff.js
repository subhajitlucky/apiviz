export default {
  title: 'BFF (Backend for Frontend)',
  path: 'architecture',
  definition: 'BFF is a pattern where a dedicated backend layer serves specific frontend needs. This layer aggregates data from multiple services and shapes responses for each frontend type.',
  analogy: 'Like having a personal shopper who knows your preferences instead of browsing the whole store yourself.',
  keyPoints: [
    'Different BFFs for <span class="code-highlight">web, mobile</span>, etc.',
    '<span class="code-highlight">Reduces over-fetching</span> for each client',
    'Can <span class="code-highlight">aggregate</span> multiple services',
    'Adds <span class="code-highlight">complexity</span>, must be justified',
    'Good for <span class="code-highlight">different data needs</span>'
  ],
  codeExamples: {
    mobile: `# Mobile BFF optimizes for bandwidth
GET /api/mobile/dashboard
// Returns minimal fields:
{
  "user": { "id", "name", "avatarUrl" },
  "notifications": [{ "id", "message" }]
}

# Web BFF returns richer data
GET /api/web/dashboard
// Returns full data:
{
  "user": { "id", "name", "email", "settings", "avatarUrl" },
  "notifications": [{ "id", "message", "timestamp", "read" }]
}`
  }
};

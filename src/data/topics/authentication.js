export default {
  title: 'Authentication',
  path: 'security',
  definition: 'Authentication verifies identity - proving you are who you claim to be. It answers "Who are you?" and typically involves credentials like passwords, API keys, or tokens.',
  analogy: 'Like showing your ID at a club entrance - you are proving your identity to gain access.',
  keyPoints: [
    '<span class="code-highlight">API Keys</span>: Simple tokens in headers (easy, less secure)',
    '<span class="code-highlight">JWT</span>: Self-contained tokens with claims (stateless)',
    '<span class="code-highlight">OAuth 2.0</span>: Delegated authorization framework',
    '<span class="code-highlight">Sessions</span>: Server-side user state',
    'Always use <span class="code-highlight">HTTPS</span> to protect credentials'
  ],
  visualizer: 'authFlow',
  codeExamples: {
    apiKey: `// API Key authentication
<span class="code-highlight">GET</span> /api/data HTTP/1.1
X-API-Key: ak_1234567890abcdef`,
    jwt: `// JWT Bearer token
<span class="code-highlight">GET</span> /api/data HTTP/1.1
Authorization: Bearer <span class="code-highlight">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</span>

// JWT structure
// <span class="code-highlight">HEADER</span>.<span class="code-highlight">PAYLOAD</span>.<span class="code-highlight">SIGNATURE</span>`,
    jwtPayload: `{
  "sub": "1234567890",  // <span class="code-highlight">User ID</span>
  "name": "Alice",
  "role": "<span class="code-highlight">admin</span>",
  "exp": 1516239022     // <span class="code-highlight">Expiration</span>
}`
  }
};

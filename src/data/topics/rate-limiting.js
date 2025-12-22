export default {
  title: 'Rate Limiting & Throttling',
  path: 'security',
  definition: 'Rate limiting controls how many requests a client can make in a given time period. This prevents abuse, ensures fair resource usage, and protects against DDoS attacks.',
  analogy: 'Like a water faucet with a flow limiter - you can only use so much per minute, preventing waste and ensuring everyone gets water.',
  keyPoints: [
    'Common limits: <span class="code-highlight">100 req/min</span>, <span class="code-highlight">1000 req/hour</span>',
    '<span class="code-highlight">Headers</span> show remaining quota',
    '<span class="code-highlight">429 Too Many Requests</span> response when limit hit',
    'Can <span class="code-highlight">tier by API key</span> or user',
    'Consider <span class="code-highlight">burst limits</span> for spikes'
  ],
  visualizer: 'rateLimiting',
  codeExamples: {
    headers: `# Rate limit headers
<span class="code-highlight">X-RateLimit-Limit</span>: 100        // Max requests
<span class="code-highlight">X-RateLimit-Remaining</span>: 75      // Requests left
<span class="code-highlight">X-RateLimit-Reset</span>: 1640995200  // When limit resets`,
    response: `# 429 Too Many Requests
HTTP/1.1 <span class="code-highlight">429</span>
Retry-After: <span class="code-highlight">60</span>          // Try again in 60 seconds
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0`
  }
};

export default {
  title: 'Caching',
  path: 'performance',
  definition: 'Caching stores responses to serve identical requests faster, reducing latency and server load. It can occur at multiple levels: client, CDN, and origin server.',
  analogy: 'Like a photocopier making copies - the first copy takes time, but copies of the same document are instant because the template is cached.',
  keyPoints: [
    '<span class="code-highlight">CDN</span> caches at edge locations globally',
    '<span class="code-highlight">Browser</span> caches locally',
    '<span class="code-highlight">HTTP caching headers</span> control behavior',
    '<span class="code-highlight">Cache invalidation</span> is the hard part',
    'Use <span class="code-highlight">ETag</span> and <span class="code-highlight">Last-Modified</span> for revalidation'
  ],
  visualizer: 'caching',
  codeExamples: {
    headers: `# Cache-Control directives
<span class="code-highlight">Cache-Control</span>: max-age=3600           // Cache for 1 hour
<span class="code-highlight">Cache-Control</span>: no-cache            // Must revalidate
<span class="code-highlight">Cache-Control</span>: no-store            // Don't cache
<span class="code-highlight">Cache-Control</span>: public             // Shared cache
<span class="code-highlight">Cache-Control</span>: private            // User cache only`,
    etag: `# Using ETag for revalidation
<span class="code-highlight">GET</span> /data HTTP/1.1
If-None-Match: "abc123"

# 304 Not Modified response
HTTP/1.1 <span class="code-highlight">304</span>
ETag: "abc123"
# (Empty body - use cached version)`
  }
};

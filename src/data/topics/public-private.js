export default {
  title: 'Public vs Private APIs',
  path: 'architecture',
  definition: 'Public APIs are designed for external developers with strict versioning and stability guarantees. Private APIs optimize for internal flexibility and can change faster since you control all clients.',
  analogy: 'Like a stores public entrance (polished, documented) vs its loading dock (functional, for staff only).',
  keyPoints: [
    '<span class="code-highlight">Public APIs</span> need stricter versioning',
    '<span class="code-highlight">Private APIs</span> can change faster',
    '<span class="code-highlight">Authentication</span> differs (external vs internal)',
    '<span class="code-highlight">Rate limiting</span> more important for public',
    '<span class="code-highlight">Documentation</span> critical for public APIs'
  ],
  codeExamples: {
    public: `# Public API requirements
- <span class="code-highlight">Versioning</span>: /v1/, /v2/ in URL
- <span class="code-highlight">Stability</span>: Deprecate before removing
- <span class="code-highlight">Docs</span>: Complete, interactive
- <span class="code-highlight">Rate limits</span>: Strict enforcement
- <span class="code-highlight">Auth</span>: OAuth, API keys`,
    private: `# Private API flexibility
- <span class="code-highlight">Versioning</span>: Implicit, frequent changes ok
- <span class="code-highlight">Stability</span>: Coordinate with internal teams
- <span class="code-highlight">Docs</span>: Lightweight, internal wiki
- <span class="code-highlight">Rate limits</span>: Relaxed
- <span class="code-highlight">Auth</span>: Service mesh, mTLS`
  }
};

export default {
  title: 'API Documentation Design',
  path: 'architecture',
  definition: 'Good documentation is the gateway to API adoption. It should be accurate, complete, easy to navigate, and ideally include interactive examples. Documentation is as important as the API itself.',
  analogy: 'Like a good map - it shows you all the paths available without needing to explore blindly, and helps you reach your destination efficiently.',
  keyPoints: [
    '<span class="code-highlight">OpenAPI/Swagger</span> is the standard',
    'Include <span class="code-highlight">examples</span> for every endpoint',
    'Document <span class="code-highlight">error responses</span>',
    'Keep it <span class="code-highlight">synchronized</span> with code',
    'Add <span class="code-highlight">interactive</span> try-it-out features'
  ],
  codeExamples: {
    openapi: `openapi: 3.0.0
info:
  title: Users API
  version: 1.0.0
paths:
  /users:
    <span class="code-highlight">get</span>:
      summary: List users
      <span class="code-highlight">parameters</span>:
        - name: limit
          in: query
          schema:
            type: integer
            default: 10
      <span class="code-highlight">responses</span>:
        '200':
          description: Success
          content:
            application/json:
              example:
                - id: 1
                  name: Alice`
  }
};

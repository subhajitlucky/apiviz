export default {
  title: 'HTTP Basics',
  path: 'fundamentals',
  definition: 'HTTP (Hypertext Transfer Protocol) is the foundation of web communication. It defines methods to indicate desired actions, status codes to indicate results, and headers to carry metadata. HTTP is stateless, meaning each request is independent.',
  analogy: 'HTTP is like sending letters through mail - you write a request (letter), address it correctly with headers, and receive a response (reply letter) with a status indicating success or failure.',
  keyPoints: [
    '<span class="code-highlight">GET</span> - Retrieve data (safe, idempotent)',
    '<span class="code-highlight">POST</span> - Create new resource',
    '<span class="code-highlight">PUT/PATCH</span> - Update existing resource',
    '<span class="code-highlight">DELETE</span> - Remove resource',
    'Status codes: <span class="code-highlight">2xx</span> (success), <span class="code-highlight">4xx</span> (client error), <span class="code-highlight">5xx</span> (server error)'
  ],
  visualizer: 'httpFlow',
  codeExamples: {
    methods: `<span class="code-highlight">GET</span>    /users          // List all users
<span class="code-highlight">GET</span>    /users/123      // Get specific user
<span class="code-highlight">POST</span>   /users          // Create new user
<span class="code-highlight">PUT</span>    /users/123      // Update entire user
<span class="code-highlight">PATCH</span>  /users/123      // Partial update
<span class="code-highlight">DELETE</span> /users/123      // Delete user`,
    statusCodes: `<span class="code-highlight">200 OK</span>        - Success
<span class="code-highlight">201 Created</span>    - Resource created
<span class="code-highlight">204 No Content</span> - Success, no body
<span class="code-highlight">400 Bad Request</span> - Invalid input
<span class="code-highlight">401 Unauthorized</span> - Not authenticated
<span class="code-highlight">403 Forbidden</span>   - Not authorized
<span class="code-highlight">404 Not Found</span>   - Resource missing
<span class="code-highlight">500 Error</span>       - Server failed`
  }
};

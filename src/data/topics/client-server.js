export default {
  title: 'Client-Server Model',
  path: 'fundamentals',
  definition: 'The client-server model is a distributed application architecture where responsibilities are separated: clients initiate requests, and servers respond with resources or services. This separation enables independent evolution, scaling, and technology choices for each side.',
  analogy: 'Like ordering at a restaurant - you (client) place an order, and the kitchen (server) prepares and delivers your food. You dont need to know how the kitchen operates internally.',
  keyPoints: [
    'Clients initiate communication, servers listen and respond',
    'Servers can handle multiple clients concurrently',
    'Statelessness allows servers to not store client state between requests',
    'Enables horizontal scaling by adding more servers'
  ],
  visualizer: 'clientServer',
  codeExamples: {
    request: `// Client sends request
<span class="code-highlight">GET</span> /api/products/456 HTTP/1.1
Host: api.example.com
Authorization: Bearer token123`,
    response: `// Server responds
HTTP/1.1 <span class="code-highlight">200 OK</span>
Content-Type: application/json

{"id": 456, "name": "Laptop", "price": 999.99}`
  }
};

export default {
  title: 'Mock Servers',
  path: 'testing',
  definition: 'Mock servers simulate API behavior without a real backend. They enable frontend development, testing, and demos to proceed before the actual API is ready.',
  analogy: 'Like a flight simulator - you practice flying without needing an actual plane.',
  keyPoints: [
    '<span class="code-highlight">Mockoon</span>, <span class="code-highlight">Postman</span>, <span class="code-highlight">WireMock</span> are popular',
    'Define responses in OpenAPI/spec files',
    'Supports delays for latency testing',
    'Enable parallel frontend/backend development',
    'Great for CI/CD isolated testing'
  ],
  codeExamples: {
    mockoon: `{
  "uuid": "user-api-mock",
  "name": "User API",
  "port": 3000,
  "routes": [
    {
      "method": "GET",
      "path": "/api/users/:id",
      "response": {
        "status": 200,
        "body": {
          "id": "{{pathParam.id}}",
          "name": "Alice",
          "email": "alice@example.com"
        }
      }
    },
    {
      "method": "POST",
      "path": "/api/users",
      "response": {
        "status": 201,
        "body": {
          "id": "123",
          "name": "{{bodyParam.name}}",
          "createdAt": "{{timestamp}}"
        }
      }
    }
  ]
}`,
    msw: `// Mock Service Worker in tests
import { http, httpHandler } from 'msw';

<span class="code-highlight">const handlers</span> = [
  http.get('/api/users/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: 'Alice',
      email: 'alice@example.com'
    });
  }),

  http.post('/api/users', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      id: '123',
      ...body,
      createdAt: new Date().toISOString()
    }, { status: 201 });
  })
];

export const <span class="code-highlight">mswServer</span> = setupWorker(...handlers);`
  }
};

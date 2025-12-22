export default {
  title: 'API Testing Strategies',
  path: 'testing',
  definition: 'API testing validates that your API works correctly, performs well, and handles errors gracefully. A comprehensive strategy includes unit, integration, and end-to-end tests at different levels.',
  analogy: 'Like testing a cars engine separately (unit), then the whole car on a track (integration), and finally a road trip (end-to-end).',
  keyPoints: [
    '<span class="code-highlight">Unit tests</span>: Individual endpoints',
    '<span class="code-highlight">Integration tests</span>: Multi-service flows',
    '<span class="code-highlight">Contract tests</span>: Provider-consumer agreements',
    'Test status codes, headers, body, and performance',
    'Automate in CI/CD pipelines'
  ],
  codeExamples: {
    jest: `// Jest + Supertest unit test
describe('GET /users/:id', () => {
  <span class="code-highlight">it('returns user by id'</span>, async () => {
    const user = await createTestUser({ name: 'Alice' });

    const response = await request(app)
      .<span class="code-highlight">get</span>('/api/users/' + user.id)
      .expect(200);

    expect(response.body).<span class="code-highlight">toMatchObject</span>({
      id: user.id,
      name: 'Alice'
    });
  });

  <span class="code-highlight">it('returns 404 for unknown user'</span>, async () => {
    const response = await request(app)
      .get('/api/users/999999')
      .expect(404);

    expect(response.body.error).<span class="code-highlight">toBe</span>('NOT_FOUND');
  });
});`,
    playwright: `// Playwright E2E API test
test('complete order workflow', async ({ request }) => {
  // 1. Create user
  const user = await request.post('/api/users', {
    data: { name: 'Alice', email: 'alice@test.com' }
  });
  expect(user.status()).toBe(201);

  // 2. Create product
  const product = await request.post('/api/products', {
    data: { name: 'Laptop', price: 999 }
  });
  expect(product.status()).toBe(201);

  // 3. Place order
  const order = await request.post('/api/orders', {
    data: { userId: user.id, productId: product.id }
  });
  expect(order.status()).toBe(201);

  // 4. Verify order exists
  const getOrder = await request.get('/api/orders/' + order.id);
  expect(getOrder.status()).toBe(200);
});`
  }
};

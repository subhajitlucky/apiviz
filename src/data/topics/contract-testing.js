export default {
  title: 'Contract Testing',
  path: 'testing',
  definition: 'Contract testing ensures that APIs maintain backward compatibility between providers and consumers. It validates that the actual responses match the expected schema without running full integration tests.',
  analogy: 'Like a rental agreement - both landlord and tenant agree on terms, and either can verify the other is holding up their end.',
  keyPoints: [
    '<span class="code-highlight">Provider</span>: Service that exposes API',
    '<span class="code-highlight">Consumer</span>: Service that calls API',
    '<span class="code-highlight">Pact</span> is the most popular framework',
    'Validates schema, not behavior',
    'Catches breaking changes before deployment'
  ],
  codeExamples: {
    pact: `// Consumer pact test
describe('User API Consumer', () => {
  <span class="code-highlight">it('validates user schema'</span>, () => {
    const userConsumer = new MockProvider({
      consumerName: 'UserWebClient',
      providerName: 'UserAPI'
    });

    return userConsumer
      .<span class="code-highlight">given('user exists'</span>)
      .uponReceiving('A request for user')
      .withRequest({
        method: 'GET',
        path: '/api/users/123'
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: <span class="code-highlight">eachLike</span>({
          id: like(123),
          name: like('Alice'),
          email: like('alice@example.com')
        })
      })
      .verify();
  });
});`,
    broker: `# Pact Broker stores and shares contracts
# Consumer pushes contract
pact-broker publish \\
  --consumer-version 1.0.0 \\
  --tag-with-git-branch

# Provider verifies contract
pact-broker can-i-deploy \\
  --consumer UserWebClient \\
  --provider UserAPI \\
  --to-environment production`
  }
};

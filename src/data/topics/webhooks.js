export default {
  title: 'Webhooks',
  path: 'evolution',
  definition: 'Webhooks are HTTP callbacks that notify your application when events occur in another system. Instead of polling for changes, your server pushes notifications to configured endpoints.',
  analogy: 'Like a doorbell - instead of constantly checking if someone is at the door, they ring when they arrive.',
  keyPoints: [
    '<span class="code-highlight">Event-driven</span> communication',
    'Server <span class="code-highlight">pushes</span> to client',
    'Need <span class="code-highlight">reliable retry</span> logic',
    '<span class="code-highlight">Validate</span> webhook signatures',
    'Support <span class="code-highlight">idempotency</span> for retries'
  ],
  visualizer: 'webhooks',
  codeExamples: {
    payload: `# Webhook POST to your server
POST /webhooks/orders HTTP/1.1
Content-Type: application/json
X-Webhook-Signature: <span class="code-highlight">sha256=abc123</span>

{
  "event": "<span class="code-highlight">order.created</span>",
  "data": {
    "orderId": "12345",
    "amount": 99.99
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`,
    signature: `# Validate webhook signature
const <span class="code-highlight">verifySignature</span> = (payload, signature, secret) => {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  return <span class="code-highlight">signature === expected</span>;
};`
  }
};

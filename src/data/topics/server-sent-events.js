export default {
  title: 'Server-Sent Events',
  path: 'realtime',
  definition: 'SSE is a server-push technology where the server sends a continuous stream of text-based events to the client over HTTP. Its simpler than WebSockets but unidirectional (server only).',
  analogy: 'Like a news ticker - the server continuously pushes updates, and you just sit back and watch them scroll by.',
  keyPoints: [
    '<span class="code-highlight">Server-to-client only</span>',
    '<span class="code-highlight">Standard HTTP</span>: No special protocol',
    '<span class="code-highlight">Auto-reconnect</span>: Built-in retry handling',
    '<span class="code-highlight">Event types</span>: Named event streams',
    'Use for: Notifications, live feeds, progress updates'
  ],
  codeExamples: {
    server: `# Server sends SSE stream
HTTP/1.1 200 OK
Content-Type: <span class="code-highlight">text/event-stream</span>
Cache-Control: no-cache
Connection: keep-alive

<span class="code-highlight">event: stock-update</span>
data: {"symbol": "AAPL", "price": 178.52}

<span class="code-highlight">event: stock-update</span>
data: {"symbol": "GOOGL", "price": 141.80}

<span class="code-highlight">retry: 5000</span>`,
    client: `// Client receives SSE stream
const <span class="code-highlight">eventSource</span> = new EventSource('/api/updates');

<span class="code-highlight">eventSource.onmessage</span> = (event) => {
  const data = JSON.parse(event.data);
  console.log('Update:', data);
};

<span class="code-highlight">eventSource.addEventListener</span>('stock-update', (event) => {
  const stock = JSON.parse(event.data);
  updateStockPrice(stock.symbol, stock.price);
});

<span class="code-highlight">eventSource.onerror</span> = () => {
  console.log('Connection lost, reconnecting...');
};`
  }
};

export default {
  title: 'WebSockets',
  path: 'realtime',
  definition: 'WebSockets provide full-duplex, bidirectional communication over a single TCP connection. Unlike HTTP request-response, WebSockets keep the connection open, allowing both client and server to send messages anytime.',
  analogy: 'Like a phone call - once connected, both parties can speak and listen simultaneously, rather than taking turns leaving voicemails.',
  keyPoints: [
    '<span class="code-highlight">Full-duplex</span>: Both ends can send simultaneously',
    '<span class="code-highlight">Persistent connection</span>: No need to reconnect',
    '<span class="code-highlight">Frame-based</span>: Messages in binary frames',
    '<span class="code-highlight">Heartbeats</span>: Keep-alive pings detect disconnects',
    'Use for: Chat, live updates, gaming, collaborative editing'
  ],
  visualizer: 'websocket',
  codeExamples: {
    client: `// Client connects to WebSocket
const <span class="code-highlight">ws</span> = new WebSocket('wss://chat.example.com');

<span class="code-highlight">ws.onopen</span> = () => {
  console.log('Connected!');
};

<span class="code-highlight">ws.onmessage</span> = (event) => {
  const message = JSON.parse(event.data);
  console.log('Received:', message);
};

<span class="code-highlight">ws.send</span>(JSON.stringify({ text: 'Hello!' }));`,
    server: `// Node.js WebSocket server
import { WebSocketServer } from 'ws';

const <span class="code-highlight">wss</span> = new WebSocketServer({ port: 8080 });

<span class="code-highlight">wss.on('connection'</span>, (ws) => {
  console.log('Client connected');

  <span class="code-highlight">ws.on('message'</span>, (data) => {
    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(data);
      }
    });
  });
});`
  }
};

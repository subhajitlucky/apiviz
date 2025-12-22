export default {
  title: 'GraphQL Subscriptions',
  path: 'realtime',
  definition: 'GraphQL subscriptions are long-lived queries that push data to clients when events occur. They use WebSockets under the hood but integrate seamlessly with GraphQL schemas and type systems.',
  analogy: 'Like subscribing to a magazine - you receive new issues automatically as they are published, without asking for each one.',
  keyPoints: [
    '<span class="code-highlight">Event-driven</span>: Push on data changes',
    '<span class="code-highlight">Same schema</span>: Uses existing GraphQL types',
    '<span class="code-highlight">WebSocket transport</span>',
    '<span class="code-highlight">Idempotent</span>: Safe to reconnect',
    'Use for: Live dashboards, chat, collaborative features'
  ],
  codeExamples: {
    schema: `type <span class="code-highlight">Subscription</span> {
  <span class="code-highlight">messageAdded</span>(channelId: ID!): Message
  <span class="code-highlight">userTyping</span>(channelId: ID!): User
}

type Message {
  id: ID!
  text: String!
  author: User!
  <span class="code-highlight">createdAt: String!</span>
}

type User {
  id: ID!
  name: String!
  avatarUrl: String
}`,
    client: `// Subscribe to new messages
<span class="code-highlight">const MESSAGES_SUBSCRIPTION</span> = gql'
  subscription OnMessageAdded($channelId: ID!) {
    messageAdded(channelId: $channelId) {
      id
      text
      author {
        name
        avatarUrl
      }
    }
  }
';

// Subscribe and update cache
useSubscription(MESSAGES_SUBSCRIPTION, {
  variables: { channelId: '123' },
  onData: ({ data }) => {
    const newMessage = data.data.messageAdded;
    setMessages((prev) => [...prev, newMessage]);
  }
});`
  }
};

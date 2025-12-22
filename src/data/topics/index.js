import whatIsApi from './what-is-api.js';
import clientServer from './client-server.js';
import httpBasics from './http-basics.js';
import restConstraints from './rest-constraints.js';
import resourceModeling from './resource-modeling.js';
import urlDesign from './url-design.js';
import idempotency from './idempotency.js';
import pagination from './pagination.js';
import errorHandling from './error-handling.js';
import hateoas from './hateoas.js';
import versioning from './versioning.js';
import graphqlSchema from './graphql-schema.js';
import queriesMutations from './queries-mutations.js';
import resolvers from './resolvers.js';
import restVsGraphql from './rest-vs-graphql.js';
import overFetching from './over-fetching.js';
import nPlusOne from './n-plus-one.js';
import authentication from './authentication.js';
import authorization from './authorization.js';
import rateLimiting from './rate-limiting.js';
import caching from './caching.js';
import performance from './performance.js';
import batching from './batching.js';
import backwardCompat from './backward-compat.js';
import schemaEvolution from './schema-evolution.js';
import webhooks from './webhooks.js';
import documentation from './documentation.js';
import publicPrivate from './public-private.js';
import gateway from './gateway.js';
import bff from './bff.js';
import monolithMicroservices from './monolith-microservices.js';
import websockets from './websockets.js';
import serverSentEvents from './server-sent-events.js';
import graphqlSubscriptions from './graphql-subscriptions.js';
import apiTesting from './api-testing.js';
import contractTesting from './contract-testing.js';
import mockServers from './mock-servers.js';
import grpcIntro from './grpc-intro.js';
import protoBuffers from './proto-buffers.js';

export const topicData = {
  'what-is-api': whatIsApi,
  'client-server': clientServer,
  'http-basics': httpBasics,
  'rest-constraints': restConstraints,
  'resource-modeling': resourceModeling,
  'url-design': urlDesign,
  'idempotency': idempotency,
  'pagination': pagination,
  'error-handling': errorHandling,
  'hateoas': hateoas,
  'versioning': versioning,
  'graphql-schema': graphqlSchema,
  'queries-mutations': queriesMutations,
  'resolvers': resolvers,
  'rest-vs-graphql': restVsGraphql,
  'over-fetching': overFetching,
  'n-plus-one': nPlusOne,
  'authentication': authentication,
  'authorization': authorization,
  'rate-limiting': rateLimiting,
  'caching': caching,
  'performance': performance,
  'batching': batching,
  'backward-compat': backwardCompat,
  'schema-evolution': schemaEvolution,
  'webhooks': webhooks,
  'documentation': documentation,
  'public-private': publicPrivate,
  'gateway': gateway,
  'bff': bff,
  'monolith-microservices': monolithMicroservices,
  'websockets': websockets,
  'server-sent-events': serverSentEvents,
  'graphql-subscriptions': graphqlSubscriptions,
  'api-testing': apiTesting,
  'contract-testing': contractTesting,
  'mock-servers': mockServers,
  'grpc-intro': grpcIntro,
  'proto-buffers': protoBuffers,
};

export const learningPaths = [
  {
    id: 'fundamentals',
    title: 'API Fundamentals',
    description: 'Core concepts every API developer should know',
    icon: '📚',
    color: 'from-blue-500 to-cyan-500',
    topics: [
      { id: 'what-is-api', title: 'What is an API?', slug: 'what-is-api' },
      { id: 'client-server', title: 'Client-Server Model', slug: 'client-server' },
      { id: 'http-basics', title: 'HTTP Basics', slug: 'http-basics' },
    ]
  },
  {
    id: 'rest-mastery',
    title: 'REST Design Mastery',
    description: 'Build robust, scalable REST APIs',
    icon: '🔗',
    color: 'from-indigo-500 to-purple-500',
    topics: [
      { id: 'rest-constraints', title: 'REST Constraints', slug: 'rest-constraints' },
      { id: 'resource-modeling', title: 'Resource Modeling', slug: 'resource-modeling' },
      { id: 'url-design', title: 'URL Design & Naming', slug: 'url-design' },
      { id: 'idempotency', title: 'Idempotency & Safety', slug: 'idempotency' },
      { id: 'pagination', title: 'Pagination, Filtering, Sorting', slug: 'pagination' },
      { id: 'error-handling', title: 'Error Handling & Status Codes', slug: 'error-handling' },
      { id: 'hateoas', title: 'HATEOAS', slug: 'hateoas' },
      { id: 'versioning', title: 'Versioning Strategies', slug: 'versioning' },
    ]
  },
  {
    id: 'graphql-deep',
    title: 'GraphQL Deep Dive',
    description: 'Master the query language for APIs',
    icon: '⚡',
    color: 'from-pink-500 to-rose-500',
    topics: [
      { id: 'graphql-schema', title: 'GraphQL Schema & Types', slug: 'graphql-schema' },
      { id: 'queries-mutations', title: 'Queries & Mutations', slug: 'queries-mutations' },
      { id: 'resolvers', title: 'Resolvers & Execution Flow', slug: 'resolvers' },
      { id: 'rest-vs-graphql', title: 'REST vs GraphQL Comparison', slug: 'rest-vs-graphql' },
      { id: 'over-fetching', title: 'Over-fetching vs Under-fetching', slug: 'over-fetching' },
      { id: 'n-plus-one', title: 'N+1 Problem', slug: 'n-plus-one' },
    ]
  },
  {
    id: 'security',
    title: 'API Security & Auth',
    description: 'Protect your APIs from threats',
    icon: '🔐',
    color: 'from-amber-500 to-orange-500',
    topics: [
      { id: 'authentication', title: 'Authentication (API Keys, OAuth, JWT)', slug: 'authentication' },
      { id: 'authorization', title: 'Authorization Models', slug: 'authorization' },
      { id: 'rate-limiting', title: 'Rate Limiting & Throttling', slug: 'rate-limiting' },
    ]
  },
  {
    id: 'performance',
    title: 'Performance & Caching',
    description: 'Optimize API speed and efficiency',
    icon: '🚀',
    color: 'from-emerald-500 to-teal-500',
    topics: [
      { id: 'caching', title: 'Caching (HTTP, CDN, Client)', slug: 'caching' },
      { id: 'performance', title: 'API Performance Bottlenecks', slug: 'performance' },
      { id: 'batching', title: 'Batching & Aggregation', slug: 'batching' },
    ]
  },
  {
    id: 'evolution',
    title: 'API Evolution & Versioning',
    description: 'Manage change without breaking clients',
    icon: '🔄',
    color: 'from-violet-500 to-fuchsia-500',
    topics: [
      { id: 'backward-compat', title: 'Backward Compatibility', slug: 'backward-compat' },
      { id: 'schema-evolution', title: 'Schema Evolution', slug: 'schema-evolution' },
      { id: 'webhooks', title: 'Webhooks', slug: 'webhooks' },
    ]
  },
  {
    id: 'architecture',
    title: 'Real-World Architecture',
    description: 'Patterns for production systems',
    icon: '🏗️',
    color: 'from-slate-500 to-slate-600',
    topics: [
      { id: 'documentation', title: 'API Documentation Design', slug: 'documentation' },
      { id: 'public-private', title: 'Public vs Private APIs', slug: 'public-private' },
      { id: 'gateway', title: 'API Gateway Patterns', slug: 'gateway' },
      { id: 'bff', title: 'BFF (Backend for Frontend)', slug: 'bff' },
      { id: 'monolith-microservices', title: 'Monolith vs Microservices', slug: 'monolith-microservices' },
    ]
  },
  {
    id: 'realtime',
    title: 'Real-Time APIs',
    description: 'Push, stream, and event-driven communication',
    icon: '⚡',
    color: 'from-orange-500 to-red-500',
    topics: [
      { id: 'websockets', title: 'WebSockets', slug: 'websockets' },
      { id: 'server-sent-events', title: 'Server-Sent Events', slug: 'server-sent-events' },
      { id: 'graphql-subscriptions', title: 'GraphQL Subscriptions', slug: 'graphql-subscriptions' },
    ]
  },
  {
    id: 'testing',
    title: 'API Testing & Contracts',
    description: 'Ensure reliability and backward compatibility',
    icon: '🧪',
    color: 'from-green-500 to-emerald-500',
    topics: [
      { id: 'api-testing', title: 'API Testing Strategies', slug: 'api-testing' },
      { id: 'contract-testing', title: 'Contract Testing', slug: 'contract-testing' },
      { id: 'mock-servers', title: 'Mock Servers', slug: 'mock-servers' },
    ]
  },
  {
    id: 'grpc',
    title: 'gRPC & Protocol Buffers',
    description: 'High-performance binary APIs',
    icon: '🔧',
    color: 'from-purple-500 to-indigo-500',
    topics: [
      { id: 'grpc-intro', title: 'Introduction to gRPC', slug: 'grpc-intro' },
      { id: 'proto-buffers', title: 'Protocol Buffers', slug: 'proto-buffers' },
    ]
  },
];

export const getTopicBySlug = (slug) => topicData[slug] || null;
export const getPathById = (pathId) => learningPaths.find(p => p.id === pathId);

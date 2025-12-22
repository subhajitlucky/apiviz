import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getTopicBySlug, learningPaths, getPathById } from '../data/topics';
import ClientServerFlow from '../components/visualizers/ClientServerFlow';
import RestVsGraphql from '../components/visualizers/RestVsGraphql';
import AuthFlow from '../components/visualizers/AuthFlow';
import CachingFlow from '../components/visualizers/CachingFlow';
import HttpFlow from '../components/visualizers/HttpFlow';
import WebSocketFlow from '../components/visualizers/WebSocketFlow';
import { ArrowLeft, ChevronRight, Lightbulb, Zap, AlertTriangle, Code2, CheckCircle, XCircle, HelpCircle } from 'lucide-react';

const visualizers = {
  clientServer: ClientServerFlow,
  httpFlow: HttpFlow,
  restVsGraphql: RestVsGraphql,
  authFlow: AuthFlow,
  caching: CachingFlow,
  websocket: WebSocketFlow,
};

function CodeBlock({ title, code }) {
  return (
    <div className="rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 dark:bg-[#1e293b] border-b border-slate-700 dark:border-slate-600">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-slate-400 ml-2">{title}</span>
      </div>
      <pre className="p-4 overflow-x-auto bg-[#0d1117]">
        <code
          className="text-sm text-slate-300 dark:text-gray-300 font-mono leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: code.replace(
              /<span class="code-highlight">([^<]*)<\/span>/g,
              '<mark class="bg-primary-500/20 text-primary-300 dark:text-primary-200 px-1 rounded">$1</mark>'
            )
          }}
        />
      </pre>
    </div>
  );
}

// Quiz data for all topics
const quizData = {
  // Fundamentals
  'what-is-api': [
    { question: 'What does API stand for?', options: ['Application Programming Interface', 'Automated Program Integration', 'Application Process Integration'], correct: 0 },
    { question: 'APIs primarily enable:', options: ['Separation of concerns between client and server', 'Database connections only', 'User interface design'], correct: 0 },
    { question: 'Well-designed APIs should be:', options: ['Complex and feature-rich', 'Consistent, predictable, and self-documenting', 'Optimized for a single client'], correct: 1 },
  ],
  'client-server': [
    { question: 'In the client-server model, who initiates communication?', options: ['Server', 'Client', 'Both simultaneously'], correct: 1 },
    { question: 'What does statelessness mean?', options: ['Server stores client state', 'Each request contains all needed info', 'Client stores server state'], correct: 1 },
    { question: 'Stateless architecture enables:', options: ['Tight coupling', 'Horizontal scaling', 'Mandatory session persistence'], correct: 1 },
  ],
  'http-basics': [
    { question: 'Which HTTP method is idempotent?', options: ['POST only', 'GET, PUT, DELETE', 'Only POST'], correct: 1 },
    { question: 'What does 404 status code mean?', options: ['Server error', 'Resource not found', 'Created successfully'], correct: 1 },
    { question: 'Which is a safe method?', options: ['POST', 'DELETE', 'GET'], correct: 2 },
    { question: '500 status code indicates:', options: ['Client error', 'Server error', 'Redirect'], correct: 1 },
  ],
  // REST Mastery
  'rest-constraints': [
    { question: 'Which is NOT a REST constraint?', options: ['Statelessness', 'Client-Server architecture', 'XML-only responses'], correct: 2 },
    { question: 'REST responses should be:', options: ['Always XML', 'Cacheable when possible', 'Only in JSON format'], correct: 1 },
    { question: 'What does HATEOAS stand for?', options: ['Hypertext As The Engine Of Application State', 'HTTP API Testing And Error handling', 'Hyperlink And Text Exchange API'], correct: 0 },
  ],
  'resource-modeling': [
    { question: 'Resources in REST are represented as:', options: ['Verbs', 'Nouns', 'Adjectives'], correct: 1 },
    { question: 'URLs should use:', options: ['Plural nouns', 'Verbs', 'Database IDs only'], correct: 0 },
    { question: 'Nested URLs represent:', options: ['Database joins', 'Resource relationships', 'API versioning'], correct: 1 },
  ],
  'url-design': [
    { question: 'Multi-word paths should use:', options: ['snake_case', 'kebab-case', 'camelCase'], correct: 1 },
    { question: 'Query parameters are used for:', options: ['Resource identification', 'Filtering, sorting, pagination', 'Authentication'], correct: 1 },
    { question: 'Which is NOT recommended?', options: ['/users', '/getUsers', '/users/123'], correct: 1 },
  ],
  'idempotency': [
    { question: 'Which method is NOT idempotent?', options: ['PUT', 'DELETE', 'POST'], correct: 2 },
    { question: 'Idempotency means:', options: ['Same result each time', 'One-time use only', 'Returns JSON'], correct: 0 },
    { question: 'Safe methods are:', options: ['Read-only operations', 'Write operations', 'Delete operations'], correct: 0 },
  ],
  'pagination': [
    { question: 'Offset-based pagination uses:', options: ['Cursor values', 'page and limit parameters', 'Timestamps only'], correct: 1 },
    { question: 'Cursor-based pagination is:', options: ['Slower for large offsets', 'More efficient for infinite scroll', 'Not real pagination'], correct: 1 },
    { question: 'Which sorts descending?', options: ['?sort=createdAt', '?sort=-createdAt', '?sort=recent'], correct: 1 },
  ],
  'error-handling': [
    { question: '400 status code means:', options: ['Invalid client input', 'Server error', 'Success'], correct: 0 },
    { question: '401 vs 403:', options: ['Same meaning', 'Unauthorized vs Forbidden', 'No difference'], correct: 1 },
    { question: 'Error responses should be:', options: ['Random messages', 'Consistent structured format', 'HTML only'], correct: 1 },
  ],
  'hateoas': [
    { question: 'HATEOAS enables:', options: ['Faster performance', 'API discoverability through links', 'Lower latency'], correct: 1 },
    { question: 'Hypermedia links allow:', options: ['Hardcoded URLs', 'Dynamic API navigation', 'Faster parsing'], correct: 1 },
    { question: 'Common HATEOAS format:', options: ['XML only', 'HAL, JSON-LD, Collection+JSON', 'CSV'], correct: 1 },
  ],
  'versioning': [
    { question: 'Most common versioning strategy:', options: ['URL versioning (/v1/)', 'Header versioning', 'Query parameters'], correct: 0 },
    { question: 'Breaking changes require:', options: ['Minor version', 'Major version', 'No versioning'], correct: 1 },
    { question: 'Which is NOT a versioning approach?', options: ['URL path', 'Header-based', 'Code embedding'], correct: 2 },
  ],
  // GraphQL
  'graphql-schema': [
    { question: 'In GraphQL, what does "!" indicate?', options: ['A comment', 'Non-nullable field', 'A mutation'], correct: 1 },
    { question: 'GraphQL schema is defined using:', options: ['.proto files', 'Strongly typed schema', 'No schema required'], correct: 1 },
    { question: 'Schema serves as:', options: ['Performance optimization', 'Contract between client and server', 'Database schema'], correct: 1 },
  ],
  'queries-mutations': [
    { question: 'Queries are:', options: ['Write operations', 'Read-only operations', 'Database updates'], correct: 1 },
    { question: 'Mutations execute:', options: ['In parallel', 'Sequentially', 'Randomly'], correct: 1 },
    { question: 'Both return data in:', options: ['Different formats', 'Same shape as requested', 'XML only'], correct: 1 },
  ],
  'resolvers': [
    { question: 'Resolvers are:', options: ['Database queries only', 'Functions that fetch field data', 'API endpoints'], correct: 1 },
    { question: 'Parent values flow:', options: ['Up the tree', 'Down through the tree', 'Randomly'], correct: 1 },
    { question: 'DataLoader helps with:', options: ['Schema design', 'Batching database queries', 'Client caching'], correct: 1 },
  ],
  'rest-vs-graphql': [
    { question: 'REST typically uses:', options: ['Single endpoint', 'Multiple endpoints', 'No endpoints'], correct: 1 },
    { question: 'GraphQL solves:', options: ['Over-fetching and under-fetching', 'Database performance', 'Server scaling'], correct: 0 },
    { question: 'REST responses are:', options: ['Flexible per request', 'Fixed per endpoint', 'Always minimal'], correct: 1 },
  ],
  'over-fetching': [
    { question: 'Over-fetching means:', options: ['Receiving more data than needed', 'Sending too much data', 'Slow responses'], correct: 0 },
    { question: 'Under-fetching means:', options: ['Multiple round trips needed', 'Single efficient request', 'No data returned'], correct: 0 },
    { question: 'GraphQL solves this by:', options: ['Caching', 'Client-specified fields', 'Compression'], correct: 1 },
  ],
  'n-plus-one': [
    { question: 'N+1 problem occurs when:', options: ['Single query for list', '1 query + N queries for related data', 'No queries'], correct: 1 },
    { question: 'Common solution:', options: ['DataLoader pattern', 'More servers', 'JSON responses'], correct: 0 },
    { question: 'Makes N+1 more visible:', options: ['REST', 'GraphQL', 'Both equally'], correct: 1 },
  ],
  // Security
  'authentication': [
    { question: 'Authentication answers:', options: ['What can you do?', 'Who are you?', 'Where are you?'], correct: 1 },
    { question: 'JWT is:', options: ['XML format', 'Self-contained token', 'Database query'], correct: 1 },
    { question: 'API keys are:', options: ['Very secure', 'Simple but less secure', 'Encrypted by default'], correct: 1 },
  ],
  'authorization': [
    { question: 'Authorization answers:', options: ['Who are you?', 'What can you do?', 'When can you access?'], correct: 1 },
    { question: 'RBAC stands for:', options: ['Role-Based Access Control', 'Request-Based API Control', 'Resource-Based Authentication'], correct: 0 },
    { question: 'Principle of least privilege means:', options: ['Grant maximum access', 'Grant minimum needed', 'No restrictions'], correct: 1 },
  ],
  'rate-limiting': [
    { question: 'Rate limiting prevents:', options: ['Faster performance', 'Abuse and ensures fair usage', 'Server crashes'], correct: 1 },
    { question: '429 status code means:', options: ['Success', 'Too Many Requests', 'Server error'], correct: 1 },
    { question: 'Rate limit info is typically in:', options: ['Body only', 'Headers', 'URL'], correct: 1 },
  ],
  // Performance
  'caching': [
    { question: 'What is cache invalidation?', options: ['Deleting cache files', 'Making cached data stale/refreshed', 'Increasing cache size'], correct: 1 },
    { question: 'Which header controls caching?', options: ['Content-Type', 'Cache-Control', 'Authorization'], correct: 1 },
    { question: 'ETag is used for:', options: ['Authentication', 'Cache revalidation', 'Rate limiting'], correct: 1 },
  ],
  'performance': [
    { question: 'Common performance bottleneck:', options: ['Client-side rendering', 'Database queries', 'CDN usage'], correct: 1 },
    { question: 'To improve performance:', options: ['Make everything async', 'Profile to find bottlenecks', 'Add more endpoints'], correct: 1 },
    { question: 'Promise.all helps with:', options: ['Sequential operations', 'Parallel operations', 'Error handling'], correct: 1 },
  ],
  'batching': [
    { question: 'Batching combines:', options: ['Multiple requests into one', 'Multiple responses', 'Multiple servers'], correct: 0 },
    { question: 'GraphQL has:', options: ['Native query batching', 'No batching support', 'Manual batching only'], correct: 0 },
    { question: 'Benefit of batching:', options: ['Simplicity always', 'Reduced network overhead', 'Higher latency'], correct: 1 },
  ],
  // Evolution
  'backward-compat': [
    { question: 'Backward compatibility means:', options: ['Breaking changes allowed', 'Existing clients continue working', 'No new features'], correct: 1 },
    { question: 'Safe change:', options: ['Removing a field', 'Adding a new field', 'Changing field type'], correct: 1 },
    { question: 'Before removing, you should:', options: ['Delete immediately', 'Deprecate first', 'Ignore warnings'], correct: 1 },
  ],
  'schema-evolution': [
    { question: 'Safe changes are:', options: ['Breaking changes', 'Additive changes', 'Type changes'], correct: 1 },
    { question: 'Breaking changes need:', options: ['Minor versions', 'Major versions', 'No versioning'], correct: 1 },
    { question: 'Schema evolution requires:', options: ['No testing', 'Testing against client behavior', 'Random testing'], correct: 1 },
  ],
  'webhooks': [
    { question: 'Webhooks are:', options: ['Polling mechanism', 'HTTP callbacks from server', 'Database triggers'], correct: 1 },
    { question: 'Server role in webhooks:', options: ['Receives requests', 'Pushes notifications', 'No involvement'], correct: 1 },
    { question: 'Important for webhooks:', options: ['Signature validation', 'No retry needed', 'Static URLs only'], correct: 0 },
  ],
  // Architecture
  'documentation': [
    { question: 'Standard for API docs:', options: ['PDF files', 'OpenAPI/Swagger', 'Word documents'], correct: 1 },
    { question: 'Good docs should include:', options: ['Only endpoints', 'Examples for every endpoint', 'No error responses'], correct: 1 },
    { question: 'Docs should be:', options: ['Outdated sometimes', 'Synchronized with code', 'Static only'], correct: 1 },
  ],
  'public-private': [
    { question: 'Public APIs need:', options: ['Relaxed versioning', 'Stricter versioning', 'No documentation'], correct: 1 },
    { question: 'Private APIs can:', options: ['Change rapidly', 'Never change', 'Have no authentication'], correct: 0 },
    { question: 'Public APIs require:', options: ['Minimal documentation', 'Complete interactive docs', 'No rate limits'], correct: 1 },
  ],
  'gateway': [
    { question: 'API Gateway handles:', options: ['Database queries', 'Cross-cutting concerns like auth', 'Client-side rendering'], correct: 1 },
    { question: 'Gateway provides:', options: ['Single authentication point', 'Database connections', 'Frontend rendering'], correct: 0 },
    { question: 'Gateway can:', options: ['Aggregate multiple services', 'Replace all microservices', 'Eliminate caching'], correct: 0 },
  ],
  'bff': [
    { question: 'BFF stands for:', options: ['Big Frontend Framework', 'Backend for Frontend', 'Basic Frontend Format'], correct: 1 },
    { question: 'BFF helps with:', options: ['Server-side logic only', 'Different frontend data needs', 'Database design'], correct: 1 },
    { question: 'Multiple BFFs for:', options: ['Single frontend', 'Different frontend types', 'Database per BFF'], correct: 1 },
  ],
  'monolith-microservices': [
    { question: 'Monolith means:', options: ['Multiple deployable units', 'Single deployable unit', 'No codebase'], correct: 1 },
    { question: 'Microservices enable:', options: ['Coupled deployment', 'Independent scaling', 'Single database'], correct: 1 },
    { question: 'Start with:', options: ['Complex microservices', 'Simple monolith', 'Distributed system'], correct: 1 },
  ],
  // Real-Time
  'websockets': [
    { question: 'WebSockets provide:', options: ['Request-response only', 'Full-duplex bidirectional communication', 'Server-push only'], correct: 1 },
    { question: 'WebSocket connections are:', options: ['Ephemeral (one-time)', 'Persistent (long-lived)', 'Session-based only'], correct: 1 },
    { question: 'Heartbeats in WebSockets:', options: ['Increase latency', 'Detect disconnects', 'Send emails'], correct: 1 },
  ],
  'server-sent-events': [
    { question: 'SSE is:', options: ['Bidirectional', 'Server-to-client only', 'Client-to-server only'], correct: 1 },
    { question: 'SSE uses:', options: ['WebSocket protocol', 'Standard HTTP', 'FTP protocol'], correct: 1 },
    { question: 'SSE automatically:', options: ['Requires reconnection', 'Reconnects on disconnect', 'Never disconnects'], correct: 1 },
  ],
  'graphql-subscriptions': [
    { question: 'GraphQL subscriptions use:', options: ['HTTP GET', 'WebSocket transport', 'Email notifications'], correct: 1 },
    { question: 'Subscriptions are:', options: ['One-time queries', 'Long-lived queries', 'Not supported'], correct: 1 },
    { question: 'Subscription data is:', options: ['Requested each time', 'Pushed when events occur', 'Cached only'], correct: 1 },
  ],
  // Testing
  'api-testing': [
    { question: 'Unit tests for APIs:', options: ['Test individual endpoints', 'Test entire system', 'Test database only'], correct: 0 },
    { question: 'Integration tests:', options: ['Single endpoint', 'Multi-service flows', 'No real testing'], correct: 1 },
    { question: 'Tests should be:', options: ['Manual only', 'Automated in CI/CD', 'Optional'], correct: 1 },
  ],
  'contract-testing': [
    { question: 'Contract testing validates:', options: ['Performance metrics', 'Schema compliance', 'Database schema'], correct: 1 },
    { question: 'Popular framework:', options: ['Jest', 'Pact', 'Mocha'], correct: 1 },
    { question: 'Catches breaking changes:', options: ['After deployment', 'Before deployment', 'Never'], correct: 1 },
  ],
  'mock-servers': [
    { question: 'Mock servers simulate:', options: ['Real API behavior', 'Database operations', 'Network infrastructure'], correct: 0 },
    { question: 'Enable:', options: ['Sequential development', 'Parallel frontend/backend development', 'Database design'], correct: 1 },
    { question: 'Popular tools:', options: ['Only Postman', 'Mockoon, Postman, WireMock', 'No tools exist'], correct: 1 },
  ],
  // gRPC
  'grpc-intro': [
    { question: 'gRPC uses:', options: ['JSON over HTTP', 'HTTP/2 and Protocol Buffers', 'XML format'], correct: 1 },
    { question: 'gRPC is ideal for:', options: ['Public APIs', 'Internal microservices', 'HTML rendering'], correct: 1 },
    { question: 'Contracts defined in:', options: ['JSON files', '.proto files', 'YAML files'], correct: 1 },
  ],
  'proto-buffers': [
    { question: 'Protocol Buffers are:', options: ['Text format', 'Binary serialization format', 'Image format'], correct: 1 },
    { question: 'Compared to JSON:', options: ['Larger and slower', '3x smaller, 10x faster', 'Same size'], correct: 1 },
    { question: 'Backward compatibility via:', options: ['Field numbers', 'Changing names', 'Removing fields'], correct: 0 },
  ],
};

function QuizSection({ slug }) {
  const questions = quizData[slug] || [];
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  if (questions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-12"
      >
        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Knowledge Check
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Quiz coming soon! This topic will have interactive questions to test your understanding.
          </p>
        </div>
      </motion.div>
    );
  }

  const handleAnswer = (qIndex, answerIndex) => {
    setAnswers(prev => ({ ...prev, [qIndex]: answerIndex }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });
    return correct;
  };

  const score = calculateScore();
  const passed = score >= questions.length / 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mb-12"
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Knowledge Check
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Test your understanding of this topic
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="border-b border-slate-100 dark:border-slate-700 pb-4 last:border-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white mb-3">
                {qIndex + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((option, oIndex) => {
                  const isSelected = answers[qIndex] === oIndex;
                  const isCorrect = q.correct === oIndex;
                  const showCorrect = showResults && isCorrect;
                  const showWrong = showResults && isSelected && !isCorrect;

                  return (
                    <button
                      key={oIndex}
                      onClick={() => !showResults && handleAnswer(qIndex, oIndex)}
                      disabled={showResults}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                        showCorrect
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                          : showWrong
                          ? 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300'
                          : isSelected
                          ? 'bg-primary-100 dark:bg-primary-900/30 border border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300'
                          : 'bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          showCorrect
                            ? 'bg-emerald-500 text-white'
                            : showWrong
                            ? 'bg-red-500 text-white'
                            : isSelected
                            ? 'bg-primary-500 text-white'
                            : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + oIndex)}
                        </span>
                        <span>{option}</span>
                        {showCorrect && <CheckCircle size={16} className="ml-auto" />}
                        {showWrong && <XCircle size={16} className="ml-auto" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {!showResults ? (
          <button
            onClick={() => setShowResults(true)}
            disabled={Object.keys(answers).length < questions.length}
            className="mt-6 w-full py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
          >
            Check Answers ({Object.keys(answers).length}/{questions.length} answered)
          </button>
        ) : (
          <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  Your Score
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {score}/{questions.length}
                </p>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                passed ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-amber-100 dark:bg-amber-900/30'
              }`}>
                {passed ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Passed!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-amber-500" />
                    <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Keep Learning!</span>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                setAnswers({});
                setShowResults(false);
              }}
              className="mt-4 flex items-center gap-2 text-sm text-primary-500 hover:text-primary-600 transition-colors"
            >
              <RefreshCw size={14} />
              Try Again
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Topic() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const topic = getTopicBySlug(slug);

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Topic not found
          </h1>
          <Link to="/learn" className="text-primary-500 hover:underline">
            Back to Learning Paths
          </Link>
        </div>
      </div>
    );
  }

  const path = getPathById(topic.path);
  const Visualizer = topic.visualizer ? visualizers[topic.visualizer] : null;

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/learn" className="text-slate-500 hover:text-primary-500">
              Learn
            </Link>
            <ChevronRight size={14} className="text-slate-400" />
            <button
              onClick={() => navigate(`/learn?path=${topic.path}`)}
              className="text-slate-500 hover:text-primary-500"
            >
              {path?.title}
            </button>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-slate-900 dark:text-white font-medium">{topic.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">📖</span>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              {topic.title}
            </h1>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            {topic.definition}
          </p>
        </motion.div>

        {/* Definition Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Real-World Analogy
                </h3>
                <p className="text-slate-600 dark:text-slate-300 italic">
                  "{topic.analogy}"
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Points */}
        {topic.keyPoints && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Zap size={24} className="text-primary-500" />
              Key Concepts
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {topic.keyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700"
                >
                  <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-primary-500 rounded-full" />
                  </div>
                  <span
                    className="text-slate-700 dark:text-slate-300"
                    dangerouslySetInnerHTML={{
                      __html: point.replace(
                        /<span class="code-highlight">([^<]*)<\/span>/g,
                        '<mark class="bg-primary-500/20 text-primary-600 dark:text-primary-400 px-1 rounded">$1</mark>'
                      )
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Visualizer */}
        {Visualizer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Code2 size={24} className="text-primary-500" />
              Interactive Visualization
            </h2>
            <Visualizer />
          </motion.div>
        )}

        {/* Code Examples */}
        {topic.codeExamples && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Code2 size={24} className="text-primary-500" />
              Code Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(topic.codeExamples).map(([key, code]) => (
                <CodeBlock key={key} title={key} code={code} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Trade-offs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mb-12"
        >
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  Trade-offs & Considerations
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    Consider the trade-offs between flexibility and complexity
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    Performance implications vary by use case
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    Always consider security implications
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Knowledge Check Quiz */}
        <QuizSection slug={slug} />

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-between pt-8 border-t border-slate-200 dark:border-slate-700"
        >
          <Link
            to="/learn"
            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary-500 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Learning Paths
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, RefreshCw, Send, Clock, Database, Server, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const endpoints = {
  rest: [
    { method: 'GET', path: '/users', description: 'List all users' },
    { method: 'GET', path: '/users/:id', description: 'Get user by ID' },
    { method: 'POST', path: '/users', description: 'Create new user' },
    { method: 'PUT', path: '/users/:id', description: 'Update user' },
    { method: 'DELETE', path: '/users/:id', description: 'Delete user' },
    { method: 'GET', path: '/posts', description: 'List all posts' },
    { method: 'GET', path: '/posts/:id', description: 'Get post by ID' },
  ],
  graphql: [
    { type: 'query', name: 'GetUsers', description: 'Fetch all users' },
    { type: 'query', name: 'GetUser', description: 'Fetch user with posts' },
    { type: 'query', name: 'GetPosts', description: 'Fetch all posts' },
    { type: 'mutation', name: 'CreateUser', description: 'Create new user' },
    { type: 'mutation', name: 'DeleteUser', description: 'Delete a user' },
  ]
};

const mockData = {
  users: [
    { id: '1', name: 'Alice', email: 'alice@example.com', role: 'admin' },
    { id: '2', name: 'Bob', email: 'bob@example.com', role: 'user' },
    { id: '3', name: 'Charlie', email: 'charlie@example.com', role: 'user' },
  ],
  posts: [
    { id: '1', title: 'Hello World', authorId: '1', body: 'First post!' },
    { id: '2', title: 'API Design', authorId: '1', body: 'Learn REST and GraphQL' },
    { id: '3', title: 'React Tips', authorId: '2', body: 'Hooks are great' },
  ]
};

export default function Playground() {
  const [mode, setMode] = useState('rest');
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints.rest[0]);
  const [requestBody, setRequestBody] = useState('');
  const [parameters, setParameters] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [response, setResponse] = useState(null);
  const [logs, setLogs] = useState([]);
  const [latency, setLatency] = useState(0);
  const [step, setStep] = useState(0);
  const [simulationSpeed, setSimulationSpeed] = useState(1);

  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), message, type }]);
  };

  const runSimulation = async () => {
    setIsRunning(true);
    setResponse(null);
    setStep(0);
    setLogs([]);
    const startTime = Date.now();

    // Simulate request flow
    addLog('Preparing request...', 'info');
    await delay(500 / simulationSpeed);
    setStep(1);

    addLog(`Sending ${selectedEndpoint.method || 'query'} to ${selectedEndpoint.path || selectedEndpoint.name}...`, 'info');
    await delay(500 / simulationSpeed);
    setStep(2);

    addLog('Request received by server', 'info');
    await delay(400 / simulationSpeed);
    setStep(3);

    addLog('Processing request...', 'info');
    await delay(600 / simulationSpeed);
    setStep(4);

    // Generate response
    let responseData;
    if (mode === 'rest') {
      responseData = generateRestResponse();
    } else {
      responseData = generateGraphQLResponse();
    }

    addLog('Generating response...', 'info');
    await delay(300 / simulationSpeed);
    setStep(5);

    const endTime = Date.now();
    setLatency(endTime - startTime);
    setResponse(responseData);
    addLog(`Response received in ${endTime - startTime}ms`, 'success');
    setIsRunning(false);
  };

  const generateRestResponse = () => {
    const path = selectedEndpoint.path;
    if (path === '/users' || path === '/users/') {
      return { status: 200, data: mockData.users, meta: { total: 3 } };
    }
    if (path.startsWith('/users/')) {
      const id = path.split('/')[2];
      const user = mockData.users.find(u => u.id === id);
      if (user) {
        const userPosts = mockData.posts.filter(p => p.authorId === id);
        return { status: 200, data: { ...user, posts: userPosts } };
      }
      return { status: 404, error: { message: 'User not found' } };
    }
    if (path === '/posts' || path === '/posts/') {
      return { status: 200, data: mockData.posts, meta: { total: 3 } };
    }
    return { status: 200, data: { message: 'Success' } };
  };

  const generateGraphQLResponse = () => {
    if (selectedEndpoint.name === 'GetUsers') {
      return { data: { users: mockData.users } };
    }
    if (selectedEndpoint.name === 'GetUser') {
      const user = mockData.users[0];
      const userPosts = mockData.posts.filter(p => p.authorId === user.id);
      return { data: { user: { ...user, posts: userPosts } } };
    }
    if (selectedEndpoint.name === 'GetPosts') {
      return { data: { posts: mockData.posts } };
    }
    return { data: { success: true } };
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetSimulation = () => {
    setResponse(null);
    setLogs([]);
    setStep(0);
    setLatency(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            API Playground
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Experiment with REST and GraphQL in a simulated environment
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Configuration */}
          <div className="lg:col-span-1 space-y-6">
            {/* Mode Toggle */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
              <div className="flex gap-2">
                {['rest', 'graphql'].map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMode(m);
                      setSelectedEndpoint(endpoints[m][0]);
                      resetSimulation();
                    }}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      mode === m
                        ? m === 'rest'
                          ? 'bg-rest-light text-white'
                          : 'bg-graphql-light text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {m.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Endpoints */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                {mode === 'rest' ? 'Endpoints' : 'Operations'}
              </h3>
              <div className="space-y-2">
                {endpoints[mode].map((ep, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedEndpoint(ep);
                      resetSimulation();
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedEndpoint === ep
                        ? 'bg-primary-100 dark:bg-primary-900/30 border border-primary-300 dark:border-primary-700'
                        : 'bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {mode === 'rest' ? (
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                          ep.method === 'GET' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          ep.method === 'POST' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          ep.method === 'PUT' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {ep.method}
                        </span>
                        <span className="text-sm text-slate-700 dark:text-slate-300 font-mono">
                          {ep.path || ep.name}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                          ep.type === 'query' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400'
                        }`}>
                          {ep.type.toUpperCase()}
                        </span>
                        <span className="text-sm text-slate-700 dark:text-slate-300 font-mono">
                          {ep.name}
                        </span>
                      </div>
                    )}
                    <p className="text-xs text-slate-500 mt-1">{ep.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Request Body (for POST/Mutation) */}
            {(selectedEndpoint.method === 'POST' || selectedEndpoint.type === 'mutation') && (
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                  Request Body
                </h3>
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  placeholder={mode === 'rest' ? '{\n  "name": "New User",\n  "email": "new@example.com"\n}' : 'mutation {\n  createUser(input: {\n    name: "New User"\n    email: "new@example.com"\n  }) {\n    id\n    name\n  }\n}'}
                  className="w-full h-40 p-3 bg-slate-900 text-slate-300 font-mono text-sm rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            )}

            {/* Simulation Speed */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                Simulation Speed
              </h3>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={simulationSpeed}
                onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Slow</span>
                <span>{simulationSpeed}x</span>
                <span>Fast</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Execution & Response */}
          <div className="lg:col-span-2 space-y-6">
            {/* Visual Flow */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Request Flow
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetSimulation}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    <RefreshCw size={18} />
                  </button>
                  <button
                    onClick={runSimulation}
                    disabled={isRunning}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      isRunning
                        ? 'bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                        : mode === 'rest'
                          ? 'bg-rest-light text-white hover:bg-rest-dark'
                          : 'bg-graphql-light text-white hover:bg-graphql-dark'
                    }`}
                  >
                    {isRunning ? (
                      <>
                        <Square size={16} />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play size={16} />
                        Send Request
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Flow Visualization */}
              <div className="flex items-center justify-between gap-4 mb-6">
                {['Client', 'Network', 'Server', 'Database'].map((item, index) => {
                  const isActive = step >= index + 1;
                  return (
                    <div
                      key={item}
                      className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-primary-100 dark:bg-primary-900/30 ring-2 ring-primary-500'
                          : 'bg-slate-100 dark:bg-slate-700'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isActive ? 'bg-primary-500 text-white' : 'bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400'
                      }`}>
                        {index === 0 && <Server size={20} />}
                        {index === 1 && <Send size={20} />}
                        {index === 2 && <Database size={20} />}
                        {index === 3 && <Database size={20} />}
                      </div>
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-2">
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / 5) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Logs */}
            <div className="bg-slate-900 rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-300">Console</h3>
                {latency > 0 && (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Clock size={14} />
                    {latency}ms
                  </div>
                )}
              </div>
              <div className="h-32 overflow-y-auto font-mono text-xs space-y-1">
                {logs.map((log, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2 ${
                      log.type === 'success' ? 'text-green-400' :
                      log.type === 'error' ? 'text-red-400' :
                      'text-slate-400'
                    }`}
                  >
                    <span className="text-slate-600">{log.time}</span>
                    <span>{log.message}</span>
                  </div>
                ))}
                {logs.length === 0 && (
                  <span className="text-slate-600">Ready to send request...</span>
                )}
              </div>
            </div>

            {/* Response */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Response
                </h3>
                {response && (
                  <span className={`text-xs px-2 py-1 rounded ${
                    response.status >= 200 && response.status < 300
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : response.status >= 400
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {response.status || '200'} OK
                  </span>
                )}
              </div>
              <AnimatePresence mode="wait">
                {response ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <pre className="bg-slate-900 text-slate-300 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                      {JSON.stringify(response.data || response, null, 2)}
                    </pre>
                  </motion.div>
                ) : (
                  <div className="h-40 bg-slate-100 dark:bg-slate-700/50 rounded-lg flex items-center justify-center">
                    <span className="text-slate-400 text-sm">
                      Click "Send Request" to see response
                    </span>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

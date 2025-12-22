import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function RestVsGraphql() {
  const [mode, setMode] = useState('fetch');
  const [restStep, setRestStep] = useState(0);
  const [graphqlStep, setGraphqlStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchUserPosts = async () => {
    setIsAnimating(true);
    setRestStep(0);
    setGraphqlStep(0);

    // REST animation
    await delay(500);
    setRestStep(1); // GET /users/123
    await delay(800);
    setRestStep(2); // Response
    await delay(500);
    setRestStep(3); // GET /users/123/posts
    await delay(800);
    setRestStep(4); // Response
    await delay(500);
    setRestStep(5); // GET /posts/1,2,3
    await delay(800);
    setRestStep(6); // Done

    // GraphQL animation
    setGraphqlStep(1); // Query
    await delay(800);
    setGraphqlStep(2); // Response with all data
    await delay(500);
    setGraphqlStep(3); // Done

    setIsAnimating(false);
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    if (mode === 'compare') {
      fetchUserPosts();
    }
  }, [mode]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">REST vs GraphQL: Fetching User + Posts</h3>
        <div className="flex gap-2">
          <button
            onClick={() => { setMode('compare'); fetchUserPosts(); }}
            disabled={isAnimating}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
          >
            Compare
          </button>
          <button
            onClick={() => { setMode('stats'); }}
            className={`px-4 py-2 rounded-lg transition-colors ${mode === 'stats' ? 'bg-primary-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}
          >
            Stats
          </button>
        </div>
      </div>

      {mode === 'compare' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* REST Side */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-rest-light"></div>
              <span className="font-semibold text-slate-700 dark:text-slate-200">REST</span>
              <span className="text-xs text-slate-500">3 requests</span>
            </div>

            <div className="space-y-2">
              {/* Request 1 */}
              <motion.div
                className={`p-3 rounded-lg border transition-all ${
                  restStep === 1 ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-600'
                }`}
                animate={restStep === 1 ? { x: [0, 5, 0] } : {}}
                transition={{ repeat: restStep === 1 ? Infinity : 0, duration: 0.5 }}
              >
                <div className="text-xs font-mono text-slate-500 mb-1">Request 1</div>
                <code className="text-xs text-slate-700 dark:text-slate-300">GET /users/123</code>
              </motion.div>

              {/* Response 1 */}
              <motion.div
                className={`p-3 rounded-lg border ml-4 transition-all ${
                  restStep === 2 ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-slate-200 dark:border-slate-600'
                }`}
                animate={restStep === 2 ? { x: [0, -5, 0] } : {}}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                <div className="text-xs text-slate-500 mb-1">Response</div>
                <code className="text-xs text-slate-700 dark:text-slate-300">{"{ user: { id, name, posts: [...] } }"}</code>
              </motion.div>

              {/* Request 2 */}
              <motion.div
                className={`p-3 rounded-lg border transition-all ${
                  restStep === 3 ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-600'
                }`}
                animate={restStep === 3 ? { x: [0, 5, 0] } : {}}
                transition={{ repeat: restStep === 3 ? Infinity : 0, duration: 0.5 }}
              >
                <div className="text-xs font-mono text-slate-500 mb-1">Request 2</div>
                <code className="text-xs text-slate-700 dark:text-slate-300">GET /users/123/posts</code>
              </motion.div>

              {/* Request 3 */}
              <motion.div
                className={`p-3 rounded-lg border transition-all ${
                  restStep === 5 ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-600'
                }`}
                animate={restStep === 5 ? { x: [0, 5, 0] } : {}}
                transition={{ repeat: restStep === 5 ? Infinity : 0, duration: 0.5 }}
              >
                <div className="text-xs font-mono text-slate-500 mb-1">Request 3</div>
                <code className="text-xs text-slate-700 dark:text-slate-300">GET /posts/1,2,3</code>
              </motion.div>
            </div>
          </div>

          {/* GraphQL Side */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-graphql-light"></div>
              <span className="font-semibold text-slate-700 dark:text-slate-200">GraphQL</span>
              <span className="text-xs text-slate-500">1 request</span>
            </div>

            <div className="space-y-2">
              {/* Query */}
              <motion.div
                className={`p-3 rounded-lg border transition-all ${
                  graphqlStep === 1 ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20' : 'border-slate-200 dark:border-slate-600'
                }`}
                animate={graphqlStep === 1 ? { x: [0, 5, 0] } : {}}
                transition={{ repeat: graphqlStep === 1 ? Infinity : 0, duration: 0.5 }}
              >
                <div className="text-xs font-mono text-slate-500 mb-1">Query</div>
                <code className="text-xs text-slate-700 dark:text-slate-300">
                  query {'{'} user(id: "123") {'{'} name posts {'{'} title {'}'} {'}'} {'}'}
                </code>
              </motion.div>

              {/* Single Response */}
              <motion.div
                className={`p-3 rounded-lg border transition-all ${
                  graphqlStep === 2 ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-slate-200 dark:border-slate-600'
                }`}
                animate={graphqlStep === 2 ? { x: [0, -5, 0] } : {}}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                <div className="text-xs text-slate-500 mb-1">Response</div>
                <code className="text-xs text-slate-700 dark:text-slate-300">
                  {"{ data: { user: { name, posts: [...] } } }"}
                </code>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {mode === 'stats' && (
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center p-6 bg-slate-100 dark:bg-slate-700 rounded-xl">
            <div className="text-4xl font-bold text-rest-light mb-2">3</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">REST Requests</div>
            <div className="text-xs text-slate-500 mt-2">Multiple round trips</div>
          </div>
          <div className="text-center p-6 bg-slate-100 dark:bg-slate-700 rounded-xl">
            <div className="text-4xl font-bold text-graphql-light mb-2">1</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">GraphQL Request</div>
            <div className="text-xs text-slate-500 mt-2">Single round trip</div>
          </div>
          <div className="text-center p-6 bg-slate-100 dark:bg-slate-700 rounded-xl">
            <div className="text-4xl font-bold text-amber-500 mb-2">2.4KB</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">REST Payload</div>
            <div className="text-xs text-slate-500 mt-2">May include unused data</div>
          </div>
          <div className="text-center p-6 bg-slate-100 dark:bg-slate-700 rounded-xl">
            <div className="text-4xl font-bold text-emerald-500 mb-2">0.8KB</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">GraphQL Payload</div>
            <div className="text-xs text-slate-500 mt-2">Exactly what you request</div>
          </div>
        </div>
      )}
    </div>
  );
}

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Check, X, AlertTriangle, Clock } from 'lucide-react';

const methods = [
  { name: 'GET', color: 'bg-green-500', description: 'Retrieve data' },
  { name: 'POST', color: 'bg-blue-500', description: 'Create resource' },
  { name: 'PUT', color: 'bg-amber-500', description: 'Update entirely' },
  { name: 'DELETE', color: 'bg-red-500', description: 'Remove resource' },
];

const statusCodes = [
  { range: '2xx', name: 'Success', color: 'bg-green-500', examples: ['200 OK', '201 Created', '204 No Content'] },
  { range: '3xx', name: 'Redirect', color: 'bg-blue-500', examples: ['301 Moved', '302 Found', '304 Not Modified'] },
  { range: '4xx', name: 'Client Error', color: 'bg-amber-500', examples: ['400 Bad Request', '401 Unauthorized', '404 Not Found'] },
  { range: '5xx', name: 'Server Error', color: 'bg-red-500', examples: ['500 Error', '502 Bad Gateway', '503 Unavailable'] },
];

export default function HttpFlow() {
  const [selectedMethod, setSelectedMethod] = useState('GET');
  const [showStatuses, setShowStatuses] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">HTTP Methods & Status Codes</h3>
        <button
          onClick={() => setShowStatuses(!showStatuses)}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          {showStatuses ? 'Show Methods' : 'Show Status Codes'}
        </button>
      </div>

      {!showStatuses ? (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            {methods.map((method) => (
              <motion.button
                key={method.name}
                onClick={() => setSelectedMethod(method.name)}
                className={`px-4 py-3 rounded-xl font-mono font-bold text-white transition-all ${
                  method.color
                } ${selectedMethod === method.name ? 'ring-4 ring-opacity-30 scale-105' : 'opacity-70 hover:opacity-100'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {method.name}
              </motion.button>
            ))}
          </div>

          <div className="p-6 bg-slate-100 dark:bg-slate-700 rounded-xl">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-lg font-mono font-bold text-white ${methods.find(m => m.name === selectedMethod)?.color}`}>
                  {selectedMethod}
                </span>
                <ArrowRight size={20} className="text-slate-400" />
              </div>
              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  value="/api/users/123"
                  readOnly
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg font-mono text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 font-mono text-sm">
                  HTTP/1.1
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                <strong>{methods.find(m => m.name === selectedMethod)?.description}</strong>
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-600 rounded text-slate-600 dark:text-slate-300">
                  Safe: {['GET', 'HEAD', 'OPTIONS'].includes(selectedMethod) ? 'Yes' : 'No'}
                </span>
                <span className="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-600 rounded text-slate-600 dark:text-slate-300">
                  Idempotent: {['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'TRACE'].includes(selectedMethod) ? 'Yes' : 'No'}
                </span>
                <span className="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-600 rounded text-slate-600 dark:text-slate-300">
                  Cacheable: {['GET', 'HEAD', 'POST'].includes(selectedMethod) ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statusCodes.map((status) => (
            <motion.div
              key={status.range}
              className={`p-4 rounded-xl ${status.color} text-white`}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-2xl font-bold mb-1">{status.range}</div>
              <div className="text-sm font-medium mb-2">{status.name}</div>
              <div className="space-y-1">
                {status.examples.map((ex) => (
                  <div key={ex} className="text-xs opacity-90 font-mono bg-white/20 rounded px-2 py-1">
                    {ex}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-xl">
        <div className="flex items-start gap-3">
          <Clock size={20} className="text-slate-400 mt-0.5" />
          <div className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Tip:</strong> HTTP is stateless - each request must contain all information needed for the server to process it. No session data is stored between requests.
          </div>
        </div>
      </div>
    </div>
  );
}

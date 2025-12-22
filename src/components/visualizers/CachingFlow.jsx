import { motion } from 'framer-motion';
import { useState } from 'react';
import { Database, Globe, Server } from 'lucide-react';

export default function CachingFlow() {
  const [step, setStep] = useState(0);
  const [cacheHit, setCacheHit] = useState(false);

  const requestData = async () => {
    setStep(0);
    setCacheHit(false);

    await delay(500);
    setStep(1);
    await delay(500);

    if (cacheHit) {
      setStep(2);
      await delay(1000);
      setStep(5);
    } else {
      setStep(3);
      await delay(1000);
      setStep(4);
      await delay(500);
      setStep(5);
    }
  };

  const toggleCacheMode = () => {
    setCacheHit(!cacheHit);
    setStep(0);
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Calculate packet position based on step and cacheHit
  const getPacketPosition = () => {
    if (step === 0) return '50px';
    if (step === 1) return '130px';
    if (cacheHit) {
      if (step === 2) return '180px';
      return step === 5 ? '230px' : '180px';
    } else {
      if (step === 3) return '180px';
      if (step === 4) return '280px';
      return step === 5 ? '350px' : '280px';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Caching Flow</h3>
        <div className="flex gap-2">
          <button
            onClick={toggleCacheMode}
            className={`px-4 py-2 rounded-lg transition-colors ${
              cacheHit ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'
            }`}
          >
            Mode: {cacheHit ? 'Cache Hit' : 'Cache Miss'}
          </button>
          <button
            onClick={requestData}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Make Request
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        {/* Client */}
        <div className={`flex flex-col items-center p-4 rounded-xl transition-all ${
          step === 0 || step === 5 ? 'bg-blue-100 dark:bg-blue-900/30 ring-2 ring-blue-500' : 'bg-slate-100 dark:bg-slate-700'
        }`}>
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2" />
              <path d="M8 21h8M12 17v4" strokeWidth="2" />
            </svg>
          </div>
          <span className="text-xs font-medium text-slate-700 dark:text-slate-200 mt-2">Client</span>
        </div>

        {/* CDN / Cache */}
        <div className={`flex flex-col items-center p-4 rounded-xl transition-all ${
          (step === 1 || step === 2 || step === 4) ? 'bg-amber-100 dark:bg-amber-900/30 ring-2 ring-amber-500' : 'bg-slate-100 dark:bg-slate-700'
        }`}>
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs font-medium text-slate-700 dark:text-slate-200 mt-2">CDN Cache</span>
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full"
            >
              HIT!
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full"
            >
              MISS
            </motion.div>
          )}
        </div>

        {/* Origin Server */}
        <div className={`flex flex-col items-center p-4 rounded-xl transition-all ${
          step === 4 ? 'bg-purple-100 dark:bg-purple-900/30 ring-2 ring-purple-500' : 'bg-slate-100 dark:bg-slate-700'
        }`}>
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
            <Server className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs font-medium text-slate-700 dark:text-slate-200 mt-2">Origin</span>
        </div>

        {/* Database */}
        <div className={`flex flex-col items-center p-4 rounded-xl transition-all ${
          step === 4 ? 'bg-green-100 dark:bg-green-900/30 ring-2 ring-green-500' : 'bg-slate-100 dark:bg-slate-700'
        }`}>
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <Database className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs font-medium text-slate-700 dark:text-slate-200 mt-2">Database</span>
        </div>
      </div>

      {/* Request Path */}
      <div className="relative h-8 mb-6">
        <svg className="w-full h-full" viewBox="0 0 400 40">
          <defs>
            <marker id="arrowhead-cache" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
            </marker>
          </defs>
          {/* Client to Cache */}
          <path
            d="M 50 20 L 130 20"
            stroke={step >= 1 ? '#3b82f6' : '#94a3b8'}
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead-cache)"
            className="transition-colors duration-300"
          />
          {cacheHit ? (
            /* Cache hit path */
            <path
              d="M 130 20 L 230 20"
              stroke={step >= 2 ? '#22c55e' : '#94a3b8'}
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead-cache)"
              className="transition-colors duration-300"
            />
          ) : (
            /* Cache miss path */
            <>
              <path
                d="M 130 20 L 180 20"
                stroke={step >= 3 ? '#3b82f6' : '#94a3b8'}
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead-cache)"
                className="transition-colors duration-300"
              />
              <path
                d="M 180 20 L 230 20"
                stroke={step >= 4 ? '#3b82f6' : '#94a3b8'}
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M 230 20 L 280 20"
                stroke={step >= 4 ? '#3b82f6' : '#94a3b8'}
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead-cache)"
                className="transition-colors duration-300"
              />
              <path
                d="M 280 20 L 350 20"
                stroke={step >= 5 ? '#3b82f6' : '#94a3b8'}
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead-cache)"
                className="transition-colors duration-300"
              />
            </>
          )}
        </svg>

        {/* Moving packet */}
        {step >= 1 && (
          <motion.div
            className="absolute top-1 w-4 h-4 bg-blue-500 rounded-full"
            initial={{ left: '50px', top: '18px' }}
            animate={{ left: getPacketPosition() }}
            transition={{
              duration: step === 5 ? 0.3 : 0.8,
              ease: 'easeInOut'
            }}
          />
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className={`p-4 rounded-xl text-center ${
          step === 2 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-slate-100 dark:bg-slate-700'
        }`}>
          <div className="text-2xl font-bold text-slate-700 dark:text-slate-200">
            {cacheHit ? '~10ms' : '~50ms'}
          </div>
          <div className="text-xs text-slate-500">Response Time</div>
        </div>
        <div className="p-4 rounded-xl text-center bg-slate-100 dark:bg-slate-700">
          <div className="text-2xl font-bold text-slate-700 dark:text-slate-200">
            {cacheHit ? '0' : '1'}
          </div>
          <div className="text-xs text-slate-500">DB Queries</div>
        </div>
        <div className="p-4 rounded-xl text-center bg-slate-100 dark:bg-slate-700">
          <div className="text-2xl font-bold text-slate-700 dark:text-slate-200">
            {cacheHit ? '100%' : '50%'}
          </div>
          <div className="text-xs text-slate-500">Cache Efficiency</div>
        </div>
      </div>

      <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-xl">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {step === 0 && 'Click "Make Request" to start'}
          {step === 1 && 'Request arrives at CDN cache'}
          {step === 2 && 'Cache HIT! Data served immediately without going to origin'}
          {step === 3 && 'Cache MISS! Request forwarded to origin server'}
          {step === 4 && 'Origin fetches from database and stores in cache'}
          {step === 5 && cacheHit && 'Response returned from cache (~10ms)'}
          {step === 5 && !cacheHit && 'Response returned from origin (~100ms)'}
        </p>
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Eye, EyeOff, Lock, Key } from 'lucide-react';

export default function AuthFlow() {
  const [step, setStep] = useState(0);
  const [hasToken, setHasToken] = useState(false);
  const [token, setToken] = useState('');

  const steps = [
    { label: 'Login request', description: 'Client sends credentials' },
    { label: 'Token issued', description: 'Server validates and returns JWT' },
    { label: 'API request', description: 'Client includes token in header' },
    { label: 'Token validated', description: 'Server verifies token signature' },
    { label: 'Response', description: 'Server returns requested data' },
  ];

  const nextStep = () => {
    if (step === 0) {
      setStep(1);
      setHasToken(true);
      setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
    } else if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setStep(0);
      setHasToken(false);
      setToken('');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">JWT Authentication Flow</h3>
        <button
          onClick={nextStep}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          {step === 0 ? 'Start Flow' : step === steps.length - 1 ? 'Reset' : 'Next'}
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        {/* Client */}
        <div className={`flex flex-col items-center p-4 rounded-xl transition-all flex-1 ${
          step === 0 || step === 2 ? 'bg-blue-100 dark:bg-blue-900/30 ring-2 ring-blue-500' : 'bg-slate-100 dark:bg-slate-700'
        }`}>
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2" />
              <path d="M8 21h8M12 17v4" strokeWidth="2" />
            </svg>
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Client</span>
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-xs text-slate-500 bg-white dark:bg-slate-800 px-2 py-1 rounded"
            >
              Sending credentials...
            </motion.div>
          )}
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-2 flex items-center gap-1 text-xs text-green-600 dark:text-green-400 bg-white dark:bg-slate-800 px-2 py-1 rounded"
            >
              <Key size={12} />
              <span className="truncate max-w-[80px]">{token.slice(0, 20)}...</span>
            </motion.div>
          )}
        </div>

        {/* Auth Server */}
        <div className={`flex flex-col items-center p-4 rounded-xl transition-all flex-1 ${
          step === 1 ? 'bg-purple-100 dark:bg-purple-900/30 ring-2 ring-purple-500' : 'bg-slate-100 dark:bg-slate-700'
        }`}>
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-2">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Auth Server</span>
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-xs text-slate-500 bg-white dark:bg-slate-800 px-2 py-1 rounded"
            >
              Issuing JWT...
            </motion.div>
          )}
        </div>

        {/* API Server */}
        <div className={`flex flex-col items-center p-4 rounded-xl transition-all flex-1 ${
          step === 3 ? 'bg-green-100 dark:bg-green-900/30 ring-2 ring-green-500' : 'bg-slate-100 dark:bg-slate-700'
        }`}>
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="2" y="2" width="20" height="8" rx="2" strokeWidth="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" strokeWidth="2" />
            </svg>
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">API Server</span>
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-xs text-slate-500 bg-white dark:bg-slate-800 px-2 py-1 rounded"
            >
              Validating token...
            </motion.div>
          )}
        </div>
      </div>

      {/* Flow animation */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {step < 3 && (
          <>
            <motion.div
              className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              {step === 0 ? 'POST /auth/login' : step === 2 ? 'Authorization: Bearer...' : ''}
            </motion.div>
            {step < 2 && <span className="text-slate-400">→</span>}
          </>
        )}
        {step === 3 && (
          <motion.div
            className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            Validating signature...
          </motion.div>
        )}
        {step === 4 && (
          <motion.div
            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            200 OK - Data returned
          </motion.div>
        )}
      </div>

      {/* JWT Structure */}
      {step >= 1 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-4 bg-slate-100 dark:bg-slate-700 rounded-xl"
        >
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">JWT Structure</div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-2 py-1 bg-red-200 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded">HEADER</span>
            <span className="text-slate-400">.</span>
            <span className="px-2 py-1 bg-yellow-200 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 rounded">PAYLOAD</span>
            <span className="text-slate-400">.</span>
            <span className="px-2 py-1 bg-blue-200 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded">SIGNATURE</span>
          </div>
        </motion.div>
      )}

      <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-xl">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          <strong>Step {step + 1}:</strong> {steps[step].description}
        </p>
      </div>
    </div>
  );
}

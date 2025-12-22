import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ClientServerFlow() {
  const [step, setStep] = useState(0);

  const steps = [
    { label: 'Client sends request', from: 'client', to: 'server' },
    { label: 'Server processes request', from: 'server', to: 'server' },
    { label: 'Server queries database', from: 'server', to: 'database' },
    { label: 'Database returns data', from: 'database', to: 'server' },
    { label: 'Server sends response', from: 'server', to: 'client' },
  ];

  const nextStep = () => setStep((s) => (s + 1) % steps.length);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Client-Server Request Flow</h3>
        <button
          onClick={nextStep}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          {step === 0 ? 'Start' : 'Next Step'}
        </button>
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* Client */}
        <div className={`flex flex-col items-center p-4 rounded-xl transition-all ${
          step === 0 || step === 4 ? 'bg-blue-100 dark:bg-blue-900/30 ring-2 ring-blue-500' : 'bg-slate-100 dark:bg-slate-700'
        }`}>
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-2">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2" />
              <path d="M8 21h8M12 17v4" strokeWidth="2" />
            </svg>
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Client</span>
        </div>

        {/* Network animation */}
        <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-600 relative rounded-full overflow-hidden">
          <motion.div
            className="absolute w-4 h-4 bg-blue-500 rounded-full"
            initial={{ left: step === 0 ? '0%' : step === 4 ? '100%' : '50%' }}
            animate={{
              left: step === 0 ? ['0%', '100%'] : step === 4 ? ['100%', '0%'] : '50%',
              opacity: [0, 1, 1, 0]
            }}
            transition={{ duration: 1, repeat: step === 0 ? 2 : 0 }}
            key={step}
          />
        </div>

        {/* Server */}
        <div className={`flex flex-col items-center p-4 rounded-xl transition-all ${
          step === 1 || step === 2 || step === 3 ? 'bg-purple-100 dark:bg-purple-900/30 ring-2 ring-purple-500' : 'bg-slate-100 dark:bg-slate-700'
        }`}>
          <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-2">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="2" y="2" width="20" height="8" rx="2" strokeWidth="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" strokeWidth="2" />
              <path d="M6 6h.01M6 18h.01" strokeWidth="2" />
            </svg>
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Server</span>
        </div>

        {/* Network animation */}
        <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-600 relative rounded-full overflow-hidden">
          <motion.div
            className="absolute w-4 h-4 bg-purple-500 rounded-full"
            initial={{ left: '0%' }}
            animate={{ left: step === 2 ? '0%' : step === 3 ? '100%' : '50%' }}
            style={{ opacity: step === 2 || step === 3 ? 1 : 0 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Database */}
        <div className={`flex flex-col items-center p-4 rounded-xl transition-all ${
          step === 2 || step === 3 ? 'bg-green-100 dark:bg-green-900/30 ring-2 ring-green-500' : 'bg-slate-100 dark:bg-slate-700'
        }`}>
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-2">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth="2" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" strokeWidth="2" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" strokeWidth="2" />
            </svg>
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Database</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-xl">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          <strong>Step {step + 1}:</strong> {steps[step].label}
        </p>
      </div>
    </div>
  );
}

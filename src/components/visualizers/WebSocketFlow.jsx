import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Send, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';

export default function WebSocketFlow() {
  const [step, setStep] = useState(0);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const steps = [
    { title: 'Handshake', description: 'Client initiates HTTP upgrade request' },
    { title: 'Connected', description: 'WebSocket connection established' },
    { title: 'Bidirectional', description: 'Both client and server can send anytime' },
  ];

  const sampleMessages = [
    { from: 'server', text: 'Welcome to chat!' },
    { from: 'client', text: 'Hello there!' },
    { from: 'server', text: 'How can I help?' },
  ];

  useEffect(() => {
    if (step === 0) {
      setConnected(false);
      setMessages([]);
    } else if (step === 1) {
      setConnected(true);
      setMessages([]);
    } else if (step === 2) {
      setConnected(true);
      setMessages(sampleMessages.slice(0, 1));
    }
  }, [step]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    setMessages(prev => [...prev, { from: 'client', text: inputMessage }]);
    setInputMessage('');
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'server', text: 'Message received!' }]);
    }, 500);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-6">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center">
            <button
              onClick={() => setStep(i)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                i === step
                  ? 'bg-primary-500 text-white'
                  : i < step
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
              }`}
            >
              {i < step ? '✓' : i + 1}
            </button>
            <div className="ml-2 hidden sm:block">
              <div className="text-sm font-medium text-slate-900 dark:text-white">{s.title}</div>
              <div className="text-xs text-slate-500">{s.description}</div>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 sm:w-16 h-1 mx-2 rounded ${
                i < step ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Visualizer Area */}
      <div className="relative bg-slate-50 dark:bg-slate-900 rounded-xl p-6 min-h-[300px] flex flex-col">
        {/* Client/Server Labels */}
        <div className="flex justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">C</span>
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Client</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Server</span>
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="flex items-center justify-center mb-4">
          <motion.div
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              connected ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-amber-100 dark:bg-amber-900/30'
            }`}
          >
            <Wifi className={`w-4 h-4 ${connected ? 'text-emerald-500' : 'text-amber-500'}`} />
            <span className={`text-sm font-medium ${connected ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'}`}>
              {connected ? 'Connected (Persistent)' : 'Not Connected'}
            </span>
          </motion.div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 space-y-3 mb-4 max-h-[200px] overflow-y-auto">
          <AnimatePresence>
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center p-4 bg-slate-200 dark:bg-slate-800 rounded-lg"
              >
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Waiting for connection...
                </div>
              </motion.div>
            )}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-2xl mb-2"
                >
                  🤝
                </motion.div>
                <div className="text-sm font-medium text-green-700 dark:text-green-300">
                  HTTP Upgrade Successful!
                </div>
                <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                  Connection: Upgrade → websocket
                </div>
              </motion.div>
            )}
            {step >= 2 && messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.from === 'client' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${msg.from === 'client' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] px-3 py-2 rounded-lg ${
                  msg.from === 'client'
                    ? 'bg-blue-500 text-white'
                    : 'bg-green-500 text-white'
                }`}>
                  <div className="text-xs opacity-80 mb-1">
                    {msg.from === 'client' ? '→ Send' : '← Receive'}
                  </div>
                  <div className="text-sm font-mono">{msg.text}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        {step >= 2 && (
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <Send size={16} />
              <span className="text-sm">Send</span>
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="flex items-center gap-1 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft size={16} />
            Previous
          </button>
          <button
            onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
            disabled={step === steps.length - 1}
            className="flex items-center gap-1 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Key Insight */}
      <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <div className="w-2 h-2 bg-primary-500 rounded-full" />
          </div>
          <div>
            <div className="text-sm font-medium text-primary-900 dark:text-primary-100">
              Key Insight
            </div>
            <div className="text-sm text-primary-700 dark:text-primary-300 mt-1">
              Unlike HTTP request-response, WebSockets maintain a persistent, full-duplex connection.
              Both sides can send messages anytime without waiting for a response!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

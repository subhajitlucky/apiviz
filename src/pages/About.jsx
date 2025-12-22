import { motion } from 'framer-motion';
import { Code2, BookOpen, Github, AlertTriangle, Play, Target, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Code2 size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            About API Viz
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            A visual-first educational platform for learning API design
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* How to Study Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  How to Study with API Viz
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  A quick guide to get the most out of this platform
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={18} className="text-primary-500" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">1. Start with Fundamentals</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Begin with the API Fundamentals path to build a solid foundation. Understand what APIs are and how the client-server model works.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={18} className="text-amber-500" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">2. Watch the Visualizations</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Each topic includes interactive animations. Click through the steps to see how concepts work in action.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Play size={18} className="text-pink-500" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">3. Practice in Playground</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Head to the Playground to simulate real API calls. Toggle between REST and GraphQL to compare approaches.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Target size={18} className="text-emerald-500" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">4. Follow Learning Paths</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Progress through the structured paths. Each builds on previous concepts - REST before GraphQL, fundamentals before architecture.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl">
              <p className="text-sm text-primary-700 dark:text-primary-300 text-center">
                <strong>Tip:</strong> Use the search bar on the Learn page to quickly find specific topics you want to explore.
              </p>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  Our Mission
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  We believe that API design concepts are best understood through visualization
                  rather than text walls. Our platform provides interactive animations, simulations,
                  and visual comparisons to help developers build intuition for how APIs work,
                  trade-offs between approaches, and best practices for design.
                </p>
              </div>
            </div>
          </motion.div>

          {/* What We Cover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              What We Cover
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'REST API design principles and constraints',
                'GraphQL schema design and queries',
                'Authentication and authorization patterns',
                'Caching strategies and HTTP caching',
                'API versioning and evolution',
                'Performance optimization techniques',
                'Real-world architecture patterns',
                'Error handling and best practices',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full" />
                  <span className="text-slate-600 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Educational Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Educational Disclaimer
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  API Viz is an educational tool designed to teach API concepts visually.
                  All API calls, requests, and responses are simulated in the browser for
                  learning purposes. No actual network requests are made to external servers.
                  The playground uses mock data to demonstrate concepts safely.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Limitations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Frontend-Only Limitations
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                Since this is a purely frontend application, there are some inherent limitations:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1">•</span>
                  <span>
                    <strong>No real backend:</strong> All data is simulated with mock responses.
                    In a real API, you'd interact with actual databases and services.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1">•</span>
                  <span>
                    <strong>No authentication persistence:</strong> JWT tokens and sessions
                    are visual demonstrations, not actual secure credentials.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1">•</span>
                  <span>
                    <strong>No rate limiting:</strong> Real APIs enforce rate limits to prevent
                    abuse. Our playground allows unlimited requests for learning.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1">•</span>
                  <span>
                    <strong>No network latency simulation:</strong> While we show simulated
                    latency, real-world networks have variable conditions.
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Open Source */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Github className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3">Open Source Intent</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  This project is designed with educational intent. The concepts, visualizations,
                  and teaching approaches are meant to help developers learn API design. Feel free
                  to use these patterns and ideas in your own educational materials or projects.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-white/10 rounded-lg text-sm">React</span>
                  <span className="px-3 py-1 bg-white/10 rounded-lg text-sm">TailwindCSS</span>
                  <span className="px-3 py-1 bg-white/10 rounded-lg text-sm">Framer Motion</span>
                  <span className="px-3 py-1 bg-white/10 rounded-lg text-sm">Visual Learning</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Built With
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'React', desc: 'UI Framework' },
                { name: 'Vite', desc: 'Build Tool' },
                { name: 'TailwindCSS', desc: 'Styling' },
                { name: 'Framer Motion', desc: 'Animations' },
                { name: 'React Router', desc: 'Routing' },
                { name: 'Lucide', desc: 'Icons' },
              ].map((tech, index) => (
                <div
                  key={index}
                  className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl text-center"
                >
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {tech.name}
                  </div>
                  <div className="text-xs text-slate-500">{tech.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center text-slate-500 dark:text-slate-400 text-sm"
        >
          <p>API Viz - Making API design tangible through visualization</p>
        </motion.div>
      </div>
    </div>
  );
}

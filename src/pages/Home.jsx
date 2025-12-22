import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, BookOpen, Play, Globe, Server, Shield } from 'lucide-react';
import { learningPaths } from '../data/topics';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-purple-500/10 dark:from-primary-500/5 dark:to-purple-500/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-6"
            >
              <Zap size={16} />
              Visual Learning Platform
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
            >
              Master API Design
              <span className="block bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Through Visualization
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto"
            >
              Explore REST, GraphQL, and modern API architecture through interactive visualizations.
              No text walls — just intuitive, visual learning.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                to="/playground"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all hover:scale-105 shadow-lg shadow-primary-500/25"
              >
                <Play size={20} />
                Open Playground
              </Link>
              <Link
                to="/learn"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                <BookOpen size={20} />
                Start Learning
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* REST vs GraphQL Comparison */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              See the Difference Visually
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Understand how REST and GraphQL approaches differ in fetching data
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* REST Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border-t-4 border-rest-light"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-rest-light rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">REST</h3>
                  <p className="text-sm text-slate-500">Multiple endpoints, fixed responses</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="text-xs text-red-600 dark:text-red-400 font-mono mb-1">GET /users/123</div>
                  <div className="text-xs text-red-500">Returns all user fields</div>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="text-xs text-red-600 dark:text-red-400 font-mono mb-1">GET /users/123/posts</div>
                  <div className="text-xs text-red-500">Returns full post objects</div>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="text-xs text-red-600 dark:text-red-400 font-mono mb-1">GET /posts/1,2,3</div>
                  <div className="text-xs text-red-500">May get more data than needed</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Requests needed:</span>
                  <span className="font-semibold text-red-500">3-5 requests</span>
                </div>
              </div>
            </motion.div>

            {/* GraphQL Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border-t-4 border-graphql-light"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-graphql-light rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">GraphQL</h3>
                  <p className="text-sm text-slate-500">Single endpoint, flexible responses</p>
                </div>
              </div>

              <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-800">
                <div className="text-xs text-pink-600 dark:text-pink-400 font-mono mb-2">
                  query {'{'} user(id: "123") {'{'} <br/>
                  &nbsp;&nbsp;name<br/>
                  &nbsp;&nbsp;posts {'{'} title {'}'}<br/>
                  {'}'} {'}'}
                </div>
                <div className="text-xs text-pink-500">Exactly what you need, nothing more</div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Requests needed:</span>
                  <span className="font-semibold text-pink-500">1 request</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Learning Paths
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Structured topics from fundamentals to advanced architecture
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/learn?path=${path.id}`}
                  className="block bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100 dark:border-slate-700"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center text-2xl mb-4`}>
                    {path.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {path.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    {path.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary-500 text-sm font-medium">
                    <span>{path.topics.length} topics</span>
                    <ArrowRight size={16} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why API Viz?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Interactive Flows
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Watch request-response cycles animate step by step
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Server className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Real Simulations
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Practice with a simulated API environment
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Security First
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Learn auth patterns with visual examples
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Master API Design?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Jump into the interactive playground and start experimenting with real API concepts.
            </p>
            <Link
              to="/playground"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-slate-100 transition-all hover:scale-105 shadow-lg"
            >
              <Play size={20} />
              Open Playground Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { learningPaths, topicData } from '../data/topics';
import { Search, ChevronRight, BookOpen, Layers, ArrowLeft } from 'lucide-react';

export default function Learn() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPath, setSelectedPath] = useState(searchParams.get('path') || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTopics, setFilteredTopics] = useState([]);

  useEffect(() => {
    setSelectedPath(searchParams.get('path'));
  }, [searchParams]);

  useEffect(() => {
    if (searchQuery) {
      const allTopics = [];
      learningPaths.forEach(path => {
        path.topics.forEach(topic => {
          const topicInfo = topicData[topic.slug];
          allTopics.push({
            ...topic,
            pathId: path.id,
            pathTitle: path.title,
            pathColor: path.color,
            definition: topicInfo?.definition || '',
            keyPoints: topicInfo?.keyPoints || []
          });
        });
      });
      const query = searchQuery.toLowerCase();
      setFilteredTopics(
        allTopics.filter(t =>
          t.title.toLowerCase().includes(query) ||
          t.definition.toLowerCase().includes(query) ||
          t.pathTitle.toLowerCase().includes(query) ||
          t.keyPoints.some(kp => kp.toLowerCase().includes(query))
        )
      );
    } else {
      setFilteredTopics([]);
    }
  }, [searchQuery]);

  const currentPath = learningPaths.find(p => p.id === selectedPath);

  const allTopicsFlat = learningPaths.flatMap(path =>
    path.topics.map(topic => ({
      ...topic,
      pathId: path.id,
      pathColor: path.color
    }))
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {selectedPath ? currentPath?.title : 'Learning Paths'}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                {selectedPath ? currentPath?.description : 'Choose a path or search for a topic'}
              </p>
            </div>
            {selectedPath && (
              <button
                onClick={() => setSearchParams({})}
                className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Paths
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {searchQuery ? (
            // Search Results
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Found <span className="font-medium text-slate-900 dark:text-white">{filteredTopics.length}</span> results for "{searchQuery}"
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTopics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={`/learn/${topic.slug}`}
                      className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors group"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${topic.pathColor || 'from-blue-500 to-cyan-500'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors truncate">
                          {topic.title}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${topic.pathColor}`} />
                          {topic.pathTitle}
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-slate-400 group-hover:text-primary-500 transition-colors flex-shrink-0" />
                    </Link>
                  </motion.div>
                ))}
                {filteredTopics.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <div className="text-4xl mb-2">🔍</div>
                    <p className="text-slate-500 dark:text-slate-400">No topics found for "{searchQuery}"</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Try searching for REST, GraphQL, caching, etc.</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : selectedPath ? (
            // Topics in selected path
            <motion.div
              key="topics"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {currentPath?.topics.map((topic, index) => {
                const topicInfo = topicData[topic.slug];
                return (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={`/learn/${topic.slug}`}
                      className="block p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all hover:shadow-lg group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-2xl">📖</span>
                        <ChevronRight size={20} className="text-slate-400 group-hover:text-primary-500 transition-colors" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                        {topic.title}
                      </h3>
                      {topicInfo && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                          {topicInfo.definition}
                        </p>
                      )}
                      <div className="mt-4 flex items-center gap-2 text-xs text-primary-500 font-medium">
                        <BookOpen size={14} />
                        Start Learning
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            // All paths as cards
            <motion.div
              key="paths"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {learningPaths.map((path, pathIndex) => (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: pathIndex * 0.1 }}
                >
                  <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    {/* Path Header */}
                    <button
                      onClick={() => setSearchParams({ path: path.id })}
                      className="w-full flex items-center gap-4 p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                        {path.icon}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                          {path.title}
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          {path.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-primary-500 font-medium">
                        <span>{path.topics.length} topics</span>
                        <Layers size={18} />
                      </div>
                    </button>

                    {/* Topics Preview */}
                    <div className="px-6 pb-6">
                      <div className="flex flex-wrap gap-2">
                        {path.topics.map((topic) => (
                          <Link
                            key={topic.id}
                            to={`/learn/${topic.slug}`}
                            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            {topic.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Topic Map Preview */}
        {!selectedPath && !searchQuery && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
              All Topics at a Glance
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {allTopicsFlat.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.02 }}
                >
                  <Link
                    to={`/learn/${topic.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
                  >
                    <span className={`w-2 h-2 rounded-full bg-gradient-to-br ${topic.pathColor}`} />
                    {topic.title}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

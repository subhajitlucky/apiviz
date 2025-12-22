import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 flex flex-col">
      <Navigation />
      <main className="pt-16 flex-1">
        {children}
      </main>
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                <Code2 size={18} />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                API Viz
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
              <Link to="/learn" className="hover:text-primary-500 transition-colors">Learn</Link>
              <Link to="/playground" className="hover:text-primary-500 transition-colors">Playground</Link>
              <Link to="/about" className="hover:text-primary-500 transition-colors">About</Link>
            </div>
            <div className="text-sm text-slate-400 dark:text-slate-500">
              Visual API Learning
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

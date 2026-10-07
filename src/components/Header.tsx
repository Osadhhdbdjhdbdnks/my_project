import { useState, useEffect } from 'react';

interface HeaderProps {
  onPostTask: () => void;
}

export default function Header({ onPostTask }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-3">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300 group-hover:scale-105">
                <span className="text-xl">⚡</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                跑腿幫
              </span>
              <span className="text-[10px] text-gray-400 font-medium tracking-wider">
                TASK RUNNER
              </span>
            </div>
          </a>

          {/* Nav */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center gap-1 bg-gray-100/80 rounded-full p-1">
              {[
                { href: '#categories', label: '服務分類' },
                { href: '#tasks', label: '任務看板' },
                { href: '#how-it-works', label: '運作方式' },
              ].map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-white transition-all duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              <span>登入</span>
            </button>
            <button
              onClick={onPostTask}
              className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-full font-medium text-sm shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>發佈任務</span>
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

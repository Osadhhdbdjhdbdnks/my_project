import { useState, useEffect } from 'react';
import PrivacyCenter from './PrivacyCenter';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onPostTask: () => void;
  onSearch: (query: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ onPostTask, onSearch, darkMode, toggleDarkMode }: HeaderProps) {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, text: '陳大偉已接受您的代購任務', time: '2分鐘前', unread: true, icon: '✅' },
    { id: 2, text: '新任務：幫忙送文件到內湖', time: '10分鐘前', unread: true, icon: '📦' },
    { id: 3, text: '您收藏的任務有更新', time: '1小時前', unread: false, icon: '⭐' },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setSearchOpen(false);
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const navItems = [
    { href: '#categories', label: 'Services' },
    { href: '#tasks', label: 'Tasks' },
    { href: '#stats', label: 'Stats' },
    { href: '#how-it-works', label: 'How it Works' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? darkMode
              ? 'bg-gray-900/95 backdrop-blur-xl border-b border-gray-800'
              : 'bg-white/95 backdrop-blur-xl border-b border-gray-200'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold text-gray-900 dark:text-white">TaskRunner</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Professional Task Platform</div>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                aria-label="搜尋"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Dark Mode */}
              <button
                onClick={toggleDarkMode}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                aria-label="切換深色模式"
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* Privacy */}
              <button
                onClick={() => setShowPrivacy(true)}
                className="hidden sm:flex w-10 h-10 rounded-lg items-center justify-center text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                title="隱私與安全中心"
                aria-label="隱私中心"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors relative"
                  aria-label="通知"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-scale-in origin-top-right">
                    <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{unreadCount} unread</span>
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map(notif => (
                        <div
                          key={notif.id}
                          className={`px-5 py-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors cursor-pointer ${
                            notif.unread ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                          }`}
                          onClick={() => setNotifications(notifications.map(n => n.id === notif.id ? { ...n, unread: false } : n))}
                        >
                          <div className="flex gap-3">
                            <span className="text-2xl flex-shrink-0">{notif.icon}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900 dark:text-gray-100">{notif.text}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                            </div>
                            {notif.unread && <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-700">
                      <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 w-full text-center">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <button
                onClick={() => setShowProfile(true)}
                className="hidden sm:flex w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 items-center justify-center text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="個人資料"
              >
                U
              </button>

              {/* CTA */}
              <button
                onClick={onPostTask}
                className="btn btn-primary"
              >
                <span className="hidden sm:inline">Post Task</span>
                <span className="sm:hidden">Post</span>
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                aria-label="選單"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="pb-4 animate-fade-in">
              <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search tasks, services, locations..."
                  className="input"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 animate-fade-in">
            <nav className="px-4 py-4 space-y-1">
              {navItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
              <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => { setShowPrivacy(true); setMobileMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-medium">Privacy & Security</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {showPrivacy && <PrivacyCenter darkMode={darkMode} onClose={() => setShowPrivacy(false)} />}
      {showProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowProfile(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white relative">
              <button onClick={() => setShowProfile(false)} className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30">✕</button>
              <div className="flex items-center gap-4">
                {user?.picture ? (
                  <img src={user.picture} alt={user.name} className="w-20 h-20 rounded-xl object-cover" />
                ) : (
                  <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center text-4xl backdrop-blur-sm">👤</div>
                )}
                <div>
                  <h2 className="text-2xl font-bold">{user?.name || 'User'}</h2>
                  <p className="text-white/80 text-sm">{user?.email || ''}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded">⭐ 4.8</span>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded">23 tasks</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 p-6">
              <div className="text-center"><div className="text-2xl font-bold text-blue-600">23</div><div className="text-xs text-gray-500 dark:text-gray-400">Tasks</div></div>
              <div className="text-center"><div className="text-2xl font-bold text-purple-600">4.8</div><div className="text-xs text-gray-500 dark:text-gray-400">Rating</div></div>
              <div className="text-center"><div className="text-2xl font-bold text-pink-600">12</div><div className="text-xs text-gray-500 dark:text-gray-400">Likes</div></div>
            </div>
            <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Achievements</h3>
              <div className="flex flex-wrap gap-2">
                {['🎯 Beginner', '⚡ Fast', '⭐ 5-Star', '🔥 7 Days'].map((badge, i) => (
                  <span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">{badge}</span>
                ))}
              </div>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <button className="flex-1 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Edit Profile</button>
              <button className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">My Tasks</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

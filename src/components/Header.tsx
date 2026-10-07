import { useState, useEffect } from 'react';

interface HeaderProps {
  onPostTask: () => void;
  onSearch: (query: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ onPostTask, onSearch, darkMode, toggleDarkMode }: HeaderProps) {
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? darkMode
              ? 'bg-gray-900/90 backdrop-blur-xl shadow-lg border-b border-gray-800'
              : 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100'
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
                <span className={`text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight ${darkMode ? 'from-indigo-400 to-purple-400' : ''}`}>
                  跑腿幫
                </span>
                <span className={`text-[10px] font-medium tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  TASK RUNNER
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center">
              <div className={`flex items-center gap-1 rounded-full p-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-100/80'}`}>
                {[
                  { href: '#categories', label: '服務分類' },
                  { href: '#tasks', label: '任務看板' },
                  { href: '#how-it-works', label: '運作方式' },
                  { href: '#stats', label: '平台數據' },
                ].map(item => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                        : 'text-gray-600 hover:text-indigo-600 hover:bg-white'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  darkMode ? 'hover:bg-gray-800 text-yellow-400' : 'hover:bg-gray-100 text-gray-600'
                }`}
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

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors relative ${
                    darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className={`absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl border overflow-hidden ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                  }`}>
                    <div className={`px-4 py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                      <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>通知</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map(notif => (
                        <div
                          key={notif.id}
                          className={`px-4 py-3 border-b last:border-b-0 transition-colors cursor-pointer ${
                            darkMode
                              ? `border-gray-700 ${notif.unread ? 'bg-gray-700/50' : ''} hover:bg-gray-700`
                              : `border-gray-50 ${notif.unread ? 'bg-indigo-50/50' : ''} hover:bg-gray-50`
                          }`}
                          onClick={() => {
                            setNotifications(notifications.map(n =>
                              n.id === notif.id ? { ...n, unread: false } : n
                            ));
                          }}
                        >
                          <div className="flex gap-3">
                            <span className="text-2xl">{notif.icon}</span>
                            <div className="flex-1">
                              <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{notif.text}</p>
                              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{notif.time}</p>
                            </div>
                            {notif.unread && (
                              <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={`px-4 py-2 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                      <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium w-full text-center">
                        查看全部通知
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <button
                onClick={() => setShowProfile(true)}
                className="hidden sm:flex w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 items-center justify-center text-white font-bold text-sm hover:shadow-lg transition-shadow"
              >
                U
              </button>

              {/* Post Task Button */}
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

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                }`}
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
            <div className="pb-4 animate-fade-in-up">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="搜尋任務、服務、地點..."
                  className={`w-full px-5 py-3 rounded-2xl border-2 outline-none transition-all ${
                    darkMode
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500'
                  }`}
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white"
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
          <div className={`md:hidden border-t ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
            <nav className="px-4 py-4 space-y-2">
              {[
                { href: '#categories', label: '服務分類', icon: '🎯' },
                { href: '#tasks', label: '任務看板', icon: '📋' },
                { href: '#how-it-works', label: '運作方式', icon: '⚡' },
                { href: '#stats', label: '平台數據', icon: '📊' },
              ].map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowProfile(false)} />
          <div className={`relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-8 text-white relative">
              <button
                onClick={() => setShowProfile(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
              >
                ✕
              </button>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl backdrop-blur-sm">
                  👤
                </div>
                <div>
                  <h2 className="text-2xl font-bold">使用者</h2>
                  <p className="text-white/80 text-sm">user@taskrunner.com</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">⭐ 4.8</span>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">完成 23 次</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 p-6">
              <div className="text-center">
                <div className="text-2xl font-black text-indigo-600">23</div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>完成任務</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-purple-600">4.8</div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>平均評分</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-pink-600">12</div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>獲得讚賞</div>
              </div>
            </div>

            {/* Achievements */}
            <div className={`px-6 pb-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <h3 className={`font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>🏆 成就徽章</h3>
              <div className="flex flex-wrap gap-2">
                {['🎯 新手上路', '⚡ 快速接單', '⭐ 五星好評', '🔥 連續7天'].map((badge, i) => (
                  <span key={i} className={`text-xs px-3 py-1.5 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className={`px-6 pb-6 flex gap-3`}>
              <button className={`flex-1 py-3 rounded-xl border-2 font-semibold ${
                darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}>
                編輯資料
              </button>
              <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold">
                我的任務
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

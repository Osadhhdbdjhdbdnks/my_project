import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 點擊外部關閉選單
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 處理登出
  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  // 處理查看個人資料
  const handleViewProfile = () => {
    setIsOpen(false);
    navigate('/profile');
  };

  // 處理查看設定
  const handleSettings = () => {
    setIsOpen(false);
    navigate('/settings');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        <img
          src={user.picture}
          alt={user.name}
          className="w-10 h-10 rounded-full border-2 border-white shadow-md"
        />
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
          {/* User Info */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img
                src={user.picture}
                alt={user.name}
                className="w-14 h-14 rounded-full border-2 border-white shadow-md"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                <p className="text-sm text-gray-600 truncate">{user.email}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                    {user.provider === 'google' ? 'Google' : user.provider === 'email' ? 'Email' : '手機'}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                    {user.role === 'admin' ? '管理員' : user.role === 'runner' ? '跑腿員' : '用戶'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={handleViewProfile}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-gray-700 font-medium">個人資料</span>
            </button>

            <button
              onClick={handleSettings}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-700 font-medium">設定</span>
            </button>

            <div className="border-t border-gray-100 my-2"></div>

            {/* Stats */}
            <div className="px-4 py-3 bg-gray-50">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-lg font-bold text-blue-600">23</p>
                  <p className="text-xs text-gray-600">任務</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-green-600">4.9</p>
                  <p className="text-xs text-gray-600">評分</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-purple-600">12</p>
                  <p className="text-xs text-gray-600">讚賞</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 my-2"></div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 transition-colors group"
            >
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-red-600 font-medium group-hover:text-red-700">登出</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

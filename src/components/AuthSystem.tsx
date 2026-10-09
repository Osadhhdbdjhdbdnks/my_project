import { useState } from 'react';
import GoogleLogin from './GoogleLogin';

interface AuthSystemProps {
  onClose: () => void;
  darkMode?: boolean;
  onLogin?: (user: any) => void;
}

export default function AuthSystem({ onClose, darkMode = false, onLogin }: AuthSystemProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email' | 'social'>('phone');
  const [showGoogleLogin, setShowGoogleLogin] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
    verifyCode: '',
    name: '',
    agreeTerms: false,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    onLogin?.({
      id: 1,
      name: '王小明',
      phone: formData.phone || '0912-XXX-XXX',
      email: formData.email || 'user@example.com',
      avatar: '👤',
      role: 'user',
    });
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate register
    onLogin?.({
      id: Date.now(),
      name: formData.name || '新用戶',
      phone: formData.phone,
      email: formData.email,
      avatar: '👤',
      role: 'user',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
          >
            ✕
          </button>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 backdrop-blur-sm">
              ⚡
            </div>
            <h2 className="text-2xl font-bold mb-1">
              {mode === 'login' ? '歡迎回來' : '加入跑腿幫'}
            </h2>
            <p className="text-white/80 text-sm">
              {mode === 'login' ? '登入您的帳號' : '創建您的帳號'}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-4 text-sm font-semibold transition-all relative ${
              mode === 'login'
                ? darkMode ? 'text-blue-400 bg-gray-900' : 'text-blue-600 bg-white'
                : darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            登入
            {mode === 'login' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-4 text-sm font-semibold transition-all relative ${
              mode === 'register'
                ? darkMode ? 'text-blue-400 bg-gray-900' : 'text-blue-600 bg-white'
                : darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            註冊
            {mode === 'register' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {mode === 'login' ? (
            <>
              {/* Login Method Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    loginMethod === 'phone'
                      ? 'bg-blue-600 text-white'
                      : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  📱 手機號碼
                </button>
                <button
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    loginMethod === 'email'
                      ? 'bg-blue-600 text-white'
                      : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  📧 Email
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {loginMethod === 'phone' ? (
                  <>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        手機號碼
                      </label>
                      <input
                        type="tel"
                        placeholder="0912-345-678"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        驗證碼
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="輸入6位數驗證碼"
                          value={formData.verifyCode}
                          onChange={e => setFormData({ ...formData, verifyCode: e.target.value })}
                          className={`flex-1 px-4 py-3 rounded-lg border ${
                            darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                          } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
                        />
                        <button
                          type="button"
                          className="px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                          發送
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        密碼
                      </label>
                      <input
                        type="password"
                        placeholder="輸入密碼"
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
                      />
                      <button type="button" className="text-xs text-blue-600 mt-2 hover:underline">
                        忘記密碼？
                      </button>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  登入
                </button>
              </form>

              {/* Social Login */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className={`w-full border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className={`px-2 ${darkMode ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-500'}`}>
                      或使用第三方登入
                    </span>
                  </div>
                </div>

                {/* Google Login Button */}
                <button
                  onClick={() => setShowGoogleLogin(true)}
                  className="w-full mt-4 flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-medium bg-white hover:bg-gray-50 hover:shadow-lg border-2 border-gray-200 transition-all text-gray-700"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>使用 Google 帳號登入</span>
                </button>

                {/* Other Social Logins */}
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {[
                    { icon: '🍎', label: 'Apple', color: 'bg-black' },
                    { icon: 'f', label: 'Facebook', color: 'bg-blue-600' },
                    { icon: '💬', label: 'LINE', color: 'bg-green-500' },
                  ].map((social, i) => (
                    <button
                      key={i}
                      className={`${social.color} text-white py-3 rounded-lg font-bold hover:opacity-90 transition-opacity`}
                    >
                      {social.icon}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  姓名
                </label>
                <input
                  type="text"
                  placeholder="您的姓名"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  手機號碼
                </label>
                <input
                  type="tel"
                  placeholder="0912-345-678"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  密碼
                </label>
                <input
                  type="password"
                  placeholder="至少8個字元"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
                />
              </div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={e => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-1"
                />
                <label htmlFor="agreeTerms" className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  我已閱讀並同意
                  <a href="#" className="text-blue-600 hover:underline mx-1">服務條款</a>
                  和
                  <a href="#" className="text-blue-600 hover:underline mx-1">隱私政策</a>
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                註冊
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Google Login Modal */}
      {showGoogleLogin && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowGoogleLogin(false)} />
          <div className="relative w-full max-w-md">
            <GoogleLogin
              darkMode={darkMode}
              onLogin={(user) => {
                onLogin?.(user);
                setShowGoogleLogin(false);
                onClose();
              }}
              onClose={() => setShowGoogleLogin(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

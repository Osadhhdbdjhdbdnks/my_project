import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, User } from '../contexts/AuthContext';
import SupabaseGoogleButton from '../components/SupabaseGoogleButton';
import { signInWithEmail, isSupabaseConfigured } from '../lib/supabase';

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<'google' | 'email' | 'phone'>('google');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isConfigured, setIsConfigured] = useState(true);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 檢查 Supabase 是否已配置
    const configured = isSupabaseConfigured();
    setIsConfigured(configured);
    
    if (!configured) {
      setError('⚠️ Supabase 尚未配置！請先完成配置。');
    }
  }, []);

  // 處理 Google 登入成功
  const handleGoogleSuccess = () => {
    console.log('Google login success');
    // Supabase 會自動處理重定向到 /auth/callback
  };

  // 處理 Google 登入失敗
  const handleGoogleError = () => {
    setError('Google 登入失敗，請重試');
  };

  // 處理 Email 登入
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 模擬 API 呼叫
    setTimeout(() => {
      const user: User = {
        id: 'email_' + Date.now(),
        name: email.split('@')[0],
        email: email,
        picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=4285f4&color=fff`,
        provider: 'email',
        role: 'user',
      };
      login(user);
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  // 處理手機登入
  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 模擬 API 呼叫
    setTimeout(() => {
      const user: User = {
        id: 'phone_' + Date.now(),
        name: '用戶' + phone.slice(-4),
        email: '',
        picture: `https://ui-avatars.com/api/?name=用戶&background=4285f4&color=fff`,
        provider: 'phone',
        role: 'user',
      };
      login(user);
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  // 發送驗證碼
  const handleSendVerifyCode = () => {
    if (!phone) {
      setError('請輸入手機號碼');
      return;
    }
    // 模擬發送驗證碼
    alert(`驗證碼已發送到 ${phone}（演示：123456）`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto shadow-lg">
              ⚡
            </div>
            <h1 className="text-3xl font-bold text-gray-900">跑腿幫</h1>
            <p className="text-gray-600 mt-2">登入您的帳號</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 mb-2">{error}</p>
              {!isConfigured && (
                <button
                  onClick={() => navigate('/setup')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium underline"
                >
                  前往配置 Supabase →
                </button>
              )}
            </div>
          )}

          {/* Not Configured Warning */}
          {!isConfigured && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-900 mb-1">需要配置 Supabase</h3>
                  <p className="text-sm text-yellow-800 mb-3">
                    在使用 Google 登入或 Email 註冊之前，您需要先配置 Supabase 專案資訊。
                  </p>
                  <button
                    onClick={() => navigate('/setup')}
                    className="text-sm bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-medium"
                  >
                    立即配置 Supabase
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Login Method Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setLoginMethod('google')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                loginMethod === 'google'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Google
            </button>
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                loginMethod === 'email'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                loginMethod === 'phone'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              手機
            </button>
          </div>

          {/* Google Login */}
          {loginMethod === 'google' && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-gray-600 text-sm">使用 Google 帳號快速登入</p>
              </div>
              
              <SupabaseGoogleButton
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">或</span>
                </div>
              </div>

              <div className="text-center text-xs text-gray-500">
                <p>登入即表示您同意我們的</p>
                <p className="mt-1">
                  <a href="#" className="text-blue-600 hover:underline">服務條款</a>
                  {' '}和{' '}
                  <a href="#" className="text-blue-600 hover:underline">隱私政策</a>
                </p>
              </div>
            </div>
          )}

          {/* Email Login */}
          {loginMethod === 'email' && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  密碼
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="輸入密碼"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-600">記住我</span>
                </label>
                <a href="#" className="text-blue-600 hover:underline">
                  忘記密碼？
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '登入中...' : '登入'}
              </button>

              <p className="text-center text-sm text-gray-600">
                還沒有帳號？{' '}
                <a href="/register" className="text-blue-600 hover:underline font-medium">
                  立即註冊
                </a>
              </p>
            </form>
          )}

          {/* Phone Login */}
          {loginMethod === 'phone' && (
            <form onSubmit={handlePhoneLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  手機號碼
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912-345-678"
                    required
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleSendVerifyCode}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors whitespace-nowrap"
                  >
                    發送驗證碼
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  驗證碼
                </label>
                <input
                  type="text"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  placeholder="輸入6位數驗證碼"
                  required
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '登入中...' : '登入'}
              </button>

              <p className="text-center text-sm text-gray-600">
                還沒有帳號？{' '}
                <a href="/register" className="text-blue-600 hover:underline font-medium">
                  立即註冊
                </a>
              </p>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>© 2024 跑腿幫. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

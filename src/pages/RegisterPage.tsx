import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, User } from '../contexts/AuthContext';
import SupabaseGoogleButton from '../components/SupabaseGoogleButton';
import { signUpWithEmail } from '../lib/supabase';

export default function RegisterPage() {
  const [registerMethod, setRegisterMethod] = useState<'google' | 'email' | 'phone'>('google');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  // 處理 Google 註冊成功
  const handleGoogleSuccess = () => {
    console.log('Google register success');
    // Supabase 會自動處理重定向到 /auth/callback
  };

  // 處理 Google 註冊失敗
  const handleGoogleError = () => {
    setError('Google 註冊失敗，請重試');
  };

  // 處理 Email 註冊
  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 驗證
    if (password !== confirmPassword) {
      setError('密碼不一致');
      return;
    }

    if (password.length < 8) {
      setError('密碼至少需要8個字元');
      return;
    }

    if (!agreeTerms) {
      setError('請同意服務條款和隱私政策');
      return;
    }

    setIsLoading(true);

    // 模擬 API 呼叫
    setTimeout(() => {
      const user: User = {
        id: 'email_' + Date.now(),
        name: name || email.split('@')[0],
        email: email,
        picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email.split('@')[0])}&background=4285f4&color=fff`,
        provider: 'email',
        role: 'user',
      };
      login(user);
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  // 處理手機註冊
  const handlePhoneRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!agreeTerms) {
      setError('請同意服務條款和隱私政策');
      return;
    }

    setIsLoading(true);

    // 模擬 API 呼叫
    setTimeout(() => {
      const user: User = {
        id: 'phone_' + Date.now(),
        name: name || '用戶' + phone.slice(-4),
        email: '',
        picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || '用戶')}&background=4285f4&color=fff`,
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
            <p className="text-gray-600 mt-2">創建您的帳號</p>
          </div>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Register Method Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setRegisterMethod('google')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                registerMethod === 'google'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Google
            </button>
            <button
              onClick={() => setRegisterMethod('email')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                registerMethod === 'email'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setRegisterMethod('phone')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                registerMethod === 'phone'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              手機
            </button>
          </div>

          {/* Google Register */}
          {registerMethod === 'google' && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-gray-600 text-sm">使用 Google 帳號快速註冊</p>
              </div>
              
              <SupabaseGoogleButton
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="使用 Google 帳號註冊"
              />

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">或</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900 font-medium mb-2">使用 Google 註冊的好處：</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✓ 無需記住密碼</li>
                  <li>✓ 快速安全的登入體驗</li>
                  <li>✓ 自動同步您的個人資料</li>
                </ul>
              </div>

              <div className="text-center text-xs text-gray-500">
                <p>註冊即表示您同意我們的</p>
                <p className="mt-1">
                  <a href="#" className="text-blue-600 hover:underline">服務條款</a>
                  {' '}和{' '}
                  <a href="#" className="text-blue-600 hover:underline">隱私政策</a>
                </p>
              </div>
            </div>
          )}

          {/* Email Register */}
          {registerMethod === 'email' && (
            <form onSubmit={handleEmailRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  姓名
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="您的姓名"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

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
                  placeholder="至少8個字元"
                  required
                  minLength={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  確認密碼
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="再次輸入密碼"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 mr-2"
                />
                <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                  我已閱讀並同意
                  <a href="#" className="text-blue-600 hover:underline mx-1">服務條款</a>
                  和
                  <a href="#" className="text-blue-600 hover:underline mx-1">隱私政策</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '註冊中...' : '註冊'}
              </button>

              <p className="text-center text-sm text-gray-600">
                已有帳號？{' '}
                <a href="/login" className="text-blue-600 hover:underline font-medium">
                  立即登入
                </a>
              </p>
            </form>
          )}

          {/* Phone Register */}
          {registerMethod === 'phone' && (
            <form onSubmit={handlePhoneRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  姓名
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="您的姓名"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

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

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeTermsPhone"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 mr-2"
                />
                <label htmlFor="agreeTermsPhone" className="text-sm text-gray-600">
                  我已閱讀並同意
                  <a href="#" className="text-blue-600 hover:underline mx-1">服務條款</a>
                  和
                  <a href="#" className="text-blue-600 hover:underline mx-1">隱私政策</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '註冊中...' : '註冊'}
              </button>

              <p className="text-center text-sm text-gray-600">
                已有帳號？{' '}
                <a href="/login" className="text-blue-600 hover:underline font-medium">
                  立即登入
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

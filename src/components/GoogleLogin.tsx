import { useState, useEffect } from 'react';

interface GoogleLoginProps {
  darkMode?: boolean;
  onLogin?: (user: any) => void;
  onClose?: () => void;
}

// Google 用戶資訊介面
interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
  given_name?: string;
  family_name?: string;
}

export default function GoogleLogin({ darkMode = false, onLogin, onClose }: GoogleLoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 模擬 Google 登入流程
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 模擬 Google OAuth 流程
      // 在實際應用中，這裡會調用 Google Identity Services API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 模擬 Google 返回的用戶資訊
      const mockGoogleUser: GoogleUser = {
        id: 'google_' + Date.now(),
        name: '王小明',
        email: 'wang.xiaoming@gmail.com',
        picture: 'https://ui-avatars.com/api/?name=王小明&background=4285f4&color=fff&size=128',
        given_name: '小明',
        family_name: '王',
      };

      // 調用登入回調
      onLogin?.({
        id: mockGoogleUser.id,
        name: mockGoogleUser.name,
        email: mockGoogleUser.email,
        avatar: mockGoogleUser.picture,
        provider: 'google',
        role: 'user',
      });

      setIsLoading(false);
    } catch (err) {
      setError('Google 登入失敗，請重試');
      setIsLoading(false);
    }
  };

  return (
    <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800/50' : 'bg-white'} shadow-xl`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
            🔐
          </div>
          <div>
            <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Google 帳號登入
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              使用 Google 帳號快速登入
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            ✕
          </button>
        )}
      </div>

      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-medium transition-all ${
          isLoading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-white hover:bg-gray-50 hover:shadow-lg border-2 border-gray-200'
        } ${darkMode ? 'text-gray-900' : 'text-gray-700'}`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>登入中...</span>
          </>
        ) : (
          <>
            {/* Google Logo */}
            <svg className="w-6 h-6" viewBox="0 0 24 24">
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
          </>
        )}
      </button>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Info */}
      <div className={`mt-6 p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
        <div className="flex items-start gap-3">
          <span className="text-xl">ℹ️</span>
          <div className="flex-1">
            <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              安全登入
            </p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              使用 Google 帳號登入，您的資料將受到 Google 的安全保護。我們不會存取您的密碼或其他敏感資訊。
            </p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="mt-6">
        <p className={`text-sm font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          使用 Google 登入的好處：
        </p>
        <div className="space-y-2">
          {[
            { icon: '⚡', text: '快速登入，無需記住密碼' },
            { icon: '🔒', text: 'Google 安全保護' },
            { icon: '🔄', text: '多裝置同步' },
            { icon: '🎁', text: '自動同步 Google 聯絡人' },
          ].map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-lg">{benefit.icon}</span>
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {benefit.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Terms */}
      <p className={`mt-6 text-xs text-center ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
        登入即表示您同意我們的
        <a href="#" className={`mx-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
          服務條款
        </a>
        和
        <a href="#" className={`mx-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
          隱私政策
        </a>
      </p>
    </div>
  );
}

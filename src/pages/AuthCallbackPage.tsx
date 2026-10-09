import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function AuthCallbackPage() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('Auth callback - URL:', window.location.href);
        console.log('Auth callback - Hash:', window.location.hash);
        console.log('Auth callback - Search:', window.location.search);

        // 檢查 URL 中的 hash 參數（Supabase 回調）
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const errorDescription = hashParams.get('error_description');
        const errorCode = hashParams.get('error_code');

        // 也檢查 query parameters（某些情況下 Supabase 使用 query params）
        const queryParams = new URLSearchParams(window.location.search);
        const queryAccessToken = queryParams.get('access_token');
        const queryRefreshToken = queryParams.get('refresh_token');
        const queryError = queryParams.get('error');

        console.log('Hash params:', { accessToken, refreshToken, errorDescription, errorCode });
        console.log('Query params:', { queryAccessToken, queryRefreshToken, queryError });

        // 檢查錯誤
        if (errorDescription) {
          console.error('OAuth error:', errorDescription);
          setError(`登入失敗: ${errorDescription}`);
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        if (queryError) {
          console.error('OAuth error from query:', queryError);
          setError(`登入失敗: ${queryError}`);
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        // 優先使用 hash params，其次使用 query params
        const finalAccessToken = accessToken || queryAccessToken;
        const finalRefreshToken = refreshToken || queryRefreshToken;

        if (finalAccessToken && finalRefreshToken) {
          console.log('Setting session with tokens');
          
          // 設置 session
          const { data, error } = await supabase.auth.setSession({
            access_token: finalAccessToken,
            refresh_token: finalRefreshToken,
          });

          if (error) {
            console.error('Set session error:', error);
            setError(`設定登入狀態失敗: ${error.message}`);
            setTimeout(() => navigate('/login'), 3000);
            return;
          }

          console.log('Session set successfully:', data);

          // 等待 AuthContext 更新用戶狀態
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } else {
          // 如果已經登入，直接跳轉
          if (user) {
            console.log('User already logged in, redirecting to dashboard');
            navigate('/dashboard');
          } else {
            console.error('No tokens found and no user logged in');
            setError('無法獲取登入資訊，請重新嘗試');
            setTimeout(() => navigate('/login'), 3000);
          }
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setError(`處理登入回調時發生錯誤: ${err instanceof Error ? err.message : '未知錯誤'}`);
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleCallback();
  }, [navigate, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center">
        {error ? (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">登入失敗</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500">即將返回登入頁面...</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">登入中</h2>
            <p className="text-gray-600">正在處理您的登入請求，請稍候...</p>
          </>
        )}
      </div>
    </div>
  );
}

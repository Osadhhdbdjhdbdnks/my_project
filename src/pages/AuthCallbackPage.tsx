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
        // 檢查 URL 中的 hash 參數（Supabase 回調）
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const errorDescription = hashParams.get('error_description');

        if (errorDescription) {
          setError(errorDescription);
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        if (accessToken && refreshToken) {
          // 設置 session
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            setError('設定登入狀態失敗');
            setTimeout(() => navigate('/login'), 3000);
            return;
          }

          // 等待 AuthContext 更新用戶狀態
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } else {
          // 如果已經登入，直接跳轉
          if (user) {
            navigate('/dashboard');
          } else {
            setError('無法獲取登入資訊');
            setTimeout(() => navigate('/login'), 3000);
          }
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setError('處理登入回調時發生錯誤');
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

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SetupWizard() {
  const [step, setStep] = useState(1);
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 檢查是否已經配置
    const savedUrl = localStorage.getItem('supabase_url');
    const savedKey = localStorage.getItem('supabase_anon_key');
    
    if (savedUrl && savedKey) {
      setSupabaseUrl(savedUrl);
      setSupabaseAnonKey(savedKey);
      setSuccess(true);
    }
  }, []);

  const handleSave = () => {
    setError('');

    // 驗證 URL
    if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
      setError('請輸入有效的 Supabase URL（格式：https://your-project.supabase.co）');
      return;
    }

    // 驗證 Anon Key
    if (!supabaseAnonKey || supabaseAnonKey.length < 50) {
      setError('請輸入有效的 Supabase Anon Key');
      return;
    }

    // 儲存到 localStorage
    localStorage.setItem('supabase_url', supabaseUrl);
    localStorage.setItem('supabase_anon_key', supabaseAnonKey);

    setSuccess(true);
    setStep(3);
  };

  const handleContinue = () => {
    navigate('/login');
  };

  const handleReset = () => {
    localStorage.removeItem('supabase_url');
    localStorage.removeItem('supabase_anon_key');
    setSupabaseUrl('');
    setSupabaseAnonKey('');
    setSuccess(false);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-4xl mb-4 mx-auto shadow-lg">
            ⚙️
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Supabase 配置精靈</h1>
          <p className="text-gray-600">設定您的 Supabase 專案資訊以啟用登入功能</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">獲取資訊</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">填入配置</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300'
              }`}>
                3
              </div>
              <span className="ml-2 font-medium">完成</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Step 1: Instructions */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">步驟 1：獲取 Supabase 資訊</h2>
              
              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">📋 如何獲取 Supabase URL 和 Anon Key：</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                    <li>前往 <a href="https://supabase.com/dashboard/" target="_blank" rel="noopener noreferrer" className="underline font-medium">Supabase Dashboard</a></li>
                    <li>登入您的帳號（或創建一個新帳號）</li>
                    <li>點擊 "New Project" 創建一個新專案</li>
                    <li>填寫專案名稱和資料庫密碼</li>
                    <li>等待專案創建完成（約 1-2 分鐘）</li>
                    <li>在左側選單點擊 "Settings"（齒輪圖示）</li>
                    <li>點擊 "API"</li>
                    <li>複製以下資訊：
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li><strong>Project URL</strong>：格式為 <code className="bg-blue-100 px-2 py-0.5 rounded">https://your-project.supabase.co</code></li>
                        <li><strong>anon public key</strong>：一個很長的 JWT token</li>
                      </ul>
                    </li>
                  </ol>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-2">⚠️ 重要提示：</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800">
                    <li>確保您已啟用 Google Provider（Authentication &gt; Providers &gt; Google）</li>
                    <li>確保您已在 Google Cloud Console 設定 OAuth</li>
                    <li>這些資訊會儲存在您的瀏覽器中，不會上傳到任何伺服器</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                我已經準備好 Supabase 資訊，下一步
              </button>
            </div>
          )}

          {/* Step 2: Input Configuration */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">步驟 2：填入 Supabase 配置</h2>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supabase URL
                  </label>
                  <input
                    type="text"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    placeholder="https://your-project.supabase.co"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    從 Supabase Dashboard &gt; Settings &gt; API 複製
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supabase Anon Key
                  </label>
                  <textarea
                    value={supabaseAnonKey}
                    onChange={(e) => setSupabaseAnonKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    從 Supabase Dashboard &gt; Settings &gt; API 複製 anon public key
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  返回
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  儲存配置
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">配置完成！</h2>
                <p className="text-gray-600">您的 Supabase 資訊已成功儲存</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-green-900 mb-2">✅ 下一步：</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-green-800">
                  <li>前往 Supabase Dashboard 啟用 Google Provider</li>
                  <li>在 Google Cloud Console 設定 OAuth</li>
                  <li>點擊下方按鈕開始使用登入功能</li>
                </ol>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  重新配置
                </button>
                <button
                  onClick={handleContinue}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  前往登入頁面
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>需要幫助？請查看 <a href="/SUPABASE_SETUP.md" className="text-blue-600 hover:underline">Supabase 設置指南</a></p>
        </div>
      </div>
    </div>
  );
}

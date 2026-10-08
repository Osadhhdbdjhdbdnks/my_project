import { useState } from 'react';

interface AITaskGeneratorProps {
  darkMode?: boolean;
  onGenerate?: (description: string) => void;
}

export default function AITaskGenerator({ darkMode = false, onGenerate }: AITaskGeneratorProps) {
  const [keywords, setKeywords] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState('');

  const templates = [
    { icon: '🛒', label: '代購', keywords: '超市,買東西,全聯' },
    { icon: '🧹', label: '清潔', keywords: '打掃,清潔,整理' },
    { icon: '🚗', label: '接送', keywords: '開車,機場,接送' },
    { icon: '📦', label: '配送', keywords: '送貨,搬家,搬運' },
  ];

  const handleGenerate = () => {
    if (!keywords.trim()) return;
    
    setGenerating(true);
    
    // 模擬 AI 生成
    setTimeout(() => {
      const descriptions = [
        `請幫我${keywords.includes('買') ? '到附近超市購買以下物品：牛奶、雞蛋、麵包、蔬菜。請選擇新鮮的食材，並在購買後拍照確認。' : 
          keywords.includes('打掃') ? '進行居家清潔服務，包含客廳、廚房、浴室的全面清潔。請自備清潔用品，注意環保無毒。' :
          keywords.includes('接') ? '提供機場接送服務，需要準時到達指定地點，協助搬運行李，保持車輛整潔。' :
          '完成指定的配送任務，確保物品安全送達，並在送達後拍照確認。'}`,
        `需要${keywords.includes('買') ? '代購服務，請到指定地點購買清單上的物品，注意保存期限和品質。' :
          keywords.includes('清潔') ? '專業清潔服務，請仔細處理每個角落，特別注意廚房油漬和浴室水垢。' :
          keywords.includes('接') ? '接送服務，請提前15分鐘到達，保持通訊暢通，確保乘客舒適安全。' :
          '配送任務，請小心搬運物品，避免損壞，並按照指定路線送達。'}`,
      ];
      
      const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
      setGeneratedText(randomDesc);
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className={`rounded-2xl p-5 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">✨</span>
        <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          AI 一鍵生成描述
        </h4>
      </div>

      {/* Quick Templates */}
      <div className="flex flex-wrap gap-2 mb-4">
        {templates.map((t, i) => (
          <button
            key={i}
            onClick={() => setKeywords(t.keywords)}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
              darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="relative mb-3">
        <input
          type="text"
          value={keywords}
          onChange={e => setKeywords(e.target.value)}
          placeholder="輸入關鍵字，例如：買菜、打掃、接送..."
          className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-indigo-500'
              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500'
          }`}
        />
        <button
          onClick={handleGenerate}
          disabled={generating || !keywords.trim()}
          className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
            generating || !keywords.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-md'
          }`}
        >
          {generating ? '生成中...' : '生成'}
        </button>
      </div>

      {/* Generated Text */}
      {generatedText && (
        <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-indigo-50'}`}>
          <div className="flex items-start gap-2">
            <span className="text-lg">🤖</span>
            <div className="flex-1">
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {generatedText}
              </p>
              <button
                onClick={() => onGenerate?.(generatedText)}
                className={`mt-2 text-xs font-semibold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}
              >
                使用此描述 →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

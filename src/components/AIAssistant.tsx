import { useState, useEffect } from 'react';

interface AIAssistantProps {
  darkMode?: boolean;
  onSuggestTask?: (task: any) => void;
}

export default function AIAssistant({ darkMode = false, onSuggestTask }: AIAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [voiceInput, setVoiceInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  // AI 智能建議
  const aiSuggestions = [
    {
      icon: '🛒',
      title: '幫我去全聯買東西',
      description: 'AI 根據您的歷史紀錄推薦：牛奶、雞蛋、麵包',
      confidence: 95,
      category: 'shopping',
      estimatedReward: 200,
    },
    {
      icon: '🧹',
      title: '週末大掃除',
      description: '檢測到今天是週五，建議預約週末清潔服務',
      confidence: 88,
      category: 'cleaning',
      estimatedReward: 800,
    },
    {
      icon: '🚗',
      title: '機場接送',
      description: '根據您的行事曆，明天下午有航班到達',
      confidence: 92,
      category: 'driving',
      estimatedReward: 1200,
    },
  ];

  // 模擬語音輸入
  const handleVoiceInput = () => {
    setIsListening(true);
    setVoiceInput('');
    
    // 模擬語音識別
    setTimeout(() => {
      const phrases = [
        '幫我買杯咖啡',
        '需要人幫忙搬家',
        '想去機場接人',
        '家裡需要打掃',
      ];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setVoiceInput(randomPhrase);
      setIsListening(false);
      
      // 觸發 AI 分析
      setTimeout(() => analyzeWithAI(randomPhrase), 500);
    }, 2000);
  };

  // AI 分析任務
  const analyzeWithAI = (input: string) => {
    setAiThinking(true);
    setShowSuggestions(true);
    
    setTimeout(() => {
      setAiThinking(false);
      setAiResponse(`根據您的描述「${input}」，我為您找到了以下建議：`);
    }, 1500);
  };

  // AI 自動定價
  const calculateSmartPrice = (category: string, description: string) => {
    const basePrices: Record<string, number> = {
      shopping: 150,
      cleaning: 500,
      driving: 800,
      delivery: 200,
    };
    
    const base = basePrices[category] || 200;
    const complexity = description.length > 50 ? 1.2 : 1.0;
    const distance = Math.random() > 0.5 ? 1.3 : 1.0;
    
    return Math.round(base * complexity * distance);
  };

  return (
    <div className={`rounded-3xl p-6 border-2 ${
      darkMode ? 'bg-gray-800/50 border-indigo-500/30' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'
    }`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
          darkMode ? 'bg-gradient-to-br from-indigo-600 to-purple-600' : 'bg-gradient-to-br from-indigo-500 to-purple-500'
        }`}>
          🤖
        </div>
        <div>
          <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            AI 智能助手
          </h3>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            語音輸入 • 智能推薦 • 自動定價
          </p>
        </div>
        <div className="ml-auto">
          <span className={`text-xs px-2 py-1 rounded-full ${
            darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
          }`}>
            ✨ AI 驅動
          </span>
        </div>
      </div>

      {/* Voice Input */}
      <div className="mb-5">
        <button
          onClick={handleVoiceInput}
          disabled={isListening}
          className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : darkMode
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30'
              : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/30'
          }`}
        >
          {isListening ? (
            <>
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1 h-6 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span>正在聆聽...</span>
            </>
          ) : (
            <>
              <span className="text-xl">🎤</span>
              <span>語音輸入任務</span>
            </>
          )}
        </button>

        {voiceInput && (
          <div className={`mt-3 p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="font-semibold">識別結果：</span> {voiceInput}
            </p>
          </div>
        )}
      </div>

      {/* AI Response */}
      {aiThinking && (
        <div className={`p-4 rounded-xl mb-5 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-indigo-400' : 'bg-indigo-500'}`} style={{ animationDelay: '0ms' }} />
              <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-indigo-400' : 'bg-indigo-500'}`} style={{ animationDelay: '150ms' }} />
              <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-indigo-400' : 'bg-indigo-500'}`} style={{ animationDelay: '300ms' }} />
            </div>
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              AI 正在分析您的需求...
            </span>
          </div>
        </div>
      )}

      {aiResponse && (
        <div className={`p-4 rounded-xl mb-5 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {aiResponse}
          </p>
        </div>
      )}

      {/* AI Suggestions */}
      {showSuggestions && (
        <div className="space-y-3">
          <h4 className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            💡 AI 智能推薦
          </h4>
          {aiSuggestions.map((suggestion, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer hover:scale-[1.02] ${
                darkMode
                  ? 'bg-gray-700/50 border-gray-600 hover:border-indigo-500'
                  : 'bg-white border-gray-100 hover:border-indigo-300'
              }`}
              onClick={() => onSuggestTask?.(suggestion)}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{suggestion.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {suggestion.title}
                    </h5>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      darkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {suggestion.confidence}% 匹配
                    </span>
                  </div>
                  <p className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {suggestion.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      建議報酬：
                    </span>
                    <span className={`text-sm font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      NT$ {calculateSmartPrice(suggestion.category, suggestion.description)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Features */}
      <div className={`mt-5 pt-5 border-t grid grid-cols-3 gap-3 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="text-center">
          <div className="text-2xl mb-1">🎯</div>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>智能匹配</p>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-1">💰</div>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>自動定價</p>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-1">⚡</div>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>快速發佈</p>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import AIAssistant from './AIAssistant';
import AITaskGenerator from './AITaskGenerator';

interface NewTaskFormProps {
  onClose: () => void;
  onSubmit: (task: any) => void;
  darkMode?: boolean;
}

export default function NewTaskForm({ onClose, onSubmit, darkMode = false }: NewTaskFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'shopping',
    location: '',
    reward: '',
  });
  const [showAI, setShowAI] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      reward: parseInt(formData.reward) || 0,
      status: 'open',
      postedBy: '我',
      postedTime: '剛剛',
      avatar: '😊'
    };
    onSubmit(newTask);
  };

  const categories = [
    { value: 'shopping', label: '代購跑腿', icon: '🛒' },
    { value: 'cleaning', label: '居家清潔', icon: '🧹' },
    { value: 'driving', label: '開車接送', icon: '🚗' },
    { value: 'delivery', label: '搬運送達', icon: '📦' },
    { value: 'pet', label: '寵物照顧', icon: '🐕' },
    { value: 'other', label: '其他任務', icon: '✨' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-8 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm">
              📝
            </div>
            <div>
              <h2 className="text-2xl font-bold">發佈新任務</h2>
              <p className="text-white/80 text-sm">填寫需求，讓幫手為你服務</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[60vh]">
          {/* AI Toggle */}
          <div className={`p-4 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
            showAI
              ? darkMode ? 'border-indigo-500 bg-indigo-500/10' : 'border-indigo-400 bg-indigo-50'
              : darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'
          }`} onClick={() => setShowAI(!showAI)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    啟用 AI 智能助手
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    語音輸入 • 智能推薦 • 自動定價
                  </p>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors ${
                showAI ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : darkMode ? 'bg-gray-600' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  showAI ? 'translate-x-6' : 'translate-x-0.5'
                }`} style={{ marginTop: '2px' }} />
              </div>
            </div>
          </div>

          {/* AI Assistant */}
          {showAI && (
            <div className="animate-fade-in-up">
              <AIAssistant darkMode={darkMode} onSuggestTask={(suggestion) => {
                setFormData({
                  ...formData,
                  title: suggestion.title,
                  category: suggestion.category,
                  description: suggestion.description,
                  reward: suggestion.estimatedReward.toString(),
                });
              }} />
            </div>
          )}

          {/* Title */}
          <div>
            <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className={`w-5 h-5 rounded flex items-center justify-center text-xs ${darkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>1</span>
              任務標題
            </label>
            <input
              type="text"
              required
              placeholder="例如：幫我去全聯買東西"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <span className="w-5 h-5 bg-indigo-100 rounded flex items-center justify-center text-xs">2</span>
              任務分類
            </label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.value })}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
                    formData.category === cat.value
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-xs font-medium">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <span className="w-5 h-5 bg-indigo-100 rounded flex items-center justify-center text-xs">3</span>
              詳細描述
            </label>
            <textarea
              required
              rows={4}
              placeholder="請詳細描述你的需求，例如要買什麼東西、打掃哪些區域、接送的地點和時間等..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all resize-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <span className="w-5 h-5 bg-indigo-100 rounded flex items-center justify-center text-xs">4</span>
              地點
            </label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                required
                placeholder="例如：全聯福利中心 信義店"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>
          </div>

          {/* Reward */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <span className="w-5 h-5 bg-indigo-100 rounded flex items-center justify-center text-xs">5</span>
              報酬金額
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">NT$</span>
              <input
                type="number"
                required
                min="50"
                placeholder="200"
                value={formData.reward}
                onChange={e => setFormData({ ...formData, reward: e.target.value })}
                className="w-full pl-14 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
              💡 建議根據任務難度和所需時間設定合理報酬
            </p>
          </div>

          {/* Privacy Agreement */}
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-blue-50 border border-blue-100'}`}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <div className="flex-1">
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  我已閱讀並同意
                  <a href="#" className={`font-semibold mx-1 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}>服務條款</a>
                  和
                  <a href="#" className={`font-semibold mx-1 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}>隱私政策</a>
                </p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  🔒 您的資料將受到嚴格保護，僅用於任務媒合
                </p>
              </div>
            </label>
          </div>

          {/* Security Notice */}
          <div className={`flex items-center gap-2 p-3 rounded-xl ${darkMode ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-100'}`}>
            <span className="text-lg">🛡️</span>
            <p className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
              <span className="font-semibold">安全提示：</span>
              所有交易皆由平台託管，任務完成後才會撥款給幫手
            </p>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-3.5 rounded-xl border-2 font-semibold transition-colors ${
                darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30 transition-all font-semibold flex items-center justify-center gap-2"
            >
              <span>🚀</span>
              <span>發佈任務</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

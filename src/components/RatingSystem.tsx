import { useState } from 'react';

interface RatingSystemProps {
  taskId: number;
  taskTitle: string;
  runnerName: string;
  onClose: () => void;
  darkMode?: boolean;
  onSubmit?: (rating: any) => void;
}

export default function RatingSystem({ taskId, taskTitle, runnerName, onClose, darkMode = false, onSubmit }: RatingSystemProps) {
  const [rating, setRating] = useState({
    overall: 5,
    speed: 5,
    attitude: 5,
    communication: 5,
    honesty: 5,
    quality: 5,
    comment: '',
    anonymous: false,
    tags: [] as string[],
  });

  const dimensions = [
    { key: 'speed', label: '完成速度', icon: '⚡' },
    { key: 'attitude', label: '服務態度', icon: '😊' },
    { key: 'communication', label: '溝通能力', icon: '💬' },
    { key: 'honesty', label: '誠信程度', icon: '🤝' },
    { key: 'quality', label: '任務質量', icon: '✨' },
  ];

  const suggestedTags = [
    '準時完成', '態度親切', '溝通良好', '細心周到', '專業高效',
    '超出預期', '值得推薦', '耐心解釋', '主動回報', '值得信賴'
  ];

  const handleSubmit = () => {
    onSubmit?.(rating);
    onClose();
  };

  const toggleTag = (tag: string) => {
    setRating({
      ...rating,
      tags: rating.tags.includes(tag)
        ? rating.tags.filter(t => t !== tag)
        : [...rating.tags, tag]
    });
  };

  const getRatingLabel = (value: number) => {
    if (value === 5) return '非常滿意';
    if (value === 4) return '滿意';
    if (value === 3) return '普通';
    if (value === 2) return '不滿意';
    return '非常不滿意';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">評價任務</h2>
              <p className="text-white/80 text-sm">{taskTitle}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Runner Info */}
          <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xl">
                🧑
              </div>
              <div>
                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{runnerName}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>跑腿員 • 已完成 234 個任務</p>
              </div>
            </div>
          </div>

          {/* Overall Rating */}
          <div className="mb-6">
            <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              整體評分
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setRating({ ...rating, overall: star })}
                  className="text-4xl hover:scale-110 transition-transform"
                >
                  {star <= rating.overall ? '⭐' : '☆'}
                </button>
              ))}
              <span className={`ml-3 text-lg font-semibold ${
                rating.overall >= 4 ? 'text-green-600' :
                rating.overall === 3 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {getRatingLabel(rating.overall)}
              </span>
            </div>
          </div>

          {/* Dimension Ratings */}
          <div className="mb-6">
            <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              詳細評分
            </label>
            <div className="space-y-4">
              {dimensions.map(dim => (
                <div key={dim.key} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{dim.icon}</span>
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {dim.label}
                      </span>
                    </div>
                    <span className={`text-sm font-semibold ${
                      (rating as any)[dim.key] >= 4 ? 'text-green-600' :
                      (rating as any)[dim.key] === 3 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {(rating as any)[dim.key]}/5
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => setRating({ ...rating, [dim.key]: star })}
                        className="text-2xl hover:scale-110 transition-transform"
                      >
                        {star <= (rating as any)[dim.key] ? '⭐' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              標籤（可多選）
            </label>
            <div className="flex flex-wrap gap-2">
              {suggestedTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    rating.tags.includes(tag)
                      ? 'bg-blue-600 text-white'
                      : darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              評價內容（選填）
            </label>
            <textarea
              value={rating.comment}
              onChange={e => setRating({ ...rating, comment: e.target.value })}
              placeholder="分享您的使用體驗..."
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
              } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none`}
            />
          </div>

          {/* Anonymous Toggle */}
          <div className={`flex items-center justify-between p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>匿名評價</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                開啟後您的名稱將不會顯示在評價中
              </p>
            </div>
            <button
              onClick={() => setRating({ ...rating, anonymous: !rating.anonymous })}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                rating.anonymous ? 'bg-blue-600' : darkMode ? 'bg-gray-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform absolute top-0.5 ${
                rating.anonymous ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} flex gap-3`}>
          <button
            onClick={onClose}
            className={`flex-1 py-3 rounded-lg font-semibold ${
              darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            稍後評價
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            提交評價
          </button>
        </div>
      </div>
    </div>
  );
}

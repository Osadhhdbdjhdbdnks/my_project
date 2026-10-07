import { useState } from 'react';

interface NewTaskFormProps {
  onClose: () => void;
  onSubmit: (task: any) => void;
}

export default function NewTaskForm({ onClose, onSubmit }: NewTaskFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'shopping',
    location: '',
    reward: '',
  });

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">📝 發佈新任務</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              任務標題 *
            </label>
            <input
              type="text"
              required
              placeholder="例如：幫我去全聯買東西"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              任務分類 *
            </label>
            <select
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            >
              <option value="shopping">🛒 代購跑腿</option>
              <option value="cleaning">🧹 居家清潔</option>
              <option value="driving">🚗 開車接送</option>
              <option value="delivery">📦 搬運送達</option>
              <option value="pet">🐕 寵物照顧</option>
              <option value="other">🔧 其他任務</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              詳細描述 *
            </label>
            <textarea
              required
              rows={4}
              placeholder="請詳細描述你的需求，例如要買什麼東西、打掃哪些區域、接送的地點和時間等..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              地點 *
            </label>
            <input
              type="text"
              required
              placeholder="例如：全聯福利中心 信義店"
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            />
          </div>

          {/* Reward */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              報酬金額 (NT$) *
            </label>
            <input
              type="number"
              required
              min="50"
              placeholder="例如：200"
              value={formData.reward}
              onChange={e => setFormData({ ...formData, reward: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            />
            <p className="text-xs text-gray-400 mt-1">💡 建議根據任務難度和所需時間設定合理報酬</p>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg"
            >
              🚀 發佈任務
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

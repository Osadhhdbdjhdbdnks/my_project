import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  reward: number;
  status: string;
  postedBy: string;
  postedTime: string;
  avatar: string;
}

interface TaskBoardProps {
  tasks: Task[];
}

const categoryLabels: Record<string, { label: string; icon: string; color: string }> = {
  shopping: { label: '代購跑腿', icon: '🛒', color: 'bg-green-100 text-green-700' },
  cleaning: { label: '居家清潔', icon: '🧹', color: 'bg-blue-100 text-blue-700' },
  driving: { label: '開車接送', icon: '🚗', color: 'bg-orange-100 text-orange-700' },
  delivery: { label: '搬運送達', icon: '📦', color: 'bg-purple-100 text-purple-700' },
  pet: { label: '寵物照顧', icon: '🐕', color: 'bg-pink-100 text-pink-700' },
  other: { label: '其他', icon: '🔧', color: 'bg-gray-100 text-gray-700' },
};

const statusLabels: Record<string, { label: string; color: string }> = {
  open: { label: '待接單', color: 'bg-green-100 text-green-700 border-green-200' },
  in_progress: { label: '進行中', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  completed: { label: '已完成', color: 'bg-gray-100 text-gray-500 border-gray-200' },
};

export default function TaskBoard({ tasks }: TaskBoardProps) {
  const [filter, setFilter] = useState<string>('all');

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(t => t.category === filter);

  return (
    <section id="tasks" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">任務看板</h2>
          <p className="text-gray-500">以下是目前大家提出的需求，看看有沒有你能幫忙的！</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { key: 'all', label: '全部' },
            { key: 'shopping', label: '🛒 代購跑腿' },
            { key: 'cleaning', label: '🧹 居家清潔' },
            { key: 'driving', label: '🚗 開車接送' },
            { key: 'delivery', label: '📦 搬運送達' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f.key
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Task Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => {
            const cat = categoryLabels[task.category] || categoryLabels.other;
            const status = statusLabels[task.status];
            return (
              <div
                key={task.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{task.avatar}</span>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{task.postedBy}</p>
                      <p className="text-xs text-gray-400">{task.postedTime}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border ${status.color}`}>
                    {status.label}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {task.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {task.description}
                </p>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <span>📍</span>
                  <span>{task.location}</span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className={`text-xs px-3 py-1 rounded-full ${cat.color}`}>
                    {cat.icon} {cat.label}
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-indigo-600">NT$ {task.reward}</span>
                    {task.status === 'open' && (
                      <button className="block text-xs text-indigo-500 hover:text-indigo-700 mt-1 font-medium">
                        我要接單 →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-4">📭</p>
            <p>目前沒有此分類的任務</p>
          </div>
        )}
      </div>
    </section>
  );
}

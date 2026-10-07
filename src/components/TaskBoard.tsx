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
  onTaskClick?: (task: Task) => void;
}

const categoryConfig: Record<string, { label: string; icon: string; gradient: string; bg: string }> = {
  shopping: { label: '代購跑腿', icon: '🛒', gradient: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50 text-emerald-700' },
  cleaning: { label: '居家清潔', icon: '🧹', gradient: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50 text-blue-700' },
  driving: { label: '開車接送', icon: '🚗', gradient: 'from-orange-500 to-amber-500', bg: 'bg-orange-50 text-orange-700' },
  delivery: { label: '搬運送達', icon: '📦', gradient: 'from-violet-500 to-purple-500', bg: 'bg-violet-50 text-violet-700' },
  pet: { label: '寵物照顧', icon: '🐕', gradient: 'from-pink-500 to-rose-500', bg: 'bg-pink-50 text-pink-700' },
  other: { label: '其他', icon: '✨', gradient: 'from-indigo-500 to-blue-500', bg: 'bg-indigo-50 text-indigo-700' },
};

const statusConfig: Record<string, { label: string; dot: string; bg: string }> = {
  open: { label: '待接單', dot: 'bg-green-500', bg: 'bg-green-50 text-green-700 border-green-200' },
  in_progress: { label: '進行中', dot: 'bg-yellow-500', bg: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  completed: { label: '已完成', dot: 'bg-gray-400', bg: 'bg-gray-50 text-gray-500 border-gray-200' },
};

export default function TaskBoard({ tasks, onTaskClick }: TaskBoardProps) {
  const [filter, setFilter] = useState<string>('all');

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(t => t.category === filter);

  const filters = [
    { key: 'all', label: '全部', icon: '📋' },
    { key: 'shopping', label: '代購跑腿', icon: '🛒' },
    { key: 'cleaning', label: '居家清潔', icon: '🧹' },
    { key: 'driving', label: '開車接送', icon: '🚗' },
    { key: 'delivery', label: '搬運送達', icon: '📦' },
  ];

  return (
    <section id="tasks" className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-50 rounded-full px-4 py-1.5 mb-4">
            <span className="text-sm">📋</span>
            <span className="text-sm font-semibold text-indigo-600">任務看板</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            最新任務需求
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            看看有沒有你能幫忙的，完成任務賺取報酬 💰
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === f.key
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-indigo-200 hover:text-indigo-600'
              }`}
            >
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </button>
          ))}
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task, index) => {
            const cat = categoryConfig[task.category] || categoryConfig.other;
            const status = statusConfig[task.status];
            return (
              <div
                key={task.id}
                onClick={() => onTaskClick?.(task)}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500 animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Top gradient bar */}
                <div className={`h-1.5 bg-gradient-to-r ${cat.gradient}`} />
                
                <div className="p-6">
                  {/* Header: User + Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-xl shadow-md`}>
                        {task.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{task.postedBy}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {task.postedTime}
                        </p>
                      </div>
                    </div>
                    <span className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium ${status.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot} ${task.status === 'open' ? 'animate-pulse' : ''}`} />
                      {status.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {task.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {task.description}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-5 bg-gray-50 rounded-xl px-3 py-2">
                    <svg className="w-4 h-4 text-indigo-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{task.location}</span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${cat.bg}`}>
                      {cat.icon} {cat.label}
                    </span>
                    <div className="text-right">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-gray-400">NT$</span>
                        <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          {task.reward.toLocaleString()}
                        </span>
                      </div>
                      {task.status === 'open' && (
                        <button className="text-xs text-indigo-600 hover:text-indigo-800 font-bold mt-1 flex items-center gap-1 ml-auto group/btn">
                          我要接單
                          <svg className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-400 text-lg">目前沒有此分類的任務</p>
            <p className="text-gray-300 text-sm mt-2">試試看其他分類吧！</p>
          </div>
        )}
      </div>
    </section>
  );
}

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
  bookmarked?: boolean;
}

interface TaskBoardProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  onBookmark?: (taskId: number) => void;
  darkMode?: boolean;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export default function TaskBoard({ tasks, onTaskClick, onBookmark, darkMode = false, searchQuery = '', onClearSearch }: TaskBoardProps) {
  const [filter, setFilter] = useState<string>('all');

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(t => t.category === filter);

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'shopping', label: 'Shopping' },
    { key: 'cleaning', label: 'Cleaning' },
    { key: 'driving', label: 'Transport' },
    { key: 'delivery', label: 'Delivery' },
  ];

  const categoryConfig: Record<string, { label: string; color: string }> = {
    shopping: { label: 'Shopping', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    cleaning: { label: 'Cleaning', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    driving: { label: 'Transport', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
    delivery: { label: 'Delivery', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
    pet: { label: 'Pet Care', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400' },
    other: { label: 'Other', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' },
  };

  const statusConfig: Record<string, { label: string; color: string }> = {
    open: { label: 'Open', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    in_progress: { label: 'In Progress', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
    completed: { label: 'Completed', color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' },
  };

  return (
    <section id="tasks" className={`py-24 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 rounded-full px-4 py-2 mb-4">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Tasks</span>
          </div>
          <h2 className="section-title mb-4">
            Latest Task Requests
          </h2>
          <p className="section-subtitle">
            Find tasks that match your skills and earn rewards
          </p>
        </div>

        {/* Search Indicator */}
        {searchQuery && (
          <div className="flex items-center justify-center gap-3 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Search results for: <span className="font-semibold text-blue-600 dark:text-blue-400">"{searchQuery}"</span>
              <span className="ml-2 text-gray-500 dark:text-gray-500">{filteredTasks.length} tasks found</span>
            </p>
            <button
              onClick={onClearSearch}
              className="text-xs bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-md transition-colors"
            >
              Clear
            </button>
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f.key
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              {f.label}
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
                className="card cursor-pointer group"
              >
                <div className="p-6">
                  {/* Header: User + Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-xl">
                        {task.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-sm text-gray-900 dark:text-white">{task.postedBy}</p>
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {task.postedTime}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-md font-medium ${status.color}`}>
                      {status.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {task.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {task.description}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-5 bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3 py-2">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{task.location}</span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-md font-medium ${cat.color}`}>
                        {cat.label}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); onBookmark?.(task.id); }}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                          task.bookmarked
                            ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-gray-100 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:bg-gray-800 dark:hover:bg-yellow-900/20'
                        }`}
                        title={task.bookmarked ? 'Remove bookmark' : 'Bookmark task'}
                      >
                        <svg className="w-4 h-4" fill={task.bookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">NT$</span>
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {task.reward.toLocaleString()}
                        </span>
                      </div>
                      {task.status === 'open' && (
                        <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold mt-1 flex items-center gap-1 ml-auto group/btn">
                          Accept Task
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
            <p className="text-gray-500 dark:text-gray-400 text-lg">No tasks found in this category</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Try a different category</p>
          </div>
        )}
      </div>
    </section>
  );
}

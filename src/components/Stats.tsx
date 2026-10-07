import { useState, useEffect } from 'react';

interface StatsProps {
  darkMode: boolean;
}

export default function Stats({ darkMode }: StatsProps) {
  const [counters, setCounters] = useState({
    users: 0,
    tasks: 0,
    runners: 0,
    satisfaction: 0,
  });

  useEffect(() => {
    const targets = { users: 10234, tasks: 52847, runners: 3421, satisfaction: 98 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      setCounters({
        users: Math.floor(targets.users * eased),
        tasks: Math.floor(targets.tasks * eased),
        runners: Math.floor(targets.runners * eased),
        satisfaction: Math.floor(targets.satisfaction * eased),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      label: '活躍用戶',
      value: counters.users.toLocaleString(),
      suffix: '+',
      icon: '👥',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      change: '+12%',
      changePositive: true,
    },
    {
      label: '完成任務',
      value: counters.tasks.toLocaleString(),
      suffix: '+',
      icon: '✅',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      change: '+28%',
      changePositive: true,
    },
    {
      label: '認證幫手',
      value: counters.runners.toLocaleString(),
      suffix: '+',
      icon: '🏃',
      gradient: 'from-purple-500 to-violet-500',
      bgGradient: 'from-purple-50 to-violet-50',
      change: '+15%',
      changePositive: true,
    },
    {
      label: '滿意度',
      value: counters.satisfaction.toString(),
      suffix: '%',
      icon: '⭐',
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50',
      change: '+2%',
      changePositive: true,
    },
  ];

  const topRunners = [
    { name: '陳大偉', tasks: 234, rating: 4.9, avatar: '🧑', badge: '🏆' },
    { name: '林美華', tasks: 156, rating: 4.8, avatar: '👩', badge: '🥈' },
    { name: '王志明', tasks: 412, rating: 4.95, avatar: '👨‍💼', badge: '🥇' },
    { name: '李小強', tasks: 89, rating: 4.7, avatar: '🧑‍💼', badge: '🎖️' },
  ];

  const recentActivity = [
    { action: '完成代購任務', user: '陳大偉', time: '2分鐘前', icon: '🛒', amount: '+NT$ 200' },
    { action: '完成打掃任務', user: '林美華', time: '15分鐘前', icon: '🧹', amount: '+NT$ 800' },
    { action: '完成接送任務', user: '王志明', time: '30分鐘前', icon: '🚗', amount: '+NT$ 1,200' },
    { action: '新用戶註冊', user: '張小姐', time: '1小時前', icon: '🎉', amount: '' },
    { action: '獲得五星評價', user: '李小強', time: '2小時前', icon: '⭐', amount: '' },
  ];

  return (
    <section id="stats" className={`py-24 relative overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl ${darkMode ? 'bg-indigo-500/5' : 'bg-indigo-50/50'}`} />
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl ${darkMode ? 'bg-purple-500/5' : 'bg-purple-50/50'}`} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 ${darkMode ? 'bg-indigo-500/10' : 'bg-indigo-50'}`}>
            <span className="text-sm">📊</span>
            <span className={`text-sm font-semibold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>平台數據</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            值得信賴的數據
          </h2>
          <p className={`text-lg max-w-xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            透明公開的數據，讓您放心使用我們的服務
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`relative rounded-3xl p-6 overflow-hidden group hover:scale-105 transition-all duration-500 ${
                darkMode
                  ? `bg-gradient-to-br ${stat.bgGradient} bg-opacity-10 border border-gray-800`
                  : `bg-gradient-to-br ${stat.bgGradient} border border-gray-100`
              }`}
            >
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full -mr-6 -mt-6 group-hover:scale-150 transition-transform duration-500`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{stat.icon}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    stat.changePositive
                      ? darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                      : darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className={`text-3xl md:text-4xl font-black mb-1 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}{stat.suffix}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Runners */}
          <div className={`rounded-3xl p-6 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center justify-between mb-5">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                🏆 本月最佳幫手
              </h3>
              <button className={`text-sm font-medium ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}>
                查看全部
              </button>
            </div>
            <div className="space-y-3">
              {topRunners.map((runner, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 p-3 rounded-2xl transition-colors ${
                    darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    i === 0 ? 'bg-yellow-100 text-yellow-700' :
                    i === 1 ? 'bg-gray-100 text-gray-700' :
                    i === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-indigo-100 text-indigo-700'
                  }`}>
                    {i + 1}
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    {runner.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{runner.name}</p>
                      <span className="text-sm">{runner.badge}</span>
                    </div>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      完成 {runner.tasks} 次任務
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-sm">⭐</span>
                      <span className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{runner.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`rounded-3xl p-6 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center justify-between mb-5">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                📡 即時動態
              </h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>即時更新</span>
              </div>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-2xl transition-colors ${
                    darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {activity.user} {activity.action}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{activity.time}</p>
                  </div>
                  {activity.amount && (
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                    }`}>
                      {activity.amount}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

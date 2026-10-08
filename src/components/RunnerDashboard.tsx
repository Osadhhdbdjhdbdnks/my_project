import { useState } from 'react';

interface RunnerDashboardProps {
  onClose: () => void;
  darkMode?: boolean;
}

export default function RunnerDashboard({ onClose, darkMode = false }: RunnerDashboardProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState<'tasks' | 'map' | 'earnings' | 'profile'>('tasks');

  const nearbyTasks = [
    {
      id: 1,
      title: '幫我去全聯買東西',
      distance: '0.8 km',
      reward: 200,
      time: '約 30 分鐘',
      category: 'shopping',
      urgency: 'normal'
    },
    {
      id: 2,
      title: '送文件到內湖科技園區',
      distance: '1.2 km',
      reward: 350,
      time: '約 45 分鐘',
      category: 'delivery',
      urgency: 'urgent'
    },
    {
      id: 3,
      title: '幫忙排隊買演唱會門票',
      distance: '2.5 km',
      reward: 800,
      time: '約 3 小時',
      category: 'other',
      urgency: 'normal'
    },
    {
      id: 4,
      title: '機場接送 - 桃園機場',
      distance: '35 km',
      reward: 1500,
      time: '約 2 小時',
      category: 'driving',
      urgency: 'normal'
    },
  ];

  const earningsData = {
    today: 1250,
    thisWeek: 8750,
    thisMonth: 32500,
    totalTasks: 234,
    rating: 4.9,
    completionRate: 98
  };

  const tabs = [
    { key: 'tasks', label: '任務大廳', icon: '📋' },
    { key: 'map', label: '地圖看單', icon: '🗺️' },
    { key: 'earnings', label: '收益報表', icon: '💰' },
    { key: 'profile', label: '個人檔案', icon: '👤' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm">
                🏃
              </div>
              <div>
                <h2 className="text-xl font-bold">跑腿員工作台</h2>
                <p className="text-white/80 text-sm">陳大偉 • 評分 4.9 ⭐</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Online Status Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-sm">{isOnline ? '上線中' : '已下線'}</span>
                <button
                  onClick={() => setIsOnline(!isOnline)}
                  className={`w-14 h-7 rounded-full transition-colors relative ${
                    isOnline ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform absolute top-0.5 ${
                    isOnline ? 'translate-x-7' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex border-b ${darkMode ? 'border-gray-800 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-4 text-sm font-semibold transition-all relative ${
                activeTab === tab.key
                  ? darkMode ? 'text-blue-400 bg-gray-900' : 'text-blue-600 bg-white'
                  : darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
          {activeTab === 'tasks' && (
            <div>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
                  <div className="text-2xl font-bold text-blue-600">{earningsData.today}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>今日收益</div>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-green-50'}`}>
                  <div className="text-2xl font-bold text-green-600">{earningsData.thisWeek}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>本週收益</div>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-purple-50'}`}>
                  <div className="text-2xl font-bold text-purple-600">{earningsData.totalTasks}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>完成任務</div>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-orange-50'}`}>
                  <div className="text-2xl font-bold text-orange-600">{earningsData.rating}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>評分</div>
                </div>
              </div>

              {/* Filter */}
              <div className="flex gap-2 mb-4">
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`}>
                  全部
                </button>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  代購
                </button>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  配送
                </button>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  3km 內
                </button>
              </div>

              {/* Task List */}
              <div className="space-y-3">
                {nearbyTasks.map(task => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl border transition-all hover:shadow-md ${
                      darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{task.title}</h3>
                          {task.urgency === 'urgent' && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-medium">
                              急件
                            </span>
                          )}
                        </div>
                        <div className={`flex items-center gap-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            {task.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {task.time}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">NT$ {task.reward}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        立即接單
                      </button>
                      <button className={`px-4 py-2 rounded-lg font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                        查看詳情
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'map' && (
            <div>
              <div className={`rounded-xl overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} style={{ height: '500px' }}>
                <div className={`w-full h-full flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div className="text-center">
                    <div className="text-6xl mb-4">🗺️</div>
                    <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>地圖模式</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>顯示附近任務分布</p>
                    <div className="mt-4 flex gap-2 justify-center">
                      <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">📍 4 個任務</div>
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">✓ 已接 2 單</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-700' : 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200'}`}>
                  <div className="text-sm text-blue-600 mb-2">今日收益</div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">NT$ {earningsData.today}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>完成 5 個任務</div>
                </div>
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-700' : 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200'}`}>
                  <div className="text-sm text-green-600 mb-2">本週收益</div>
                  <div className="text-3xl font-bold text-green-600 mb-1">NT$ {earningsData.thisWeek.toLocaleString()}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>完成 32 個任務</div>
                </div>
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-700' : 'bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200'}`}>
                  <div className="text-sm text-purple-600 mb-2">本月收益</div>
                  <div className="text-3xl font-bold text-purple-600 mb-1">NT$ {earningsData.thisMonth.toLocaleString()}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>完成 156 個任務</div>
                </div>
              </div>

              {/* Performance Stats */}
              <div className={`p-6 rounded-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>績效數據</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>接單率</div>
                    <div className="text-2xl font-bold text-green-600">{earningsData.completionRate}%</div>
                  </div>
                  <div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>好評率</div>
                    <div className="text-2xl font-bold text-blue-600">99%</div>
                  </div>
                  <div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>平均評分</div>
                    <div className="text-2xl font-bold text-purple-600">{earningsData.rating}</div>
                  </div>
                  <div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>總任務數</div>
                    <div className="text-2xl font-bold text-orange-600">{earningsData.totalTasks}</div>
                  </div>
                </div>
              </div>

              {/* Withdraw Button */}
              <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                💰 一鍵提現
              </button>
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <div className={`p-6 rounded-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-4xl">
                    🧑
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>陳大偉</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ID: RUN-20240001</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">✓ 已認證</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">⭐ 4.9 分</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certification Status */}
              <div className={`p-6 rounded-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>認證狀態</h3>
                <div className="space-y-3">
                  {[
                    { label: '實名認證', status: 'completed', icon: '✓' },
                    { label: '身分證上傳', status: 'completed', icon: '✓' },
                    { label: '駕照上傳', status: 'completed', icon: '✓' },
                    { label: '無犯罪記錄', status: 'completed', icon: '✓' },
                    { label: '健康證（食品代買）', status: 'pending', icon: '⏳' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.label}</span>
                      <span className={`text-sm ${item.status === 'completed' ? 'text-green-600' : 'text-orange-600'}`}>
                        {item.icon} {item.status === 'completed' ? '已完成' : '審核中'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment Request */}
              <button className={`w-full py-3 rounded-xl font-semibold ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}>
                🎒 申請裝備（保溫箱、制服）
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';

interface AdminDashboardProps {
  onClose: () => void;
  darkMode?: boolean;
}

export default function AdminDashboard({ onClose, darkMode = false }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'users' | 'finance'>('overview');
  const [stats, setStats] = useState({
    totalOrders: 0,
    activeOrders: 0,
    totalUsers: 0,
    totalRunners: 0,
    todayRevenue: 0,
    monthRevenue: 0,
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setStats({
        totalOrders: 52847,
        activeOrders: 234,
        totalUsers: 10234,
        totalRunners: 3421,
        todayRevenue: 125680,
        monthRevenue: 3256800,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const recentOrders = [
    { id: 'ORD-001', user: '王小明', runner: '陳大偉', amount: 200, status: 'completed', time: '2分鐘前' },
    { id: 'ORD-002', user: '李小姐', runner: '林美華', amount: 800, status: 'in_progress', time: '15分鐘前' },
    { id: 'ORD-003', user: '張先生', runner: '王志明', amount: 1200, status: 'completed', time: '30分鐘前' },
    { id: 'ORD-004', user: '陳小妹', runner: '李小強', amount: 500, status: 'pending', time: '1小時前' },
    { id: 'ORD-005', user: '林大哥', runner: '陳大偉', amount: 1500, status: 'completed', time: '2小時前' },
  ];

  const topRunners = [
    { name: '陳大偉', tasks: 234, rating: 4.9, earnings: 45600 },
    { name: '林美華', tasks: 156, rating: 4.8, earnings: 38900 },
    { name: '王志明', tasks: 412, rating: 4.95, earnings: 68500 },
    { name: '李小強', tasks: 89, rating: 4.7, earnings: 22300 },
  ];

  const tabs = [
    { key: 'overview', label: '數據總覽', icon: '📊' },
    { key: 'orders', label: '訂單管理', icon: '📋' },
    { key: 'users', label: '用戶管理', icon: '👥' },
    { key: 'finance', label: '財務管理', icon: '💰' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-7xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm">
                🏢
              </div>
              <div>
                <h2 className="text-xl font-bold">平台管理後台</h2>
                <p className="text-white/80 text-sm">管理員：Admin • 最後登入：2024-01-15 14:30</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              ✕
            </button>
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
          {activeTab === 'overview' && (
            <div>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-700' : 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200'}`}>
                  <div className="text-sm text-blue-600 mb-2">總訂單數</div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stats.totalOrders.toLocaleString()}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>+12% vs 上週</div>
                </div>
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-700' : 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200'}`}>
                  <div className="text-sm text-green-600 mb-2">進行中訂單</div>
                  <div className="text-3xl font-bold text-green-600 mb-1">{stats.activeOrders}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>即時更新</div>
                </div>
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-700' : 'bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200'}`}>
                  <div className="text-sm text-purple-600 mb-2">總用戶數</div>
                  <div className="text-3xl font-bold text-purple-600 mb-1">{stats.totalUsers.toLocaleString()}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>+8% vs 上週</div>
                </div>
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-orange-900/30 to-orange-800/30 border border-orange-700' : 'bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200'}`}>
                  <div className="text-sm text-orange-600 mb-2">認證跑者</div>
                  <div className="text-3xl font-bold text-orange-600 mb-1">{stats.totalRunners.toLocaleString()}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>+15% vs 上週</div>
                </div>
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-pink-900/30 to-pink-800/30 border border-pink-700' : 'bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200'}`}>
                  <div className="text-sm text-pink-600 mb-2">今日營收</div>
                  <div className="text-3xl font-bold text-pink-600 mb-1">NT$ {stats.todayRevenue.toLocaleString()}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>+23% vs 昨日</div>
                </div>
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-indigo-900/30 to-indigo-800/30 border border-indigo-700' : 'bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200'}`}>
                  <div className="text-sm text-indigo-600 mb-2">本月營收</div>
                  <div className="text-3xl font-bold text-indigo-600 mb-1">NT$ {stats.monthRevenue.toLocaleString()}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>+18% vs 上月</div>
                </div>
              </div>

              {/* Heatmap Placeholder */}
              <div className={`p-6 rounded-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>區域熱力圖</h3>
                <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`} style={{ height: '300px' }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🗺️</div>
                      <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>供需分佈熱力圖</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>顯示各區域訂單密度</p>
                      <div className="mt-4 flex gap-2 justify-center">
                        <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">🔴 高需求</div>
                        <div className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">🟡 中需求</div>
                        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">🟢 低需求</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Runners */}
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>本月最佳跑者</h3>
                <div className="space-y-3">
                  {topRunners.map((runner, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          i === 0 ? 'bg-yellow-100 text-yellow-700' :
                          i === 1 ? 'bg-gray-100 text-gray-700' :
                          i === 2 ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {i + 1}
                        </div>
                        <div>
                          <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{runner.name}</div>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>完成 {runner.tasks} 單 • ⭐ {runner.rating}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">NT$ {runner.earnings.toLocaleString()}</div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>本月收益</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <div className="flex gap-2 mb-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                  全部
                </button>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  待處理
                </button>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  進行中
                </button>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  已完成
                </button>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  異常
                </button>
              </div>

              <div className="space-y-3">
                {recentOrders.map(order => (
                  <div
                    key={order.id}
                    className={`p-4 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-mono ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{order.id}</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            order.status === 'completed' ? 'bg-green-100 text-green-700' :
                            order.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status === 'completed' ? '已完成' : order.status === 'in_progress' ? '進行中' : '待處理'}
                          </span>
                        </div>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          發單者：{order.user} • 跑腿員：{order.runner}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{order.time}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">NT$ {order.amount}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className={`flex-1 py-2 rounded-lg text-sm font-medium ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}>
                        查看詳情
                      </button>
                      <button className={`flex-1 py-2 rounded-lg text-sm font-medium ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}>
                        介入處理
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
                  <div className="text-2xl font-bold text-blue-600">{stats.totalUsers.toLocaleString()}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>總用戶</div>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-green-50'}`}>
                  <div className="text-2xl font-bold text-green-600">9,856</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>活躍用戶</div>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-purple-50'}`}>
                  <div className="text-2xl font-bold text-purple-600">{stats.totalRunners.toLocaleString()}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>認證跑者</div>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-orange-50'}`}>
                  <div className="text-2xl font-bold text-orange-600">23</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>待審核</div>
                </div>
              </div>

              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>用戶管理</h3>
                <div className="space-y-3">
                  {[
                    { name: '王小明', email: 'wang@example.com', role: '用戶', status: 'active', credit: 95 },
                    { name: '陳大偉', email: 'chen@example.com', role: '跑者', status: 'active', credit: 98 },
                    { name: '李小姐', email: 'li@example.com', role: '用戶', status: 'active', credit: 88 },
                    { name: '張先生', email: 'zhang@example.com', role: '跑者', status: 'suspended', credit: 45 },
                  ].map((user, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name[0]}
                        </div>
                        <div>
                          <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</div>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>信用分數</div>
                          <div className={`text-sm font-bold ${user.credit >= 80 ? 'text-green-600' : user.credit >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {user.credit}
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          user.role === '跑者' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {user.role}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {user.status === 'active' ? '正常' : '停用'}
                        </span>
                        <button className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>管理</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'finance' && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-700' : 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200'}`}>
                  <div className="text-sm text-green-600 mb-2">平台抽成</div>
                  <div className="text-3xl font-bold text-green-600 mb-1">NT$ 651,360</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>本月（15%）</div>
                </div>
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-700' : 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200'}`}>
                  <div className="text-sm text-blue-600 mb-2">跑者收入</div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">NT$ 3,690,880</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>本月（85%）</div>
                </div>
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-700' : 'bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200'}`}>
                  <div className="text-sm text-purple-600 mb-2">待結算</div>
                  <div className="text-3xl font-bold text-purple-600 mb-1">NT$ 125,680</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>今日</div>
                </div>
              </div>

              <div className={`p-6 rounded-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>抽成比例設定</h3>
                <div className="space-y-3">
                  {[
                    { category: '代購跑腿', rate: 15, color: 'blue' },
                    { category: '居家清潔', rate: 12, color: 'green' },
                    { category: '開車接送', rate: 18, color: 'purple' },
                    { category: '搬運送達', rate: 15, color: 'orange' },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.category}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="5"
                            max="30"
                            defaultValue={item.rate}
                            className="w-32"
                          />
                          <span className="text-sm font-bold text-blue-600 w-12">{item.rate}%</span>
                        </div>
                        <button className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>調整</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                💰 執行結算
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

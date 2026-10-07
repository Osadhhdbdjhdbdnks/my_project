import { useState } from 'react';

interface TaskDetailProps {
  task: any;
  onClose: () => void;
}

export default function TaskDetail({ task, onClose }: TaskDetailProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'tracking' | 'chat'>('info');

  // 根據分類產生不同的詳情內容
  const renderContent = () => {
    switch (task.category) {
      case 'shopping':
        return <ShoppingDetail task={task} activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'cleaning':
        return <CleaningDetail task={task} />;
      case 'driving':
        return <DrivingDetail task={task} activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'delivery':
        return <DeliveryDetail task={task} activeTab={activeTab} setActiveTab={setActiveTab} />;
      default:
        return <DefaultDetail task={task} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm">
              {task.avatar}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{task.title}</h2>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <span>👤 {task.postedBy}</span>
                <span>•</span>
                <span>🕐 {task.postedTime}</span>
                <span>•</span>
                <span>📍 {task.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-white/70 mb-1">報酬</div>
              <div className="text-3xl font-black">NT$ {task.reward}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {renderContent()}
        </div>

        {/* Footer Actions */}
        {task.status === 'open' && (
          <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold"
            >
              稍後再看
            </button>
            <button className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all flex items-center justify-center gap-2">
              <span>🤝</span>
              <span>接受任務</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ 代購跑腿詳情 ============
function ShoppingDetail({ task, activeTab, setActiveTab }: any) {
  const runner = {
    name: '陳大偉',
    avatar: '🧑',
    rating: 4.9,
    completedTasks: 234,
    vehicle: '🛵 機車',
    distance: '1.2 公里',
    eta: '約 8 分鐘',
    phone: '0912-XXX-XXX',
  };

  const shoppingList = [
    { item: '鮮奶（全脂）', qty: '2 瓶', checked: true },
    { item: '土司（厚片）', qty: '1 袋', checked: true },
    { item: '雞蛋（洗選）', qty: '1 盒 (10入)', checked: false },
    { item: '洗髮精', qty: '1 瓶', checked: false, note: '偏好草本配方' },
    { item: '衛生紙', qty: '1 包', checked: false },
  ];

  const checkpoints = [
    { time: '14:20', event: '接受任務', icon: '✅', done: true },
    { time: '14:25', event: '出發前往全聯', icon: '🛵', done: true },
    { time: '14:33', event: '已到達全聯信義店', icon: '📍', done: true },
    { time: '14:35', event: '開始採購物品', icon: '🛒', done: true, current: true },
    { time: '--:--', event: '前往送貨地點', icon: '🚀', done: false },
    { time: '--:--', event: '送達完成', icon: '🎉', done: false },
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-gray-50/50">
        {[
          { key: 'info', label: '任務詳情', icon: '📋' },
          { key: 'tracking', label: '即時追蹤', icon: '🗺️' },
          { key: 'chat', label: '聯繫幫手', icon: '💬' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-4 text-sm font-semibold transition-all relative ${
              activeTab === tab.key
                ? 'text-indigo-600 bg-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="mr-1.5">{tab.icon}</span>
            {tab.label}
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600" />
            )}
          </button>
        ))}
      </div>

      {activeTab === 'info' && (
        <div className="p-6 space-y-6">
          {/* Runner Info Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-md">
                {runner.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 text-lg">{runner.name}</h3>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                    進行中
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold">{runner.rating}</span>
                  </span>
                  <span>•</span>
                  <span>完成 {runner.completedTasks} 次</span>
                  <span>•</span>
                  <span>{runner.vehicle}</span>
                </div>
              </div>
              <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm hover:shadow-md transition-shadow">
                📞
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-white rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">距離</div>
                <div className="font-bold text-indigo-600">{runner.distance}</div>
              </div>
              <div className="bg-white rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">預計到達</div>
                <div className="font-bold text-indigo-600">{runner.eta}</div>
              </div>
              <div className="bg-white rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">狀態</div>
                <div className="font-bold text-green-600">採購中</div>
              </div>
            </div>
          </div>

          {/* Shopping List */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span>🛒</span> 採購清單
            </h3>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {shoppingList.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-4 ${i !== shoppingList.length - 1 ? 'border-b border-gray-50' : ''}`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    item.checked ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}>
                    {item.checked && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${item.checked ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                      {item.item}
                    </p>
                    {item.note && (
                      <p className="text-xs text-amber-600 mt-0.5">💡 {item.note}</p>
                    )}
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg">
                    {item.qty}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Timeline */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span>📍</span> 進度追蹤
            </h3>
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              {checkpoints.map((cp, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== checkpoints.length - 1 && (
                    <div className={`absolute left-[15px] top-8 w-0.5 h-[calc(100%-8px)] ${
                      cp.done ? 'bg-green-300' : 'bg-gray-200'
                    }`} />
                  )}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 relative z-10 ${
                    cp.current
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30 animate-pulse'
                      : cp.done
                      ? 'bg-green-100'
                      : 'bg-gray-100'
                  }`}>
                    {cp.icon}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center justify-between">
                      <p className={`font-medium text-sm ${cp.current ? 'text-indigo-600' : cp.done ? 'text-gray-700' : 'text-gray-400'}`}>
                        {cp.event}
                      </p>
                      <span className="text-xs text-gray-400">{cp.time}</span>
                    </div>
                    {cp.current && (
                      <p className="text-xs text-indigo-500 mt-1">🔄 目前正在進行中...</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tracking' && (
        <div className="p-6">
          {/* Map Area */}
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl overflow-hidden border border-indigo-100" style={{ height: '400px' }}>
            {/* Simulated Map Background */}
            <div className="absolute inset-0 opacity-40">
              {/* Grid lines */}
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Simulated Roads */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Main roads */}
              <path d="M 0 200 Q 150 180 300 200 T 600 180" stroke="#cbd5e1" strokeWidth="20" fill="none" strokeLinecap="round" />
              <path d="M 200 0 Q 220 150 200 300 T 220 400" stroke="#cbd5e1" strokeWidth="16" fill="none" strokeLinecap="round" />
              <path d="M 400 0 Q 380 200 400 400" stroke="#cbd5e1" strokeWidth="14" fill="none" strokeLinecap="round" />
              <path d="M 0 100 L 600 120" stroke="#cbd5e1" strokeWidth="12" fill="none" strokeLinecap="round" />
              <path d="M 0 300 L 600 280" stroke="#cbd5e1" strokeWidth="12" fill="none" strokeLinecap="round" />

              {/* Route line */}
              <path
                d="M 120 320 Q 200 280 280 240 Q 350 200 420 160"
                stroke="#6366f1"
                strokeWidth="4"
                fill="none"
                strokeDasharray="8 4"
                strokeLinecap="round"
              >
                <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
              </path>
            </svg>

            {/* Buildings/Blocks */}
            <div className="absolute top-12 left-16 w-20 h-14 bg-gray-200/60 rounded-lg" />
            <div className="absolute top-20 right-24 w-16 h-20 bg-gray-200/60 rounded-lg" />
            <div className="absolute bottom-24 left-32 w-24 h-12 bg-gray-200/60 rounded-lg" />
            <div className="absolute top-1/2 right-16 w-14 h-14 bg-gray-200/60 rounded-lg" />

            {/* Destination Marker (Supermarket) */}
            <div className="absolute top-[38%] right-[28%] transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-2xl border-2 border-green-500">
                  🏪
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full shadow-md text-xs font-semibold text-green-700 whitespace-nowrap">
                  全聯信義店
                </div>
              </div>
            </div>

            {/* Home/Delivery Marker */}
            <div className="absolute bottom-[18%] left-[18%] transform -translate-x-1/2 translate-y-1/2">
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-2xl border-2 border-indigo-500">
                  🏠
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full shadow-md text-xs font-semibold text-indigo-700 whitespace-nowrap">
                  你的家
                </div>
              </div>
            </div>

            {/* Runner Position (Animated) */}
            <div className="absolute top-[55%] left-[45%] transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                {/* Pulse ring */}
                <div className="absolute inset-0 w-16 h-16 -m-2 bg-indigo-400/30 rounded-full animate-ping" />
                <div className="absolute inset-0 w-16 h-16 -m-2 bg-indigo-400/20 rounded-full animate-pulse" />
                {/* Runner marker */}
                <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-xl flex items-center justify-center text-2xl border-3 border-white">
                  🛵
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full shadow-lg text-xs font-bold whitespace-nowrap">
                  陳大偉
                </div>
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button className="w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <button className="w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center text-indigo-600 hover:bg-indigo-50">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full" />
                  <span className="text-gray-600">跑腿員</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-gray-600">目的地</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-0.5 bg-indigo-500" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #6366f1 0, #6366f1 4px, transparent 4px, transparent 8px)' }} />
                  <span className="text-gray-600">路線</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 text-white">
              <div className="text-xs opacity-80 mb-1">目前位置</div>
              <div className="font-bold text-sm">全聯信義店</div>
              <div className="text-xs opacity-80 mt-1">正在採購中</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 text-white">
              <div className="text-xs opacity-80 mb-1">預計送達</div>
              <div className="font-bold text-sm">14:55</div>
              <div className="text-xs opacity-80 mt-1">約 20 分鐘後</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-4 text-white">
              <div className="text-xs opacity-80 mb-1">已採購</div>
              <div className="font-bold text-sm">2 / 5 項</div>
              <div className="text-xs opacity-80 mt-1">牛奶、土司 ✓</div>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-4 text-white">
              <div className="text-xs opacity-80 mb-1">距離</div>
              <div className="font-bold text-sm">1.2 公里</div>
              <div className="text-xs opacity-80 mt-1">騎車約 8 分鐘</div>
            </div>
          </div>

          {/* Runner Contact */}
          <div className="mt-5 bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-2xl">
                  🧑
                </div>
                <div>
                  <p className="font-bold text-gray-900">陳大偉</p>
                  <p className="text-xs text-gray-500">⭐ 4.9 • 234 次任務</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 hover:bg-green-100 transition-colors">
                  📞
                </button>
                <button className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-100 transition-colors">
                  💬
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="p-6">
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <div className="text-5xl mb-3">💬</div>
            <h3 className="font-bold text-gray-800 mb-2">即時通訊</h3>
            <p className="text-sm text-gray-500 mb-4">與跑腿員即時溝通任務細節</p>
            <div className="space-y-3 text-left max-w-md mx-auto">
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-sm">🧑</div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2 shadow-sm">
                  <p className="text-sm text-gray-700">您好！我已經到全聯了，開始幫您採購</p>
                  <p className="text-xs text-gray-400 mt-1">14:33</p>
                </div>
              </div>
              <div className="flex gap-2 flex-row-reverse">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm">😊</div>
                <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 shadow-sm">
                  <p className="text-sm">好的，謝謝！洗髮精要草本的喔</p>
                  <p className="text-xs text-indigo-200 mt-1">14:34</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-sm">🧑</div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2 shadow-sm">
                  <p className="text-sm text-gray-700">沒問題！已經找到草本配方的了 👍</p>
                  <p className="text-xs text-gray-400 mt-1">14:36</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 max-w-md mx-auto">
              <input
                type="text"
                placeholder="輸入訊息..."
                className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 focus:border-indigo-500 outline-none text-sm"
              />
              <button className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-700 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============ 居家清潔詳情 ============
function CleaningDetail({ task }: any) {
  const cleaner = {
    name: '林美華',
    avatar: '👩',
    rating: 4.8,
    completedTasks: 156,
    experience: '5 年經驗',
    specialties: ['深度清潔', '廚房去油', '浴室除黴'],
  };

  const areas = [
    { area: '客廳', size: '15 坪', status: '待清潔', icon: '🛋️' },
    { area: '廚房', size: '4 坪', status: '待清潔', icon: '🍳', priority: '重點' },
    { area: '主臥', size: '8 坪', status: '待清潔', icon: '🛏️' },
    { area: '浴室 x2', size: '3 坪', status: '待清潔', icon: '🚿', priority: '重點' },
    { area: '陽台', size: '2 坪', status: '待清潔', icon: '🌿' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Cleaner Profile */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-100">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-md">
            {cleaner.avatar}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg">{cleaner.name}</h3>
            <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
              <span className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="font-semibold">{cleaner.rating}</span>
              </span>
              <span>•</span>
              <span>{cleaner.experience}</span>
              <span>•</span>
              <span>完成 {cleaner.completedTasks} 次</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {cleaner.specialties.map((s, i) => (
            <span key={i} className="text-xs bg-white text-blue-700 px-3 py-1.5 rounded-full font-medium border border-blue-100">
              ✨ {s}
            </span>
          ))}
        </div>
      </div>

      {/* Cleaning Areas */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span>🏠</span> 清潔區域
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {areas.map((a, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">
                {a.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-800">{a.area}</p>
                  {a.priority && (
                    <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">
                      {a.priority}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{a.size} • {a.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span>📅</span> 預約時間
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">日期</div>
            <div className="font-bold text-gray-800 text-sm">今天</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">時間</div>
            <div className="font-bold text-gray-800 text-sm">14:00</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">預估時長</div>
            <div className="font-bold text-gray-800 text-sm">3 小時</div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span>📝</span> 備註事項
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>請自備清潔用品（已有提供基本工具）</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>家中有寵物（貓），請注意關好門窗</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>廚房油漬較重，請加強處理</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// ============ 開車接送詳情 ============
function DrivingDetail({ task, activeTab, setActiveTab }: any) {
  const driver = {
    name: '王志明',
    avatar: '👨‍💼',
    rating: 4.95,
    completedTasks: 412,
    car: 'Toyota Camry 白色',
    plate: 'ABC-1234',
    experience: '8 年駕齡',
  };

  const route = [
    { time: '15:00', location: '從你家出發', icon: '🏠', done: true },
    { time: '15:45', location: '抵達桃園機場第二航廈', icon: '✈️', done: true },
    { time: '15:45-16:30', location: '等待乘客（含等待費）', icon: '⏳', done: true, current: true },
    { time: '16:30', location: '接到乘客，出發回市區', icon: '🚗', done: false },
    { time: '17:15', location: '送達目的地', icon: '📍', done: false },
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-gray-50/50">
        {[
          { key: 'info', label: '司機資訊', icon: '👤' },
          { key: 'tracking', label: '行車追蹤', icon: '🗺️' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-4 text-sm font-semibold transition-all relative ${
              activeTab === tab.key ? 'text-indigo-600 bg-white' : 'text-gray-500'
            }`}
          >
            <span className="mr-1.5">{tab.icon}</span>
            {tab.label}
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600" />
            )}
          </button>
        ))}
      </div>

      {activeTab === 'info' && (
        <div className="p-6 space-y-6">
          {/* Driver Card */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 border border-orange-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-md">
                {driver.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">{driver.name}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold">{driver.rating}</span>
                  </span>
                  <span>•</span>
                  <span>{driver.experience}</span>
                  <span>•</span>
                  <span>{driver.completedTasks} 次</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-500">車輛資訊</p>
                  <p className="font-bold text-gray-800">{driver.car}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">車牌號碼</p>
                  <p className="font-bold text-gray-800 font-mono">{driver.plate}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-100 transition-colors">
                  📞 撥打電話
                </button>
                <button className="flex-1 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-colors">
                  💬 傳訊息
                </button>
              </div>
            </div>
          </div>

          {/* Route Timeline */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span>🛣️</span> 行程規劃
            </h3>
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              {route.map((r, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== route.length - 1 && (
                    <div className={`absolute left-[15px] top-8 w-0.5 h-[calc(100%-8px)] ${
                      r.done ? 'bg-green-300' : 'bg-gray-200'
                    }`} />
                  )}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 relative z-10 ${
                    r.current
                      ? 'bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30 animate-pulse'
                      : r.done
                      ? 'bg-green-100'
                      : 'bg-gray-100'
                  }`}>
                    {r.icon}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center justify-between">
                      <p className={`font-medium text-sm ${r.current ? 'text-orange-600' : r.done ? 'text-gray-700' : 'text-gray-400'}`}>
                        {r.location}
                      </p>
                      <span className="text-xs text-gray-400">{r.time}</span>
                    </div>
                    {r.current && (
                      <p className="text-xs text-orange-500 mt-1">⏳ 司機正在等待乘客...</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fare Breakdown */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span>💰</span> 費用明細
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">基本車資</span>
                <span className="font-semibold text-gray-800">NT$ 600</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">等待費 (45分鐘)</span>
                <span className="font-semibold text-gray-800">NT$ 450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">高速公路費</span>
                <span className="font-semibold text-gray-800">NT$ 150</span>
              </div>
              <div className="border-t border-green-200 pt-2 mt-2 flex justify-between">
                <span className="font-bold text-gray-900">總計</span>
                <span className="font-bold text-green-600 text-lg">NT$ 1,200</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tracking' && (
        <div className="p-6">
          {/* Map */}
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl overflow-hidden border border-indigo-100" style={{ height: '380px' }}>
            <div className="absolute inset-0 opacity-40">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid2)" />
              </svg>
            </div>

            {/* Highway */}
            <svg className="absolute inset-0 w-full h-full">
              <path d="M 0 200 Q 200 180 400 200 T 800 180" stroke="#cbd5e1" strokeWidth="24" fill="none" />
              <path d="M 100 0 Q 120 200 100 400" stroke="#cbd5e1" strokeWidth="16" fill="none" />
              <path d="M 500 0 Q 480 200 500 400" stroke="#cbd5e1" strokeWidth="16" fill="none" />
              {/* Route */}
              <path
                d="M 100 320 Q 200 280 300 220 Q 400 180 500 140"
                stroke="#f97316"
                strokeWidth="4"
                fill="none"
                strokeDasharray="8 4"
                strokeLinecap="round"
              >
                <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
              </path>
            </svg>

            {/* Airport */}
            <div className="absolute top-[32%] right-[25%]">
              <div className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-2xl border-2 border-orange-500">
                ✈️
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full shadow-md text-xs font-semibold text-orange-700 whitespace-nowrap">
                桃園機場 T2
              </div>
            </div>

            {/* Home */}
            <div className="absolute bottom-[20%] left-[15%]">
              <div className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-2xl border-2 border-indigo-500">
                🏠
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full shadow-md text-xs font-semibold text-indigo-700 whitespace-nowrap">
                出發地
              </div>
            </div>

            {/* Car */}
            <div className="absolute top-[48%] left-[42%]">
              <div className="relative">
                <div className="absolute inset-0 w-16 h-16 -m-2 bg-orange-400/30 rounded-full animate-ping" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full shadow-xl flex items-center justify-center text-2xl border-3 border-white">
                  🚗
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-3 py-1 rounded-full shadow-lg text-xs font-bold whitespace-nowrap">
                  王志明
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-4 text-white text-center">
              <div className="text-xs opacity-80 mb-1">目前狀態</div>
              <div className="font-bold">等待乘客</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 text-white text-center">
              <div className="text-xs opacity-80 mb-1">已等待</div>
              <div className="font-bold">25 分鐘</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 text-white text-center">
              <div className="text-xs opacity-80 mb-1">車速</div>
              <div className="font-bold">0 km/h</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============ 搬運送達詳情 ============
function DeliveryDetail({ task, activeTab, setActiveTab }: any) {
  const delivery = {
    name: '李小強',
    avatar: '🧑‍💼',
    rating: 4.7,
    completedTasks: 89,
    vehicle: '🛵 機車',
  };

  const tracking = [
    { time: '10:05', event: '收件完成', location: '松山區敦化北路', icon: '📦', done: true },
    { time: '10:12', event: '取件出發', location: '松山區', icon: '🛵', done: true },
    { time: '10:25', event: '運輸中', location: '往內湖方向', icon: '🚚', done: true, current: true },
    { time: '預計 10:40', event: '送達目的地', location: '內湖科技園區', icon: '📍', done: false },
  ];

  return (
    <div>
      <div className="flex border-b border-gray-100 bg-gray-50/50">
        {[
          { key: 'info', label: '配送詳情', icon: '📦' },
          { key: 'tracking', label: '物流追蹤', icon: '🗺️' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-4 text-sm font-semibold transition-all relative ${
              activeTab === tab.key ? 'text-indigo-600 bg-white' : 'text-gray-500'
            }`}
          >
            <span className="mr-1.5">{tab.icon}</span>
            {tab.label}
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600" />
            )}
          </button>
        ))}
      </div>

      {activeTab === 'info' && (
        <div className="p-6 space-y-6">
          {/* Courier */}
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-5 border border-violet-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-md">
                {delivery.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">{delivery.name}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                  <span>⭐ {delivery.rating}</span>
                  <span>•</span>
                  <span>{delivery.vehicle}</span>
                  <span>•</span>
                  <span>{delivery.completedTasks} 次</span>
                </div>
              </div>
            </div>
          </div>

          {/* Package Info */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">📦 包裹資訊</h3>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">訂單編號</span>
                <span className="font-mono font-semibold text-gray-800">#DLV-20260115-0042</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">物品內容</span>
                <span className="font-semibold text-gray-800">急件文件 (A4 信封)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">重量</span>
                <span className="font-semibold text-gray-800">約 0.3 kg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">時限</span>
                <span className="font-semibold text-red-600">⚡ 1 小時內送達</span>
              </div>
            </div>
          </div>

          {/* Route */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">🛣️ 配送路線</h3>
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center gap-4">
                <div className="flex-1 text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-xl mx-auto mb-2">📤</div>
                  <p className="text-xs text-gray-500">取件</p>
                  <p className="font-semibold text-sm text-gray-800">松山區</p>
                </div>
                <div className="flex-1 flex items-center">
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center text-xs text-white">
                      🛵
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-xl mx-auto mb-2">📥</div>
                  <p className="text-xs text-gray-500">送達</p>
                  <p className="font-semibold text-sm text-gray-800">內湖科技園區</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <span className="text-xs bg-violet-50 text-violet-700 px-3 py-1 rounded-full font-medium">
                  距離 5.8 公里 • 預估 15 分鐘
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tracking' && (
        <div className="p-6 space-y-5">
          {/* Map */}
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl overflow-hidden border border-indigo-100" style={{ height: '300px' }}>
            <div className="absolute inset-0 opacity-40">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="grid3" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid3)" />
              </svg>
            </div>
            <svg className="absolute inset-0 w-full h-full">
              <path d="M 0 150 Q 200 130 400 150 T 800 130" stroke="#cbd5e1" strokeWidth="18" fill="none" />
              <path d="M 150 0 Q 170 150 150 300" stroke="#cbd5e1" strokeWidth="14" fill="none" />
              <path d="M 450 0 Q 430 150 450 300" stroke="#cbd5e1" strokeWidth="14" fill="none" />
              <path
                d="M 120 220 Q 250 180 380 140"
                stroke="#8b5cf6"
                strokeWidth="4"
                fill="none"
                strokeDasharray="8 4"
                strokeLinecap="round"
              >
                <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
              </path>
            </svg>

            {/* Pickup */}
            <div className="absolute top-[65%] left-[18%]">
              <div className="w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-lg border-2 border-indigo-500">📤</div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full shadow text-xs font-semibold text-indigo-700 whitespace-nowrap">松山區</div>
            </div>

            {/* Destination */}
            <div className="absolute top-[30%] right-[25%]">
              <div className="w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-lg border-2 border-purple-500">📥</div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full shadow text-xs font-semibold text-purple-700 whitespace-nowrap">內湖科技園區</div>
            </div>

            {/* Courier */}
            <div className="absolute top-[48%] left-[48%]">
              <div className="relative">
                <div className="absolute inset-0 w-14 h-14 -m-1 bg-violet-400/30 rounded-full animate-ping" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full shadow-xl flex items-center justify-center text-xl border-3 border-white">🛵</div>
              </div>
            </div>
          </div>

          {/* Tracking Steps */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            {tracking.map((t, i) => (
              <div key={i} className="flex gap-4 relative">
                {i !== tracking.length - 1 && (
                  <div className={`absolute left-[15px] top-8 w-0.5 h-[calc(100%-8px)] ${t.done ? 'bg-green-300' : 'bg-gray-200'}`} />
                )}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 relative z-10 ${
                  t.current ? 'bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg animate-pulse' : t.done ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  {t.icon}
                </div>
                <div className="flex-1 pb-5">
                  <div className="flex items-center justify-between">
                    <p className={`font-medium text-sm ${t.current ? 'text-violet-600' : t.done ? 'text-gray-700' : 'text-gray-400'}`}>
                      {t.event}
                    </p>
                    <span className="text-xs text-gray-400">{t.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{t.location}</p>
                  {t.current && <p className="text-xs text-violet-500 mt-1">🚚 正在運輸中...</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============ 預設詳情 ============
function DefaultDetail({ task }: any) {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-100">
        <h3 className="font-bold text-gray-900 mb-2">📝 任務描述</h3>
        <p className="text-gray-600 leading-relaxed">{task.description}</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-bold text-gray-900 mb-3">📍 地點資訊</h3>
        <p className="text-gray-600">{task.location}</p>
      </div>
    </div>
  );
}

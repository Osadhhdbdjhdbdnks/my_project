import { useState } from 'react';

interface UserCenterProps {
  onClose: () => void;
  darkMode?: boolean;
}

export default function UserCenter({ onClose, darkMode = false }: UserCenterProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'wallet' | 'address' | 'settings'>('orders');

  const orderHistory = [
    {
      id: 'ORD-20240115-001',
      title: '幫我去全聯買東西',
      status: 'completed',
      date: '2024-01-15 14:30',
      amount: 200,
      runner: '陳大偉'
    },
    {
      id: 'ORD-20240114-002',
      title: '幫忙打掃家裡',
      status: 'completed',
      date: '2024-01-14 10:00',
      amount: 800,
      runner: '林美華'
    },
    {
      id: 'ORD-20240113-003',
      title: '機場接送',
      status: 'completed',
      date: '2024-01-13 15:00',
      amount: 1200,
      runner: '王志明'
    },
    {
      id: 'ORD-20240112-004',
      title: '送文件到公司',
      status: 'in_progress',
      date: '2024-01-12 09:00',
      amount: 350,
      runner: '李小強'
    },
  ];

  const walletData = {
    balance: 2500,
    totalSpent: 15800,
    coupons: 3,
    invoices: 12
  };

  const addresses = [
    {
      id: 1,
      label: '家',
      address: '台北市信義區信義路五段7號',
      isDefault: true
    },
    {
      id: 2,
      label: '公司',
      address: '台北市內湖區瑞光路100號',
      isDefault: false
    },
    {
      id: 3,
      label: '父母家',
      address: '新北市板橋區文化路一段50號',
      isDefault: false
    },
  ];

  const tabs = [
    { key: 'orders', label: '歷史訂單', icon: '📋' },
    { key: 'wallet', label: '我的錢包', icon: '💰' },
    { key: 'address', label: '地址簿', icon: '📍' },
    { key: 'settings', label: '設定', icon: '⚙️' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm">
                👤
              </div>
              <div>
                <h2 className="text-xl font-bold">我的个人中心</h2>
                <p className="text-white/80 text-sm">王小明 • 會員等級：銀牌</p>
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
          {activeTab === 'orders' && (
            <div>
              <div className="flex gap-2 mb-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                  全部
                </button>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  進行中
                </button>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  已完成
                </button>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  已取消
                </button>
              </div>

              <div className="space-y-3">
                {orderHistory.map(order => (
                  <div
                    key={order.id}
                    className={`p-4 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{order.title}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {order.status === 'completed' ? '已完成' : '進行中'}
                          </span>
                        </div>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>訂單編號：{order.id}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>時間：{order.date}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>跑腿員：{order.runner}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">NT$ {order.amount}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className={`flex-1 py-2 rounded-lg text-sm font-medium ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}>
                        查看詳情
                      </button>
                      {order.status === 'completed' && (
                        <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          再次發單
                        </button>
                      )}
                      {order.status === 'in_progress' && (
                        <button className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                          追蹤進度
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wallet' && (
            <div>
              {/* Balance Card */}
              <div className={`p-6 rounded-xl mb-6 ${darkMode ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-700' : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200'}`}>
                <div className="text-sm text-blue-600 mb-2">帳戶餘額</div>
                <div className="text-4xl font-bold text-blue-600 mb-4">NT$ {walletData.balance.toLocaleString()}</div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    儲值
                  </button>
                  <button className={`flex-1 py-2 rounded-lg font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700 border border-gray-300'}`}>
                    提現
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="text-2xl font-bold text-green-600">{walletData.totalSpent.toLocaleString()}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>總消費</div>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="text-2xl font-bold text-purple-600">{walletData.coupons}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>優惠券</div>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="text-2xl font-bold text-orange-600">{walletData.invoices}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>發票</div>
                </div>
              </div>

              {/* Coupons */}
              <div className={`p-6 rounded-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>我的優惠券</h3>
                <div className="space-y-2">
                  {[
                    { discount: 'NT$ 50', condition: '滿 NT$ 500 可用', expiry: '2024-02-15' },
                    { discount: '9折', condition: '不限金額', expiry: '2024-01-31' },
                    { discount: 'NT$ 100', condition: '滿 NT$ 1000 可用', expiry: '2024-03-01' },
                  ].map((coupon, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div>
                        <div className="font-bold text-blue-600">{coupon.discount}</div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{coupon.condition}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>有效期限</div>
                        <div className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{coupon.expiry}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>支付方式</h3>
                <div className="space-y-2">
                  {[
                    { method: '信用卡', detail: '**** **** **** 1234', icon: '💳' },
                    { method: 'LINE Pay', detail: '已綁定', icon: '💚' },
                    { method: 'Apple Pay', detail: '已綁定', icon: '🍎' },
                  ].map((payment, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{payment.icon}</span>
                        <div>
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{payment.method}</div>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{payment.detail}</div>
                        </div>
                      </div>
                      <button className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>管理</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'address' && (
            <div>
              <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold mb-4 hover:bg-blue-700 transition-colors">
                + 新增地址
              </button>

              <div className="space-y-3">
                {addresses.map(addr => (
                  <div
                    key={addr.id}
                    className={`p-4 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{addr.label}</span>
                        {addr.isDefault && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">預設</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>編輯</button>
                        {!addr.isDefault && (
                          <button className={`text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>刪除</button>
                        )}
                      </div>
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{addr.address}</p>
                    {!addr.isDefault && (
                      <button className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        設為預設
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>帳戶設定</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>修改密碼</span>
                    <button className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>修改</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>手機號碼</span>
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>0912-***-XXX</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>電子信箱</span>
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>user@example.com</span>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>通知設定</h3>
                <div className="space-y-3">
                  {[
                    { label: '訂單狀態通知', enabled: true },
                    { label: '優惠活動通知', enabled: true },
                    { label: '系統公告', enabled: false },
                  ].map((setting, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{setting.label}</span>
                      <button className={`w-12 h-6 rounded-full transition-colors relative ${setting.enabled ? 'bg-blue-600' : 'bg-gray-300'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform absolute top-0.5 ${setting.enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>隱私與安全</h3>
                <div className="space-y-3">
                  <button className={`w-full text-left text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    隱私政策
                  </button>
                  <button className={`w-full text-left text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    使用條款
                  </button>
                  <button className="w-full text-left text-sm text-red-600">
                    登出帳戶
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

interface PrivacyCenterProps {
  darkMode?: boolean;
  onClose: () => void;
}

export default function PrivacyCenter({ darkMode = false, onClose }: PrivacyCenterProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'data' | 'location' | 'security'>('overview');
  const [privacySettings, setPrivacySettings] = useState({
    locationTracking: true,
    profileVisibility: 'friends',
    dataSharing: false,
    marketingEmails: true,
    twoFactorAuth: true,
  });

  const tabs = [
    { key: 'overview', label: '總覽', icon: '📋' },
    { key: 'data', label: '資料管理', icon: '🗂️' },
    { key: 'location', label: '位置隱私', icon: '📍' },
    { key: 'security', label: '安全設定', icon: '🔐' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm">
              🛡️
            </div>
            <div>
              <h2 className="text-2xl font-bold">隱私與安全中心</h2>
              <p className="text-white/80 text-sm">管理您的個人資料和隱私設定</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex border-b ${darkMode ? 'border-gray-800 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-4 text-sm font-semibold transition-all relative ${
                activeTab === tab.key
                  ? darkMode ? 'text-indigo-400 bg-gray-900' : 'text-indigo-600 bg-white'
                  : darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
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

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-220px)] p-6">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Privacy Score */}
              <div className={`p-5 rounded-2xl ${darkMode ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100'}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>隱私保護評分</h3>
                  <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    92/100
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: '92%' }} />
                </div>
                <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  您的隱私設定非常安全！建議開啟雙重驗證以獲得更佳保護。
                </p>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className={`font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>快速操作</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: '📥', label: '下載我的資料', desc: '匯出所有個人資料' },
                    { icon: '🗑️', label: '刪除帳號', desc: '永久刪除所有資料' },
                    { icon: '🔒', label: '鎖定帳號', desc: '暫時停用帳號' },
                    { icon: '📧', label: '聯絡資訊', desc: '更新聯絡方式' },
                  ].map((action, i) => (
                    <button
                      key={i}
                      className={`p-4 rounded-xl text-left transition-all hover:scale-105 ${
                        darkMode ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' : 'bg-white hover:shadow-md border border-gray-100'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{action.icon}</span>
                      <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{action.label}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{action.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className={`font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>近期登入活動</h3>
                <div className={`rounded-xl overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  {[
                    { device: 'Chrome on Windows', location: '台北市', time: '剛剛', current: true },
                    { device: 'Safari on iPhone', location: '新北市', time: '2 小時前', current: false },
                    { device: 'Chrome on Android', location: '台北市', time: '昨天', current: false },
                  ].map((activity, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 ${
                      i !== 2 ? (darkMode ? 'border-b border-gray-700' : 'border-b border-gray-100') : ''
                    } ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        💻
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {activity.device}
                          {activity.current && (
                            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">目前</span>
                          )}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {activity.location} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-5">
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-100'}`}>
                <div className="flex gap-3">
                  <span className="text-2xl">ℹ️</span>
                  <div>
                    <p className={`text-sm font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>資料使用說明</p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-blue-300/80' : 'text-blue-600'}`}>
                      我們僅在必要範圍內使用您的資料，絕不用於第三方行銷。所有資料皆加密儲存於台灣境內伺服器。
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Categories */}
              <div>
                <h3 className={`font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>儲存的資料類型</h3>
                <div className="space-y-2">
                  {[
                    { category: '基本資料', items: '姓名、Email、電話', status: '必要' },
                    { category: '位置資訊', items: 'GPS 定位、地址', status: '可選' },
                    { category: '交易紀錄', items: '任務歷史、付款紀錄', status: '必要' },
                    { category: '裝置資訊', items: '瀏覽器類型、IP 位址', status: '必要' },
                  ].map((data, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${
                      darkMode ? 'bg-gray-800' : 'bg-gray-50'
                    }`}>
                      <div>
                        <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{data.category}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{data.items}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        data.status === '必要'
                          ? darkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-700'
                          : darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                      }`}>
                        {data.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Retention */}
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h4 className={`font-semibold text-sm mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>資料保留政策</h4>
                <ul className={`text-xs space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li>• 帳號資料：帳號存續期間保留</li>
                  <li>• 交易紀錄：依法保留 7 年</li>
                  <li>• 位置資訊：任務完成後 30 天自動刪除</li>
                  <li>• 日誌資料：90 天後自動清除</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'location' && (
            <div className="space-y-5">
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-indigo-50 border border-indigo-100'}`}>
                <div className="flex gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className={`text-sm font-semibold ${darkMode ? 'text-indigo-400' : 'text-indigo-700'}`}>位置隱私控制</p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-indigo-300/80' : 'text-indigo-600'}`}>
                      您可以隨時控制位置資訊的使用方式，保障您的行動隱私。
                    </p>
                  </div>
                </div>
              </div>

              {/* Location Settings */}
              <div className="space-y-3">
                {[
                  {
                    key: 'locationTracking',
                    title: '即時位置追蹤',
                    desc: '允許任務執行期間顯示您的位置',
                    icon: '🛰️',
                  },
                  {
                    key: 'profileVisibility',
                    title: '個人資料可見性',
                    desc: '控制誰可以看到您的完整資料',
                    icon: '👁️',
                  },
                  {
                    key: 'dataSharing',
                    title: '資料分享',
                    desc: '允許與合作夥伴分享匿名化資料',
                    icon: '🤝',
                  },
                ].map(setting => (
                  <div key={setting.key} className={`flex items-center justify-between p-4 rounded-xl ${
                    darkMode ? 'bg-gray-800' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{setting.icon}</span>
                      <div>
                        <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{setting.title}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{setting.desc}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setPrivacySettings({
                        ...privacySettings,
                        [setting.key]: !privacySettings[setting.key as keyof typeof privacySettings]
                      })}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        privacySettings[setting.key as keyof typeof privacySettings]
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                          : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform absolute top-0.5 ${
                        privacySettings[setting.key as keyof typeof privacySettings] ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Location Data Preview */}
              <div className={`p-4 rounded-xl border-2 border-dashed ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <h4 className={`font-semibold text-sm mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  🔍 位置資料預覽
                </h4>
                <p className={`text-xs mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  幫手在執行任務時能看到的位置資訊：
                </p>
                <div className={`text-xs font-mono p-3 rounded-lg ${darkMode ? 'bg-gray-900 text-green-400' : 'bg-white text-gray-700'}`}>
                  <div>📍 大致位置：台北市信義區</div>
                  <div>🏠 交接地點：[已隱藏完整地址]</div>
                  <div>📞 聯絡方式：[任務接受後顯示]</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-5">
              {/* Security Score */}
              <div className={`p-5 rounded-2xl ${darkMode ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20' : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100'}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>帳號安全等級</h3>
                  <span className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    高
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-2 bg-green-500 rounded-full" />
                  <div className="flex-1 h-2 bg-green-500 rounded-full" />
                  <div className="flex-1 h-2 bg-green-500 rounded-full" />
                  <div className={`flex-1 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                </div>
              </div>

              {/* Security Settings */}
              <div className="space-y-3">
                {[
                  {
                    title: '雙重驗證 (2FA)',
                    desc: '登入時需要額外驗證碼',
                    icon: '🔐',
                    enabled: privacySettings.twoFactorAuth,
                    recommended: true,
                  },
                  {
                    title: '登入通知',
                    desc: '新裝置登入時發送通知',
                    icon: '📧',
                    enabled: true,
                    recommended: true,
                  },
                  {
                    title: '行銷郵件',
                    desc: '接收平台活動和優惠資訊',
                    icon: '📬',
                    enabled: privacySettings.marketingEmails,
                    recommended: false,
                  },
                  {
                    title: '生物辨識登入',
                    desc: '使用指紋或臉部辨識快速登入',
                    icon: '👆',
                    enabled: false,
                    recommended: true,
                  },
                ].map((setting, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-xl ${
                    darkMode ? 'bg-gray-800' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{setting.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{setting.title}</p>
                          {setting.recommended && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                              darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                            }`}>
                              推薦
                            </span>
                          )}
                        </div>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{setting.desc}</p>
                      </div>
                    </div>
                    <div className={`w-12 h-6 rounded-full transition-colors relative ${
                      setting.enabled
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                        : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform absolute top-0.5 ${
                        setting.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Password Change */}
              <button className={`w-full p-4 rounded-xl text-left transition-all hover:scale-[1.02] ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' : 'bg-white hover:shadow-md border border-gray-100'
              }`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔑</span>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>變更密碼</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>上次變更：30 天前</p>
                  </div>
                  <svg className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

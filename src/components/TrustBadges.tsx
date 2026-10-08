interface TrustBadgesProps {
  darkMode?: boolean;
}

export default function TrustBadges({ darkMode = false }: TrustBadgesProps) {
  const badges = [
    {
      icon: '🔒',
      title: 'SSL 加密保護',
      description: '所有資料傳輸皆採用 256 位元加密',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '✅',
      title: '身份實名驗證',
      description: '所有幫手皆通過雙重身份驗證',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: '💳',
      title: '付款安全保障',
      description: '任務完成後才撥款，資金由平台託管',
      color: 'from-purple-500 to-violet-500',
    },
    {
      icon: '🛡️',
      title: '隱私保護承諾',
      description: '嚴格遵守個資法，絕不外洩用戶資料',
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: '📞',
      title: '24/7 客服支援',
      description: '全天候客服團隊，隨時為您服務',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: '⭐',
      title: '滿意保證',
      description: '不滿意可申請退款，平台居中協調',
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  return (
    <section className={`py-12 border-y ${darkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-lg">🏆</span>
            <span className={`text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              您的安全，我們的承諾
            </span>
          </div>
          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            多層防護機制，讓每次交易都安心
          </p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, i) => (
            <div
              key={i}
              className={`group text-center p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
                darkMode
                  ? 'bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50'
                  : 'bg-gray-50 hover:bg-white hover:shadow-lg border border-gray-100'
              }`}
            >
              <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                {badge.icon}
              </div>
              <h3 className={`text-sm font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {badge.title}
              </h3>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {badge.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className={`mt-8 flex flex-wrap justify-center items-center gap-6 pt-6 border-t ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="flex items-center gap-2">
            <span className="text-green-500">🔐</span>
            <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              通過 ISO 27001 資安認證
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-500">🏛️</span>
            <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              符合 GDPR 規範
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-500">📋</span>
            <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              遵循台灣個資法
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-500">💼</span>
            <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              投保新台幣 1 億責任險
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

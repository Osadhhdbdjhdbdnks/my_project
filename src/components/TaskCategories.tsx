interface TaskCategoriesProps {
  onViewDetail?: (category: string) => void;
  darkMode?: boolean;
}

export default function TaskCategories({ onViewDetail, darkMode = false }: TaskCategoriesProps) {
  const categories = [
    {
      icon: '🛒',
      title: '代購跑腿',
      description: '去超市買東西、排隊買限量商品、幫您取貨',
      gradient: 'from-emerald-400 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
      count: 24,
      liveData: {
        label: '即時動態',
        items: [
          { icon: '🛵', text: '陳大偉 正在全聯採購中', time: '剛剛' },
          { icon: '✅', text: '李小姐 已完成代購任務', time: '5分鐘前' },
        ]
      },
      features: ['即時地圖追蹤', '採購清單勾選', '照片回報'],
      category: 'shopping'
    },
    {
      icon: '🧹',
      title: '居家清潔',
      description: '打掃家裡、整理房間、清洗廚房浴室',
      gradient: 'from-blue-400 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      count: 18,
      liveData: {
        label: '服務項目',
        items: [
          { icon: '🏠', text: '3房2廳 大掃除', time: 'NT$ 2,500' },
          { icon: '🍳', text: '廚房深度清潔', time: 'NT$ 1,200' },
        ]
      },
      features: ['專業清潔師', '清潔用品自備', '滿意再付款'],
      category: 'cleaning'
    },
    {
      icon: '🚗',
      title: '開車接送',
      description: '機場接送、幫忙開車、等待接送服務',
      gradient: 'from-orange-400 to-amber-500',
      bgGradient: 'from-orange-50 to-amber-50',
      count: 12,
      liveData: {
        label: '即時動態',
        items: [
          { icon: '🚗', text: '王志明 等待乘客中', time: '機場 T2' },
          { icon: '✅', text: '劉小姐 已送達目的地', time: '10分鐘前' },
        ]
      },
      features: ['行車追蹤', '車牌資訊透明', '含等待服務'],
      category: 'driving'
    },
    {
      icon: '📦',
      title: '搬運送達',
      description: '送文件、搬東西、代為配送物品',
      gradient: 'from-violet-400 to-purple-500',
      bgGradient: 'from-violet-50 to-purple-50',
      count: 31,
      liveData: {
        label: '即時動態',
        items: [
          { icon: '🛵', text: '李小強 運送急件中', time: '松山→內湖' },
          { icon: '📦', text: '搬家服務 已完成', time: '30分鐘前' },
        ]
      },
      features: ['即時物流追蹤', '限時送達', '物品保險'],
      category: 'delivery'
    },
    {
      icon: '🐕',
      title: '寵物照顧',
      description: '遛狗、餵貓、帶寵物看醫生',
      gradient: 'from-pink-400 to-rose-500',
      bgGradient: 'from-pink-50 to-rose-50',
      count: 9,
      liveData: {
        label: '服務項目',
        items: [
          { icon: '🐕', text: '遛狗服務 30分鐘', time: 'NT$ 200' },
          { icon: '🐱', text: '到府餵食貓咪', time: 'NT$ 300' },
        ]
      },
      features: ['寵物經驗認證', '照片/影片回報', '緊急聯絡'],
      category: 'pet'
    },
    {
      icon: '✨',
      title: '其他任務',
      description: '排隊、代辦、任何生活瑣事都可以',
      gradient: 'from-indigo-400 to-blue-500',
      bgGradient: 'from-indigo-50 to-blue-50',
      count: 15,
      liveData: {
        label: '熱門需求',
        items: [
          { icon: '🎫', text: '代排隊 演唱會門票', time: 'NT$ 800' },
          { icon: '📋', text: '代辦政府機關事務', time: 'NT$ 500' },
        ]
      },
      features: ['彈性定價', '客製化服務', '即時溝通'],
      category: 'other'
    }
  ];

  return (
    <section id="categories" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-50/50 to-transparent rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-50 rounded-full px-4 py-1.5 mb-4">
            <span className="text-sm">🎯</span>
            <span className="text-sm font-semibold text-indigo-600">服務分類</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            你需要什麼樣的幫忙？
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            六大類別，涵蓋生活各種需求，總有一種適合你
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => onViewDetail?.(cat.category)}
              className="group relative bg-white rounded-3xl p-6 border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Hover gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative">
                {/* Header: Icon + Count */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    {cat.icon}
                  </div>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 group-hover:bg-white/80 px-2.5 py-1 rounded-full transition-colors">
                    {cat.count} 任務
                  </span>
                </div>

                {/* Title + Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  {cat.description}
                </p>

                {/* Live Data Feed */}
                <div className="bg-white/80 group-hover:bg-white rounded-xl p-3 mb-4 border border-gray-100">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-gray-500">{cat.liveData.label}</span>
                  </div>
                  <div className="space-y-1.5">
                    {cat.liveData.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span>{item.icon}</span>
                        <span className="text-gray-600 flex-1 truncate">{item.text}</span>
                        <span className="text-gray-400 flex-shrink-0">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cat.features.map((f, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-gray-50 group-hover:bg-white text-gray-600 px-2 py-1 rounded-full border border-gray-100 group-hover:border-gray-200 font-medium"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 group-hover:text-indigo-600 transition-colors">
                  <span>查看詳情</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

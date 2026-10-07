export default function TaskCategories() {
  const categories = [
    {
      icon: '🛒',
      title: '代購跑腿',
      description: '去超市買東西、排隊買限量商品、幫您取貨',
      gradient: 'from-emerald-400 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
      count: 24,
      examples: ['全聯買菜', '排隊取號', '代領包裹']
    },
    {
      icon: '🧹',
      title: '居家清潔',
      description: '打掃家裡、整理房間、清洗廚房浴室',
      gradient: 'from-blue-400 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      count: 18,
      examples: ['大掃除', '廚房清潔', '浴室刷洗']
    },
    {
      icon: '🚗',
      title: '開車接送',
      description: '機場接送、幫忙開車、等待接送服務',
      gradient: 'from-orange-400 to-amber-500',
      bgGradient: 'from-orange-50 to-amber-50',
      count: 12,
      examples: ['機場接送', '代為開車', '等候接送']
    },
    {
      icon: '📦',
      title: '搬運送達',
      description: '送文件、搬東西、代為配送物品',
      gradient: 'from-violet-400 to-purple-500',
      bgGradient: 'from-violet-50 to-purple-50',
      count: 31,
      examples: ['文件快遞', '搬家幫忙', '物品配送']
    },
    {
      icon: '🐕',
      title: '寵物照顧',
      description: '遛狗、餵貓、帶寵物看醫生',
      gradient: 'from-pink-400 to-rose-500',
      bgGradient: 'from-pink-50 to-rose-50',
      count: 9,
      examples: ['遛狗服務', '餵食照顧', '寵物接送']
    },
    {
      icon: '✨',
      title: '其他任務',
      description: '排隊、代辦、任何生活瑣事都可以',
      gradient: 'from-indigo-400 to-blue-500',
      bgGradient: 'from-indigo-50 to-blue-50',
      count: 15,
      examples: ['排隊代辦', '臨時幫忙', '特殊需求']
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
              className="group relative bg-white rounded-3xl p-7 border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Hover gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-3xl mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  {cat.icon}
                </div>

                {/* Title */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{cat.title}</h3>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 group-hover:bg-white/80 px-2.5 py-1 rounded-full transition-colors">
                    {cat.count} 任務
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                  {cat.description}
                </p>

                {/* Example tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {cat.examples.map((ex, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white/80 group-hover:bg-white text-gray-600 px-2.5 py-1 rounded-full border border-gray-100 group-hover:border-gray-200"
                    >
                      {ex}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 group-hover:text-indigo-600 transition-colors">
                  <span>查看任務</span>
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

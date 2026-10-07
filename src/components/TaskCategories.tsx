export default function TaskCategories() {
  const categories = [
    {
      icon: '🛒',
      title: '代購跑腿',
      description: '去超市買東西、排隊買限量商品、幫您取貨',
      color: 'from-green-400 to-emerald-500',
      count: 24
    },
    {
      icon: '🧹',
      title: '居家清潔',
      description: '打掃家裡、整理房間、清洗廚房浴室',
      color: 'from-blue-400 to-cyan-500',
      count: 18
    },
    {
      icon: '🚗',
      title: '開車接送',
      description: '機場接送、幫忙開車、等待接送服務',
      color: 'from-orange-400 to-amber-500',
      count: 12
    },
    {
      icon: '📦',
      title: '搬運送達',
      description: '送文件、搬東西、代為配送物品',
      color: 'from-purple-400 to-violet-500',
      count: 31
    },
    {
      icon: '🐕',
      title: '寵物照顧',
      description: '遛狗、餵貓、帶寵物看醫生',
      color: 'from-pink-400 to-rose-500',
      count: 9
    },
    {
      icon: '🔧',
      title: '其他任務',
      description: '排隊、代辦、任何生活瑣事都可以',
      color: 'from-indigo-400 to-blue-500',
      count: 15
    }
  ];

  return (
    <section id="categories" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">服務分類</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            無論你需要什麼樣的幫忙，我們都有對應的專業人員可以協助
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <div className="relative">
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{cat.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{cat.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                    {cat.count} 個任務進行中
                  </span>
                  <span className="text-indigo-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                    查看 →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface HeroProps {
  onPostTask: () => void;
  darkMode?: boolean;
}

export default function Hero({ onPostTask, darkMode = false }: HeroProps) {
  const stats = [
    { number: '10K+', label: '活躍用戶' },
    { number: '50K+', label: '完成任務' },
    { number: '4.9', label: '平均評分', icon: '⭐' },
    { number: '15min', label: '平均媒合' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50/50 to-purple-50/50" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-300/10 to-purple-300/10 rounded-full blur-3xl" />
        
        {/* Floating icons */}
        <div className="absolute top-1/4 left-[10%] w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-3xl animate-float" style={{ animationDelay: '0s' }}>
          🛒
        </div>
        <div className="absolute top-1/3 right-[15%] w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl animate-float" style={{ animationDelay: '0.5s' }}>
          🧹
        </div>
        <div className="absolute bottom-1/3 left-[20%] w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl animate-float" style={{ animationDelay: '1s' }}>
          🚗
        </div>
        <div className="absolute bottom-1/4 right-[25%] w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-3xl animate-float" style={{ animationDelay: '1.5s' }}>
          📦
        </div>
        <div className="absolute top-[15%] left-1/2 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-xl animate-float" style={{ animationDelay: '2s' }}>
          ⭐
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-full px-4 py-2 mb-8 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-700">
              超過 <span className="text-indigo-600 font-bold">2,000+</span> 位幫手在線等候
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
            <span className="text-gray-900">生活大小事</span>
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                交給跑腿幫
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8C50 2 100 2 150 6C200 10 250 4 298 8" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round" />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            不管是去超市買東西、幫忙打掃、開車接送，
            <br className="hidden sm:block" />
            發佈需求，<span className="font-semibold text-gray-900">立刻有人幫你搞定</span>！
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={onPostTask}
              className="group relative w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                🎯 立即發佈任務
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <a
              href="#tasks"
              className="group w-full sm:w-auto bg-white text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg border-2 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>📋</span>
              瀏覽任務
              <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-4 hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  {stat.icon && <span className="text-lg">{stat.icon}</span>}
                  <span className="text-2xl md:text-3xl font-black bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.number}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

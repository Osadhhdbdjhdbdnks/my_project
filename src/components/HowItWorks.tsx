interface HowItWorksProps {
  darkMode?: boolean;
}

export default function HowItWorks({ darkMode = false }: HowItWorksProps) {
  const steps = [
    {
      step: '01',
      icon: '📝',
      title: '提出需求',
      description: '簡單描述你需要什麼幫忙，例如：「請幫我去全聯買牛奶和雞蛋」',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      step: '02',
      icon: '🤝',
      title: '媒合幫手',
      description: '系統自動媒合附近合適的跑腿人員，也可以自行選擇',
      gradient: 'from-purple-500 to-violet-500',
      bgGradient: 'from-purple-50 to-violet-50'
    },
    {
      step: '03',
      icon: '🏃',
      title: '執行任務',
      description: '跑腿人員開始執行任務，即時回報進度給你',
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-50 to-amber-50'
    },
    {
      step: '04',
      icon: '⭐',
      title: '完成評價',
      description: '任務完成後確認並付款，幫對方留下評價',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50'
    }
  ];

  const scenarios = [
    {
      icon: '🛒',
      title: '「幫我去超市買東西」',
      description: '下班太累不想出門？在平台上發佈需求，指定要買的東西和超市，跑腿人員幫你買好送到家門口。',
      gradient: 'from-emerald-400 to-teal-500'
    },
    {
      icon: '🧹',
      title: '「幫我到家裡打掃」',
      description: '需要大掃除但一個人忙不過來？發佈打掃需求，專業幫手到你家幫忙清潔，讓家裡煥然一新。',
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      icon: '🚗',
      title: '「幫我開車去接人」',
      description: '家人朋友從機場回來但你沒空接？找個司機幫忙去接，還可以請他等待，直到對方準備好再出發。',
      gradient: 'from-orange-400 to-amber-500'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-50/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-50/50 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-50 rounded-full px-4 py-1.5 mb-4">
            <span className="text-sm">⚡</span>
            <span className="text-sm font-semibold text-indigo-600">運作方式</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            四個步驟，輕鬆搞定
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            簡單直覺的操作流程，讓你的生活瑣事輕鬆解決
          </p>
        </div>

        {/* Steps */}
        <div className="relative mb-24">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-20 left-[12%] right-[12%] h-0.5">
            <div className="h-full bg-gradient-to-r from-blue-200 via-purple-200 via-orange-200 to-green-200 rounded-full" />
            {/* Animated dots */}
            <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-500 rounded-full animate-pulse" style={{ left: '25%' }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ left: '50%', animationDelay: '0.5s' }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ left: '75%', animationDelay: '1s' }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <div key={index} className="relative group">
                <div className={`relative bg-gradient-to-br ${item.bgGradient} rounded-3xl p-8 text-center hover:scale-105 transition-all duration-500 hover:shadow-xl`}>
                  {/* Step number */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <span className={`text-sm font-black bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent`}>
                      {item.step}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-4xl shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scenarios */}
        <div className="relative">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-gray-900 mb-3">常見任務情境</h3>
            <p className="text-gray-500">看看其他人都在用跑腿幫做什麼</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scenarios.map((scenario, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Hover gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${scenario.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${scenario.gradient} flex items-center justify-center text-3xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    {scenario.icon}
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {scenario.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {scenario.description}
                  </p>

                  {/* CTA */}
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-gray-400 group-hover:text-indigo-600 transition-colors">
                    <span>了解更多</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

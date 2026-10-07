export default function HowItWorks() {
  const steps = [
    {
      step: 1,
      icon: '📝',
      title: '提出需求',
      description: '簡單描述你需要什麼幫忙，例如：「請幫我去全聯買牛奶和雞蛋」',
      color: 'bg-blue-500'
    },
    {
      step: 2,
      icon: '🤝',
      title: '媒合幫手',
      description: '系統自動媒合附近合適的跑腿人員，也可以自行選擇',
      color: 'bg-purple-500'
    },
    {
      step: 3,
      icon: '🏃',
      title: '執行任務',
      description: '跑腿人員開始執行任務，即時回報進度給你',
      color: 'bg-orange-500'
    },
    {
      step: 4,
      icon: '⭐',
      title: '完成評價',
      description: '任務完成後確認並付款，幫對方留下評價',
      color: 'bg-green-500'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">運作方式</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            四個簡單步驟，讓你的生活瑣事輕鬆搞定
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 -translate-y-1/2" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <div key={index} className="relative text-center group">
                {/* Step number */}
                <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                  {item.icon}
                </div>
                <div className="absolute -top-2 -right-2 lg:right-auto lg:-left-2 lg:top-0 w-7 h-7 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 z-20">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Example scenarios */}
        <div className="mt-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">常見任務情境</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-3">🛒</div>
              <h4 className="font-bold text-gray-800 mb-2">「幫我去超市買東西」</h4>
              <p className="text-sm text-gray-500">
                下班太累不想出門？在平台上發佈需求，指定要買的東西和超市，
                跑腿人員幫你買好送到家門口。
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-3">🧹</div>
              <h4 className="font-bold text-gray-800 mb-2">「幫我到家裡打掃」</h4>
              <p className="text-sm text-gray-500">
                需要大掃除但一個人忙不過來？發佈打掃需求，
                專業幫手到你家幫忙清潔，讓家裡煥然一新。
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-3">🚗</div>
              <h4 className="font-bold text-gray-800 mb-2">「幫我開車去接人」</h4>
              <p className="text-sm text-gray-500">
                家人朋友從機場回來但你沒空接？找個司機幫忙去接，
                還可以請他等待，直到對方準備好再出發。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

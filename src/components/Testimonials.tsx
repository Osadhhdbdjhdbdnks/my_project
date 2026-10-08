interface TestimonialsProps {
  darkMode: boolean;
}

export default function Testimonials({ darkMode }: TestimonialsProps) {
  const reviews = [
    {
      name: '王小明',
      avatar: '👨',
      role: '任務發案者',
      rating: 5,
      text: '超級方便！下班太累不想出門買菜，在跑腿幫發佈任務，10分鐘就有人接單，半小時東西就送到家了！',
      task: '代購跑腿',
      date: '2026/01/10',
    },
    {
      name: '李小姐',
      avatar: '👩',
      role: '任務發案者',
      rating: 5,
      text: '家裡需要大掃除但一個人忙不過來，找了一位清潔幫手，3小時就把家裡弄得乾乾淨淨，CP值超高！',
      task: '居家清潔',
      date: '2026/01/08',
    },
    {
      name: '張先生',
      avatar: '👨‍💼',
      role: '任務發案者',
      rating: 5,
      text: '媽媽從南部上來，我沒空去接，在平台找了一位司機幫忙，服務超好還幫忙提行李，媽媽很滿意！',
      task: '開車接送',
      date: '2026/01/05',
    },
    {
      name: '陳大偉',
      avatar: '🧑',
      role: '跑腿幫手',
      rating: 5,
      text: '利用下班時間接跑腿任務，一個月多賺了8000多元，時間彈性又自由，非常推薦！',
      task: '幫手心得',
      date: '2026/01/12',
    },
    {
      name: '林美華',
      avatar: '👩',
      role: '清潔幫手',
      rating: 5,
      text: '在平台上接清潔案件已經半年了，客戶都很友善，收入也很穩定，感謝跑腿幫！',
      task: '幫手心得',
      date: '2026/01/11',
    },
    {
      name: '黃經理',
      avatar: '👔',
      role: '任務發案者',
      rating: 4,
      text: '公司臨時需要送急件，在平台上找到幫手，1小時內就送達了，即時追蹤功能超好用！',
      task: '搬運送達',
      date: '2026/01/09',
    },
  ];

  return (
    <section className={`py-24 relative overflow-hidden ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 ${darkMode ? 'bg-indigo-500/10' : 'bg-indigo-50'}`}>
            <span className="text-sm">💬</span>
            <span className={`text-sm font-semibold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>用戶評價</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            聽聽大家怎麼說
          </h2>
          <p className={`text-lg max-w-xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            超過 10,000 位用戶信賴的選擇
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className={`rounded-3xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                darkMode ? 'bg-gray-800/50 border-gray-700 hover:border-indigo-500/30' : 'bg-white border-gray-100 hover:border-indigo-200'
              }`}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className={j < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                    ⭐
                  </span>
                ))}
              </div>

              {/* Text */}
              <p className={`text-sm leading-relaxed mb-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                "{review.text}"
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    {review.avatar}
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{review.name}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{review.role}</p>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full ${
                  darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  {review.task}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating */}
        <div className={`mt-12 rounded-3xl p-8 text-center ${
          darkMode ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20' : 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100'
        }`}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              4.9
            </span>
            <div className="text-left">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-lg">⭐</span>)}
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>基於 2,847 則評價</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-gray-300 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Section */}
        <div className="py-16 border-b border-gray-800">
          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl p-8 md:p-12 text-center border border-indigo-500/20">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
              準備好開始了嗎？
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
              加入超過 10,000 位用戶的行列，讓生活更輕鬆
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
                🎯 立即發佈任務
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-colors">
                💪 成為幫手
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <span className="text-lg font-bold text-white block leading-tight">跑腿幫</span>
                <span className="text-[10px] text-gray-500 font-medium tracking-wider">TASK RUNNER</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-6">
              跑腿幫是一個生活任務媒合平台，讓需要幫忙的人能快速找到願意提供服務的人。
              不管是去超市買東西、幫忙打掃、開車接送，任何生活瑣事都可以在這裡找到幫手。
            </p>
            <div className="flex gap-3">
              {[
                { icon: '📘', label: 'Facebook' },
                { icon: '📷', label: 'Instagram' },
                { icon: '🐦', label: 'Twitter' },
                { icon: '💬', label: 'Line' },
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-all duration-300 hover:scale-110"
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm tracking-wider uppercase">服務項目</h4>
            <ul className="space-y-3 text-sm">
              {['代購跑腿', '居家清潔', '開車接送', '搬運送達', '寵物照顧', '其他任務'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-indigo-400 transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm tracking-wider uppercase">關於我們</h4>
            <ul className="space-y-3 text-sm">
              {['關於跑腿幫', '使用條款', '隱私政策', '常見問題', '聯絡我們', '成為幫手'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-indigo-400 transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2026 跑腿幫 Task Runner. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>用</span>
              <span className="flex items-center gap-1">
                <span className="text-indigo-400">⚡</span>
                <span className="text-gray-400">VS Code</span>
              </span>
              <span>+</span>
              <span className="text-cyan-400">React</span>
              <span>+</span>
              <span className="text-sky-400">Tailwind CSS</span>
              <span>精心製作</span>
              <span className="text-red-400">❤️</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

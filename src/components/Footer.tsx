interface FooterProps {
  darkMode?: boolean;
}

export default function Footer({ darkMode = false }: FooterProps) {
  return (
    <footer className={`relative overflow-hidden ${darkMode ? 'bg-gray-950' : 'bg-gray-900'} text-gray-300`}>
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
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                🎯 立即發佈任務
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-colors">
                💪 成為幫手
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
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
            
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['🔒 SSL 加密', '✅ 實名驗證', '💳 安全付款', '🛡️ 隱私保護'].map((badge, i) => (
                <span key={i} className="text-xs bg-gray-800 text-gray-400 px-3 py-1.5 rounded-full border border-gray-700">
                  {badge}
                </span>
              ))}
            </div>

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

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm tracking-wider uppercase">關於我們</h4>
            <ul className="space-y-3 text-sm">
              {['關於跑腿幫', '使用條款', '隱私政策', '安全中心', '常見問題', '聯絡我們'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-indigo-400 transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm tracking-wider uppercase">聯絡我們</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-400">
                <span>📧</span>
                <a href="mailto:support@taskrunner.com" className="hover:text-white transition-colors">support@taskrunner.com</a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span>📞</span>
                <a href="tel:02-1234-5678" className="hover:text-white transition-colors">02-1234-5678</a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span>🕐</span>
                <span>24/7 全天候服務</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span>📍</span>
                <span>台北市信義區</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-green-500">🔐</span>
              <span>通過 ISO 27001 資安認證</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">🏛️</span>
              <span>符合 GDPR 規範</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-500">📋</span>
              <span>遵循台灣個資法</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-500">💼</span>
              <span>投保新台幣 1 億責任險</span>
            </div>
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

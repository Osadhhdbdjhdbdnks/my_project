export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🏃</span>
              <span className="text-xl font-bold text-white">跑腿幫</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              跑腿幫是一個生活任務媒合平台，讓需要幫忙的人能快速找到願意提供服務的人。
              不管是去超市買東西、幫忙打掃、開車接送，任何生活瑣事都可以在這裡找到幫手。
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <span className="text-lg">📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <span className="text-lg">📷</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <span className="text-lg">🐦</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4">服務</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">代購跑腿</a></li>
              <li><a href="#" className="hover:text-white transition-colors">居家清潔</a></li>
              <li><a href="#" className="hover:text-white transition-colors">開車接送</a></li>
              <li><a href="#" className="hover:text-white transition-colors">搬運送達</a></li>
              <li><a href="#" className="hover:text-white transition-colors">寵物照顧</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">關於</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">關於我們</a></li>
              <li><a href="#" className="hover:text-white transition-colors">使用條款</a></li>
              <li><a href="#" className="hover:text-white transition-colors">隱私政策</a></li>
              <li><a href="#" className="hover:text-white transition-colors">常見問題</a></li>
              <li><a href="#" className="hover:text-white transition-colors">聯絡我們</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-sm text-gray-500">
          <p>© 2026 跑腿幫 - 您的生活任務助手。All rights reserved.</p>
          <p className="mt-2">用 VS Code + React + Tailwind CSS 製作 ❤️</p>
        </div>
      </div>
    </footer>
  );
}

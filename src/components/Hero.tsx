interface HeroProps {
  onPostTask: () => void;
}

export default function Hero({ onPostTask }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl animate-bounce" style={{ animationDuration: '3s' }}>🛒</div>
        <div className="absolute top-20 right-20 text-7xl animate-bounce" style={{ animationDuration: '4s' }}>🧹</div>
        <div className="absolute bottom-10 left-1/4 text-6xl animate-bounce" style={{ animationDuration: '3.5s' }}>🚗</div>
        <div className="absolute bottom-20 right-1/3 text-7xl animate-bounce" style={{ animationDuration: '2.5s' }}>📦</div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            生活大小事<br />
            <span className="text-yellow-300">交給跑腿幫就對了！</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto mb-10">
            不管是去超市買東西、幫忙打掃、開車接送，還是任何瑣碎的生活任務，
            只要在平台上發佈需求，立刻有人幫你搞定！
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onPostTask}
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 hover:text-indigo-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🎯 立即發佈任務
            </button>
            <a
              href="#tasks"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all"
            >
              📋 瀏覽任務
            </a>
          </div>
          <div className="mt-12 flex justify-center gap-8 text-sm text-indigo-200">
            <div className="flex items-center gap-2">
              <span className="text-green-300 text-lg">✓</span> 快速媒合
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-300 text-lg">✓</span> 安全有保障
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-300 text-lg">✓</span> 價格透明
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

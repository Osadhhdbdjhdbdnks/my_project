interface HeaderProps {
  onPostTask: () => void;
}

export default function Header({ onPostTask }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🏃</span>
            <span className="text-xl font-bold text-indigo-600">跑腿幫</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#categories" className="text-gray-600 hover:text-indigo-600 transition-colors">服務分類</a>
            <a href="#tasks" className="text-gray-600 hover:text-indigo-600 transition-colors">任務看板</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition-colors">運作方式</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={onPostTask}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
            >
              + 發佈任務
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

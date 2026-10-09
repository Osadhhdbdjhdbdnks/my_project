import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import TaskCategories from './components/TaskCategories';
import TaskBoard from './components/TaskBoard';
import HowItWorks from './components/HowItWorks';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import NewTaskForm from './components/NewTaskForm';
import TaskDetail from './components/TaskDetail';
import FloatingChat from './components/FloatingChat';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import RunnerDashboard from './components/RunnerDashboard';
import UserCenter from './components/UserCenter';
import AdminDashboard from './components/AdminDashboard';
import NotificationCenter from './components/NotificationCenter';
import EvidenceUpload from './components/EvidenceUpload';
import RatingSystem from './components/RatingSystem';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthCallbackPage from './pages/AuthCallbackPage';

// 受保護的路由組件
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// 主頁面
function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRunnerDashboard, setShowRunnerDashboard] = useState(false);
  const [showUserCenter, setShowUserCenter] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const { isAuthenticated } = useAuth();

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: '幫我去全聯買東西',
      description: '請幫我到附近的全聯超市買以下物品：牛奶2瓶、吐司1袋、雞蛋1盒、洗髮精1瓶',
      category: 'shopping',
      location: '全聯福利中心 - 信義店',
      reward: 200,
      status: 'in_progress',
      postedBy: '王小明',
      postedTime: '10分鐘前',
      avatar: '👨',
      bookmarked: false,
    },
    {
      id: 2,
      title: '幫忙打掃家裡',
      description: '需要有人幫忙打掃3房2廳的公寓，包含廚房和浴室清潔，約需3小時',
      category: 'cleaning',
      location: '台北市大安區和平東路',
      reward: 800,
      status: 'open',
      postedBy: '李小姐',
      postedTime: '30分鐘前',
      avatar: '👩',
      bookmarked: true,
    },
    {
      id: 3,
      title: '幫忙開車接送',
      description: '需要司機幫忙到機場接人，預計下午3點到桃園機場第二航廈，接到後等待並送回市區',
      category: 'driving',
      location: '桃園國際機場 → 台北市',
      reward: 1200,
      status: 'in_progress',
      postedBy: '張先生',
      postedTime: '1小時前',
      avatar: '👨‍💼',
      bookmarked: false,
    },
    {
      id: 4,
      title: '幫忙排隊買限量商品',
      description: '請幫忙到信義區百貨公司排隊買限定聯名商品，早上6點開始排隊',
      category: 'shopping',
      location: '台北信義區 - 微風南山',
      reward: 500,
      status: 'open',
      postedBy: '陳小妹',
      postedTime: '2小時前',
      avatar: '👧',
      bookmarked: false,
    },
    {
      id: 5,
      title: '幫忙搬家整理',
      description: '需要幫忙整理打包物品，搬運到樓下貨車上，約20箱左右',
      category: 'cleaning',
      location: '新北市板橋區文化路',
      reward: 1500,
      status: 'completed',
      postedBy: '林大哥',
      postedTime: '3小時前',
      avatar: '🧔',
      bookmarked: false,
    },
    {
      id: 6,
      title: '幫忙送文件到公司',
      description: '有一份急件需要從松山區送到內湖科技園區，請在1小時內送達',
      category: 'delivery',
      location: '松山區 → 內湖科技園區',
      reward: 350,
      status: 'in_progress',
      postedBy: '黃經理',
      postedTime: '5分鐘前',
      avatar: '👔',
      bookmarked: true,
    },
  ]);

  const handleAddTask = (newTask: any) => {
    setTasks([newTask, ...tasks]);
    setShowForm(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleBookmark = (taskId: number) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, bookmarked: !t.bookmarked } : t));
  };

  const filteredTasks = searchQuery
    ? tasks.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tasks;

  return (
    <div className={`min-h-screen antialiased transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header
        onPostTask={() => isAuthenticated ? setShowForm(true) : window.location.href = '/login'}
        onSearch={handleSearch}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />
      <Hero onPostTask={() => isAuthenticated ? setShowForm(true) : window.location.href = '/login'} darkMode={darkMode} />
      <TrustBadges darkMode={darkMode} />
      <TaskCategories darkMode={darkMode} />
      <TaskBoard
        tasks={filteredTasks}
        onTaskClick={(task) => setSelectedTask(task)}
        onBookmark={handleBookmark}
        darkMode={darkMode}
        searchQuery={searchQuery}
        onClearSearch={() => setSearchQuery('')}
      />
      <Stats darkMode={darkMode} />
      <HowItWorks darkMode={darkMode} />
      <Testimonials darkMode={darkMode} />
      <Footer darkMode={darkMode} />
      <FloatingChat darkMode={darkMode} />
      <ScrollToTop />

      {/* Platform Switcher */}
      {isAuthenticated && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-2 bg-white dark:bg-gray-800 rounded-full shadow-2xl p-2 border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowNotifications(true)}
            className="px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 transition-colors relative"
            title="通知中心"
          >
            🔔 通知
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          <button
            onClick={() => setShowUserCenter(true)}
            className="px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-colors"
            title="用戶端"
          >
            👤 用戶端
          </button>
          <button
            onClick={() => setShowRunnerDashboard(true)}
            className="px-4 py-2 rounded-full text-sm font-medium hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 transition-colors"
            title="執行端"
          >
            🏃 跑腿員端
          </button>
          <button
            onClick={() => setShowAdminDashboard(true)}
            className="px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-400 transition-colors"
            title="管理後台"
          >
            🏢 管理後台
          </button>
        </div>
      )}

      {showForm && (
        <NewTaskForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddTask}
          darkMode={darkMode}
        />
      )}

      {selectedTask && (
        <TaskDetail
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          darkMode={darkMode}
        />
      )}

      {showRunnerDashboard && (
        <RunnerDashboard
          onClose={() => setShowRunnerDashboard(false)}
          darkMode={darkMode}
        />
      )}

      {showUserCenter && (
        <UserCenter
          onClose={() => setShowUserCenter(false)}
          darkMode={darkMode}
        />
      )}

      {showAdminDashboard && (
        <AdminDashboard
          onClose={() => setShowAdminDashboard(false)}
          darkMode={darkMode}
        />
      )}

      {showNotifications && (
        <NotificationCenter
          onClose={() => setShowNotifications(false)}
          darkMode={darkMode}
        />
      )}

      {showEvidence && selectedTask && (
        <EvidenceUpload
          taskId={selectedTask.id}
          taskTitle={selectedTask.title}
          onClose={() => setShowEvidence(false)}
          darkMode={darkMode}
          onSubmit={(evidence) => {
            console.log('Evidence submitted:', evidence);
            setShowEvidence(false);
          }}
        />
      )}

      {showRating && selectedTask && (
        <RatingSystem
          taskId={selectedTask.id}
          taskTitle={selectedTask.title}
          runnerName={selectedTask.postedBy}
          onClose={() => setShowRating(false)}
          darkMode={darkMode}
          onSubmit={(rating) => {
            console.log('Rating submitted:', rating);
            setShowRating(false);
          }}
        />
      )}
    </div>
  );
}

// Dashboard 頁面
function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">儀表板</h1>
        <p className="text-gray-600">歡迎來到您的儀表板！</p>
      </div>
    </div>
  );
}

// Profile 頁面
function ProfilePage() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">個人資料</h1>
        {user && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-4 mb-6">
              <img src={user.picture} alt={user.name} className="w-20 h-20 rounded-full" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">用戶 ID</label>
                <p className="text-gray-900">{user.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">登入方式</label>
                <p className="text-gray-900">{user.provider}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">角色</label>
                <p className="text-gray-900">{user.role}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Settings 頁面
function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">設定</h1>
        <p className="text-gray-600">這裡是設定頁面</p>
      </div>
    </div>
  );
}

// 主 App 組件
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

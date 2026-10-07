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

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
    <div className={`min-h-screen antialiased transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header
        onPostTask={() => setShowForm(true)}
        onSearch={handleSearch}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />
      <Hero onPostTask={() => setShowForm(true)} darkMode={darkMode} />
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
    </div>
  );
}

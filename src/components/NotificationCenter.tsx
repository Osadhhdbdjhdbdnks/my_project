import { useState } from 'react';

interface NotificationCenterProps {
  onClose: () => void;
  darkMode?: boolean;
}

export default function NotificationCenter({ onClose, darkMode = false }: NotificationCenterProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'tasks' | 'messages' | 'system'>('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'task',
      icon: '✅',
      title: '任務已接單',
      message: '陳大偉已接受您的「幫我去全聯買東西」任務',
      time: '2分鐘前',
      unread: true,
      action: '查看任務'
    },
    {
      id: 2,
      type: 'message',
      icon: '💬',
      title: '新訊息',
      message: '陳大偉：「您好，我已經到全聯了」',
      time: '5分鐘前',
      unread: true,
      action: '回覆'
    },
    {
      id: 3,
      type: 'task',
      icon: '📍',
      title: '任務進度更新',
      message: '李小強正在運送您的文件，預計10:40送達',
      time: '15分鐘前',
      unread: true,
      action: '追蹤進度'
    },
    {
      id: 4,
      type: 'payment',
      icon: '💰',
      title: '付款成功',
      message: '您已成功支付 NT$ 200 至平台託管帳戶',
      time: '30分鐘前',
      unread: false,
      action: '查看明細'
    },
    {
      id: 5,
      type: 'system',
      icon: '🎁',
      title: '優惠券通知',
      message: '您獲得一張 NT$ 50 優惠券，滿 NT$ 500 可用',
      time: '1小時前',
      unread: false,
      action: '查看優惠券'
    },
    {
      id: 6,
      type: 'task',
      icon: '⭐',
      title: '評價提醒',
      message: '您有1個已完成的任務尚未評價，請給予評分',
      time: '2小時前',
      unread: false,
      action: '前往評價'
    },
    {
      id: 7,
      type: 'system',
      icon: '📢',
      title: '系統公告',
      message: '平台已升級新版本，新增AI智能助手功能',
      time: '1天前',
      unread: false,
      action: '了解更多'
    },
    {
      id: 8,
      type: 'security',
      icon: '🔒',
      title: '安全警告',
      message: '偵測到新裝置登入，如非本人操作請立即修改密碼',
      time: '2天前',
      unread: false,
      action: '查看裝置'
    },
  ]);

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => {
        if (activeTab === 'tasks') return n.type === 'task';
        if (activeTab === 'messages') return n.type === 'message';
        if (activeTab === 'system') return n.type === 'system' || n.type === 'payment' || n.type === 'security';
        return true;
      });

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">通知中心</h2>
              <p className="text-white/80 text-sm">{unreadCount} 則未讀通知</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={markAllAsRead}
                className="px-3 py-1.5 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition-colors"
              >
                全部已讀
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          {[
            { key: 'all', label: '全部', count: notifications.length },
            { key: 'tasks', label: '任務', count: notifications.filter(n => n.type === 'task').length },
            { key: 'messages', label: '訊息', count: notifications.filter(n => n.type === 'message').length },
            { key: 'system', label: '系統', count: notifications.filter(n => n.type === 'system' || n.type === 'payment' || n.type === 'security').length },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-3 text-sm font-medium transition-all relative ${
                activeTab === tab.key
                  ? darkMode ? 'text-blue-400' : 'text-blue-600'
                  : darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.key
                    ? 'bg-blue-100 text-blue-700'
                    : darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-[calc(80vh-140px)]">
          {filteredNotifications.length === 0 ? (
            <div className="py-20 text-center">
              <div className="text-6xl mb-4">📭</div>
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                暫無通知
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredNotifications.map(notif => (
                <div
                  key={notif.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer ${
                    notif.unread ? (darkMode ? 'bg-blue-900/10' : 'bg-blue-50/50') : ''
                  }`}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="flex gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                      darkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      {notif.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {notif.title}
                        </h3>
                        {notif.unread && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {notif.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {notif.time}
                        </span>
                        <button className={`text-xs font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
                          {notif.action}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

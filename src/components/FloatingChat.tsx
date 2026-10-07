import { useState } from 'react';

interface FloatingChatProps {
  darkMode: boolean;
}

export default function FloatingChat({ darkMode }: FloatingChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: '您好！我是跑腿幫客服小幫手 🤖', from: 'bot', time: '刚刚' },
    { id: 2, text: '有什麼可以幫您的嗎？', from: 'bot', time: '刚刚' },
  ]);
  const [input, setInput] = useState('');

  const quickReplies = [
    '如何發佈任務？',
    '如何成為幫手？',
    '付款方式有哪些？',
    '如何聯繫客服？',
  ];

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;

    setMessages([...messages, { id: Date.now(), text: msg, from: 'user', time: '刚刚' }]);
    setInput('');

    // Auto reply
    setTimeout(() => {
      const replies = [
        '好的，我來為您說明！發佈任務非常簡單，只需點擊右上角的「發佈任務」按鈕即可 📝',
        '成為幫手也很簡單！完成身份驗證後就可以開始接單賺錢了 💪',
        '我們支援信用卡、LINE Pay、銀行轉帳等多種付款方式 💳',
        '您可以撥打客服專線 02-1234-5678，或透過 Email 聯繫我們 📞',
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages(prev => [...prev, { id: Date.now() + 1, text: randomReply, from: 'bot', time: '刚刚' }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 rounded-3xl shadow-2xl overflow-hidden z-50 border ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl backdrop-blur-sm">
                  🤖
                </div>
                <div>
                  <h3 className="font-bold text-sm">跑腿幫客服</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-white/80">在線中</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                  msg.from === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-sm'
                    : darkMode
                    ? 'bg-gray-700 text-gray-200 rounded-bl-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.from === 'user' ? 'text-white/60' : darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className={`px-4 py-2 border-t flex flex-wrap gap-2 ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleSend(reply)}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                  darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className={`px-4 py-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            <form
              onSubmit={e => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="輸入訊息..."
                className={`flex-1 px-4 py-2.5 rounded-full text-sm outline-none ${
                  darkMode
                    ? 'bg-gray-700 text-white placeholder-gray-500'
                    : 'bg-gray-100 text-gray-900 placeholder-gray-400'
                }`}
              />
              <button
                type="submit"
                className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-shadow"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen
            ? 'bg-gray-600 rotate-90'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-indigo-500/50'
        }`}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <span className="text-2xl">💬</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          </>
        )}
      </button>
    </>
  );
}

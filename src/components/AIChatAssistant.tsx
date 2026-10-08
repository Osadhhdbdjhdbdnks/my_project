import { useState, useRef, useEffect } from 'react';

interface AIChatAssistantProps {
  darkMode?: boolean;
  onTaskGenerated?: (task: any) => void;
}

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  taskData?: any;
}

export default function AIChatAssistant({ darkMode = false, onTaskGenerated }: AIChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: '你好！我是 AI 任務助理 🤖\n\n請告訴我你需要什麼幫助，我會幫你生成任務。\n\n例如：\n• 「幫我買一杯咖啡送到辦公室」\n• 「需要有人幫忙搬家」\n• 「去藥局買口罩，30分鐘內送到」'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 模擬 AI 解析和回覆
  const generateAIResponse = (userInput: string) => {
    // 解析用戶輸入
    const taskData: any = {
      title: '',
      category: 'other',
      description: userInput,
      items: [],
      timeLimit: null,
      location: '',
      reward: 0,
    };

    // 識別任務類型
    if (userInput.includes('買') || userInput.includes('購買')) {
      taskData.category = 'shopping';
      taskData.title = '代買任務';
    } else if (userInput.includes('送') || userInput.includes('遞送')) {
      taskData.category = 'delivery';
      taskData.title = '配送任務';
    } else if (userInput.includes('搬') || userInput.includes('搬家')) {
      taskData.category = 'delivery';
      taskData.title = '搬運任務';
    } else if (userInput.includes('接') || userInput.includes('接送')) {
      taskData.category = 'driving';
      taskData.title = '接送任務';
    }

    // 識別商品
    const itemPatterns = ['口罩', '咖啡', '奶茶', '便當', '文件', '包裹', '藥', '餐'];
    itemPatterns.forEach(item => {
      if (userInput.includes(item)) {
        taskData.items.push(item);
      }
    });

    if (taskData.items.length > 0) {
      taskData.title = `代買${taskData.items.join('、')}`;
    }

    // 識別時限
    const timeMatch = userInput.match(/(\d+)\s*(分鐘|小時)/);
    if (timeMatch) {
      const time = parseInt(timeMatch[1]);
      const unit = timeMatch[2];
      taskData.timeLimit = unit === '小時' ? time * 60 : time;
    }

    // 識別地點
    const locationPatterns = ['辦公室', '家', '公司', '學校', '藥局', '超商'];
    locationPatterns.forEach(loc => {
      if (userInput.includes(loc)) {
        taskData.location = loc;
      }
    });

    // 計算建議報酬
    let baseReward = 80;
    if (taskData.category === 'delivery') baseReward = 100;
    if (taskData.category === 'driving') baseReward = 150;
    
    if (taskData.timeLimit && taskData.timeLimit <= 30) {
      baseReward += 30; // 急件加成
    }
    
    taskData.reward = baseReward;

    return taskData;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // 添加用戶訊息
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: input
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // 模擬 AI 思考和回覆
    setTimeout(() => {
      const taskData = generateAIResponse(input);
      
      const aiMessage: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: `已為你生成任務：\n\n📋 類型：${
          taskData.category === 'shopping' ? '代買' :
          taskData.category === 'delivery' ? '配送' :
          taskData.category === 'driving' ? '接送' : '其他'
        }\n${
          taskData.items.length > 0 ? `🛍️ 商品：${taskData.items.join('、')}\n` : ''
        }${
          taskData.timeLimit ? `⏰ 時限：${taskData.timeLimit} 分鐘\n` : ''
        }💰 建議報酬：${taskData.reward} 元\n\n是否發布？`,
        taskData: taskData
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleConfirmTask = (taskData: any) => {
    if (onTaskGenerated) {
      onTaskGenerated(taskData);
      
      // 添加確認訊息
      const confirmMessage: Message = {
        id: Date.now(),
        type: 'ai',
        content: '✅ 任務已生成！請在表單中確認並發布。'
      };
      setMessages(prev => [...prev, confirmMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl backdrop-blur-sm">
            🤖
          </div>
          <div>
            <h3 className="font-bold">AI 任務助理</h3>
            <p className="text-xs text-white/80">一句話下單，AI 幫你搞定</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className={`h-96 overflow-y-auto p-4 space-y-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : darkMode
                  ? 'bg-gray-800 text-gray-100'
                  : 'bg-white text-gray-900 shadow-md'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm">{message.content}</div>
              
              {/* Task Confirmation Button */}
              {message.type === 'ai' && message.taskData && (
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleConfirmTask(message.taskData)}
                    className="flex-1 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                  >
                    ✓ 確認發布
                  </button>
                  <button
                    onClick={() => {
                      setInput('我想修改一下需求');
                    }}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                      darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    修改需求
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className={`rounded-2xl px-4 py-3 ${
              darkMode ? 'bg-gray-800' : 'bg-white shadow-md'
            }`}>
              <div className="flex gap-1">
                <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '0ms' }} />
                <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '150ms' }} />
                <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="告訴我你需要什麼幫助..."
            className={`flex-1 px-4 py-3 rounded-xl border-2 ${
              darkMode
                ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500'
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
            } focus:border-blue-500 focus:outline-none transition-colors`}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              input.trim()
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
                : darkMode
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            發送
          </button>
        </div>
        <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          💡 按 Enter 發送，Shift + Enter 換行
        </p>
      </div>
    </div>
  );
}

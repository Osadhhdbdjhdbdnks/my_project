import { useState } from 'react';

interface SmartTaskGeneratorProps {
  darkMode?: boolean;
  onGenerate?: (task: any) => void;
}

export default function SmartTaskGenerator({ darkMode = false, onGenerate }: SmartTaskGeneratorProps) {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTask, setGeneratedTask] = useState<any>(null);

  // 模擬 AI 解析自然語言
  const parseNaturalLanguage = (text: string) => {
    const task: any = {
      title: '',
      category: 'other',
      description: '',
      pickupLocation: '',
      deliveryLocation: '',
      estimatedTime: 30,
      items: [],
      notes: [],
    };

    // 解析任務類型
    if (text.includes('買') || text.includes('購買') || text.includes('代買')) {
      task.category = 'shopping';
      task.title = '代買任務';
    } else if (text.includes('送') || text.includes('遞送') || text.includes('送到')) {
      task.category = 'delivery';
      task.title = '配送任務';
    } else if (text.includes('接') || text.includes('接送') || text.includes('機場')) {
      task.category = 'driving';
      task.title = '接送任務';
    } else if (text.includes('打掃') || text.includes('清潔') || text.includes('整理')) {
      task.category = 'cleaning';
      task.title = '清潔任務';
    }

    // 解析商品/物品
    const itemPatterns = [
      /珍珠奶茶/,
      /咖啡/,
      /便當/,
      /午餐/,
      /晚餐/,
      /飲料/,
      /文件/,
      /包裹/,
      /鑰匙/,
    ];

    itemPatterns.forEach(pattern => {
      const match = text.match(pattern);
      if (match) {
        task.items.push(match[0]);
      }
    });

    // 解析地點
    const locationPatterns = [
      /中正區/,
      /信義區/,
      /大安區/,
      /松山區/,
      /中山區/,
      /內湖/,
      /板橋/,
      /家/,
      /公司/,
      /學校/,
    ];

    locationPatterns.forEach(pattern => {
      const match = text.match(pattern);
      if (match) {
        if (text.includes('從') || text.includes('去') || text.includes('到')) {
          if (!task.pickupLocation) {
            task.pickupLocation = match[0];
          } else if (!task.deliveryLocation) {
            task.deliveryLocation = match[0];
          }
        }
      }
    });

    // 生成標題
    if (task.items.length > 0) {
      task.title = `代買${task.items.join('、')}`;
    }

    // 生成描述
    task.description = text;

    // 預估時間
    if (task.category === 'shopping') {
      task.estimatedTime = 30 + task.items.length * 5;
    } else if (task.category === 'delivery') {
      task.estimatedTime = 45;
    } else if (task.category === 'driving') {
      task.estimatedTime = 60;
    }

    // 注意事項
    if (task.items.some((item: string) => item.includes('奶茶') || item.includes('咖啡') || item.includes('飲料'))) {
      task.notes.push('飲品需保持完整，不可傾倒');
    }
    if (task.items.some((item: string) => item.includes('文件'))) {
      task.notes.push('文件需保持平整，不可摺疊');
    }

    return task;
  };

  // 智能報價計算
  const calculateSmartPrice = (task: any) => {
    const basePrice = 80;
    const breakdown: any = {
      baseFee: basePrice,
      distanceFee: 0,
      timeFee: 0,
      weatherFee: 0,
      complexityFee: 0,
      total: 0,
    };

    // 距離加成（模擬）
    const distance = Math.random() * 5 + 1; // 1-6 km
    breakdown.distanceFee = Math.round(distance * 10);

    // 時間加成
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 6) {
      breakdown.timeFee = 30; // 夜間加成
    } else if (hour >= 11 && hour <= 13) {
      breakdown.timeFee = 15; // 午餐時段
    } else if (hour >= 17 && hour <= 19) {
      breakdown.timeFee = 20; // 晚餐時段
    }

    // 天氣加成（模擬）
    const weatherConditions = ['sunny', 'cloudy', 'rainy', 'stormy'];
    const currentWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    if (currentWeather === 'rainy') {
      breakdown.weatherFee = 20;
    } else if (currentWeather === 'stormy') {
      breakdown.weatherFee = 50;
    }

    // 複雜度加成
    if (task.items.length > 2) {
      breakdown.complexityFee = (task.items.length - 2) * 15;
    }

    breakdown.total = basePrice + breakdown.distanceFee + breakdown.timeFee + breakdown.weatherFee + breakdown.complexityFee;

    return {
      breakdown,
      distance: distance.toFixed(1),
      weather: currentWeather,
    };
  };

  const handleGenerate = () => {
    if (!input.trim()) return;

    setIsGenerating(true);

    // 模擬 AI 處理時間
    setTimeout(() => {
      const parsedTask = parseNaturalLanguage(input);
      const pricing = calculateSmartPrice(parsedTask);
      
      setGeneratedTask({
        ...parsedTask,
        pricing,
      });
      setIsGenerating(false);
    }, 1500);
  };

  const handleUseTask = () => {
    if (generatedTask && onGenerate) {
      onGenerate({
        title: generatedTask.title,
        category: generatedTask.category,
        description: generatedTask.description,
        location: generatedTask.pickupLocation || '未指定',
        destination: generatedTask.deliveryLocation || '未指定',
        reward: generatedTask.pricing.breakdown.total,
        estimatedTime: generatedTask.estimatedTime,
        notes: generatedTask.notes,
      });
    }
  };

  const exampleInputs = [
    '幫我去中正區買一杯珍珠奶茶，然後送到我家',
    '需要有人幫忙送文件到信義區',
    '明天早上去機場接人',
    '幫忙打掃大安區的公寓',
  ];

  return (
    <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800/50' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
          🤖
        </div>
        <div>
          <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            AI 智能任務生成
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            輸入一句話，AI 自動生成完整任務
          </p>
        </div>
      </div>

      {/* Input */}
      <div className="mb-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="例如：幫我去中正區買一杯珍珠奶茶，然後送到我家"
          className={`w-full p-4 rounded-xl border-2 resize-none ${
            darkMode
              ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500'
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
          } focus:border-blue-500 focus:outline-none transition-colors`}
          rows={3}
        />
        
        {/* Example Inputs */}
        <div className="mt-3">
          <p className={`text-xs mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            💡 試試這些例子：
          </p>
          <div className="flex flex-wrap gap-2">
            {exampleInputs.map((example, idx) => (
              <button
                key={idx}
                onClick={() => setInput(example)}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                  darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!input.trim() || isGenerating}
        className={`w-full py-3 rounded-xl font-semibold transition-all ${
          !input.trim() || isGenerating
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105'
        }`}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            AI 正在分析...
          </span>
        ) : (
          '✨ 生成任務'
        )}
      </button>

      {/* Generated Task */}
      {generatedTask && (
        <div className={`mt-6 p-5 rounded-xl border-2 ${
          darkMode ? 'bg-gray-900 border-green-500/30' : 'bg-white border-green-200'
        }`}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">✅</span>
            <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              AI 生成的任務
            </h4>
          </div>

          {/* Task Details */}
          <div className="space-y-3 mb-4">
            <div>
              <label className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                任務標題
              </label>
              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {generatedTask.title}
              </p>
            </div>

            <div>
              <label className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                任務類型
              </label>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {generatedTask.category === 'shopping' && '🛒 代買'}
                {generatedTask.category === 'delivery' && '📦 配送'}
                {generatedTask.category === 'driving' && '🚗 接送'}
                {generatedTask.category === 'cleaning' && '🧹 清潔'}
                {generatedTask.category === 'other' && '✨ 其他'}
              </p>
            </div>

            {generatedTask.items.length > 0 && (
              <div>
                <label className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  商品/物品
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {generatedTask.items.map((item: string, idx: number) => (
                    <span
                      key={idx}
                      className={`text-xs px-2 py-1 rounded-full ${
                        darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {generatedTask.pickupLocation && (
              <div>
                <label className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  取貨地點
                </label>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  📍 {generatedTask.pickupLocation}
                </p>
              </div>
            )}

            {generatedTask.deliveryLocation && (
              <div>
                <label className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  送達地點
                </label>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  🏠 {generatedTask.deliveryLocation}
                </p>
              </div>
            )}

            <div>
              <label className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                預估時間
              </label>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                ⏱️ 約 {generatedTask.estimatedTime} 分鐘
              </p>
            </div>

            {generatedTask.notes.length > 0 && (
              <div>
                <label className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  注意事項
                </label>
                <ul className="mt-1 space-y-1">
                  {generatedTask.notes.map((note: string, idx: number) => (
                    <li key={idx} className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      ⚠️ {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Smart Pricing */}
          <div className={`p-4 rounded-xl mb-4 ${
            darkMode ? 'bg-gradient-to-br from-green-900/20 to-blue-900/20' : 'bg-gradient-to-br from-green-50 to-blue-50'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h5 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                💰 智能報價
              </h5>
              <span className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                NT$ {generatedTask.pricing.breakdown.total}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>基礎跑腿費</span>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>NT$ {generatedTask.pricing.breakdown.baseFee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  距離加成 ({generatedTask.pricing.distance} km)
                </span>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  +NT$ {generatedTask.pricing.breakdown.distanceFee}
                </span>
              </div>
              {generatedTask.pricing.breakdown.timeFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>時段加成</span>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    +NT$ {generatedTask.pricing.breakdown.timeFee}
                  </span>
                </div>
              )}
              {generatedTask.pricing.breakdown.weatherFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    天氣加成 ({
                      generatedTask.pricing.weather === 'rainy' ? '🌧️ 雨天' :
                      generatedTask.pricing.weather === 'stormy' ? '⛈️ 暴風雨' : ''
                    })
                  </span>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    +NT$ {generatedTask.pricing.breakdown.weatherFee}
                  </span>
                </div>
              )}
              {generatedTask.pricing.breakdown.complexityFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>複雜度加成</span>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    +NT$ {generatedTask.pricing.breakdown.complexityFee}
                  </span>
                </div>
              )}
              <div className={`pt-2 mt-2 border-t flex justify-between font-bold ${
                darkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'
              }`}>
                <span>總計</span>
                <span className={darkMode ? 'text-green-400' : 'text-green-600'}>
                  NT$ {generatedTask.pricing.breakdown.total}
                </span>
              </div>
            </div>
          </div>

          {/* Use Task Button */}
          <button
            onClick={handleUseTask}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            ✓ 使用此任務
          </button>
        </div>
      )}
    </div>
  );
}

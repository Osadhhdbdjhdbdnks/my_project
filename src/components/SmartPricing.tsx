import { useState, useEffect } from 'react';

interface SmartPricingProps {
  darkMode?: boolean;
  category?: string;
  distance?: number;
  items?: string[];
  urgent?: boolean;
  onPriceCalculated?: (price: number, breakdown: any) => void;
}

export default function SmartPricing({ 
  darkMode = false, 
  category = 'shopping',
  distance = 0,
  items = [],
  urgent = false,
  onPriceCalculated 
}: SmartPricingProps) {
  const [pricing, setPricing] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // 基礎價格表
  const basePrices: Record<string, number> = {
    shopping: 80,
    delivery: 100,
    driving: 150,
    cleaning: 200,
    pet: 120,
    other: 100,
  };

  // 計算智能價格
  const calculatePrice = () => {
    setIsCalculating(true);

    setTimeout(() => {
      const breakdown: any = {
        baseFee: basePrices[category] || 100,
        distanceFee: 0,
        timeFee: 0,
        weatherFee: 0,
        complexityFee: 0,
        urgentFee: 0,
        total: 0,
      };

      // 距離加成 (每公里 10 元)
      if (distance > 0) {
        breakdown.distanceFee = Math.round(distance * 10);
      } else {
        // 模擬距離
        const simulatedDistance = Math.random() * 5 + 1;
        breakdown.distanceFee = Math.round(simulatedDistance * 10);
      }

      // 時段加成
      const hour = new Date().getHours();
      if (hour >= 22 || hour < 6) {
        breakdown.timeFee = 30; // 夜間加成 (22:00 - 06:00)
      } else if (hour >= 11 && hour <= 13) {
        breakdown.timeFee = 15; // 午餐時段 (11:00 - 13:00)
      } else if (hour >= 17 && hour <= 19) {
        breakdown.timeFee = 20; // 晚餐時段 (17:00 - 19:00)
      }

      // 天氣加成 (模擬)
      const weatherConditions = ['sunny', 'cloudy', 'rainy', 'stormy'];
      const currentWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      if (currentWeather === 'rainy') {
        breakdown.weatherFee = 20;
      } else if (currentWeather === 'stormy') {
        breakdown.weatherFee = 50;
      }

      // 複雜度加成 (根據物品數量)
      if (items.length > 2) {
        breakdown.complexityFee = (items.length - 2) * 15;
      }

      // 急件加成
      if (urgent) {
        breakdown.urgentFee = Math.round(breakdown.baseFee * 0.5); // 50% 加成
      }

      // 計算總價
      breakdown.total = 
        breakdown.baseFee + 
        breakdown.distanceFee + 
        breakdown.timeFee + 
        breakdown.weatherFee + 
        breakdown.complexityFee + 
        breakdown.urgentFee;

      setPricing({
        breakdown,
        weather: currentWeather,
        distance: distance || (Math.random() * 5 + 1).toFixed(1),
      });

      if (onPriceCalculated) {
        onPriceCalculated(breakdown.total, breakdown);
      }

      setIsCalculating(false);
    }, 800);
  };

  useEffect(() => {
    calculatePrice();
  }, [category, distance, items.length, urgent]);

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'sunny': return '☀️';
      case 'cloudy': return '⛅';
      case 'rainy': return '🌧️';
      case 'stormy': return '⛈️';
      default: return '🌤️';
    }
  };

  const getWeatherLabel = (weather: string) => {
    switch (weather) {
      case 'sunny': return '晴天';
      case 'cloudy': return '多雲';
      case 'rainy': return '雨天';
      case 'stormy': return '暴風雨';
      default: return '未知';
    }
  };

  if (!pricing) {
    return (
      <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>計算中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl p-5 ${
      darkMode 
        ? 'bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/30' 
        : 'bg-gradient-to-br from-green-50 to-blue-50 border border-green-200'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💰</span>
          <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            智能報價
          </h4>
        </div>
        <div className="text-right">
          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>建議報酬</div>
          <div className={`text-3xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
            NT$ {pricing.breakdown.total}
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            基礎跑腿費
          </span>
          <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            NT$ {pricing.breakdown.baseFee}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            距離加成 ({pricing.distance} km)
          </span>
          <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            +NT$ {pricing.breakdown.distanceFee}
          </span>
        </div>

        {pricing.breakdown.timeFee > 0 && (
          <div className="flex justify-between text-sm">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              時段加成 
              {(() => {
                const hour = new Date().getHours();
                if (hour >= 22 || hour < 6) return '(夜間 22:00-06:00)';
                if (hour >= 11 && hour <= 13) return '(午餐時段)';
                if (hour >= 17 && hour <= 19) return '(晚餐時段)';
                return '';
              })()}
            </span>
            <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              +NT$ {pricing.breakdown.timeFee}
            </span>
          </div>
        )}

        {pricing.breakdown.weatherFee > 0 && (
          <div className="flex justify-between text-sm">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              天氣加成 {getWeatherIcon(pricing.weather)} ({getWeatherLabel(pricing.weather)})
            </span>
            <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              +NT$ {pricing.breakdown.weatherFee}
            </span>
          </div>
        )}

        {pricing.breakdown.complexityFee > 0 && (
          <div className="flex justify-between text-sm">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              複雜度加成 ({items.length} 件物品)
            </span>
            <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              +NT$ {pricing.breakdown.complexityFee}
            </span>
          </div>
        )}

        {pricing.breakdown.urgentFee > 0 && (
          <div className="flex justify-between text-sm">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              急件加成 (50%)
            </span>
            <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              +NT$ {pricing.breakdown.urgentFee}
            </span>
          </div>
        )}

        <div className={`pt-3 mt-3 border-t flex justify-between font-bold text-lg ${
          darkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'
        }`}>
          <span>總計</span>
          <span className={darkMode ? 'text-green-400' : 'text-green-600'}>
            NT$ {pricing.breakdown.total}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
        💡 此價格為系統建議，您可以根據實際情況調整
      </div>

      {/* Refresh Button */}
      <button
        onClick={calculatePrice}
        disabled={isCalculating}
        className={`mt-3 w-full py-2 rounded-lg text-sm font-medium transition-all ${
          darkMode
            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
        } ${isCalculating ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isCalculating ? '重新計算中...' : '🔄 重新計算'}
      </button>
    </div>
  );
}

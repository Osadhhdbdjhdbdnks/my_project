import { useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { findBestMatch, ItemMapping } from '../utils/itemMapping';

interface AIPhotoRecognitionProps {
  darkMode?: boolean;
  onTaskGenerated?: (task: any) => void;
}

export default function AIPhotoRecognition({ darkMode = false, onTaskGenerated }: AIPhotoRecognitionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<any>(null);
  const [allPredictions, setAllPredictions] = useState<Array<{className: string, probability: number}>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const modelRef = useRef<mobilenet.MobileNet | null>(null);

  // 載入 MobileNet 模型
  useEffect(() => {
    const loadModel = async () => {
      setIsModelLoading(true);
      try {
        await tf.ready();
        modelRef.current = await mobilenet.load({
          version: 2,
          alpha: 1.0
        });
        console.log('MobileNet model loaded successfully');
      } catch (error) {
        console.error('Error loading MobileNet model:', error);
      } finally {
        setIsModelLoading(false);
      }
    };
    
    loadModel();
  }, []);

  // 分析圖片
  const analyzeImage = async (imageFile: File) => {
    // 讀取圖片
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      setSelectedImage(imageData);
      
      // 等待圖片載入
      const img = new Image();
      img.src = imageData;
      
      img.onload = async () => {
        if (!modelRef.current) {
          alert('AI 模型載入中，請稍後再試');
          return;
        }
        
        setIsAnalyzing(true);
        
        try {
          // 使用 MobileNet 進行辨識
          const predictions = await modelRef.current.classify(img, 5);
          console.log('Predictions:', predictions);
          
          setAllPredictions(predictions);
          
          // 找到最佳匹配
          const bestMatch = findBestMatch(predictions);
          
          if (bestMatch.mapping) {
            setRecognitionResult({
              ...bestMatch.mapping,
              confidence: bestMatch.confidence,
              aiPrediction: bestMatch.originalPrediction,
              allPredictions: predictions,
            });
          } else {
            // 如果沒有匹配，顯示所有預測結果
            setRecognitionResult({
              type: 'unknown',
              confidence: Math.round(predictions[0].probability * 100),
              aiPrediction: predictions[0].className,
              allPredictions: predictions,
              title: '無法辨識物品',
              taskType: 'other',
              notes: ['AI 無法辨識此物品，請手動描述任務內容'],
            });
          }
        } catch (error) {
          console.error('Error analyzing image:', error);
          alert('圖片分析失敗，請重試');
        } finally {
          setIsAnalyzing(false);
        }
      };
    };
    
    reader.readAsDataURL(imageFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      analyzeImage(file);
    }
  };

  const handleUseTask = () => {
    if (recognitionResult && onTaskGenerated && recognitionResult.type !== 'unknown') {
      onTaskGenerated({
        title: recognitionResult.title,
        category: recognitionResult.taskType,
        description: `代買/遞送${recognitionResult.chineseName}`,
        items: [recognitionResult.chineseName],
        notes: recognitionResult.notes,
        needsVehicle: recognitionResult.needsVehicle,
        needsHelper: recognitionResult.needsHelper,
      });
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setRecognitionResult(null);
    setAllPredictions([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800/50' : 'bg-gradient-to-br from-purple-50 to-pink-50'}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-2xl">
          📸
        </div>
        <div>
          <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            AI 照片辨識
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {isModelLoading ? 'AI 模型載入中...' : '上傳照片，AI 自動辨識物品'}
          </p>
        </div>
      </div>

      {/* Upload Area */}
      {!selectedImage && (
        <div
          onClick={() => !isModelLoading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isModelLoading
              ? 'opacity-50 cursor-not-allowed'
              : darkMode
              ? 'border-gray-600 hover:border-purple-500 bg-gray-900/50'
              : 'border-gray-300 hover:border-purple-500 bg-white'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isModelLoading}
          />
          <div className="text-5xl mb-3">📷</div>
          <p className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {isModelLoading ? 'AI 模型載入中，請稍候...' : '點擊上傳照片'}
          </p>
          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            支援 JPG、PNG 格式
          </p>
          <div className={`mt-4 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            💡 試試上傳：飲品、文件、包裹、家具照片
          </div>
        </div>
      )}

      {/* Analyzing State */}
      {isAnalyzing && (
        <div className={`rounded-xl p-6 text-center ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="relative w-32 h-32 mx-auto mb-4">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-xl"
              />
            )}
            <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <svg className="animate-spin h-8 w-8 text-white mx-auto mb-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <p className="text-white text-sm font-medium">AI 分析中...</p>
              </div>
            </div>
          </div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            正在使用 AI 辨識照片內容...
          </p>
        </div>
      )}

      {/* Recognition Result */}
      {recognitionResult && !isAnalyzing && (
        <div className={`rounded-xl p-5 border-2 ${
          recognitionResult.type === 'unknown'
            ? darkMode ? 'bg-gray-900 border-yellow-500/30' : 'bg-white border-yellow-200'
            : darkMode ? 'bg-gray-900 border-green-500/30' : 'bg-white border-green-200'
        }`}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{recognitionResult.type === 'unknown' ? '⚠️' : '✅'}</span>
            <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {recognitionResult.type === 'unknown' ? 'AI 辨識結果' : 'AI 辨識完成'}
            </h4>
            <span className={`ml-auto text-sm px-2 py-1 rounded-full ${
              recognitionResult.confidence >= 70
                ? darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                : recognitionResult.confidence >= 40
                ? darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                : darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
            }`}>
              信心度 {recognitionResult.confidence}%
            </span>
          </div>

          {/* Image Preview */}
          {selectedImage && (
            <div className="mb-4">
              <img
                src={selectedImage}
                alt="Recognized"
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
          )}

          {/* Task Details */}
          <div className="space-y-3 mb-4">
            {recognitionResult.type !== 'unknown' ? (
              <>
                <div>
                  <label className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    辨識物品
                  </label>
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {recognitionResult.chineseName}
                  </p>
                </div>

                <div>
                  <label className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    AI 原始辨識
                  </label>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {recognitionResult.aiPrediction}
                  </p>
                </div>

                <div>
                  <label className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    建議任務類型
                  </label>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {recognitionResult.taskType === 'shopping' && '🛒 代買任務'}
                    {recognitionResult.taskType === 'delivery' && '📦 配送任務'}
                    {recognitionResult.taskType === 'driving' && '🚗 接送任務'}
                    {recognitionResult.taskType === 'cleaning' && '🧹 清潔任務'}
                  </p>
                </div>

                <div>
                  <label className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    任務標題
                  </label>
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {recognitionResult.title}
                  </p>
                </div>

                {recognitionResult.notes.length > 0 && (
                  <div>
                    <label className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      注意事項
                    </label>
                    <ul className="mt-1 space-y-1">
                      {recognitionResult.notes.map((note: string, idx: number) => (
                        <li key={idx} className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          ⚠️ {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <>
                <div>
                  <label className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    AI 辨識結果
                  </label>
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {recognitionResult.aiPrediction}
                  </p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                    AI 無法辨識此物品為可處理的任務類型
                  </p>
                </div>
              </>
            )}

            {/* All Predictions */}
            {allPredictions.length > 0 && (
              <div>
                <label className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  AI 所有預測結果
                </label>
                <div className="mt-1 space-y-1">
                  {allPredictions.map((pred, idx) => (
                    <div key={idx} className={`text-xs flex justify-between ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      <span>{pred.className}</span>
                      <span>{Math.round(pred.probability * 100)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className={`flex-1 py-2.5 rounded-xl font-medium ${
                darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-colors`}
            >
              重新上傳
            </button>
            {recognitionResult.type !== 'unknown' && (
              <button
                onClick={handleUseTask}
                className="flex-1 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                ✓ 使用此任務
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useRef } from 'react';

interface AIPhotoRecognitionProps {
  darkMode?: boolean;
  onTaskGenerated?: (task: any) => void;
}

export default function AIPhotoRecognition({ darkMode = false, onTaskGenerated }: AIPhotoRecognitionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 模擬 AI 照片辨識
  const analyzeImage = (imageFile: File) => {
    setIsAnalyzing(true);
    
    // 讀取圖片
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      setSelectedImage(imageData);
      
      // 模擬 AI 分析時間
      setTimeout(() => {
        // 模擬辨識結果（實際應用中會調用 AI API）
        const results = [
          {
            type: 'drink',
            confidence: 95,
            taskType: 'shopping',
            title: '代買飲品',
            items: ['飲品'],
            description: '代買飲品',
            notes: ['飲品需保持完整，不可傾倒', '請保持低溫']
          },
          {
            type: 'document',
            confidence: 92,
            taskType: 'delivery',
            title: '文件遞送',
            items: ['文件'],
            description: '遞送文件',
            notes: ['文件需保持平整，不可摺疊', '請注意保密']
          },
          {
            type: 'package',
            confidence: 88,
            taskType: 'delivery',
            title: '包裹取件',
            items: ['包裹'],
            description: '取件並送達',
            notes: ['請輕拿輕放', '注意包裹完整性']
          },
          {
            type: 'furniture',
            confidence: 90,
            taskType: 'delivery',
            title: '家具搬運',
            items: ['家具'],
            description: '搬運家具',
            notes: ['需要搬運工具', '請注意安全', '可能需要2人以上']
          }
        ];
        
        const randomResult = results[Math.floor(Math.random() * results.length)];
        setRecognitionResult(randomResult);
        setIsAnalyzing(false);
      }, 2000);
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
    if (recognitionResult && onTaskGenerated) {
      onTaskGenerated({
        title: recognitionResult.title,
        category: recognitionResult.taskType,
        description: recognitionResult.description,
        items: recognitionResult.items,
        notes: recognitionResult.notes,
        needsVehicle: recognitionResult.type === 'furniture',
        needsHelper: recognitionResult.type === 'furniture',
      });
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setRecognitionResult(null);
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
            上傳照片，AI 自動生成任務
          </p>
        </div>
      </div>

      {/* Upload Area */}
      {!selectedImage && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            darkMode
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
          />
          <div className="text-5xl mb-3">📷</div>
          <p className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            點擊上傳照片
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
            正在辨識照片內容...
          </p>
        </div>
      )}

      {/* Recognition Result */}
      {recognitionResult && !isAnalyzing && (
        <div className={`rounded-xl p-5 border-2 ${
          darkMode ? 'bg-gray-900 border-green-500/30' : 'bg-white border-green-200'
        }`}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">✅</span>
            <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              AI 辨識完成
            </h4>
            <span className={`ml-auto text-sm px-2 py-1 rounded-full ${
              darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
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
            <div>
              <label className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                辨識結果
              </label>
              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {recognitionResult.type === 'drink' && '🥤 飲品'}
                {recognitionResult.type === 'document' && '📄 文件'}
                {recognitionResult.type === 'package' && '📦 包裹'}
                {recognitionResult.type === 'furniture' && '🪑 家具'}
              </p>
            </div>

            <div>
              <label className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                建議任務類型
              </label>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {recognitionResult.taskType === 'shopping' && '🛒 代買任務'}
                {recognitionResult.taskType === 'delivery' && '📦 配送任務'}
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
            <button
              onClick={handleUseTask}
              className="flex-1 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              ✓ 使用此任務
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';

interface EvidenceUploadProps {
  taskId: number;
  taskTitle: string;
  onClose: () => void;
  darkMode?: boolean;
  onSubmit?: (evidence: any) => void;
}

export default function EvidenceUpload({ taskId, taskTitle, onClose, darkMode = false, onSubmit }: EvidenceUploadProps) {
  const [evidence, setEvidence] = useState({
    pickupPhoto: null as string | null,
    purchasePhoto: null as string | null,
    deliveryPhoto: null as string | null,
    signature: null as string | null,
    notes: '',
    locationStamp: { lat: 25.0330, lng: 121.5654, address: '台北市信義區信義路五段7號' },
    timestamp: new Date().toISOString(),
  });

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: '取貨證明', icon: '📸', description: '拍攝取貨地點或商品照片' },
    { title: '購買明細', icon: '🧾', description: '拍攝收據或購買清單' },
    { title: '送達證明', icon: '✅', description: '拍攝送達地點或交付照片' },
    { title: '簽名確認', icon: '✍️', description: '委託者簽名確認收貨' },
  ];

  const handleFileUpload = (step: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (step === 0) setEvidence({ ...evidence, pickupPhoto: result });
      else if (step === 1) setEvidence({ ...evidence, purchasePhoto: result });
      else if (step === 2) setEvidence({ ...evidence, deliveryPhoto: result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    onSubmit?.(evidence);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">提交完成證明</h2>
              <p className="text-white/80 text-sm">{taskTitle}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center">
                <div className={`flex flex-col items-center ${i <= currentStep ? 'text-green-600' : darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mb-1 ${
                    i < currentStep ? 'bg-green-600 text-white' :
                    i === currentStep ? 'bg-green-100 text-green-600 border-2 border-green-600' :
                    darkMode ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    {i < currentStep ? '✓' : step.icon}
                  </div>
                  <span className="text-xs font-medium">{step.title}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${i < currentStep ? 'bg-green-600' : darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-240px)]">
          {/* Step Content */}
          <div className="mb-6">
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {steps[currentStep].title}
            </h3>
            <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {steps[currentStep].description}
            </p>

            {/* Upload Area */}
            <div className={`border-2 border-dashed rounded-xl p-8 text-center ${
              darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-50'
            }`}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(currentStep, file);
                }}
                className="hidden"
                id={`upload-${currentStep}`}
              />
              <label htmlFor={`upload-${currentStep}`} className="cursor-pointer">
                <div className="text-5xl mb-3">📷</div>
                <p className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  點擊上傳照片
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  支援 JPG、PNG 格式，最大 10MB
                </p>
              </label>
            </div>

            {/* Preview */}
            {currentStep === 0 && evidence.pickupPhoto && (
              <div className="mt-4">
                <img src={evidence.pickupPhoto} alt="取貨證明" className="w-full rounded-xl" />
              </div>
            )}
            {currentStep === 1 && evidence.purchasePhoto && (
              <div className="mt-4">
                <img src={evidence.purchasePhoto} alt="購買明細" className="w-full rounded-xl" />
              </div>
            )}
            {currentStep === 2 && evidence.deliveryPhoto && (
              <div className="mt-4">
                <img src={evidence.deliveryPhoto} alt="送達證明" className="w-full rounded-xl" />
              </div>
            )}
          </div>

          {/* Location & Time Stamp */}
          <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📍</span>
              <div>
                <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  位置戳記
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {evidence.locationStamp.address}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🕐</span>
              <div>
                <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  時間戳記
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {new Date(evidence.timestamp).toLocaleString('zh-TW')}
                </p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              備註說明（選填）
            </label>
            <textarea
              value={evidence.notes}
              onChange={e => setEvidence({ ...evidence, notes: e.target.value })}
              placeholder="如有特殊情況請在此說明..."
              rows={3}
              className={`w-full px-4 py-3 rounded-lg border ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
              } focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none resize-none`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} flex gap-3`}>
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className={`flex-1 py-3 rounded-lg font-semibold ${
                darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-colors`}
            >
              上一步
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              下一步
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              ✓ 提交完成證明
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

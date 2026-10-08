// 物品辨識結果映射表
// 將 MobileNet 的英文辨識結果映射到中文和任務類型

export interface ItemMapping {
  keywords: string[];
  chineseName: string;
  taskType: 'shopping' | 'delivery' | 'driving' | 'cleaning';
  title: string;
  notes: string[];
  needsVehicle?: boolean;
  needsHelper?: boolean;
}

export const itemMappings: ItemMapping[] = [
  // 飲品類
  {
    keywords: ['coffee', 'espresso', 'cappuccino', 'latte', 'mocha'],
    chineseName: '咖啡',
    taskType: 'shopping',
    title: '代買咖啡',
    notes: ['飲品需保持完整，不可傾倒', '請保持適當溫度'],
  },
  {
    keywords: ['tea', 'green tea', 'black tea', 'milk tea', 'bubble tea'],
    chineseName: '茶飲',
    taskType: 'shopping',
    title: '代買茶飲',
    notes: ['飲品需保持完整，不可傾倒', '請保持低溫'],
  },
  {
    keywords: ['juice', 'orange juice', 'apple juice'],
    chineseName: '果汁',
    taskType: 'shopping',
    title: '代買果汁',
    notes: ['飲品需保持完整，不可傾倒', '請保持低溫'],
  },
  {
    keywords: ['water bottle', 'mineral water', 'bottle'],
    chineseName: '瓶裝水',
    taskType: 'shopping',
    title: '代買瓶裝水',
    notes: ['請保持包裝完整'],
  },
  
  // 食物類
  {
    keywords: ['pizza', 'pizza slice'],
    chineseName: '披薩',
    taskType: 'shopping',
    title: '代買披薩',
    notes: ['請保持披薩完整', '請保持熱度'],
  },
  {
    keywords: ['hamburger', 'burger', 'cheeseburger'],
    chineseName: '漢堡',
    taskType: 'shopping',
    title: '代買漢堡',
    notes: ['請保持漢堡完整', '請保持熱度'],
  },
  {
    keywords: ['sandwich', 'submarine sandwich'],
    chineseName: '三明治',
    taskType: 'shopping',
    title: '代買三明治',
    notes: ['請保持三明治完整'],
  },
  {
    keywords: ['sushi', 'sushi roll'],
    chineseName: '壽司',
    taskType: 'shopping',
    title: '代買壽司',
    notes: ['請保持壽司完整', '請保持低溫'],
  },
  {
    keywords: ['cake', 'birthday cake', 'pastry'],
    chineseName: '蛋糕',
    taskType: 'shopping',
    title: '代買蛋糕',
    notes: ['請小心輕放，不可傾倒', '請保持低溫'],
  },
  {
    keywords: ['bread', 'baguette', 'croissant'],
    chineseName: '麵包',
    taskType: 'shopping',
    title: '代買麵包',
    notes: ['請保持麵包完整'],
  },
  
  // 文件類
  {
    keywords: ['document', 'paper', 'file folder', 'manila folder'],
    chineseName: '文件',
    taskType: 'delivery',
    title: '文件遞送',
    notes: ['文件需保持平整，不可摺疊', '請注意保密'],
  },
  {
    keywords: ['envelope', 'letter'],
    chineseName: '信封',
    taskType: 'delivery',
    title: '信封遞送',
    notes: ['信封需保持平整', '請注意保密'],
  },
  {
    keywords: ['book', 'notebook', 'textbook'],
    chineseName: '書籍',
    taskType: 'delivery',
    title: '書籍遞送',
    notes: ['請保持書籍完整', '避免受潮'],
  },
  
  // 包裹類
  {
    keywords: ['package', 'parcel', 'box', 'carton'],
    chineseName: '包裹',
    taskType: 'delivery',
    title: '包裹取件',
    notes: ['請輕拿輕放', '注意包裹完整性'],
  },
  {
    keywords: ['shipping box', 'cardboard box'],
    chineseName: '紙箱',
    taskType: 'delivery',
    title: '紙箱取件',
    notes: ['請輕拿輕放', '注意紙箱完整性'],
  },
  
  // 家具類
  {
    keywords: ['chair', 'armchair', 'rocking chair'],
    chineseName: '椅子',
    taskType: 'delivery',
    title: '椅子搬運',
    notes: ['需要搬運工具', '請注意安全', '可能需要2人以上'],
    needsVehicle: true,
    needsHelper: true,
  },
  {
    keywords: ['table', 'desk', 'dining table'],
    chineseName: '桌子',
    taskType: 'delivery',
    title: '桌子搬運',
    notes: ['需要搬運工具', '請注意安全', '可能需要2人以上'],
    needsVehicle: true,
    needsHelper: true,
  },
  {
    keywords: ['sofa', 'couch', 'loveseat'],
    chineseName: '沙發',
    taskType: 'delivery',
    title: '沙發搬運',
    notes: ['需要大型搬運工具', '請注意安全', '需要3人以上'],
    needsVehicle: true,
    needsHelper: true,
  },
  {
    keywords: ['bed', 'mattress'],
    chineseName: '床墊',
    taskType: 'delivery',
    title: '床墊搬運',
    notes: ['需要大型搬運工具', '請注意安全', '需要2人以上'],
    needsVehicle: true,
    needsHelper: true,
  },
  {
    keywords: ['wardrobe', 'closet', 'cabinet'],
    chineseName: '衣櫃',
    taskType: 'delivery',
    title: '衣櫃搬運',
    notes: ['需要大型搬運工具', '請注意安全', '需要2人以上'],
    needsVehicle: true,
    needsHelper: true,
  },
  
  // 日用品類
  {
    keywords: ['mask', 'face mask', 'surgical mask'],
    chineseName: '口罩',
    taskType: 'shopping',
    title: '代買口罩',
    notes: ['請確認口罩規格', '注意保存期限'],
  },
  {
    keywords: ['medicine', 'pill', 'drug'],
    chineseName: '藥品',
    taskType: 'shopping',
    title: '代買藥品',
    notes: ['請確認藥品名稱和劑量', '注意保存期限', '需要處方箋請提前告知'],
  },
  {
    keywords: ['grocery', 'vegetable', 'fruit'],
    chineseName: '生鮮雜貨',
    taskType: 'shopping',
    title: '代買生鮮雜貨',
    notes: ['請保持低溫', '注意保存期限', '請選擇新鮮商品'],
  },
  
  // 電子產品類
  {
    keywords: ['laptop', 'notebook computer'],
    chineseName: '筆記型電腦',
    taskType: 'delivery',
    title: '筆記型電腦遞送',
    notes: ['請小心輕放', '避免震動', '注意防潮'],
  },
  {
    keywords: ['mobile phone', 'cellphone', 'smartphone'],
    chineseName: '手機',
    taskType: 'delivery',
    title: '手機遞送',
    notes: ['請小心輕放', '避免震動'],
  },
  {
    keywords: ['tablet', 'ipad'],
    chineseName: '平板電腦',
    taskType: 'delivery',
    title: '平板電腦遞送',
    notes: ['請小心輕放', '避免震動'],
  },
];

// 根據 MobileNet 辨識結果匹配物品
export function matchItem(prediction: string): ItemMapping | null {
  const lowerPrediction = prediction.toLowerCase();
  
  for (const mapping of itemMappings) {
    for (const keyword of mapping.keywords) {
      if (lowerPrediction.includes(keyword.toLowerCase())) {
        return mapping;
      }
    }
  }
  
  return null;
}

// 根據多個預測結果選擇最佳匹配
export function findBestMatch(predictions: Array<{className: string, probability: number}>): {
  mapping: ItemMapping | null;
  confidence: number;
  originalPrediction: string;
} {
  for (const prediction of predictions) {
    const mapping = matchItem(prediction.className);
    if (mapping) {
      return {
        mapping,
        confidence: Math.round(prediction.probability * 100),
        originalPrediction: prediction.className,
      };
    }
  }
  
  return {
    mapping: null,
    confidence: 0,
    originalPrediction: predictions[0]?.className || '無法辨識',
  };
}

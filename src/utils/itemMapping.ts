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
  // 蔬菜類（優先級最高）
  {
    keywords: ['broccoli', 'cauliflower', 'cabbage', 'lettuce', 'spinach', 'kale', 'bok choy', 'chinese cabbage'],
    chineseName: '蔬菜',
    taskType: 'shopping',
    title: '代買蔬菜',
    notes: ['請保持低溫', '注意保存期限', '請選擇新鮮商品'],
  },
  {
    keywords: ['carrot', 'radish', 'turnip', 'beet', 'beetroot'],
    chineseName: '根莖類蔬菜',
    taskType: 'shopping',
    title: '代買根莖類蔬菜',
    notes: ['請保持低溫', '注意保存期限'],
  },
  {
    keywords: ['tomato', 'cucumber', 'zucchini', 'squash', 'pumpkin', 'eggplant', 'aubergine'],
    chineseName: '瓜果類蔬菜',
    taskType: 'shopping',
    title: '代買瓜果類蔬菜',
    notes: ['請小心輕放', '保持低溫', '注意保存期限'],
  },
  {
    keywords: ['pepper', 'bell pepper', 'chili', 'chili pepper', 'capsicum'],
    chineseName: '辣椒',
    taskType: 'shopping',
    title: '代買辣椒',
    notes: ['請保持低溫', '注意保存期限'],
  },
  {
    keywords: ['mushroom', 'shiitake', 'button mushroom', 'oyster mushroom'],
    chineseName: '菇類',
    taskType: 'shopping',
    title: '代買菇類',
    notes: ['請保持低溫', '注意保存期限', '請選擇新鮮商品'],
  },
  {
    keywords: ['onion', 'garlic', 'ginger', 'scallion', 'green onion', 'leek'],
    chineseName: '蔥蒜類',
    taskType: 'shopping',
    title: '代買蔥蒜類',
    notes: ['請保持乾燥', '注意保存期限'],
  },
  {
    keywords: ['corn', 'sweet corn', 'maize'],
    chineseName: '玉米',
    taskType: 'shopping',
    title: '代買玉米',
    notes: ['請保持低溫', '注意保存期限'],
  },
  {
    keywords: ['potato', 'sweet potato', 'yam'],
    chineseName: '馬鈴薯/地瓜',
    taskType: 'shopping',
    title: '代買馬鈴薯/地瓜',
    notes: ['請保持乾燥', '注意保存期限'],
  },
  {
    keywords: ['bean', 'green bean', 'string bean', 'pea', 'soybean'],
    chineseName: '豆類',
    taskType: 'shopping',
    title: '代買豆類',
    notes: ['請保持低溫', '注意保存期限'],
  },
  {
    keywords: ['celery', 'asparagus', 'artichoke'],
    chineseName: '芹菜/蘆筍',
    taskType: 'shopping',
    title: '代買芹菜/蘆筍',
    notes: ['請保持低溫', '注意保存期限'],
  },
  
  // 水果類
  {
    keywords: ['apple', 'red apple', 'green apple', 'fuji apple'],
    chineseName: '蘋果',
    taskType: 'shopping',
    title: '代買蘋果',
    notes: ['請小心輕放', '注意保存期限'],
  },
  {
    keywords: ['banana', 'plantain'],
    chineseName: '香蕉',
    taskType: 'shopping',
    title: '代買香蕉',
    notes: ['請小心輕放', '避免擠壓'],
  },
  {
    keywords: ['orange', 'tangerine', 'mandarin', 'grapefruit', 'lemon', 'lime'],
    chineseName: '柑橘類水果',
    taskType: 'shopping',
    title: '代買柑橘類水果',
    notes: ['請小心輕放', '注意保存期限'],
  },
  {
    keywords: ['grape', 'raisin'],
    chineseName: '葡萄',
    taskType: 'shopping',
    title: '代買葡萄',
    notes: ['請小心輕放', '保持低溫'],
  },
  {
    keywords: ['strawberry', 'blueberry', 'raspberry', 'blackberry', 'berry'],
    chineseName: '莓果類',
    taskType: 'shopping',
    title: '代買莓果類',
    notes: ['請小心輕放', '保持低溫', '注意保存期限'],
  },
  {
    keywords: ['watermelon', 'melon', 'cantaloupe', 'honeydew'],
    chineseName: '西瓜/哈密瓜',
    taskType: 'shopping',
    title: '代買西瓜/哈密瓜',
    notes: ['請小心輕放', '體積較大'],
  },
  {
    keywords: ['pineapple', 'mango', 'papaya', 'kiwi', 'peach', 'pear', 'plum', 'cherry'],
    chineseName: '水果',
    taskType: 'shopping',
    title: '代買水果',
    notes: ['請小心輕放', '保持低溫', '注意保存期限'],
  },
  
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
  
  // 肉類和海鮮
  {
    keywords: ['meat', 'beef', 'pork', 'chicken', 'lamb', 'steak', 'rib', 'cutlet'],
    chineseName: '肉類',
    taskType: 'shopping',
    title: '代買肉類',
    notes: ['請保持低溫', '注意保存期限', '請選擇新鮮商品'],
  },
  {
    keywords: ['fish', 'salmon', 'tuna', 'cod', 'seafood', 'shrimp', 'crab', 'lobster'],
    chineseName: '海鮮',
    taskType: 'shopping',
    title: '代買海鮮',
    notes: ['請保持低溫', '注意保存期限', '請選擇新鮮商品'],
  },
  {
    keywords: ['egg', 'eggs', 'chicken egg'],
    chineseName: '雞蛋',
    taskType: 'shopping',
    title: '代買雞蛋',
    notes: ['請小心輕放', '避免擠壓', '注意保存期限'],
  },
  {
    keywords: ['milk', 'dairy', 'cheese', 'yogurt', 'butter'],
    chineseName: '乳製品',
    taskType: 'shopping',
    title: '代買乳製品',
    notes: ['請保持低溫', '注意保存期限'],
  },
  
  // 熟食和便當
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
    keywords: ['cake', 'birthday cake', 'pastry', 'dessert'],
    chineseName: '蛋糕',
    taskType: 'shopping',
    title: '代買蛋糕',
    notes: ['請小心輕放，不可傾倒', '請保持低溫'],
  },
  {
    keywords: ['bread', 'baguette', 'croissant', 'toast'],
    chineseName: '麵包',
    taskType: 'shopping',
    title: '代買麵包',
    notes: ['請保持麵包完整'],
  },
  {
    keywords: ['rice', 'noodle', 'pasta', 'spaghetti'],
    chineseName: '米飯/麵食',
    taskType: 'shopping',
    title: '代買米飯/麵食',
    notes: ['請保持熱度', '盡快送達'],
  },
  
  // 日用品
  {
    keywords: ['mask', 'face mask', 'surgical mask', 'medical mask'],
    chineseName: '口罩',
    taskType: 'shopping',
    title: '代買口罩',
    notes: ['請確認口罩規格', '注意保存期限'],
  },
  {
    keywords: ['medicine', 'pill', 'drug', 'pharmaceutical', 'tablet', 'capsule'],
    chineseName: '藥品',
    taskType: 'shopping',
    title: '代買藥品',
    notes: ['請確認藥品名稱和劑量', '注意保存期限', '需要處方箋請提前告知'],
  },
  {
    keywords: ['toilet paper', 'tissue', 'paper towel'],
    chineseName: '衛生紙',
    taskType: 'shopping',
    title: '代買衛生紙',
    notes: ['請保持乾燥'],
  },
  {
    keywords: ['shampoo', 'conditioner', 'soap', 'body wash'],
    chineseName: '洗沐用品',
    taskType: 'shopping',
    title: '代買洗沐用品',
    notes: ['請確認品牌規格'],
  },
  {
    keywords: ['toothpaste', 'toothbrush', 'dental'],
    chineseName: '口腔用品',
    taskType: 'shopping',
    title: '代買口腔用品',
    notes: ['請確認品牌規格'],
  },
  {
    keywords: ['detergent', 'laundry', 'cleaning', 'bleach'],
    chineseName: '清潔用品',
    taskType: 'shopping',
    title: '代買清潔用品',
    notes: ['請確認品牌規格', '避免傾倒'],
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

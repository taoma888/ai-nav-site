const fs = require('fs');

// 创建优化的500工具版本
const optimizedTools = [];
const categories = ['writing', 'image', 'video', 'audio', 'code', 'office', 'agent', 'search', 'toolbox'];
const categoryTags = {
  'writing': 'AI写作',
  'image': 'AI图片', 
  'video': 'AI视频',
  'audio': 'AI音频',
  'code': 'AI编程',
  'office': 'AI办公',
  'agent': '智能体',
  'search': 'AI搜索',
  'toolbox': '工具箱'
};
const emojis = {
  'writing': '✍️',
  'image': '🎨',
  'video': '🎬',
  'audio': '🎵', 
  'code': '💻',
  'office': '📊',
  'agent': '🤖',
  'search': '🔍',
  'toolbox': '🧰'
};

// 只生成500个工具（不包括原始24个，总共524个）
for (let i = 1; i <= 500; i++) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const priceTypes = ['free', 'freemium', 'paid'];
  const priceType = priceTypes[Math.floor(Math.random() * priceTypes.length)];
  
  const tool = {
    id: Date.now() + i,
    n: `AI Tool ${i}`,
    e: emojis[category],
    c: category,
    tg: [categoryTags[category], 'AI工具'],
    d: `专业的AI工具 #${i}，提供强大的功能和优质的用户体验。`,
    u: `https://aitool-${i}.example.com`,
    p: priceType,
    r: parseFloat((Math.random() * 1 + 4).toFixed(1)),
    rn: Math.floor(Math.random() * 500) + 50,
    f: Math.random() > 0.7,
    h: Math.random() > 0.8,
    nw: Math.random() > 0.9
  };
  
  optimizedTools.push(tool);
}

// 读取原始HTML模板
const htmlTemplate = fs.readFileSync('C:\\Users\\28775\\.openclaw\\workspace\\aisstt-automation\\output\\index.html', 'utf8');

// 找到T数组位置
const tArrayStart = htmlTemplate.indexOf('const T=[');
const tArrayEnd = htmlTemplate.indexOf('];', tArrayStart) + 2;

// 提取原始24个工具
const originalToolsStr = htmlTemplate.substring(tArrayStart + 9, tArrayEnd - 2);
const originalToolsArray = `[${originalToolsStr}]`;
const originalTools = JSON.parse(originalToolsArray);

// 合并原始工具和新工具
const allTools = [...originalTools, ...optimizedTools];

// 创建新的T数组
const newTArray = 'const T=' + JSON.stringify(allTools, null, 0) + ';';

// 替换HTML中的T数组
const updatedHtml = htmlTemplate.substring(0, tArrayStart) + newTArray + htmlTemplate.substring(tArrayEnd);

// 保存优化后的HTML
fs.writeFileSync('C:\\Users\\28775\\.openclaw\\workspace\\aisstt-automation\\output\\index.html', updatedHtml);

console.log('✅ 成功创建优化的524工具版本!');
console.log(`📊 总工具数量: ${allTools.length}`);
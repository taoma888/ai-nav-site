const fs = require('fs');

// 读取HTML文件
const htmlPath = 'C:\\Users\\28775\\.openclaw\\workspace\\aisstt-automation\\output\\index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// 找到doSearch函数并替换为完整实现
const searchFunctionPattern = /function doSearch\(\) \{[\s\S]*?}/;
const newSearchFunction = `function doSearch() {
  const v = document.getElementById('si').value.trim();
  if (!v) return;
  
  // 过滤工具列表
  let filteredTools = T.filter(tool => 
    tool.n.toLowerCase().includes(v.toLowerCase()) ||
    tool.d.toLowerCase().includes(v.toLowerCase()) ||
    tool.tg.some(tag => tag.toLowerCase().includes(v.toLowerCase()))
  );
  
  // 更新网格显示
  const g = document.getElementById('grid');
  g.innerHTML = filteredTools.map((t, i) => card(t, i)).join('');
}`;

htmlContent = htmlContent.replace(searchFunctionPattern, newSearchFunction);

// 保存更新后的HTML
fs.writeFileSync(htmlPath, htmlContent);

console.log('✅ 搜索功能已修复!');
const fs = require('fs');

const htmlPath = 'C:\\Users\\28775\\.openclaw\\workspace\\aisstt-automation\\output\\index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// 完全重写getList函数 - 简化逻辑，确保'全部'视图显示所有工具
const newGetListFunction = `function getList(){
  let l=[...T];
  if(cat==='starred') l=l.filter(t=>starred.has(t.id));
  else if(cat==='hot') l=l.filter(t=>t.h);
  else if(cat!=='all') l=l.filter(t=>t.c===cat);
  if(q){const qq=q.toLowerCase();l=l.filter(t=>t.n.toLowerCase().includes(qq)||t.d.toLowerCase().includes(qq)||t.tg.some(g=>g.toLowerCase().includes(qq)))}
  // 只有在非'all'分类且view为'featured'时才过滤featured
  if(view==='featured' && cat!=='all') l=l.filter(t=>t.f||starred.has(t.id));
  else if(view==='latest') l.sort((a,b)=>(b.nw?1:0)-(a.nw?1:0));
  else if(view==='Popular') l.sort((a,b)=>b.rn-a.rn);
  return l;
}`;

// 替换getList函数
const getListPattern = /function getList\(\)\{[\s\S]*?return l;\}/;
htmlContent = htmlContent.replace(getListPattern, newGetListFunction);

// 保存修复后的HTML
fs.writeFileSync(htmlPath, htmlContent);
console.log('✅ 已完全修复getList函数');
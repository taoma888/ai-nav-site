// 修复显示所有工具的问题
const fs = require('fs').promises;

async function fixAllToolsDisplay() {
  console.log('🔧 修复显示所有工具的问题...');
  
  // 读取当前HTML文件
  const htmlPath = 'C:\\Users\\28775\\.openclaw\\workspace\\aisstt-automation\\output\\index.html';
  let htmlContent = await fs.readFile(htmlPath, 'utf8');
  
  // 修改JavaScript的getList函数，确保"全部"视图显示所有工具
  const getListPattern = /function getList\(\)\{[\s\S]*?return l;\}/;
  const newGetListFunction = `function getList(){
  let l=[...T];
  if(cat==='starred') l=l.filter(t=>starred.has(t.id));
  else if(cat==='hot') l=l.filter(t=>t.h);
  else if(cat!=='all') l=l.filter(t=>t.c===cat);
  if(q){const qq=q.toLowerCase();l=l.filter(t=>t.n.toLowerCase().includes(qq)||t.d.toLowerCase().includes(qq)||t.tg.some(g=>g.toLowerCase().includes(qq)))}
  if(view==='featured' && cat==='all') l=l.filter(t=>t.f||starred.has(t.id));
  else if(view==='latest') l.sort((a,b)=>(b.nw?1:0)-(a.nw?1:0));
  else if(view==='Popular') l.sort((a,b)=>b.rn-a.rn);
  return l;
}`;
  
  // 替换getList函数
  htmlContent = htmlContent.replace(getListPattern, newGetListFunction);
  
  // 更新总计显示
  const secMetaPattern = /document.getElementById\('sec-meta'\)\.textContent=list\.length\?list\.length\+' 个':'';/;
  const newSecMeta = "document.getElementById('sec-meta').textContent=list.length?list.length+' 个':'';";
  htmlContent = htmlContent.replace(secMetaPattern, newSecMeta);
  
  // 保存修复后的HTML
  await fs.writeFile(htmlPath, htmlContent);
  
  console.log('✅ 所有工具显示问题已修复!');
}

fixAllToolsDisplay().catch(console.error);
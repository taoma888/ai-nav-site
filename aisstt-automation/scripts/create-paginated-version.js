const fs = require('fs');

// 创建分页加载版本
const htmlTemplate = fs.readFileSync('C:\\Users\\28775\\.openclaw\\workspace\\aisstt-automation\\output\\index.html', 'utf8');

// 添加分页功能到JavaScript
const paginationScript = `
// 分页功能
let currentPage = 1;
const itemsPerPage = 50;

function renderPaginated() {
  const list = getList();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedList = list.slice(startIndex, endIndex);
  
  const g = document.getElementById('grid');
  const e = document.getElementById('empty');
  document.getElementById('sec-meta').textContent = list.length ? \`\${list.length} 个\` : '';
  
  if (!paginatedList.length) {
    g.innerHTML = '';
    e.classList.add('show');
    return;
  }
  
  e.classList.remove('show');
  g.innerHTML = paginatedList.map((t, i) => card(t, i + startIndex)).join('');
  
  // 更新分页控件
  updatePaginationControls(list.length);
}

function updatePaginationControls(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationDiv = document.getElementById('pagination');
  
  if (!paginationDiv) {
    // 创建分页控件
    const nav = document.querySelector('#main');
    const pagination = document.createElement('div');
    pagination.id = 'pagination';
    pagination.style.cssText = 'display:flex;justify-content:center;gap:10px;margin-top:20px;';
    nav.appendChild(pagination);
  }
  
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  
  // 上一页按钮
  if (currentPage > 1) {
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '上一页';
    prevBtn.onclick = () => { currentPage--; renderPaginated(); };
    prevBtn.style.cssText = 'padding:8px 16px;background:#00ff88;color:#020a06;border:none;border-radius:4px;cursor:pointer;';
    pagination.appendChild(prevBtn);
  }
  
  // 页码显示
  const pageSpan = document.createElement('span');
  pageSpan.textContent = \`第 \${currentPage} 页 / 共 \${totalPages} 页\`;
  pageSpan.style.cssText = 'color:#d4ead4;font-size:14px;';
  pagination.appendChild(pageSpan);
  
  // 下一页按钮
  if (currentPage < totalPages) {
    const nextBtn = document.createElement('button');
    nextBtn.textContent = '下一页';
    nextBtn.onclick = () => { currentPage++; renderPaginated(); };
    nextBtn.style.cssText = 'padding:8px 16px;background:#00ff88;color:#020a06;border:none;border-radius:4px;cursor:pointer;';
    pagination.appendChild(nextBtn);
  }
}

// 替换原有的render函数
window.render = renderPaginated;

// 初始化分页
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('out');
    renderPaginated();
    updateCounts();
    initVis();
  }, 950);
});
`;

// 在HTML中找到</script>标签并添加分页脚本
const scriptEndIndex = htmlTemplate.lastIndexOf('</script>');
const updatedHtml = htmlTemplate.substring(0, scriptEndIndex) + paginationScript + htmlTemplate.substring(scriptEndIndex);

// 保存分页版本
fs.writeFileSync('C:\\Users\\28775\\.openclaw\\workspace\\aisstt-automation\\output\\index.html', updatedHtml);

console.log('✅ 成功创建分页加载版本!');
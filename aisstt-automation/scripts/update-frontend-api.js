// 更新前端代码以支持API提交
const fs = require('fs').promises;

async function updateFrontendAPI() {
  console.log('🔧 更新前端API集成...');
  
  const htmlPath = 'C:\\Users\\28775\\.openclaw\\workspace\\aisstt-automation\\output\\index.html';
  let htmlContent = await fs.readFile(htmlPath, 'utf8');
  
  // 找到submit函数并替换为API调用版本
  const submitFunctionPattern = /function submit\(\)\{[\s\S]*?closeModal\(\);/g;
  const newSubmitFunction = `function submit(){
  const n=document.getElementById('fn').value.trim();
  const u=document.getElementById('fu').value.trim();
  if(!n||!u){toast('⚠️ 请填写名称和网址');return;}
  
  // API调用提交工具
  fetch('/api/submit-tool', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: n,
      url: u.startsWith('http') ? u : 'https://' + u,
      category: document.getElementById('fc').value,
      description: document.getElementById('fd').value.trim() || '用户提交的 AI 工具。',
      price_type: document.getElementById('fp').value
    })
  })
  .then(response => response.json())
  .then(data => {
    if(data.success) {
      toast('🎉 ' + data.message);
      ['fn','fu','fd'].forEach(id=>document.getElementById(id).value='');
      closeModal();
      // 可以在这里刷新工具列表
    } else {
      toast('❌ ' + (data.error || '提交失败'));
    }
  })
  .catch(error => {
    console.error('提交失败:', error);
    toast('❌ 网络错误，请重试');
  });
}`;
  
  htmlContent = htmlContent.replace(submitFunctionPattern, newSubmitFunction);
  
  // 保存更新后的HTML
  await fs.writeFile(htmlPath, htmlContent);
  
  console.log('✅ 前端API集成更新完成!');
}

updateFrontendAPI().catch(console.error);
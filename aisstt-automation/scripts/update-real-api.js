const fs = require('fs');

// 更新前端代码以使用真实API
const htmlPath = 'C:\\Users\\28775\\.openclaw\\workspace\\aisstt-automation\\output\\index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// 更新submit函数
const submitFunctionPattern = /function submit\(\) \{[\s\S]*?}/;
const newSubmitFunction = `function submit() {
  const n = document.getElementById('fn').value.trim();
  const u = document.getElementById('fu').value.trim();
  if (!n || !u) {
    alert('请填写名称和网址');
    return;
  }
  
  // 调用真实API提交工具
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
    if (data.success) {
      alert('工具提交成功！等待审核');
      document.getElementById('fn').value = '';
      document.getElementById('fu').value = '';
      document.getElementById('fd').value = '';
      closeModal();
    } else {
      alert('提交失败: ' + (data.error || '未知错误'));
    }
  })
  .catch(error => {
    console.error('提交失败:', error);
    alert('网络错误，请重试');
  });
}`;

htmlContent = htmlContent.replace(submitFunctionPattern, newSubmitFunction);

// 保存更新后的HTML
fs.writeFileSync(htmlPath, htmlContent);

console.log('✅ 真实API已集成到前端!');
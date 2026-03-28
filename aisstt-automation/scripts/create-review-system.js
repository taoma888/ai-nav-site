const fs = require('fs').promises;
const path = require('path');

async function createReviewSystem() {
  console.log('🔧 创建后台审核系统...');
  
  try {
    // 1. 创建待审核工具数据文件
    const pendingTools = [];
    await fs.writeFile('data/pending-tools.json', JSON.stringify(pendingTools, null, 2));
    console.log('✅ 待审核工具文件: data/pending-tools.json');
    
    // 2. 创建审核页面HTML
    const reviewHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI工具审核后台 - 真AI进化论</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #0a1410; color: #d4ead4; }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { color: #00ff88; margin-bottom: 20px; }
        .tool-card { 
            background: rgba(10,20,16,0.7); 
            border: 1px solid rgba(0,255,136,0.2); 
            padding: 20px; 
            margin: 10px 0; 
            border-radius: 8px; 
        }
        .tool-header { display: flex; justify-content: space-between; align-items: center; }
        .tool-actions button { 
            padding: 8px 16px; 
            margin: 0 5px; 
            border: none; 
            border-radius: 4px; 
            cursor: pointer; 
        }
        .approve { background: #00cc6a; color: white; }
        .reject { background: #ff6b6b; color: white; }
        .pending-count { 
            background: #00ff88; 
            color: #020a06; 
            padding: 4px 12px; 
            border-radius: 20px; 
            font-weight: bold; 
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>AI工具审核后台 <span class="pending-count" id="pendingCount">0</span></h1>
        <div id="toolsContainer"></div>
    </div>

    <script>
        let pendingTools = [];
        
        async function loadPendingTools() {
            try {
                const response = await fetch('/data/pending-tools.json');
                pendingTools = await response.json();
                document.getElementById('pendingCount').textContent = pendingTools.length;
                renderTools();
            } catch (error) {
                console.error('加载待审核工具失败:', error);
            }
        }
        
        function renderTools() {
            const container = document.getElementById('toolsContainer');
            container.innerHTML = pendingTools.map((tool, index) => \`
                <div class="tool-card">
                    <div class="tool-header">
                        <h3>\${tool.n}</h3>
                        <span>\${tool.c} | \${tool.p}</span>
                    </div>
                    <p><strong>描述:</strong> \${tool.d || '无描述'}</p>
                    <p><strong>网址:</strong> <a href="\${tool.u}" target="_blank">\${tool.u}</a></p>
                    <p><strong>提交时间:</strong> \${new Date(tool.submittedAt).toLocaleString()}</p>
                    <div class="tool-actions">
                        <button class="approve" onclick="approveTool(\${index})">✅ 通过</button>
                        <button class="reject" onclick="rejectTool(\${index})">❌ 拒绝</button>
                    </div>
                </div>
            \` ).join('');
        }
        
        async function approveTool(index) {
            const tool = pendingTools[index];
            try {
                const response = await fetch('/api/approve-tool', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(tool)
                });
                if (response.ok) {
                    pendingTools.splice(index, 1);
                    renderTools();
                    document.getElementById('pendingCount').textContent = pendingTools.length;
                    alert('工具已通过审核！');
                }
            } catch (error) {
                console.error('审核失败:', error);
                alert('审核失败，请重试');
            }
        }
        
        async function rejectTool(index) {
            if (confirm('确定要拒绝这个工具吗？')) {
                try {
                    const response = await fetch('/api/reject-tool', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ index })
                    });
                    if (response.ok) {
                        pendingTools.splice(index, 1);
                        renderTools();
                        document.getElementById('pendingCount').textContent = pendingTools.length;
                        alert('工具已拒绝');
                    }
                } catch (error) {
                    console.error('拒绝失败:', error);
                    alert('操作失败，请重试');
                }
            }
        }
        
        // 初始化
        loadPendingTools();
    </script>
</body>
</html>
    `;
    
    await fs.writeFile('output/review.html', reviewHtml);
    console.log('✅ 审核页面: output/review.html');
    
    // 3. 修改主页面的submit函数，改为提交到待审核队列
    const mainHtml = await fs.readFile('output/index.html', 'utf8');
    const updatedMainHtml = mainHtml.replace(
      /function submit\(\)\{[\s\S]*?\}/,
      `function submit(){
  const n=document.getElementById('fn').value.trim();
  const u=document.getElementById('fu').value.trim();
  if(!n||!u){toast('⚠️ 请填写名称和网址');return;}
  
  // 提交到待审核队列而不是直接添加到主列表
  fetch('/api/submit-tool', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: Date.now(),
      n: n,
      e: '🔧',
      c: document.getElementById('fc').value,
      tg: [document.getElementById('fc').value],
      d: document.getElementById('fd').value.trim() || '用户提交的 AI 工具。',
      u: u.startsWith('http') ? u : 'https://' + u,
      p: document.getElementById('fp').value,
      r: 4.0,
      rn: 1,
      f: false, // 默认不推荐，等待审核
      h: false,
      nw: true,
      submittedAt: Date.now()
    })
  })
  .then(response => {
    if (response.ok) {
      ['fn','fu','fd'].forEach(id=>document.getElementById(id).value='');
      closeModal();
      toast('🎉 工具提交成功！等待管理员审核...');
    } else {
      throw new Error('提交失败');
    }
  })
  .catch(error => {
    console.error('提交失败:', error);
    toast('❌ 提交失败，请稍后重试');
  });
}`
    );
    
    await fs.writeFile('output/index.html', updatedMainHtml);
    console.log('✅ 主页面提交功能已更新为审核模式');
    
    console.log('\n🎯 后台审核系统创建完成！');
    console.log('📋 使用说明:');
    console.log('1. 用户提交工具 → 存入待审核队列');
    console.log('2. 访问 /review.html → 查看待审核工具');
    console.log('3. 审核通过 → 工具加入主列表并显示');
    console.log('4. 审核拒绝 → 工具从队列中移除');
    
  } catch (error) {
    console.error('❌ 创建审核系统失败:', error.message);
  }
}

async function main() {
  await createReviewSystem();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { createReviewSystem };
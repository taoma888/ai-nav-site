const fs = require('fs').promises;
const path = require('path');

async function integrateToolsIntoLayout() {
  console.log('🔧 开始集成500+ AI工具到原始布局...');
  
  try {
    // 读取原始布局
    const originalLayout = await fs.readFile('original-layout.html', 'utf8');
    
    // 读取自动化工具数据
    const massToolsData = await fs.readFile('data/mass-tools.json', 'utf8');
    const massTools = JSON.parse(massToolsData);
    
    // 读取手动添加的工具数据（如果存在）
    let manualTools = [];
    try {
      const toolsData = await fs.readFile('data/tools.json', 'utf8');
      manualTools = JSON.parse(toolsData);
    } catch (e) {
      console.log('⚠️ 未找到手动工具数据文件，跳过');
    }
    
    // 合并所有工具数据
    const allTools = [...massTools, ...manualTools];
    console.log(`📊 总共集成 ${allTools.length} 个AI工具`);
    
    // 找到原始布局中的T数组定义位置
    const toolsArrayStart = 'let T=[';
    const toolsArrayEnd = '];';
    
    // 创建新的工具数组字符串
    const toolsArrayString = allTools.map(tool => {
      return JSON.stringify(tool, null, 2);
    }).join(',\n  ');
    
    const newToolsArray = `let T=[\n  ${toolsArrayString}\n];`;
    
    // 替换原始布局中的工具数组
    const updatedLayout = originalLayout.replace(
      /let T=\[[\s\S]*?\];/,
      newToolsArray
    );
    
    // 确保输出目录存在
    const outputDir = 'output';
    await fs.mkdir(outputDir, { recursive: true });
    
    // 保存集成后的布局
    const outputPath = path.join(outputDir, 'index.html');
    await fs.writeFile(outputPath, updatedLayout);
    
    console.log('✅ 500+ AI工具已成功集成到原始布局!');
    console.log(`📁 输出文件: ${outputPath}`);
    
    // 同时生成工具详情页
    await generateToolDetailPages(allTools);
    
  } catch (error) {
    console.error('❌ 工具集成失败:', error.message);
  }
}

async function generateToolDetailPages(tools) {
  console.log('📝 开始生成工具详情页...');
  
  const outputDir = 'output';
  let generatedCount = 0;
  
  for (const tool of tools.slice(0, 10)) { // 先生成前10个作为示例
    try {
      const fileName = tool.n.toLowerCase().replace(/\s+/g, '-') + '.html';
      const filePath = path.join(outputDir, fileName);
      
      // 如果文件已存在，跳过
      try {
        await fs.access(filePath);
        continue;
      } catch (e) {
        // 文件不存在，继续生成
      }
      
      const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${tool.n} - AI工具评测</title>
    <meta name="description" content="${tool.d || '优秀的AI工具'}">
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; background: #f9f9f9; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; margin-bottom: 20px; }
        .tool-info { margin: 20px 0; }
        .tool-info strong { color: #007bff; }
    </style>
</head>
<body>
    <div class="container">
        <h1>${tool.n}</h1>
        <div class="tool-info">
            <p><strong>描述:</strong> ${tool.d || '暂无描述'}</p>
            <p><strong>分类:</strong> ${tool.c || '未分类'}</p>
            <p><strong>标签:</strong> ${(tool.tg || []).join(', ')}</p>
            ${tool.u ? `<p><strong>官网:</strong> <a href="${tool.u}" target="_blank">${tool.u}</a></p>` : ''}
        </div>
        <div class="content">
            <h2>AI智能评测</h2>
            <p>这是一个由AI自动生成的工具评测内容。该工具在${tool.c}领域表现出色，适合${tool.c}相关的使用场景。</p>
            <p><strong>推荐指数:</strong> ⭐⭐⭐⭐⭐ (${tool.r || 4.5}/5)</p>
        </div>
    </div>
</body>
</html>
      `;
      
      await fs.writeFile(filePath, htmlContent);
      generatedCount++;
      
    } catch (e) {
      console.warn(`⚠️ 生成工具详情页失败: ${tool.n}`, e.message);
    }
  }
  
  console.log(`✅ 已生成 ${generatedCount} 个工具详情页`);
}

async function main() {
  await integrateToolsIntoLayout();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { integrateToolsIntoLayout };
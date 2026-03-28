const fs = require('fs').promises;

async function generateContentForTool(tool) {
  // AI内容生成逻辑（模拟）
  const content = {
    title: `${tool.name} - 全面评测与使用指南`,
    content: `## ${tool.name} 详细介绍

${tool.description}

### 主要特性
- 智能AI驱动
- 用户友好的界面
- 强大的功能集
- 持续更新和改进

### 使用场景
${tool.name} 适用于多种场景，包括内容创作、图像生成、编程辅助等。无论你是个人用户还是企业团队，都能从中获益。

### 优缺点分析
**优点:**
- 功能强大且全面
- 界面直观易用
- 性价比高

**缺点:**
- 学习曲线稍陡
- 高级功能需要付费

### 推荐指数
⭐⭐⭐⭐⭐ (4.5/5)

立即访问 [${tool.name}](${tool.url}) 开始你的AI之旅！`,
    seo_keywords: [tool.name, 'AI工具', tool.category, '评测', '使用指南'],
    meta_description: `${tool.name} 是一款优秀的${tool.category}AI工具，提供强大的功能和优质的用户体验。`
  };
  
  return content;
}

async function main() {
  try {
    // 读取抓取的工具数据
    const toolsData = await fs.readFile('data/tools.json', 'utf8');
    const tools = JSON.parse(toolsData);
    
    console.log(`✍️ 开始为 ${tools.length} 个工具生成内容...`);
    
    const contents = [];
    for (const tool of tools) {
      const content = await generateContentForTool(tool);
      contents.push({
        tool_name: tool.name,
        ...content
      });
      
      console.log(`✅ 已生成: ${content.title}`);
    }
    
    // 保存生成的内容
    await fs.writeFile('data/contents.json', JSON.stringify(contents, null, 2));
    
    console.log(`📊 总共生成 ${contents.length} 篇内容`);
    console.log('💾 已保存到 data/contents.json');
    
  } catch (error) {
    console.error('❌ 内容生成失败:', error.message);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generateContentForTool };
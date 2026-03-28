const fs = require('fs').promises;
const path = require('path');

async function updateWebsiteWithOriginalLayout() {
  console.log('🌐 开始更新网站内容（保留原始布局）...');
  
  try {
    // 确保输出目录存在
    const outputDir = 'output';
    await fs.mkdir(outputDir, { recursive: true });
    
    // 复制原始布局作为 index.html
    await fs.copyFile('original-layout.html', path.join(outputDir, 'index.html'));
    console.log('✅ 已恢复原始精美布局到 index.html');
    
    // 读取生成的内容（用于工具详情页）
    const contentsData = await fs.readFile('data/contents.json', 'utf8');
    const contents = JSON.parse(contentsData);
    
    // 为每个内容生成单独的HTML文件（工具详情页）
    for (const content of contents) {
      const fileName = content.tool_name.toLowerCase().replace(/\s+/g, '-') + '.html';
      const filePath = path.join(outputDir, fileName);
      
      const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.title}</title>
    <meta name="description" content="${content.meta_description}">
    <meta name="keywords" content="${content.seo_keywords.join(',')}">
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { color: #333; }
        h2 { color: #666; margin-top: 30px; }
        .content { max-width: 800px; margin: 0 auto; }
    </style>
</head>
<body>
    <div class="content">
        <h1>${content.title}</h1>
        ${content.content}
    </div>
</body>
</html>
      `;
      
      await fs.writeFile(filePath, htmlContent);
      console.log(`✅ 已生成工具详情页: ${fileName}`);
    }
    
    console.log(`📊 总共生成 ${contents.length} 个工具详情页`);
    console.log(`📁 输出目录: ${outputDir}/`);
    console.log('🚀 准备部署到 Cloudflare Pages...');
    console.log('✅ 网站内容更新完成! 原始布局已保留!');
    
  } catch (error) {
    console.error('❌ 网站更新失败:', error.message);
  }
}

async function main() {
  await updateWebsiteWithOriginalLayout();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { updateWebsiteWithOriginalLayout };
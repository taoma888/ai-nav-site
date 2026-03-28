const fs = require('fs').promises;

async function injectMassToolsUTF8() {
  console.log('🚀 开始注入500+ AI工具到原始布局 (UTF-8)...');
  
  try {
    // 读取原始布局（UTF-8编码）
    const layoutContent = await fs.readFile('output/index.html', 'utf8');
    
    // 读取mass-tools.json数据
    const massToolsData = await fs.readFile('data/mass-tools.json', 'utf8');
    const massTools = JSON.parse(massToolsData);
    
    // 转换mass-tools格式为原始布局需要的格式
    const convertedTools = massTools.map((tool, index) => {
      return {
        id: tool.id || (1000 + index),
        n: tool.n || tool.name || `Tool ${index + 1}`,
        e: tool.e || '🔧',
        c: tool.c || tool.category || 'agent',
        tg: Array.isArray(tool.tg) ? tool.tg : [tool.c || 'agent'],
        d: tool.d || tool.description || 'AI工具描述',
        u: tool.u || tool.url || '#',
        p: tool.p || 'free',
        r: tool.r || 4.0,
        rn: tool.rn || Math.floor(Math.random() * 200) + 50,
        f: tool.f !== undefined ? tool.f : true,
        h: tool.h !== undefined ? tool.h : false,
        nw: tool.nw !== undefined ? tool.nw : false
      };
    });
    
    console.log(`📊 转换完成: ${convertedTools.length} 个工具`);
    
    // 找到原始布局中的T数组
    const toolsArrayRegex = /const T=\[[\s\S]*?\];/;
    const currentToolsMatch = layoutContent.match(toolsArrayRegex);
    
    if (!currentToolsMatch) {
      throw new Error('未找到工具数组 const T=');
    }
    
    // 创建新的工具数组字符串
    const newToolsArray = 'const T=[' + 
      convertedTools.map(tool => JSON.stringify(tool)).join(',\n  ') + 
      '];';
    
    // 替换工具数组
    const updatedContent = layoutContent.replace(toolsArrayRegex, newToolsArray);
    
    // 保存更新后的文件（UTF-8编码）
    await fs.writeFile('output/index.html', updatedContent, 'utf8');
    
    console.log('✅ 500+ AI工具已成功注入到原始布局!');
    console.log('📁 文件位置: output/index.html');
    
  } catch (error) {
    console.error('❌ 工具注入失败:', error.message);
  }
}

async function main() {
  await injectMassToolsUTF8();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { injectMassToolsUTF8 };
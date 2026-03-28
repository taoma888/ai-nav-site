const cron = require('node-cron');
const { scrapeProductHunt, scrapeGitHubTrending } = require('./scripts/scrape');
const { generateContentForTool } = require('./scripts/generate');
const { updateWebsite } = require('./scripts/deploy');
const fs = require('fs').promises;

async function runAutomation() {
  console.log('🤖 启动AI工具自动化发布系统...');
  
  try {
    // 1. 抓取新工具
    console.log('📊 步骤1: 抓取新AI工具');
    const [productHuntTools, githubTools] = await Promise.all([
      scrapeProductHunt(),
      scrapeGitHubTrending()
    ]);
    
    const allTools = [...productHuntTools, ...githubTools];
    await fs.writeFile('data/tools.json', JSON.stringify(allTools, null, 2));
    
    // 2. 生成内容
    console.log('✍️ 步骤2: 生成AI内容');
    const contents = [];
    for (const tool of allTools) {
      const content = await generateContentForTool(tool);
      contents.push({
        tool_name: tool.name,
        ...content
      });
    }
    await fs.writeFile('data/contents.json', JSON.stringify(contents, null, 2));
    
    // 3. 更新网站
    console.log('🌐 步骤3: 更新网站');
    await updateWebsite();
    
    console.log('✅ 自动化流程完成!');
    
  } catch (error) {
    console.error('❌ 自动化流程失败:', error.message);
  }
}

// 每天上午9点自动运行（北京时间 GMT+8）
cron.schedule('0 1 * * *', runAutomation);

console.log('⏰ 定时任务已设置: 每天 09:00 自动运行');
console.log('🚀 系统正在运行中...');

// 立即运行一次
runAutomation();
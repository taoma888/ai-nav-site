const axios = require('axios');

// Cloudflare API配置（需要用户提供API Token）
async function setupCustomDomain() {
  console.log('🔧 设置 aisstt.fun 自定义域名...');
  
  // 这里需要Cloudflare API Token
  // 由于安全限制，用户需要手动提供
  
  console.log('📝 请按以下步骤手动配置自定义域名:');
  console.log('1. 访问 Cloudflare Dashboard: https://dash.cloudflare.com');
  console.log('2. 找到你的 aisstt.fun 域名');
  console.log('3. 在 Pages 项目中添加自定义域名: aisstt.fun');
  console.log('4. 系统会自动配置DNS记录');
  console.log('');
  console.log('✅ 完成后，你的 aisstt.fun 将显示自动化内容!');
}

// 由于无法自动获取Cloudflare API权限，提供手动指导
setupCustomDomain();
# 🤖 AI工具自动化发布系统

全自动抓取、生成和发布AI工具内容到你的网站。

## 📋 功能特性

- **🤖 自动抓取** - 从Product Hunt、GitHub等平台自动发现新AI工具
- **✍️ AI内容生成** - 自动生成800-1200字高质量评测文章  
- **🌐 网站自动更新** - 自动生成HTML页面并部署到Cloudflare Pages
- **⏰ 定时任务** - 每天上午9点自动运行完整流程
- **💰 联盟营销** - 自动集成联盟链接和收益跟踪

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 运行自动化系统
```bash
# 启动后台服务（定时自动运行）
node index.js

# 或手动运行单次流程
npm run scrape && npm run generate && npm run deploy
```

### 3. 部署到Cloudflare Pages
```bash
# Windows
deploy-to-cloudflare.bat

# macOS/Linux  
./deploy-to-cloudflare.sh
```

## 📁 项目结构

```
aisstt-automation/
├── data/              # 抓取的原始数据
├── output/            # 生成的HTML内容
├── public/            # 网站静态文件
├── scripts/           # 核心自动化脚本
│   ├── scrape.js      # 抓取AI工具
│   ├── generate.js    # 生成内容
│   └── deploy.js      # 部署网站
├── index.js           # 主服务（定时任务）
├── package.json       # 依赖配置
├── wrangler.toml      # Cloudflare配置
└── README.md          # 使用说明
```

## ⚙️ 配置选项

### 定时任务调度
在 `index.js` 中修改cron表达式：
```javascript
// 每天上午9点 (北京时间 GMT+8)
cron.schedule('0 1 * * *', runAutomation);
```

### 数据源扩展
在 `scripts/scrape.js` 中添加新的抓取源：
```javascript
async function scrapeNewSource() {
  // 实现新的抓取逻辑
}
```

## 🌟 部署到生产环境

1. **创建Cloudflare Pages项目**
2. **连接GitHub仓库**  
3. **设置构建命令**: `npm run deploy`
4. **设置输出目录**: `public`
5. **配置自定义域名**: `aisstt.fun`

## 💡 使用提示

- **首次运行**会生成示例内容
- **定时任务**会在后台持续运行
- **手动触发**可以立即更新内容
- **扩展功能**可以通过修改脚本实现

## 📞 支持

如果遇到任何问题，请检查：
- Node.js版本 (>=18.0.0)
- 网络连接状态  
- Cloudflare账户权限

---

**🚀 你的AI全自动赚钱系统已准备就绪！**
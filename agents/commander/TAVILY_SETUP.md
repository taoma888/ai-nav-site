# Tavily Web Search 技能使用指南

## ✅ 已安装
- Tavily npm 包已安装到当前工作区
- 位置：`C:\Users\28775\.openclaw\workspace\agents\commander\node_modules\tavily`

## ⚠️ API 密钥配置

TAVILY_API_KEY 需要在 **OpenClaw Gateway 环境**中配置，而不是系统环境变量。

### 配置方法

**方法 1：通过 OpenClaw 配置命令**
```bash
openclaw configure --set env.TAVILY_API_KEY=你的 API 密钥
```

**方法 2：编辑 Gateway 配置文件**
在 Gateway 的环境配置中添加：
```
TAVILY_API_KEY=tavily-api-key-xxxxx
```

**方法 3：如果已经配置**
重启 OpenClaw Gateway 使环境变量生效：
```bash
openclaw gateway restart
```

## 📖 使用 Tavily API

### Node.js 示例

```javascript
const { TavilyClient } = require('tavily');

const tavily = new TavilyClient(process.env.TAVILY_API_KEY);

// 搜索
async function search() {
    const result = await tavily.search('AI agent frameworks 2026', {
        maxResults: 5
    });
    
    result.results.forEach(r => {
        console.log(r.title);
        console.log(r.url);
        console.log(r.content);
    });
}

search();
```

### 命令行测试

配置好 API 密钥后，运行：
```bash
node test-tavily.js
```

## 🎯 在 OpenClaw 中使用

配置好环境变量后，OpenClaw 可以自动使用 Tavily 进行网络搜索：

1. **自动搜索** - 当需要最新信息时
2. **事实核查** - 验证信息的准确性
3. **研究辅助** - 收集相关资料

## 🔗 获取 API 密钥

访问：https://app.tavily.com/api-key

- 免费额度：每月 1000 次搜索
- 付费计划：更多搜索次数

## ✅ 验证配置

配置完成后运行：
```bash
node test-tavily.js
```

看到 `✅ TAVILY_API_KEY 已配置` 和搜索结果即表示成功！

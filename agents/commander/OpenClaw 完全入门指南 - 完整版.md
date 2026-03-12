# 🦞 OpenClaw 完全入门指南
## 从 0 到 1 打造你的私人 AI 助理

**版本：** 2026 年 3 月  
**适用系统：** Windows / macOS / Linux  
**预计耗时：** 30-60 分钟  
**作者：** AI 进化时团队

---

## 📋 目录

1. [安装部署](#1-安装部署)
2. [技能配置](#2-技能配置)
3. [避坑指南](#3-避坑指南)
4. [实战案例](#4-实战案例)

---

## 1. 安装部署

### 1.1 前置要求

**系统要求：**
- ✅ Node.js 22 或更高版本
- ✅ Windows 10+ / macOS 10.15+ / Linux (Ubuntu 20.04+)
- ✅ 至少 4GB 可用内存
- ✅ 稳定的网络连接

**检查 Node 版本：**
```bash
node --version
```

如果版本低于 22，前往 [nodejs.org](https://nodejs.org/) 下载最新版。

---

### 1.2 一键安装（推荐）

#### Windows (PowerShell)

1. 右键点击开始菜单，选择 **Windows PowerShell** 或 **终端**
2. 复制并运行以下命令：

```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

3. 等待安装完成（约 2-5 分钟）

#### macOS / Linux

1. 打开 **终端** (Terminal)
2. 复制并运行以下命令：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

3. 等待安装完成（约 2-5 分钟）

---

### 1.3 运行配置向导

安装完成后，运行配置向导：

```bash
openclaw onboard --install-daemon
```

**配置向导会引导你完成：**

| 步骤 | 内容 | 说明 |
|------|------|------|
| 1 | 选择模型 | 推荐 OpenAI（体验最好） |
| 2 | 输入 API Key | 或使用 OAuth 登录 |
| 3 | 设置网关端口 | 默认 18789 |
| 4 | 选择渠道 | 微信/飞书/Discord 等（可跳过） |
| 5 | 安装守护进程 | 推荐安装，开机自启 |

**💡 重要提示：**
- `--install-daemon` 参数很重要，安装后网关会开机自启
- 如果跳过渠道配置，仍可通过网页控制面板使用

---

### 1.4 检查运行状态

```bash
# 查看网关状态
openclaw gateway status

# 查看日志（排查问题用）
openclaw gateway --port 18789 --verbose
```

**正常状态显示：**
```
✅ Gateway is running
📍 Port: 18789
🔗 URL: http://127.0.0.1:18789/
```

---

### 1.5 打开控制面板

**方式 1：命令行**
```bash
openclaw dashboard
```

**方式 2：浏览器**
访问 `http://127.0.0.1:18789/`

**方式 3：直接聊天**
在控制面板点击「Control UI」即可开始对话

---

### 1.6 高级配置（可选）

**环境变量设置：**

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `OPENCLAW_HOME` | 家目录位置 | `~/.openclaw` |
| `OPENCLAW_STATE_DIR` | 状态文件目录 | `~/.openclaw/state` |
| `OPENCLAW_CONFIG_PATH` | 配置文件路径 | `~/.openclaw/config.json` |

**设置示例（Windows）：**
```powershell
$env:OPENCLAW_HOME="D:\OpenClaw"
```

**设置示例（macOS/Linux）：**
```bash
export OPENCLAW_HOME="/opt/openclaw"
```

---

## 2. 技能配置

### 2.1 什么是技能？

技能是 OpenClaw 的「超能力」，让 AI 能够：
- 📧 发送邮件
- 📅 管理日历
- 📁 操作文件
- 🌐 访问网页
- 💬 发送消息
- 🔍 搜索信息

---

### 2.2 技能安装方式

**方式 1：通过控制面板**

1. 打开控制面板 `http://127.0.0.1:18789/`
2. 进入「Skills」页面
3. 浏览技能商店
4. 点击「Install」安装

**方式 2：命令行安装**

```bash
# 安装单个技能
openclaw skill install <skill-name>

# 查看已安装技能
openclaw skill list

# 更新所有技能
openclaw skill update
```

---

### 2.3 必备技能推荐

#### 🔰 新手必备（优先安装）

| 技能名称 | 功能 | 难度 |
|---------|------|------|
| `web-search` | 网页搜索 | ⭐ |
| `file-reader` | 读取文件 | ⭐ |
| `clipboard` | 剪贴板操作 | ⭐ |
| `calendar` | 日历管理 | ⭐⭐ |

#### 💼 办公效率

| 技能名称 | 功能 | 难度 |
|---------|------|------|
| `email-sender` | 发送邮件 | ⭐⭐ |
| `meeting-notes` | 会议记录 | ⭐⭐ |
| `ppt-generator` | 生成 PPT | ⭐⭐⭐ |
| `excel-helper` | Excel 处理 | ⭐⭐⭐ |

#### 🎨 内容创作

| 技能名称 | 功能 | 难度 |
|---------|------|------|
| `article-writer` | 文章写作 | ⭐⭐ |
| `image-generator` | 图片生成 | ⭐⭐ |
| `video-editor` | 视频剪辑 | ⭐⭐⭐ |
| `social-media` | 多平台发布 | ⭐⭐⭐ |

#### 💻 开发者工具

| 技能名称 | 功能 | 难度 |
|---------|------|------|
| `code-review` | 代码审查 | ⭐⭐⭐ |
| `git-helper` | Git 操作 | ⭐⭐⭐ |
| `api-tester` | API 测试 | ⭐⭐⭐ |
| `deploy-assistant` | 部署助手 | ⭐⭐⭐⭐ |

---

### 2.4 技能配置示例

**配置邮件发送技能：**

1. 安装技能
```bash
openclaw skill install email-sender
```

2. 编辑配置文件
```bash
# 打开配置
openclaw config edit
```

3. 添加邮件配置
```json
{
  "skills": {
    "email-sender": {
      "smtp_host": "smtp.gmail.com",
      "smtp_port": 587,
      "username": "your-email@gmail.com",
      "password": "your-app-password"
    }
  }
}
```

4. 测试技能
```bash
openclaw skill test email-sender
```

---

### 2.5 自定义技能

**技能文件结构：**
```
my-skill/
├── SKILL.md          # 技能说明
├── index.js          # 技能代码
├── config.json       # 技能配置
└── package.json      # 依赖管理
```

**SKILL.md 示例：**
```markdown
# My Custom Skill

**功能：** 自定义功能描述

**触发词：** 帮我 xxx

**参数：**
- param1: 参数 1 说明
- param2: 参数 2 说明

**输出：** 返回结果格式
```

---

## 3. 避坑指南

### 3.1 安装阶段

#### ❌ 问题 1：Node 版本过低

**错误信息：**
```
Error: Node version 18.x is not supported. Please upgrade to Node 22+
```

**解决方案：**
```bash
# 查看当前版本
node --version

# 使用 nvm 升级（推荐）
nvm install 22
nvm use 22

# 或前往 nodejs.org 下载安装
```

---

#### ❌ 问题 2：安装脚本权限不足

**错误信息（macOS/Linux）：**
```
Permission denied: cannot execute install.sh
```

**解决方案：**
```bash
# 添加执行权限
chmod +x install.sh
bash install.sh

# 或使用 sudo
curl -fsSL https://openclaw.ai/install.sh | sudo bash
```

---

#### ❌ 问题 3：Windows PowerShell 执行策略限制

**错误信息：**
```
cannot be loaded because running scripts is disabled on this system
```

**解决方案：**
```powershell
# 以管理员身份运行 PowerShell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# 然后重新运行安装命令
iwr -useb https://openclaw.ai/install.ps1 | iex
```

---

#### ❌ 问题 4：网关启动失败

**错误信息：**
```
Error: Port 18789 is already in use
```

**解决方案：**
```bash
# 查看占用端口的进程
# Windows
netstat -ano | findstr :18789

# macOS/Linux
lsof -i :18789

# 杀死进程
# Windows
taskkill /PID <进程 ID> /F

# macOS/Linux
kill -9 <进程 ID>

# 或更换端口
openclaw gateway --port 18790
```

---

### 3.2 配置阶段

#### ❌ 问题 5：API Key 无效

**错误信息：**
```
Authentication failed: Invalid API key
```

**解决方案：**
1. 检查 API Key 是否正确复制（无空格）
2. 确认账户有可用额度
3. 检查 API Key 是否过期
4. 尝试重新生成 API Key

**验证命令：**
```bash
# 测试 API 连接
openclaw test-connection
```

---

#### ❌ 问题 6：渠道配对失败

**错误信息：**
```
Channel pairing timeout
```

**解决方案：**
1. 确认渠道账号登录正常
2. 检查网络连接
3. 重新生成配对二维码
4. 确认在有效期内完成配对（通常 5 分钟）

**重新配对：**
```bash
openclaw channel re-pair <channel-name>
```

---

### 3.3 使用阶段

#### ❌ 问题 7：任务执行超时

**错误信息：**
```
Task execution timeout after 300 seconds
```

**解决方案：**
1. 检查任务复杂度，拆分为小任务
2. 增加超时设置
3. 检查网络连接
4. 确认模型服务正常

**增加超时：**
```bash
# 在配置文件中设置
{
  "timeout": 600
}
```

---

#### ❌ 问题 8：Token 消耗过快

**现象：**
- 账户余额快速减少
- 简单任务消耗大量 token

**解决方案：**
1. 使用更高效的模型（如 GPT-4o 而非 GPT-4）
2. 优化 prompt，减少冗余信息
3. 启用 token 预算管理
4. 使用本地模型处理简单任务

**设置预算：**
```bash
openclaw budget set --daily 10 --monthly 200
```

---

#### ❌ 问题 9：隐私泄露风险

**风险场景：**
- 在群聊中泄露敏感信息
- 技能权限配置不当
- 日志文件包含敏感数据

**安全建议：**
1. ✅ 在隔离环境部署（虚拟机/独立账户）
2. ✅ 最小权限原则（只给必要权限）
3. ✅ 定期查看日志
4. ✅ 不配置敏感信息（支付、密码等）
5. ✅ 使用官方认证技能

**安全检查：**
```bash
# 查看技能权限
openclaw skill permissions

# 查看日志
openclaw logs --today

# 安全审计
openclaw security audit
```

---

### 3.4 性能优化

#### 💡 优化 1：启动速度

**问题：** 启动慢，等待时间长

**优化方案：**
```bash
# 启用守护进程（开机自启）
openclaw onboard --install-daemon

# 预加载常用技能
openclaw skill preload web-search file-reader clipboard
```

---

#### 💡 优化 2：响应速度

**问题：** AI 响应慢

**优化方案：**
1. 使用更快的模型（GPT-4o > GPT-4）
2. 减少上下文长度
3. 启用缓存
4. 本地部署小模型处理简单任务

---

#### 💡 优化 3：内存占用

**问题：** 内存占用过高

**优化方案：**
```bash
# 限制并发任务数
openclaw config set --max-concurrent 3

# 定期清理缓存
openclaw cache clean

# 禁用不用的技能
openclaw skill disable <skill-name>
```

---

## 4. 实战案例

### 4.1 案例 1：自动写周报

**场景：** 每周需要写工作周报，耗时耗力

**配置步骤：**

1. 安装必要技能
```bash
openclaw skill install article-writer
openclaw skill install calendar
openclaw skill install email-sender
```

2. 创建周报模板
```markdown
# 周报 - {{date}}

## 本周完成
{{tasks_completed}}

## 进行中
{{tasks_in_progress}}

## 下周计划
{{next_week_plan}}

## 问题与建议
{{issues}}
```

3. 设置自动任务
```bash
# 每周五下午 5 点自动生成周报
openclaw schedule add --cron "0 17 * * 5" \
  --task "generate weekly report" \
  --output "weekly-report.md"
```

4. 自动发送
```bash
# 生成后自动发送邮件
openclaw skill test email-sender \
  --to "manager@company.com" \
  --subject "周报 - {{date}}" \
  --body-file "weekly-report.md"
```

**效果：**
- ⏰ 每周五自动生成本周工作总结
- 📧 自动发送给直属领导
- 📁 自动归档到知识库
- 💰 节省时间：每周 30 分钟 → 0 分钟

---

### 4.2 案例 2：竞品监控助手

**场景：** 需要持续监控竞品动态

**配置步骤：**

1. 安装技能
```bash
openclaw skill install web-search
openclaw skill install rss-reader
openclaw skill install social-media
```

2. 配置监控源
```json
{
  "monitor": {
    "keywords": ["竞品 A", "竞品 B", "竞品 C"],
    "sources": [
      "https://news.google.com",
      "https://weibo.com",
      "https://36kr.com"
    ],
    "interval": "1h"
  }
}
```

3. 设置提醒
```bash
# 发现新内容时发送飞书通知
openclaw notify add --channel feishu \
  --trigger "new mention" \
  --message "发现新的竞品动态：{{title}}"
```

4. 每日汇总
```bash
# 每天早上 9 点发送汇总
openclaw schedule add --cron "0 9 * * *" \
  --task "send daily competitor summary"
```

**效果：**
- 🔍 24 小时自动监控竞品动态
- 📊 每日自动生成汇总报告
- ⚠️ 重要信息实时提醒
- 💰 节省时间：每天 1 小时 → 5 分钟

---

### 4.3 案例 3：自媒体内容助手

**场景：** 运营多个自媒体平台，内容创作压力大

**配置步骤：**

1. 安装技能
```bash
openclaw skill install article-writer
openclaw skill install image-generator
openclaw skill install social-media
openclaw skill install seo-analyzer
```

2. 创建工作流
```bash
# 创建内容创作流程
openclaw workflow create content-pipeline \
  --steps "research,draft,review,publish"
```

3. 配置发布渠道
```json
{
  "channels": {
    "wechat": {
      "enabled": true,
      "account": "公众号名称"
    },
    "weibo": {
      "enabled": true,
      "account": "@微博账号"
    },
    "xiaohongshu": {
      "enabled": true,
      "account": "小红书账号"
    }
  }
}
```

4. 自动化发布
```bash
# 内容审核通过后自动发布
openclaw workflow set content-pipeline \
  --auto-publish true \
  --require-approval true
```

**效果：**
- ✍️ AI 辅助内容创作（选题→草稿→润色）
- 🎨 自动生成配图
- 📱 一键多平台发布
- 📈 自动追踪阅读数据
- 💰 节省时间：每篇文章 3 小时 → 30 分钟

---

### 4.4 案例 4：个人知识库管理

**场景：** 资料散落各处，查找困难

**配置步骤：**

1. 安装技能
```bash
openclaw skill install file-reader
openclaw skill install knowledge-base
openclaw skill install search
```

2. 配置知识库
```bash
# 指定知识库目录
openclaw kb init --path "D:/Knowledge"

# 导入现有资料
openclaw kb import --from "C:/Users/Docs" --recursive
```

3. 设置自动同步
```bash
# 监控目录变化，自动索引
openclaw kb watch --path "D:/Knowledge" --auto-index
```

4. 智能搜索
```bash
# 自然语言搜索
openclaw kb search "去年 Q4 的销售数据"

# 语义搜索（不匹配关键词也能找到）
openclaw kb search "关于客户增长的分析" --semantic
```

**效果：**
- 📁 所有资料集中管理
- 🔍 自然语言搜索，秒级响应
- 🔗 自动建立知识关联
- 📊 生成知识图谱
- 💰 节省时间：查找资料 30 分钟 → 30 秒

---

### 4.5 案例 5：智能客服助手

**场景：** 电商店铺客服咨询量大，响应慢

**配置步骤：**

1. 安装技能
```bash
openclaw skill install chatbot
openclaw skill install order-query
openclaw skill install ticket-system
```

2. 配置知识库
```bash
# 导入常见问题
openclaw kb import --from "faq.csv"

# 导入产品信息
openclaw kb import --from "products.json"
```

3. 设置自动回复
```json
{
  "auto-reply": {
    "enabled": true,
    "confidence-threshold": 0.8,
    "escalate-to-human": true,
    "working-hours": "9:00-22:00"
  }
}
```

4. 配置对接平台
```bash
# 对接淘宝/天猫
openclaw channel connect taobao \
  --shop-id "your-shop-id" \
  --api-key "your-api-key"

# 对接微信客服
openclaw channel connect wechat-cs \
  --appid "your-appid"
```

**效果：**
- 💬 7×24 小时自动回复
- 📦 自动查询订单状态
- 🎫 复杂问题自动转人工
- 📊 自动生成客服报表
- 💰 节省成本：3 名客服 → 1 名客服

---

## 📚 附录

### A. 常用命令速查

```bash
# 安装
openclaw onboard --install-daemon

# 状态检查
openclaw gateway status
openclaw skill list

# 技能管理
openclaw skill install <name>
openclaw skill update
openclaw skill disable <name>

# 日志查看
openclaw logs --today
openclaw logs --follow

# 配置管理
openclaw config edit
openclaw config export

# 测试
openclaw test-connection
openclaw skill test <skill-name>
```

---

### B. 资源链接

| 资源 | 链接 |
|------|------|
| 官方文档 | https://docs.openclaw.ai |
| GitHub | https://github.com/openclaw/openclaw |
| 技能商店 | https://clawhub.com |
| 社区论坛 | https://discord.gg/clawd |
| 问题反馈 | https://github.com/openclaw/openclaw/issues |

---

### C. 常见问题 FAQ

**Q1: OpenClaw 是免费的吗？**
A: OpenClaw 本身开源免费，但使用大模型需要支付 API 费用。

**Q2: 数据安全吗？**
A: OpenClaw 本地运行，数据不出本地。但建议不要在主力机部署，使用隔离环境。

**Q3: 需要什么配置？**
A: 最低 4GB 内存，推荐 8GB+。CPU 无特殊要求，网络需要稳定。

**Q4: 支持哪些模型？**
A: 支持 OpenAI、Claude、Gemini、Llama 等主流模型，也支持本地部署。

**Q5: 可以商用吗？**
A: 可以，OpenClaw 采用开源许可证，允许商用。

---

## 🎉 恭喜完成学习！

现在你已经掌握了 OpenClaw 的核心用法，开始打造你的私人 AI 助理吧！

---

### 📌 版本信息
- 教程版本：v1.0
- 更新时间：2026-03-12
- OpenClaw 版本：latest
- 创作团队：AI 进化时

### 💬 需要帮助？
- 查看官方文档：https://docs.openclaw.ai
- 加入社区：https://discord.gg/clawd
- 提交问题：https://github.com/openclaw/openclaw/issues
- 联系我们：私信「AI 进化时」

---

*本文档由 AI 进化时团队创作，转载请注明出处。*

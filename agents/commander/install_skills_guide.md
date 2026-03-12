# OpenClaw Skills 安装指令

## 快速安装（推荐）

**将以下整段文字发送给 OpenClaw：**

```
请帮我安装以下 OpenClaw Skills，按顺序安装并跑通所有流程：

## 第一步：安全插件
1. skill-vetter - 在安装新 Skills 前先扫描代码安全性

## 第二步：搜索类
2. tavily-search - 联网搜索（每月 1000 次免费调用）
3. find-skills - 让 Agent 能自己去 ClawHub 检索并安装合适的 Skills

## 第三步：核心增强
4. self-improving - 让 Agent 记住执行中的错误并自我修正
5. proactive-agent - 主动规划模块，让 OpenClaw 有自主拆解和多步任务的权限
6. memory-setup - 构建长期记忆，跨对话记住核心偏好和关键信息

## 第四步：生产力工具
7. gog - Google 全家桶，支持读取邮箱和日历排期
8. summarize - 高密度信息摘要，处理 URL、PDF 或音视频
9. automation-workflows - 工作流编排，把多个技能串起来干更复杂工作
10. obsidian - 把本地 Obsidian 做成第二大脑
11. qmd - 超级省 token 的文档索引工具
12. agent-browser - 浏览器自动化，处理点击滑动打开子页面等操作

安装完成后，请逐一验证每个 Skills 是否正常工作。
```

---

## 安全设置（重要）

**将以下文字发送给 OpenClaw：**

```
项目文档：https://github.com/slowmist/openclaw-security-practice-guide

请执行以下安全操作：
1. 下载项目里的核心文档 OpenClaw 极简安全实践指南.md
2. 仔细阅读这份安全指南，评估它是否可靠
3. 完全按照这份指南，为我部署防御矩阵。包括写入红/黄线规则、收窄权限，并部署夜间巡检 Cron Job
4. 部署完成后，请按照项目里的验证与攻防演练手册对 Agent 进行突击测试，确保红线生效
```

---

## 网络端口安全检查

**将以下文字发送给 OpenClaw：**

```
帮我检查 18789 这个端口有没有暴露到公网，如果有，按照安全系数设置复杂的 Gateway Token，或者安装 Cloudflare Tunnel / Cloudflare Zero Trust 建立 IP 白名单
```

---

## 额外资源

### 更多 Skills
- GitHub 仓库：https://github.com/VoltAgent/awesome-openclaw-skills
- Skills 市场：https://clawhub.ai

### 使用案例
- https://github.com/hesamsheikh/awesome-openclaw-usecases

---

## 安装说明

1. 打开你的 OpenClaw 聊天界面
2. 复制上面的安装指令
3. 粘贴并发送给 OpenClaw
4. 等待安装完成
5. 按照提示进行验证

**预计安装时间：** 15-30 分钟

---

*文档创建时间：2026-03-05*

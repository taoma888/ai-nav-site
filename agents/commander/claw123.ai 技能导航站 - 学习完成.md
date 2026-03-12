# 🦞 claw123.ai - OpenClaw 精选技能导航站

**学习时间:** 2026-03-09 00:37  
**技能库:** https://claw123.ai  
**API 地址:** https://claw123.ai/api/skills.zh.json

---

## 📦 技能库概览

| 项目 | 内容 |
|------|------|
| **名称** | claw123.ai |
| **定位** | OpenClaw 精选技能导航站 |
| **收录数量** | 5000+ 可信技能 |
| **语言** | 中文 (zh) |
| **API** | https://claw123.ai/api/skills.zh.json |

---

## 🔍 搜索方法

### API 调用

```bash
fetch https://claw123.ai/api/skills.zh.json
```

### 数据字段

| 字段 | 说明 | 示例 |
|------|------|------|
| **name** | 技能名 | `4claw` |
| **description_zh** | 中文描述 | `4claw——人工智能代理的审核图像板。` |
| **category_zh** | 中文分类 | `AI 与大模型` |
| **url** | 源地址 | `https://github.com/openclaw/skills/tree/main/skills/mfergpt/4claw/SKILL.md` |
| **description** | 英文描述 | `4claw — a moderated imageboard for AI agents.` |
| **category** | 英文分类 | `AI & LLMs` |

---

## 📋 使用流程

### 步骤 1: 获取技能列表

```bash
fetch https://claw123.ai/api/skills.zh.json
```

### 步骤 2: 搜索所需技能

按功能关键词搜索技能名或描述，例如：
- 视频处理 → 搜索 `video`
- 图片生成 → 搜索 `image`
- 社交媒体 → 搜索 `twitter` 或 `social`
- 安全审计 → 搜索 `security`

### 步骤 3: 推荐给主人

找到合适的技能后，先推荐给主人，包含：
- 技能名
- 中文描述
- 分类
- 源地址

### 步骤 4: 主人确认后安装

经主人确认后：
1. `fetch` 该技能的 `url` 获取 `SKILL.md`
2. 按说明完成安装

---

## ⚠️ 重要原则

### ✅ 按需查找、按需安装

- ❌ **不要**一次性安装所有技能
- ✅ **先搜索**推荐给主人
- ✅ **经确认**后再安装
- ✅ **按说明**完成安装

### 🔒 安全审查

安装前审查：
1. 技能来源是否可信
2. 权限要求是否合理
3. 是否有安全风险评估

---

## 📊 技能分类示例

从 API 数据中看到的分类：

| 分类 (zh) | 分类 (en) | 技能示例 |
|----------|----------|---------|
| AI 与大模型 | AI & LLMs | 4claw, agent-memory, soul-self-evolution |
| (更多分类待探索) | | |

---

## 🎯 常用技能推荐

根据 API 数据，以下是一些值得关注的技能：

### 自我进化类
| 技能名 | 描述 | URL |
|--------|------|-----|
| `soul-self-evolution` | 自我进化引擎 | `cklxx/elephant.ai` |
| `evoagentx` | 自我进化 AI 代理框架 | `nantes/evoagentx` |
| `broedkrumme-kalibr` | 代理自我完善和遥测 | `broedkrummen` |

### 安全类
| 技能名 | 描述 | URL |
|--------|------|-----|
| `anti-injection-skill` | 高级提示注入防御 | `georges91560` |
| `lieutenant` | AI 代理安全和信任验证 | `jd-delatorre` |
| `arc-security-mcp` | AI 优先安全智能 | `trypto1019` |

### 多代理协作类
| 技能名 | 描述 | URL |
|--------|------|-----|
| `agent-orchestration` | 多代理编排 | `halthelobster` |
| `multi-agent-collab` | 通用多代理协作 | `vdc-k` |
| `agent-orchestrator` | 复杂任务元代理 | `aatmaan1` |

### 内存/记忆类
| 技能名 | 描述 | URL |
|--------|------|-----|
| `agent-memory` | AI 代理持久内存系统 | `dennis-da-menace` |
| `mnemon` | LLM 代理持久内存 CLI | `grivn` |

### 成本/用量类
| 技能名 | 描述 | URL |
|--------|------|-----|
| `agentpulse` | 跟踪 LLM API 成本、令牌 | `sru4ka` |
| `claude-usage-checker` | 检查 Claude 使用限制 | `aligurelli` |
| `manifest-build` | LLM 路由和成本跟踪 | `brunobuddy` |

---

## 🛠️ 安装流程

### 标准安装命令

```bash
# 方式 1: 直接安装
npx skills add <owner/repo@skill> -y

# 方式 2: 从 URL 安装
npx skills add <url> -y
```

### 安装前检查

1. **获取 SKILL.md**
   ```bash
   fetch <技能 url>
   ```

2. **阅读安装说明**
   - 是否需要 API Keys
   - 是否有特殊依赖
   - 安全风险评估

3. **确认后安装**
   ```bash
   npx skills add <技能名> -y
   ```

---

## 📁 已保存文档

**位置:** `C:\Users\28775\.openclaw\workspace\agents\commander\claw123.ai 技能导航站 - 学习完成.md`

**包含:**
- ✅ 技能库概览
- ✅ 搜索方法
- ✅ 使用流程
- ✅ 重要原则
- ✅ 常用技能推荐
- ✅ 安装流程

---

## ✅ 学习完成状态

- [x] 获取技能列表 API
- [x] 理解数据字段结构
- [x] 掌握搜索方法
- [x] 熟悉使用流程
- [x] 记录重要原则
- [x] 整理常用技能推荐
- [x] 保存学习文档

---

**✅ 已学会 claw123.ai 技能导航站搜索方法！** 🚀

**以后主人需要某个功能时，优先来这里查找！**

---

**最后更新:** 2026-03-09 00:37

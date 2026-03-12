# 🎬 Remotion 本地视频剪辑技能 - 详细说明

**整理时间:** 2026-03-09 00:46  
**技能来源:** claw123.ai - OpenClaw 精选技能导航站

---

## 📖 什么是 Remotion？

### 核心概念

**Remotion** = 用 React 代码做视频

```
传统视频剪辑：拖拽时间线 → 手动调整
Remotion 剪辑：写代码 → 自动渲染 → 输出 MP4
```

### 技术栈

```
React + TypeScript + FFmpeg = 可编程视频制作
```

---

## 🛠️ Remotion 技能详解

### 技能 1: remotion-excalidraw-tts

**功能:** Remotion + Excalidraw + TTS 三合一集成

| 项目 | 说明 |
|------|------|
| **技能名** | `remotion-excalidraw-tts` |
| **核心功能** | 手绘动画 + 语音合成 + 视频合成 |
| **本地运行** | ✅ 完全本地 |
| **难度** | 中等（需要基础编程知识） |
| **输出格式** | MP4 (1080P/4K) |

**工作流：**
```
1. 写脚本 (Markdown/文本)
   ↓
2. Excalidraw 绘制动画 (手绘风格)
   ↓
3. TTS 生成配音 (文字转语音)
   ↓
4. Remotion 合成视频
   ↓
5. 输出 MP4
```

**适用场景：**
- ✅ 知识讲解视频
- ✅ 产品演示
- ✅ 教程制作
- ✅ YouTube 自媒体
- ✅ TikTok/抖音短视频

---

### 技能 2: skill-5

**功能:** 使用 Remotion 制作 AI 视频

| 项目 | 说明 |
|------|------|
| **技能名** | `skill-5` |
| **核心功能** | AI 辅助视频生成 |
| **本地运行** | ✅ 完全本地 |
| **难度** | 简单 |
| **特色** | AI 自动生成场景 |

**功能亮点：**
- AI 自动分析脚本
- 自动匹配场景
- 自动添加转场
- 自动配乐

---

### 技能 3: solo-video-promo

**功能:** 30-45 秒产品宣传视频

| 项目 | 说明 |
|------|------|
| **技能名** | `solo-video-promo` |
| **视频长度** | 30-45 秒 |
| **用途** | 产品宣传/广告 |
| **本地运行** | ✅ 完全本地 |
| **难度** | 简单 |

**模板类型：**
- 产品展示
- 功能介绍
- 用户评价
- 促销活动

---

## 💻 安装与配置

### 步骤 1: 安装技能

```bash
# 安装 Remotion 技能
npx skills add remotion-excalidraw-tts -y
```

### 步骤 2: 安装依赖

```bash
# 安装 Node.js (v18+)
# 下载地址：https://nodejs.org/

# 安装 FFmpeg
# Windows: winget install ffmpeg
# Mac: brew install ffmpeg

# 验证安装
node -v  # 应显示 v18+
ffmpeg -version  # 应显示版本信息
```

### 步骤 3: 安装 Remotion

```bash
# 创建 Remotion 项目
npx create-remotion@latest my-video

# 进入项目目录
cd my-video

# 安装依赖
npm install
```

### 步骤 4: 运行技能

```bash
# 渲染视频
npm run build

# 预览视频
npm start
```

---

## 📝 使用示例

### 示例 1: 知识讲解视频

**脚本:**
```markdown
# 什么是 AI Agent?

## 定义
AI Agent = 能够自主完成目标的 AI 系统

## 特点
- 自主决策
- 持续学习
- 与环境交互

## 应用
- 自动驾驶
- 智能助手
- 游戏 AI
```

**命令:**
```bash
# 使用技能生成视频
npx remotion render my-video KnowledgeVideo out.mp4 \
  --props="{\"script\":\"什么是 AI Agent?...\"}"
```

**输出:**
- 格式：MP4
- 分辨率：1920x1080
- 帧率：30fps
- 时长：约 60 秒

---

### 示例 2: 产品宣传视频

**脚本:**
```markdown
# 产品介绍：AI 写作助手

## 痛点
- 写作效率低
- 灵感枯竭
- 语法错误

## 解决方案
- AI 智能建议
- 实时语法检查
- 风格优化

## 价格
- 免费版：基础功能
- 专业版：$9.99/月
```

**命令:**
```bash
npx skills add solo-video-promo -y

# 生成 30 秒宣传视频
npx remotion render promo ProductPromo out.mp4 \
  --props="{\"productName\":\"AI 写作助手\",\"duration\":30}"
```

---

## 🎨 Excalidraw 手绘动画

### 什么是 Excalidraw？

**Excalidraw** = 手绘风格的白板绘图工具

**特点：**
- 手绘风格（亲切自然）
- 简单易用
- 支持动画
- 可导出 SVG

### 在 Remotion 中使用

**代码示例:**
```tsx
// src/Video.tsx
import { AbsoluteFill, Sequence } from 'remotion';
import { ExcalidrawScene } from './ExcalidrawScene';

export const MyVideo = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={150}>
        <ExcalidrawScene 
          drawing="手绘动画内容"
          duration={5} // 秒
        />
      </Sequence>
    </AbsoluteFill>
  );
};
```

**手绘元素：**
- 人物角色
- 对话框
- 箭头指示
- 重点标注
- 流程图

---

## 🎙️ TTS 语音合成

### 支持的 TTS 引擎

| TTS | 平台 | 质量 | 成本 |
|-----|------|------|------|
| **local-voice** | Apple Silicon | ⭐⭐⭐⭐ | 免费 |
| **fish-tts** | 全平台 | ⭐⭐⭐⭐⭐ | 付费 |
| **edge-tts** | 全平台 | ⭐⭐⭐⭐ | 免费 |
| **GLM-TTS** | 全平台 | ⭐⭐⭐⭐ | 免费 (中文) |

### TTS 集成示例

**代码:**
```tsx
// 生成配音
const generateVoiceover = async (text: string) => {
  const response = await fetch('http://localhost:8000/tts', {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
  const audioBlob = await response.blob();
  return audioBlob;
};

// 在 Remotion 中使用
<AbsoluteFill>
  <Audio src={voiceoverAudio} />
  <ExcalidrawScene />
</AbsoluteFill>
```

---

## 📊 完整工作流

### 从脚本到成品的全流程

```
1. 写脚本
   ↓
   Markdown 文件
   - 标题
   - 分镜
   - 配音文本

2. 生成配音
   ↓
   TTS 引擎
   - 选择声音
   - 调整语速
   - 导出 MP3

3. 绘制动画
   ↓
   Excalidraw
   - 手绘场景
   - 添加文字
   - 导出 SVG

4. 合成视频
   ↓
   Remotion
   - 编排时间线
   - 添加转场
   - 配乐

5. 渲染输出
   ↓
   FFmpeg
   - 编码 H.264
   - 分辨率 1080P
   - 帧率 30fps
```

---

## 🎯 实际应用场景

### 场景 1: YouTube 知识频道

**需求:**
- 每周更新 2-3 期
- 每期 5-10 分钟
- 需要配音 + 动画

**Remotion 方案:**
```
脚本模板 → TTS 配音 → Excalidraw 动画 → Remotion 合成 → 自动上传
```

**效率提升:**
- 传统制作：4-6 小时/期
- Remotion 制作：30 分钟/期
- **提升 8-12 倍效率**

---

### 场景 2: TikTok/抖音短视频

**需求:**
- 每天更新 3-5 条
- 每条 30-60 秒
- 需要快速生产

**Remotion 方案:**
```
热点话题 → AI 写脚本 → TTS 配音 → 模板合成 → 批量导出
```

**效率提升:**
- 传统制作：1 小时/条
- Remotion 制作：5 分钟/条
- **提升 12 倍效率**

---

### 场景 3: 产品演示视频

**需求:**
- 产品展示
- 功能讲解
- 客户案例

**Remotion 方案:**
```
产品截图 → 手绘标注 → 配音讲解 → 转场特效 → 输出 MP4
```

**优势:**
- 无需拍摄
- 无需真人出镜
- 可随时更新

---

## 📦 技能安装优先级

### 必装技能（核心）

```bash
# 1. Remotion 视频合成
npx skills add remotion-excalidraw-tts -y

# 2. 本地 TTS（Mac）
npx skills add local-voice -y

# 或高质量 TTS
npx skills add fish-tts -y

# 3. Whisper 转录
npx skills add mh-openai-whisper -y
```

### 扩展技能（按需）

```bash
# 4. AI 视频生成
npx skills add skill-5 -y

# 5. 产品宣传模板
npx skills add solo-video-promo -y

# 6. 视频超分辨率
npx skills add video-upscale -y
```

---

## ⚠️ 注意事项

### 系统要求

| 组件 | 最低要求 | 推荐配置 |
|------|---------|---------|
| **Node.js** | v18+ | v20+ |
| **内存** | 8GB | 16GB+ |
| **GPU** | 集成显卡 | 独立显卡 (可选) |
| **硬盘** | 10GB 空闲 | 50GB+ |

### 学习曲线

| 技能 | 学习难度 | 预计上手时间 |
|------|---------|-------------|
| **Remotion 基础** | 中等 | 2-4 小时 |
| **Excalidraw** | 简单 | 30 分钟 |
| **TTS 集成** | 简单 | 1 小时 |
| **完整工作流** | 中等 | 1 天 |

### 常见问题

**Q1: 渲染速度慢？**
- 降低分辨率（1080P → 720P）
- 减少特效使用
- 使用 GPU 加速

**Q2: 配音不自然？**
- 更换 TTS 引擎
- 调整语速/音调
- 添加停顿标记

**Q3: 动画太生硬？**
- 增加缓动函数
- 添加过渡动画
- 参考优秀案例

---

## 📁 文档保存

**位置:** `C:\Users\28775\.openclaw\workspace\agents\commander\Remotion 本地视频剪辑技能 - 详细说明.md`

**包含:**
- ✅ Remotion 核心概念
- ✅ 3 个技能详细说明
- ✅ 安装与配置指南
- ✅ 使用示例
- ✅ Excalidraw 手绘动画
- ✅ TTS 语音合成
- ✅ 完整工作流
- ✅ 实际应用场景
- ✅ 技能安装优先级
- ✅ 常见问题解答

---

## 🎯 总结

### Remotion 的核心优势

| 优势 | 说明 |
|------|------|
| **可编程** | 代码控制每一帧 |
| **可复用** | 模板化生产 |
| **可批量** | 自动化渲染 |
| **高质量** | 专业级输出 |
| **本地运行** | 隐私安全 |

### 适合人群

- ✅ 自媒体创作者
- ✅ 知识博主
- ✅ 产品经理
- ✅ 教育工作者
- ✅ 营销人员

### 不适合人群

- ❌ 完全不懂编程
- ❌ 只需要简单剪辑
- ❌ 偶尔制作视频

---

**✅ Remotion 详细说明已完成！** 🎬🚀

**需要我帮你安装 `remotion-excalidraw-tts` 技能吗？**

---

**最后更新:** 2026-03-09 00:46

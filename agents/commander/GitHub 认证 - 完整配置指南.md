# 🦞 GitHub 认证完整配置指南

**日期:** 2026-03-08  
**用户:** 523  
**当前状态:** ⚠️ GitHub API 连接超时

---

## 📊 当前配置状态

| 项目 | 状态 | 说明 |
|------|------|------|
| GitHub CLI | ✅ v2.87.3 | 已安装 |
| Git 凭据管理器 | ✅ 已配置 | Windows Credential Manager |
| DNS 解析 | ✅ 正常 | github.com → 20.205.243.166 |
| HTTPS 连接 | ❌ 超时 | 连接 GitHub API 失败 |

---

## 🔍 问题诊断

**错误信息:**
```
failed to authenticate via web browser: 
Post "https://github.com/login/device/code": 
dial tcp 20.205.243.166:443: connection timeout
```

**可能原因:**
1. 🔥 防火墙阻止出站连接
2. 🏢 公司网络限制 GitHub
3. 🌐 网络波动/GitHub 服务器问题
4. 🛡️ 安全软件拦截

---

## ✅ 解决方案

### 方案 1：稍后重试（最简单）⏰

GitHub 服务器可能是暂时性问题，建议 10-15 分钟后重试：

```powershell
# 打开 PowerShell，运行：
"C:\Program Files\GitHub CLI\gh.exe" auth login --web

# 验证登录：
"C:\Program Files\GitHub CLI\gh.exe" auth status
```

---

### 方案 2：检查防火墙 🔥

**Windows 防火墙检查:**
```powershell
# 查看防火墙规则
Get-NetFirewallRule | Where-Object {$_.DisplayName -like "*GitHub*"}

# 临时禁用防火墙测试（不推荐生产环境）
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False

# 测试连接
Test-NetConnection github.com -Port 443

# 重新启用防火墙
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True
```

---

### 方案 3：配置代理（如果有）🌐

**检查代理:**
```powershell
netsh winhttp show proxy
```

**配置代理:**
```powershell
# 设置环境变量
$env:HTTPS_PROXY = "http://proxy-server:port"
$env:HTTP_PROXY = "http://proxy-server:port"

# 或使用 gh 配置
gh config set http_proxy http://proxy-server:port
```

---

### 方案 4：使用国内镜像 🇨🇳

如果 GitHub 被墙，可以使用镜像：

**使用 FastGit:**
```bash
# 克隆技能时使用镜像
git clone https://hub.fastgit.org/steipete/video-frames.git
```

**使用 Gitee 镜像（如果有）:**
```bash
git clone https://gitee.com/mirror/video-frames.git
```

---

### 方案 5：手动下载技能 📥

1. 访问 https://github.com/steipete/video-frames
2. 点击 "Code" → "Download ZIP"
3. 解压到技能目录
4. 手动配置

---

## 🎯 当前可用技能

无需 GitHub 认证，已安装的技能：

| 技能 | 用途 | 使用方法 |
|------|------|---------|
| **Summarize** | 总结网页/PDF/YouTube | `summarize "URL" --length short` |
| **wechat-image-generator** | 微信配图生成 | 在 OpenClaw 中直接使用 |

---

## 💡 替代工具推荐

### 视频处理
```bash
# FFmpeg - 专业视频处理
winget install Gyan.FFmpeg

# 使用示例：提取视频帧
ffmpeg -i input.mp4 -vf fps=1 frame_%03d.jpg

# 剪映 - 自动字幕
winget install 剪映专业版
```

### 图像处理
```bash
# 已安装 wechat-image-generator
# 或使用在线工具：
# - Canva (https://www.canva.com)
# - 稿定设计 (https://www.gaoding.com)
```

### 自动化
```bash
# Power Automate Desktop (Windows 10/11 自带)
# AutoHotkey - 脚本自动化
winget install AutoHotkey.AutoHotkey

# Python + Selenium
pip install selenium
```

---

## 📋 需要 GitHub 认证的技能

以下技能需要完成 GitHub 认证：

| 技能 | 仓库 | 用途 |
|------|------|------|
| Video Frames | steipete/video-frames | 视频帧提取 |
| Video Subtitles | ngutman/video-subtitles | 字幕生成 |
| Automation Workflows | JK-0001/automation-workflows | 工作流设计 |
| antigravity-image-gen | IPedrax/antigravity-image-gen | AI 图像生成 |

---

## 🔧 手动安装步骤（如果自动安装失败）

### 1. 下载技能源码

访问 GitHub 下载 ZIP：
- https://github.com/steipete/video-frames/archive/main.zip
- https://github.com/ngutman/video-subtitles/archive/main.zip
- https://github.com/JK-0001/automation-workflows/archive/main.zip
- https://github.com/IPedrax/antigravity-image-gen/archive/main.zip

### 2. 解压到技能目录

```powershell
# 解压到：
# C:\Users\28775\.openclaw\workspace\agents\commander\.agents\skills\
```

### 3. 配置技能

按照每个技能的 README.md 配置。

---

## 📞 获取帮助

如果问题持续：
1. 检查网络管理员是否阻止 GitHub
2. 尝试使用手机热点测试
3. 使用替代工具（FFmpeg、剪映等）
4. 联系 OpenClaw 支持

---

## ✅ 检查清单

- [ ] 稍后重试 GitHub 认证
- [ ] 检查防火墙设置
- [ ] 确认代理配置
- [ ] 尝试国内镜像
- [ ] 使用替代工具

---

**🦞 报告生成完成！**

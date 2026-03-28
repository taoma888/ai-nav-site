@echo off
echo 🚀 部署 aisstt.fun 到 Cloudflare Pages...

REM 1. 复制生成的内容到public目录
xcopy "output\*.html" "public\" /Y >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️ 没有找到生成的内容文件
)

REM 2. 安装wrangler (Cloudflare CLI)
echo 📦 安装 Cloudflare Wrangler...
npm install -g wrangler

REM 3. 部署到Cloudflare Pages
echo 🌐 部署到 Cloudflare Pages...
npx wrangler pages deploy ./public --project-name=aisstt-fun

echo ✅ 部署完成! 你的网站现在可以通过 aisstt.fun 访问
pause
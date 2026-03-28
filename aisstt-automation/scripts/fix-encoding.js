const fs = require('fs');

// 修复文件编码问题
const htmlPath = 'C:\\Users\\28775\\.openclaw\\workspace\\aisstt-automation\\output\\index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// 确保HTML头部有正确的charset
if (!htmlContent.includes('<meta charset="UTF-8">')) {
  // 在<head>标签后添加charset
  htmlContent = htmlContent.replace(
    '<head>',
    '<head>\n<meta charset="UTF-8">'
  );
}

// 修复T数组格式
const tArrayStart = htmlContent.indexOf('const T=[');
if (tArrayStart !== -1) {
  // 找到T数组的结束位置
  let tArrayEnd = htmlContent.indexOf('];', tArrayStart);
  if (tArrayEnd === -1) {
    // 如果没有找到结束符，手动添加
    const lastToolIndex = htmlContent.lastIndexOf('},');
    if (lastToolIndex !== -1) {
      htmlContent = htmlContent.substring(0, lastToolIndex + 2) + '\n];' + 
                   htmlContent.substring(lastToolIndex + 2);
    }
  }
}

// 保存修复后的文件
fs.writeFileSync(htmlPath, htmlContent, 'utf8');

console.log('✅ 文件编码和T数组格式已修复!');
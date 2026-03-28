// 无损集成脚本 - 注入自动化数据到原始网站
const fs = require('fs').promises;

async function injectAutomatedData() {
  console.log('🔄 注入自动化数据到原始网站...');
  
  // 读取原始HTML文件
  const originalHtml = await fs.readFile('C:\\Users\\28775\\Downloads\\index (3).html', 'utf8');
  
  // 生成自动化工具数据
  const automatedTools = generateAutomatedTools();
  
  // 将自动化工具数据注入到原始HTML中
  const updatedHtml = injectDataIntoHtml(originalHtml, automatedTools);
  
  // 保存更新后的HTML文件
  await fs.writeFile('C:\\Users\\28775\\.openclaw\\workspace\\aisstt-automation\\public\\index.html', updatedHtml);
  
  console.log('✅ 自动化数据已成功注入到原始网站!');
  console.log('📁 更新后的文件: public/index.html');
}

function generateAutomatedTools() {
  // 这里会从自动化系统获取新工具数据
  // 目前使用模拟数据
  return [
    {
      id: Date.now(),
      n: 'AI Writing Assistant Pro',
      e: '✍️',
      c: 'writing',
      tg: ['AI写作', '内容生成'],
      d: '智能AI写作助手，支持多语言内容生成，自动优化SEO，一键生成高质量文章。',
      u: 'https://example.com/ai-writing-pro',
      p: 'freemium',
      r: 4.8,
      rn: 50,
      f: true,
      h: true,
      nw: true
    },
    {
      id: Date.now() + 1,
      n: 'Image Generator Ultra',
      e: '🎨',
      c: 'image',
      tg: ['AI图片', '艺术生成'],
      d: '前沿AI图像生成工具，支持多种艺术风格，高清输出，商业可用。',
      u: 'https://example.com/image-gen-ultra',
      p: 'paid',
      r: 4.9,
      rn: 30,
      f: true,
      h: true,
      nw: true
    }
  ];
}

function injectDataIntoHtml(html, newTools) {
  // 找到原始T数组的位置
  const tArrayStart = html.indexOf('const T=[');
  const tArrayEnd = html.indexOf('];', tArrayStart) + 2;
  
  if (tArrayStart === -1 || tArrayEnd === -1) {
    console.error('❌ 未找到T数组位置');
    return html;
  }
  
  // 提取原始T数组内容
  const originalTArray = html.substring(tArrayStart, tArrayEnd);
  
  // 生成新的T数组（原始数据 + 自动化数据）
  const newTArrayContent = originalTArray.slice(0, -2) + ',\n' + 
    newTools.map(tool => 
      ` {id:${tool.id}, n:'${tool.n}', e:'${tool.e}', c:'${tool.c}', tg:[${tool.tg.map(tag => `'${tag}'`).join(',')}], d:'${tool.d}', u:'${tool.u}', p:'${tool.p}', r:${tool.r}, rn:${tool.rn}, f:${tool.f}, h:${tool.h}, nw:${tool.nw}}`
    ).join(',\n') + '\n];';
  
  // 替换T数组
  const updatedHtml = html.substring(0, tArrayStart) + newTArrayContent + html.substring(tArrayEnd);
  
  return updatedHtml;
}

// 执行注入
injectAutomatedData().catch(console.error);
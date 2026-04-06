const fs = require('fs');

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI Tools Navigation</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#050a0a;color:#d4ead4;font-family:system-ui,-apple-system,sans-serif;min-height:100vh}
.container{max-width:1200px;margin:0 auto;padding:20px}
.header{text-align:center;padding:40px 0;border-bottom:1px solid #1a3a1a;margin-bottom:30px}
.logo{font-size:32px;font-weight:700;color:#00ff88;margin-bottom:10px}
.subtitle{color:#9abf9a;font-size:16px}
.search{margin:20px 0}
.search input{width:100%;max-width:600px;padding:12px 20px;border:1px solid #1a3a1a;background:#0a1410;color:#fff;border-radius:8px;font-size:16px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
.card{background:#0a1410;border:1px solid #1a3a1a;border-radius:12px;padding:20px;transition:0.2s;cursor:pointer}
.card:hover{border-color:#00ff88;transform:translateY(-2px);box-shadow:0 4px 20px rgba(0,255,136,0.1)}
.card-name{font-size:18px;font-weight:600;color:#00ff88;margin-bottom:8px}
.card-desc{color:#9abf9a;font-size:14px;line-height:1.5;margin-bottom:12px}
.card-link{display:inline-block;background:#00ff88;color:#050a06;padding:8px 16px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:500}
.card-link:hover{background:#00cc6a}
.tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}
.tag{background:#0d1a14;padding:4px 8px;border-radius:4px;font-size:12px;color:#527052}
.footer{text-align:center;padding:40px 0;margin-top:40px;border-top:1px solid #1a3a1a;color:#527052}
</style>
</head>
<body>
<div class="container">
<div class="header">
<div class="logo">AI Tools Navigation</div>
<div class="subtitle">One-Stop Smart Search for AI Tools</div>
</div>
<div class="search">
<input type="text" id="search" placeholder="Search AI tools..." onkeyup="filter()">
</div>
<div class="grid" id="grid"></div>
<div class="footer">
<p>AI Tools Directory - Your Gateway to AI</p>
</div>
</div>
<script>
const tools=[
{name:'ChatGPT',desc:'AI Chat and Writing Assistant',url:'https://chat.openai.com',tags:['AI','Chat','Writing']},
{name:'DeepSeek',desc:'Strong Reasoning AI Model',url:'https://chat.deepseek.com',tags:['AI','Chat','Chinese']},
{name:'Claude',desc:'200K Context Safe AI',url:'https://claude.ai',tags:['AI','Chat','Safe']},
{name:'Midjourney',desc:'AI Art Generator',url:'https://midjourney.com',tags:['AI','Art','Image']},
{name:'Flux',desc:'Open Source AI Art',url:'https://flux1.ai',tags:['AI','Art','Open']},
{name:'Kimi',desc:'Long Context AI Chat',url:'https://kimi.moonshot.cn',tags:['AI','Chat','Chinese']},
{name:'Gemini',desc:'Google AI Assistant',url:'https://gemini.google.com',tags:['AI','Chat','Google']},
{name:'Dify',desc:'AI App Platform',url:'https://dify.ai',tags:['AI','Platform','Open']},
{name:'Coze',desc:'Bot Builder Platform',url:'https://www.coze.cn',tags:['AI','Bot','Chinese']},
{name:'Runway',desc:'AI Video Generator',url:'https://runway.ml',tags:['AI','Video','Creative']},
{name:'Suno',desc:'AI Music Generator',url:'https://suno.ai',tags:['AI','Music','Creative']},
{name:'Perplexity',desc:'AI Search Engine',url:'https://perplexity.ai',tags:['AI','Search','Web']}
];
function render(list){
const g=document.getElementById('grid');
g.innerHTML=list.map(t=>'<div class="card"><div class="card-name">'+t.name+'</div><div class="card-desc">'+t.desc+'</div><a href="'+t.url+'" target="_blank" class="card-link">Visit</a><div class="tags">'+t.tags.map(s=>'<span class="tag">'+s+'</span>').join('')+'</div></div>').join('');
}
function filter(){
const q=document.getElementById('search').value.toLowerCase();
render(tools.filter(t=>t.name.toLowerCase().includes(q)||t.desc.toLowerCase().includes(q)||t.tags.some(s=>s.toLowerCase().includes(q))));
}
render(tools);
</script>
</body>
</html>`;

fs.writeFileSync('index.html', html, 'utf8');
console.log('OK');

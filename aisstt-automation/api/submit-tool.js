// 工具提交API端点
export async function onRequest(context) {
  try {
    const { request } = context;
    
    // 只处理POST请求
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }
    
    // 解析JSON数据
    const toolData = await request.json();
    
    // 验证必填字段
    if (!toolData.name || !toolData.url) {
      return new Response(JSON.stringify({ error: '名称和网址是必填字段' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 这里应该保存到数据库
    // 由于Cloudflare Pages是静态网站，我们需要使用Supabase或其他数据库
    
    console.log('收到工具提交:', toolData);
    
    // 模拟成功响应
    return new Response(JSON.stringify({ 
      success: true, 
      message: '工具提交成功，等待审核',
      toolId: Date.now()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('工具提交失败:', error);
    return new Response(JSON.stringify({ error: '服务器错误' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
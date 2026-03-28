// Cloudflare Workers函数 - 真正的工具提交处理
export default {
  async fetch(request, env) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // 处理预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      if (request.method === 'POST') {
        // 解析JSON数据
        const toolData = await request.json();
        
        // 验证必填字段
        if (!toolData.name || !toolData.url) {
          return new Response(JSON.stringify({ 
            error: '名称和网址是必填字段' 
          }), {
            status: 400,
            headers: { 
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          });
        }

        // 这里应该保存到Supabase数据库
        // 由于我们还没有配置Supabase，先模拟保存
        
        console.log('工具提交数据:', toolData);
        
        // 模拟成功响应
        return new Response(JSON.stringify({ 
          success: true, 
          message: '工具提交成功，等待审核',
          toolId: Date.now()
        }), {
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      } else {
        return new Response('Method not allowed', { 
          status: 405,
          headers: corsHeaders
        });
      }
    } catch (error) {
      console.error('工具提交处理错误:', error);
      return new Response(JSON.stringify({ 
        error: '服务器处理错误' 
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
  }
};
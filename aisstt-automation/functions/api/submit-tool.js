// 完整的Supabase集成API - 工具提交
import { createClient } from '@supabase/supabase-js';

export async function onRequest(context) {
  try {
    const { request, env } = context;
    
    // 初始化Supabase客户端
    const supabase = createClient(
      env.SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    );
    
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }
    
    // 解析请求体
    const toolData = await request.json();
    
    // 验证必填字段
    if (!toolData.name || !toolData.url) {
      return new Response(JSON.stringify({ 
        error: '名称和网址是必填字段' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 插入到submitted_tools表
    const { data, error } = await supabase
      .from('submitted_tools')
      .insert([{
        name: toolData.name,
        url: toolData.url,
        category: toolData.category || 'agent',
        description: toolData.description || '用户提交的AI工具',
        price_type: toolData.price_type || 'free',
        submitted_by: 'web_user'
      }])
      .select()
      .single();
    
    if (error) {
      console.error('数据库插入错误:', error);
      return new Response(JSON.stringify({ 
        error: '服务器错误，请重试' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 返回成功响应
    return new Response(JSON.stringify({ 
      success: true,
      message: '工具提交成功，等待审核',
      toolId: data.id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('工具提交API错误:', error);
    return new Response(JSON.stringify({ 
      error: '服务器处理错误' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
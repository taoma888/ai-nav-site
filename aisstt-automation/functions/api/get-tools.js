// 获取待审核工具API
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
    
    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405 });
    }
    
    // 获取查询参数
    const url = new URL(request.url);
    const status = url.searchParams.get('status') || 'pending';
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;
    
    // 查询工具
    let query = supabase
      .from('submitted_tools')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (status !== 'all') {
      query = query.eq('status', status);
    }
    
    const { data, error, count } = await query;
    
    if (error) {
      console.error('查询错误:', error);
      return new Response(JSON.stringify({ 
        error: '服务器错误' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ 
      success: true,
      tools: data,
      total: count,
      page: page,
      pages: Math.ceil(count / limit)
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('获取工具API错误:', error);
    return new Response(JSON.stringify({ 
      error: '服务器处理错误' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
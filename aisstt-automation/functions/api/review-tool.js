// 审核工具API
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
    
    const reviewData = await request.json();
    
    if (!reviewData.toolId || !reviewData.action) {
      return new Response(JSON.stringify({ 
        error: '缺少必要参数' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 更新工具状态
    const { error: updateError } = await supabase
      .from('submitted_tools')
      .update({ 
        status: reviewData.action === 'approve' ? 'approved' : 'rejected',
        updated_at: new Date().toISOString()
      })
      .eq('id', reviewData.toolId);
    
    if (updateError) {
      console.error('更新状态错误:', updateError);
      return new Response(JSON.stringify({ 
        error: '审核失败' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 如果审核通过，添加到已发布工具表
    if (reviewData.action === 'approve') {
      const { data: toolData, error: fetchError } = await supabase
        .from('submitted_tools')
        .select('*')
        .eq('id', reviewData.toolId)
        .single();
      
      if (!fetchError && toolData) {
        await supabase
          .from('published_tools')
          .insert([{
            submitted_tool_id: toolData.id,
            name: toolData.name,
            url: toolData.url,
            category: toolData.category,
            description: toolData.description,
            price_type: toolData.price_type
          }]);
      }
    }
    
    // 记录审核日志
    await supabase
      .from('review_logs')
      .insert([{
        tool_id: reviewData.toolId,
        action: reviewData.action,
        notes: reviewData.notes || '',
        reviewer_id: 'admin'
      }]);
    
    return new Response(JSON.stringify({ 
      success: true,
      message: `工具已${reviewData.action === 'approve' ? '批准' : '拒绝'}`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('审核API错误:', error);
    return new Response(JSON.stringify({ 
      error: '服务器处理错误' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
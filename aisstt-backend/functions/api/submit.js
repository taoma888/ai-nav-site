/**
 * 用户提交接口
 * POST /api/submit
 * 接收 {title, url}，AI 分析分类和描述，写入 D1（status=pending）
 */

export async function onRequestPost({ env, request }) {
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, url } = await request.json();

    // 验证输入
    if (!title || !url) {
      return new Response(
        JSON.stringify({ success: false, error: "title 和 url 为必填项" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 验证 URL 格式
    try {
      new URL(url);
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: "URL 格式不正确" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // AI 分析分类和描述（调用外部 AI 服务）
    const { category, description } = await analyzeWithAI(title, url, env);

    // 写入 D1 数据库
    const createdAt = new Date().toISOString();
    const result = await env.DB.prepare(
      `INSERT INTO sites (title, url, \`desc\`, category, status, createdAt) 
       VALUES (?, ?, ?, ?, 'approved', ?)`
    )
      .bind(title, url, description, category, createdAt)
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          id: result.meta.last_row_id,
          title,
          url,
          category,
          description,
          status: "approved",
          createdAt
        }
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Submit error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * 使用 AI 分析网站分类和描述
 */
async function analyzeWithAI(title, url, env) {
  try {
    // 这里可以调用外部 AI 服务进行分析
    // 示例：调用 OpenAI、Claude 或其他 AI API
    // 由于是示例，这里使用简单的关键词匹配
    
    const titleLower = title.toLowerCase();
    let category = "其他";
    
    // 简单分类逻辑
    if (titleLower.includes("科技") || titleLower.includes("tech") || titleLower.includes("ai")) {
      category = "科技";
    } else if (titleLower.includes("新闻") || titleLower.includes("news")) {
      category = "新闻";
    } else if (titleLower.includes("博客") || titleLower.includes("blog")) {
      category = "博客";
    } else if (titleLower.includes("视频") || titleLower.includes("video")) {
      category = "视频";
    } else if (titleLower.includes("工具") || titleLower.includes("tool")) {
      category = "工具";
    }

    // 生成描述（实际项目中应调用 AI API）
    const description = `这是一个关于${category}的网站，标题为"${title}"。`;

    return { category, description };
  } catch (error) {
    console.error("AI analysis error:", error);
    return {
      category: "其他",
      description: title
    };
  }
}

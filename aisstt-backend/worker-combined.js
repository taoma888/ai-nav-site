/**
 * AISST.fun API Worker
 * 合并 list.js + submit.js + review.js
 * 部署到 Cloudflare Workers
 */

export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    // Handle OPTIONS
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // Route: /api/list
    if (path === "/api/list" && request.method === "GET") {
      return handleList(request, env, corsHeaders);
    }

    // Route: /api/submit
    if (path === "/api/submit" && request.method === "POST") {
      return handleSubmit(request, env, corsHeaders);
    }

    // Route: /api/review
    if (path === "/api/review" && request.method === "POST") {
      return handleReview(request, env, corsHeaders);
    }

    // 404
    return new Response(
      JSON.stringify({ success: false, error: "Not Found" }),
      { status: 404, headers: corsHeaders }
    );
  }
};

// ── LIST API ──────────────────────────────────────────────────────
async function handleList(request, env, corsHeaders) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const category = url.searchParams.get("category");

    const offset = (page - 1) * limit;

    let query = `SELECT id, title, url, \`desc\`, category, createdAt 
                 FROM sites 
                 WHERE status = 'approved'`;
    const params = [];

    if (category) {
      query += ` AND category = ?`;
      params.push(category);
    }

    query += ` ORDER BY createdAt DESC LIMIT ${limit} OFFSET ${offset}`;

    let countQuery = `SELECT COUNT(*) as total FROM sites WHERE status = 'approved'`;
    const countParams = [];
    if (category) {
      countQuery += ` AND category = ?`;
      countParams.push(category);
    }

    const [results, countResult] = await Promise.all([
      env.DB.prepare(query).bind(...params).all(),
      env.DB.prepare(countQuery).bind(...countParams).first()
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          sites: results.results || [],
          pagination: {
            page,
            limit,
            total: countResult?.total || 0,
            totalPages: Math.ceil((countResult?.total || 0) / limit)
          }
        }
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("List error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// ── SUBMIT API ────────────────────────────────────────────────────
async function handleSubmit(request, env, corsHeaders) {
  try {
    const { title, url } = await request.json();

    if (!title || !url) {
      return new Response(
        JSON.stringify({ success: false, error: "title 和 url 为必填项" }),
        { status: 400, headers: corsHeaders }
      );
    }

    try {
      new URL(url);
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: "URL 格式不正确" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const { category, description } = await analyzeWithAI(title, url);
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

async function analyzeWithAI(title, url) {
  try {
    const titleLower = title.toLowerCase();
    let category = "其他";
    
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
    } else if (titleLower.includes("写作") || titleLower.includes("writing")) {
      category = "写作";
    } else if (titleLower.includes("图片") || titleLower.includes("image")) {
      category = "图片";
    } else if (titleLower.includes("编程") || titleLower.includes("code")) {
      category = "编程";
    } else if (titleLower.includes("办公") || titleLower.includes("office")) {
      category = "办公";
    }

    const description = `这是一个关于${category}的网站，标题为"${title}"。`;
    return { category, description };
  } catch (error) {
    console.error("AI analysis error:", error);
    return { category: "其他", description: title };
  }
}

// ── REVIEW API ────────────────────────────────────────────────────
async function handleReview(request, env, corsHeaders) {
  try {
    const { id, action } = await request.json();

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: "id 为必填项" }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!action || !["approve", "reject"].includes(action)) {
      return new Response(
        JSON.stringify({ success: false, error: "action 必须为 approve 或 reject" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const status = action === "approve" ? "approved" : "rejected";
    const reviewedAt = new Date().toISOString();

    const result = await env.DB.prepare(
      `UPDATE sites SET status = ?, reviewedAt = ? WHERE id = ?`
    )
      .bind(status, reviewedAt, id)
      .run();

    if (result.meta.changes === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "未找到该记录" }),
        { status: 404, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: { id, status, reviewedAt }
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Review error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

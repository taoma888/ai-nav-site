/**
 * 获取列表接口
 * GET /api/list
 * 返回 status='approved' 的网站列表
 */

export async function onRequest({ request, env }) {
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== "GET") {
    return new Response(
      JSON.stringify({ success: false, error: "仅支持 GET 请求" }),
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const category = url.searchParams.get("category");

    // 计算分页
    const offset = (page - 1) * limit;

    // 构建查询
    let query = `SELECT id, title, url, \`desc\`, category, createdAt 
                 FROM sites 
                 WHERE status = 'approved'`;
    const params = [];

    if (category) {
      query += ` AND category = ?`;
      params.push(category);
    }

    query += ` ORDER BY createdAt DESC LIMIT ${limit} OFFSET ${offset}`;

    // 查询总数
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

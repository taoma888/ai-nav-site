/**
 * 审核接口
 * POST /api/review
 * 管理员审核 {id, action: approve|reject}
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
    const { id, action } = await request.json();

    // 验证输入
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

    // 验证管理员权限（实际项目中应添加认证）
    // const authHeader = request.headers.get("Authorization");
    // if (!authHeader || !isValidAdmin(authHeader)) {
    //   return Response.json({ success: false, error: "未授权" }, { status: 401 });
    // }

    // 更新状态
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
        data: {
          id,
          status,
          reviewedAt
        }
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

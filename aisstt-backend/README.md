# AISSTT Backend - Cloudflare Workers + D1

网站提交与审核系统的后端服务。

## 项目结构

```
aisstt-backend/
├── functions/
│   └── api/
│       ├── submit.js    # 用户提交接口
│       ├── review.js    # 审核接口
│       └── list.js      # 获取列表接口
├── public/
│   ├── submit.html      # 提交页面
│   └── admin.html       # 审核后台
├── wrangler.toml        # Wrangler 配置
├── schema.sql           # D1 数据库建表语句
└── README.md            # 本文件
```

## 快速开始

### 1. 安装依赖

```bash
npm install -g wrangler
```

### 2. 登录 Cloudflare

```bash
wrangler login
```

### 3. 创建 D1 数据库

```bash
wrangler d1 create aisstt-db
```

执行后会返回数据库 ID，将其填入 `wrangler.toml` 的 `database_id` 字段。

### 4. 初始化数据库

```bash
wrangler d1 execute aisstt-db --file=schema.sql
```

### 5. 本地开发

```bash
wrangler dev
```

服务将运行在 http://localhost:8787

### 6. 部署

```bash
wrangler deploy
```

## API 接口

### 1. 提交网站

**POST** `/api/submit`

请求体：
```json
{
  "title": "网站标题",
  "url": "https://example.com"
}
```

响应：
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "网站标题",
    "url": "https://example.com",
    "category": "科技",
    "description": "描述",
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. 审核网站

**POST** `/api/review`

请求体：
```json
{
  "id": 1,
  "action": "approve"
}
```

action 可选值：`approve` | `reject`

响应：
```json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "approved",
    "reviewedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 3. 获取网站列表

**GET** `/api/list?page=1&limit=20&category=科技`

查询参数：
- `page`: 页码（默认 1）
- `limit`: 每页数量（默认 20）
- `category`: 分类筛选（可选）

响应：
```json
{
  "success": true,
  "data": {
    "sites": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

## API 测试方法

### 使用 curl 测试

```bash
# 1. 提交网站
curl -X POST http://localhost:8787/api/submit \
  -H "Content-Type: application/json" \
  -d '{"title":"AI 导航站","url":"https://example.com"}'

# 2. 获取列表
curl http://localhost:8787/api/list

# 3. 审核（通过）
curl -X POST http://localhost:8787/api/review \
  -H "Content-Type: application/json" \
  -d '{"id":1,"action":"approve"}'

# 4. 审核（拒绝）
curl -X POST http://localhost:8787/api/review \
  -H "Content-Type: application/json" \
  -d '{"id":1,"action":"reject"}'
```

### 使用 Postman / Insomnia

1. 创建新请求
2. 设置对应的方法和 URL
3. 在 Body 中选择 raw + JSON
4. 输入 JSON 数据
5. 发送请求

### 浏览器测试

- 提交页面：http://localhost:8787/submit.html
- 审核后台：http://localhost:8787/admin.html

## 环境变量

在生产环境中，可通过 Cloudflare Dashboard 设置环境变量：

- `AI_API_KEY`: AI 服务 API 密钥（用于自动分类）
- `ADMIN_TOKEN`: 管理员认证令牌

## 扩展建议

1. **添加认证**：在 review.js 中添加管理员认证
2. **AI 集成**：调用 OpenAI/Claude API 进行智能分类
3. **网站抓取**：自动抓取提交网站的描述和图标
4. **邮件通知**：审核结果邮件通知提交者
5. **统计分析**：添加数据统计和可视化

## 许可证

MIT

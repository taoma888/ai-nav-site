-- AI工具提交和审核系统数据库表结构

-- 工具提交表
CREATE TABLE IF NOT EXISTS submitted_tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  price_type TEXT CHECK (price_type IN ('free', 'freemium', 'paid')),
  submitted_by TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 审核记录表  
CREATE TABLE IF NOT EXISTS review_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tool_id UUID REFERENCES submitted_tools(id),
  reviewer_id TEXT,
  action TEXT CHECK (action IN ('approve', 'reject')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 已发布工具表
CREATE TABLE IF NOT EXISTS published_tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submitted_tool_id UUID REFERENCES submitted_tools(id),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  price_type TEXT,
  rating DECIMAL(2,1) DEFAULT 4.0,
  review_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  hot BOOLEAN DEFAULT false,
  new BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_submitted_tools_status ON submitted_tools(status);
CREATE INDEX IF NOT EXISTS idx_submitted_tools_category ON submitted_tools(category);
CREATE INDEX IF NOT EXISTS idx_published_tools_category ON published_tools(category);
CREATE INDEX IF NOT EXISTS idx_published_tools_featured ON published_tools(featured);
CREATE INDEX IF NOT EXISTS idx_published_tools_hot ON published_tools(hot);

-- 启用行级安全（RLS）
ALTER TABLE submitted_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE published_tools ENABLE ROW LEVEL SECURITY;

-- 公共读取策略（只读已发布工具）
CREATE POLICY "Public read access" ON published_tools
  FOR SELECT USING (true);

-- 服务角色完全访问权限
CREATE POLICY "Service role full access" ON submitted_tools
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON review_logs
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON published_tools
  FOR ALL USING (auth.role() = 'service_role');
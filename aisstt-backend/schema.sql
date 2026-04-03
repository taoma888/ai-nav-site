-- D1 数据库建表语句
-- 执行：wrangler d1 execute aisstt-db --file=schema.sql

CREATE TABLE IF NOT EXISTS sites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  desc TEXT,
  category TEXT DEFAULT '其他',
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
  createdAt TEXT NOT NULL,
  reviewedAt TEXT
);

-- 创建索引以优化查询
CREATE INDEX IF NOT EXISTS idx_sites_status ON sites(status);
CREATE INDEX IF NOT EXISTS idx_sites_category ON sites(category);
CREATE INDEX IF NOT EXISTS idx_sites_createdAt ON sites(createdAt DESC);

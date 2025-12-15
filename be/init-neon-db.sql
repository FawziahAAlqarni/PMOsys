-- إنشاء جدول المشاريع
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    estimated_budget DECIMAL(15, 2),
    duration_in_weeks INTEGER,
    stage INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data JSONB DEFAULT '{}'::jsonb
);

-- إنشاء جدول الدروس المستفادة
CREATE TABLE IF NOT EXISTS lessons_learned (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    lesson_title VARCHAR(500) NOT NULL,
    lesson_description TEXT,
    category VARCHAR(100),
    impact_level VARCHAR(50),
    recommendations TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255)
);

-- إنشاء indexes للأداء
CREATE INDEX IF NOT EXISTS idx_projects_stage ON projects(stage);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);
CREATE INDEX IF NOT EXISTS idx_lessons_project_id ON lessons_learned(project_id);
CREATE INDEX IF NOT EXISTS idx_lessons_category ON lessons_learned(category);

-- عرض الجداول المنشأة
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

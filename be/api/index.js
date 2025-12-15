const { Pool } = require('pg');

// استخدام connection string من متغيرات البيئة أو localhost
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/project_management',
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const url = req.url || '';
  const method = req.method;

  try {
    // GET /api/projects - جلب جميع المشاريع
    if (url === '/api/projects' && method === 'GET') {
      const result = await pool.query('SELECT * FROM projects ORDER BY id DESC');
      return res.status(200).json(result.rows);
    }

    // GET /api/projects/:id - جلب مشروع محدد
    if (url.match(/^\/api\/projects\/\d+$/) && method === 'GET') {
      const id = url.split('/')[3];
      const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Project not found' });
      }
      return res.status(200).json(result.rows[0]);
    }

    // POST /api/projects - إضافة مشروع جديد
    if (url === '/api/projects' && method === 'POST') {
      const body = await getBody(req);
      const { name, description, estimated_budget, duration_in_weeks, stage, data } = body;
      
      const result = await pool.query(
        `INSERT INTO projects (name, description, estimated_budget, duration_in_weeks, stage, data, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) 
         RETURNING *`,
        [name, description, estimated_budget, duration_in_weeks, stage || 1, data || {}]
      );
      return res.status(201).json(result.rows[0]);
    }

    // PUT /api/projects/:id - تحديث مشروع
    if (url.match(/^\/api\/projects\/\d+$/) && method === 'PUT') {
      const id = url.split('/')[3];
      const body = await getBody(req);
      const { name, description, estimated_budget, duration_in_weeks, stage, data } = body;
      
      const result = await pool.query(
        `UPDATE projects 
         SET name = $1, description = $2, estimated_budget = $3, 
             duration_in_weeks = $4, stage = $5, data = $6, updated_at = NOW()
         WHERE id = $7 
         RETURNING *`,
        [name, description, estimated_budget, duration_in_weeks, stage, data, id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Project not found' });
      }
      return res.status(200).json(result.rows[0]);
    }

    // DELETE /api/projects/:id - حذف مشروع
    if (url.match(/^\/api\/projects\/\d+$/) && method === 'DELETE') {
      const id = url.split('/')[3];
      const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Project not found' });
      }
      return res.status(200).json({ message: 'Project deleted successfully' });
    }

    // GET /api/lessons - جلب جميع الدروس المستفادة
    if (url === '/api/lessons' && method === 'GET') {
      const result = await pool.query('SELECT * FROM lessons_learned ORDER BY created_at DESC');
      return res.status(200).json(result.rows);
    }

    // POST /api/lessons - إضافة درس مستفاد
    if (url === '/api/lessons' && method === 'POST') {
      const body = await getBody(req);
      const { project_id, lesson_title, lesson_description, category, impact_level, recommendations, created_by } = body;
      
      const result = await pool.query(
        `INSERT INTO lessons_learned (project_id, lesson_title, lesson_description, category, impact_level, recommendations, created_by, created_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) 
         RETURNING *`,
        [project_id, lesson_title, lesson_description, category, impact_level, recommendations, created_by]
      );
      return res.status(201).json(result.rows[0]);
    }

    return res.status(404).json({ error: 'Not found' });

  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

// Helper function للحصول على body من request
function getBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

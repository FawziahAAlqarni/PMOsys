const http = require('http');
const { Pool } = require('pg');

// إعداد الاتصال بـ PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'project_management',
  password: 'postgres',
  port: 5432,
});

// إنشاء الجداول إذا لم تكن موجودة
const initDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        estimated_budget NUMERIC,
        duration_in_weeks INTEGER,
        stage VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        data JSONB
      )
    `);
    console.log('✅ قاعدة البيانات جاهزة');
  } catch (error) {
    console.error('❌ خطأ في تهيئة قاعدة البيانات:', error);
  }
};

initDatabase();

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    // GET الصفحة الرئيسية
    if (req.url === '/' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PMO API Server - وزارة الحرس الوطني</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #006C35 0%, #004d25 100%); color: white; text-align: center; padding: 50px; margin: 0; }
            .container { max-width: 800px; margin: 0 auto; background: rgba(255,255,255,0.1); padding: 40px; border-radius: 20px; backdrop-filter: blur(10px); }
            h1 { font-size: 2.5em; margin-bottom: 10px; color: #C5A96F; }
            .status { background: #28a745; padding: 10px 20px; border-radius: 25px; display: inline-block; margin: 20px 0; font-weight: bold; }
            .endpoints { text-align: right; margin-top: 30px; background: rgba(0,0,0,0.2); padding: 20px; border-radius: 10px; }
            .endpoint { margin: 15px 0; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 8px; border-right: 4px solid #C5A96F; }
            .method { display: inline-block; padding: 5px 10px; border-radius: 5px; font-weight: bold; margin-left: 10px; font-size: 0.9em; }
            .get { background: #007bff; }
            .post { background: #28a745; }
            .put { background: #ffc107; color: #333; }
            .delete { background: #dc3545; }
            a { color: #C5A96F; text-decoration: none; font-weight: bold; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🛡️ نظام إدارة المحافظ والمشاريع</h1>
            <h2>برنامج تطوير وزارة الحرس الوطني - مكتب إدارة المشاريع</h2>
            <div class="status">✅ السيرفر يعمل بنجاح</div>
            
            <div class="endpoints">
              <h3>📡 API Endpoints المتاحة:</h3>
              
              <div class="endpoint">
                <span class="method get">GET</span>
                <a href="/project-cards" target="_blank">/project-cards</a>
                <br><small>جلب جميع المشاريع</small>
              </div>
              
              <div class="endpoint">
                <span class="method post">POST</span>
                <span>/project-cards</span>
                <br><small>إضافة مشروع جديد</small>
              </div>
              
              <div class="endpoint">
                <span class="method get">GET</span>
                <span>/project-cards/:id</span>
                <br><small>جلب مشروع محدد</small>
              </div>
              
              <div class="endpoint">
                <span class="method put">PUT</span>
                <span>/project-cards/:id</span>
                <br><small>تحديث مشروع</small>
              </div>
              
              <div class="endpoint">
                <span class="method delete">DELETE</span>
                <span>/project-cards/:id</span>
                <br><small>حذف مشروع</small>
              </div>
            </div>
            
            <p style="margin-top: 30px; font-size: 0.9em; opacity: 0.8;">
              🔌 Port: 3030 | 💾 Database: PostgreSQL | 📅 ${new Date().toLocaleDateString('ar-SA')}
            </p>
          </div>
        </body>
        </html>
      `);
      return;
    }

    // GET جميع المشاريع
    if (req.url === '/project-cards' && req.method === 'GET') {
      const result = await pool.query('SELECT * FROM projects ORDER BY id DESC');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result.rows));
      return;
    }

    // POST مشروع جديد
    if (req.url === '/project-cards' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', async () => {
        try {
          const newProject = JSON.parse(body);
          const result = await pool.query(
            `INSERT INTO projects (name, description, estimated_budget, duration_in_weeks, stage, data) 
             VALUES ($1, $2, $3, $4, $5, $6) 
             RETURNING *`,
            [
              newProject.name || 'مشروع جديد',
              newProject.description || '',
              newProject.estimatedBudget || newProject.estimated_budget || 0,
              newProject.durationInWeeks || newProject.duration_in_weeks || 0,
              newProject.stage || 'planning',
              JSON.stringify(newProject)
            ]
          );
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result.rows[0]));
          console.log(`✓ تم إضافة مشروع: ${result.rows[0].name}`);
        } catch (error) {
          console.error('خطأ في POST:', error);
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: error.message }));
        }
      });
      return;
    }

    // GET مشروع معين
    if (req.url.match(/^\/project-cards\/\d+$/) && req.method === 'GET') {
      const id = parseInt(req.url.split('/')[2]);
      const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result.rows[0]));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Project not found' }));
      }
      return;
    }

    // PUT/PATCH تحديث مشروع
    if (req.url.match(/^\/project-cards\/\d+$/) && (req.method === 'PUT' || req.method === 'PATCH')) {
      const id = parseInt(req.url.split('/')[2]);
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', async () => {
        try {
          const updatedData = JSON.parse(body);
          
          // تنظيف البيانات - نتأكد أن id صحيح
          const cleanData = { ...updatedData, id: id };
          
          // تحويل القيم إلى أنواع صحيحة
          const estimatedBudget = updatedData.estimatedBudget || updatedData.estimated_budget;
          const durationInWeeks = updatedData.durationInWeeks || updatedData.duration_in_weeks;
          
          // نحدث الحقول الأساسية + نحفظ كل البيانات في JSONB
          const result = await pool.query(
            `UPDATE projects 
             SET name = COALESCE($1, name),
                 description = COALESCE($2, description),
                 estimated_budget = COALESCE($3::numeric, estimated_budget),
                 duration_in_weeks = COALESCE($4::integer, duration_in_weeks),
                 stage = COALESCE($5, stage),
                 data = $6::jsonb,
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $7
             RETURNING *`,
            [
              updatedData.name || null,
              updatedData.description || null,
              estimatedBudget ? parseFloat(estimatedBudget) : null,
              durationInWeeks ? parseInt(durationInWeeks) : null,
              updatedData.stage || null,
              JSON.stringify(cleanData),
              id
            ]
          );
          
          if (result.rows.length > 0) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result.rows[0]));
            console.log(`✓ تم تحديث المشروع: ${result.rows[0].name}`);
          } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Project not found' }));
          }
        } catch (error) {
          console.error('خطأ في UPDATE:', error);
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: error.message }));
        }
      });
      return;
    }

    // DELETE حذف مشروع
    if (req.url.match(/^\/project-cards\/\d+$/) && req.method === 'DELETE') {
      const id = parseInt(req.url.split('/')[2]);
      const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length > 0) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Deleted', project: result.rows[0] }));
        console.log(`✓ تم حذف المشروع: ${result.rows[0].name}`);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Project not found' }));
      }
      return;
    }

    // 404 للروابط غير الموجودة
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  } catch (error) {
    console.error('خطأ في المعالجة:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
});

const PORT = 3030;
server.listen(PORT, () => {
  console.log(`🚀 الخادم يعمل على http://localhost:${PORT}`);
  console.log(`📊 متصل بـ PostgreSQL: project_management`);
});

const http = require('http');

// تخزين المشاريع في الذاكرة (استبدل هذا بقاعدة بيانات حقيقية لاحقاً)
let projects = [
  { id: 1, name: 'مشروع تجريبي 1', estimatedBudget: 5000, durationInWeeks: 8 },
  { id: 2, name: 'مشروع تجريبي 2', estimatedBudget: 10000, durationInWeeks: 12 }
];

let nextId = 3;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // GET جميع المشاريع
  if (req.url === '/project-cards' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(projects));
    return;
  }

  // POST مشروع جديد
  if (req.url === '/project-cards' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const newProject = JSON.parse(body);
        newProject.id = nextId++;
        projects.push(newProject);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newProject));
        console.log(`✓ تم إضافة مشروع: ${newProject.name}`);
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // GET مشروع معين
  if (req.url.match(/^\/project-cards\/\d+$/) && req.method === 'GET') {
    const id = parseInt(req.url.split('/')[2]);
    const project = projects.find(p => p.id === id);
    if (project) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(project));
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
    req.on('end', () => {
      try {
        const updatedData = JSON.parse(body);
        const index = projects.findIndex(p => p.id === id);
        if (index !== -1) {
          projects[index] = { ...projects[index], ...updatedData };
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(projects[index]));
          console.log(`✓ تم تحديث المشروع: ${projects[index].name}`);
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Project not found' }));
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // DELETE حذف مشروع
  if (req.url.match(/^\/project-cards\/\d+$/) && req.method === 'DELETE') {
    const id = parseInt(req.url.split('/')[2]);
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
      const deleted = projects.splice(index, 1);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Deleted', project: deleted[0] }));
      console.log(`✓ تم حذف المشروع: ${deleted[0].name}`);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Project not found' }));
    }
    return;
  }

  if (req.url === '/docs') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>API Server Running on port 3030</h1><p>Visit http://localhost:3000 to use the app</p>');
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(3030, () => {
  console.log('✓ Simple API Server running on http://localhost:3030');
  console.log('✓ CORS enabled for all origins');
  console.log('✓ Endpoints: GET/POST /project-cards, GET/PUT/DELETE /project-cards/:id');
});

'use client';

import { useState, useEffect } from 'react';

export default function Gate3DataDemo() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3030/project-cards');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const showProjectData = (project: any) => {
    const projectData = project.data || {};
    setSelectedProject({
      id: project.id,
      name: project.name,
      description: project.description,
      stage: project.stage,
      gate3Data: projectData.gate3Data || {},
      charter: projectData.charter || {}
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#7c3aed' }}>
        🚀 عرض بيانات البوابة 3 - PostgreSQL
      </h1>

      {loading && <p>⏳ جاري التحميل...</p>}

      {!loading && projects.length === 0 && (
        <p style={{ color: '#666' }}>لا توجد مشاريع</p>
      )}

      {!loading && projects.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>
            المشاريع ({projects.length})
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => showProjectData(project)}
                style={{
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '15px',
                  cursor: 'pointer',
                  backgroundColor: selectedProject?.id === project.id ? '#f3e8ff' : '#fff',
                  transition: 'all 0.2s'
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>
                  {project.name}
                </h3>
                <p style={{ fontSize: '12px', color: '#666' }}>
                  المرحلة: {project.stage || 'planning'}
                </p>
                <p style={{ fontSize: '12px', color: '#666' }}>
                  ID: {project.id}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedProject && (
        <div style={{ marginTop: '30px', border: '2px solid #7c3aed', borderRadius: '12px', padding: '20px', backgroundColor: '#faf5ff' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#7c3aed' }}>
            📊 بيانات البوابة 3: {selectedProject.name}
          </h2>

          {/* الجدول الزمني */}
          <div style={{ marginBottom: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#7c3aed' }}>
              📅 الجدول الزمني
            </h3>
            
            {selectedProject.gate3Data?.timeline?.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f3e8ff' }}>
                      <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #e5e7eb' }}>المرحلة</th>
                      <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #e5e7eb' }}>تاريخ البدء</th>
                      <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #e5e7eb' }}>تاريخ الانتهاء</th>
                      <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #e5e7eb' }}>المدة (أيام)</th>
                      <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #e5e7eb' }}>الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProject.gate3Data.timeline.map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.phase || '-'}</td>
                        <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.startDate || '-'}</td>
                        <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.endDate || '-'}</td>
                        <td style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'center' }}>{item.duration || '-'}</td>
                        <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            backgroundColor: item.status === 'completed' ? '#d1fae5' : item.status === 'inProgress' ? '#dbeafe' : '#f3f4f6',
                            color: item.status === 'completed' ? '#065f46' : item.status === 'inProgress' ? '#1e40af' : '#6b7280'
                          }}>
                            {item.status === 'completed' ? 'مكتمل' : item.status === 'inProgress' ? 'جاري' : 'لم يبدأ'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ color: '#999', fontSize: '14px' }}>لم يتم إنشاء جدول زمني</p>
            )}
          </div>

          {/* ميثاق المشروع */}
          <div style={{ marginBottom: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#7c3aed' }}>
              📜 ميثاق المشروع
            </h3>
            
            {selectedProject.charter ? (
              <div style={{ fontSize: '13px', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>اسم المشروع:</h4>
                  <p>{selectedProject.charter.projectName || '-'}</p>
                </div>
                
                <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>الهدف:</h4>
                  <p>{selectedProject.charter.objective || '-'}</p>
                </div>
                
                <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>النطاق:</h4>
                  <p>{selectedProject.charter.scope || '-'}</p>
                </div>
                
                <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>أصحاب المصلحة:</h4>
                  <p>{selectedProject.charter.stakeholders || '-'}</p>
                </div>
                
                <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>المخرجات الرئيسية:</h4>
                  <p>{selectedProject.charter.deliverables || '-'}</p>
                </div>
                
                <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>الميزانية:</h4>
                  <p>{selectedProject.charter.budget || '-'}</p>
                </div>
              </div>
            ) : (
              <p style={{ color: '#999', fontSize: '14px' }}>لم يتم إنشاء ميثاق المشروع</p>
            )}
          </div>

          {/* JSON الكامل */}
          <details style={{ marginTop: '20px' }}>
            <summary style={{ cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', color: '#6b7280' }}>
              📄 عرض JSON الكامل للبوابة 3
            </summary>
            <pre style={{ 
              backgroundColor: '#1f2937', 
              color: '#a78bfa', 
              padding: '15px', 
              borderRadius: '8px', 
              fontSize: '11px', 
              overflow: 'auto',
              maxHeight: '400px',
              marginTop: '10px'
            }}>
              {JSON.stringify({ gate3Data: selectedProject.gate3Data, charter: selectedProject.charter }, null, 2)}
            </pre>
          </details>
        </div>
      )}

      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#f3e8ff', 
        borderRadius: '8px',
        fontSize: '13px'
      }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>ℹ️ معلومات البوابة 3:</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li>✅ الجدول الزمني التفصيلي للمشروع</li>
          <li>✅ ميثاق المشروع الكامل</li>
          <li>✅ يتم الحفظ تلقائياً في PostgreSQL</li>
          <li>📊 المسار في قاعدة البيانات: data→gate3Data</li>
        </ul>
      </div>
    </div>
  );
}

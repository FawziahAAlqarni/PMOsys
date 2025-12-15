'use client';

import { useState, useEffect } from 'react';

export default function Gate4DataDemo() {
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
      gate4Data: projectData.gate4Data || {}
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#059669' }}>
        ✅ عرض بيانات البوابة 4 - PostgreSQL
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
                  backgroundColor: selectedProject?.id === project.id ? '#d1fae5' : '#fff',
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
        <div style={{ marginTop: '30px', border: '2px solid #059669', borderRadius: '12px', padding: '20px', backgroundColor: '#f0fdf4' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#059669' }}>
            📊 بيانات البوابة 4 (الإغلاق): {selectedProject.name}
          </h2>

          {/* الجدول الزمني الفعلي */}
          <div style={{ marginBottom: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#059669' }}>
              📅 الجدول الزمني الفعلي
            </h3>
            
            {selectedProject.gate4Data?.timeline?.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#d1fae5' }}>
                      <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #e5e7eb' }}>المرحلة</th>
                      <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #e5e7eb' }}>التاريخ المخطط</th>
                      <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #e5e7eb' }}>التاريخ الفعلي</th>
                      <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #e5e7eb' }}>الفرق</th>
                      <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #e5e7eb' }}>ملاحظات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProject.gate4Data.timeline.map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ padding: '10px', border: '1px solid #e5e7eb', fontWeight: 'bold' }}>{item.phase || '-'}</td>
                        <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.plannedDate || '-'}</td>
                        <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.actualDate || '-'}</td>
                        <td style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                          <span style={{ 
                            color: item.variance > 0 ? '#dc2626' : item.variance < 0 ? '#059669' : '#6b7280'
                          }}>
                            {item.variance ? `${item.variance} يوم` : '-'}
                          </span>
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #e5e7eb', fontSize: '12px' }}>{item.notes || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ color: '#999', fontSize: '14px' }}>لم يتم تسجيل الجدول الزمني الفعلي</p>
            )}
          </div>

          {/* الدروس المستفادة */}
          <div style={{ marginBottom: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#059669' }}>
              💡 الدروس المستفادة
            </h3>
            
            {selectedProject.gate4Data?.lessons?.length > 0 ? (
              <div style={{ display: 'grid', gap: '15px' }}>
                {selectedProject.gate4Data.lessons.map((lesson, idx) => (
                  <div key={idx} style={{ 
                    padding: '15px', 
                    backgroundColor: '#f0fdf4', 
                    borderRadius: '8px', 
                    border: '1px solid #86efac'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                      <span style={{ 
                        fontSize: '20px', 
                        minWidth: '30px',
                        color: lesson.type === 'success' ? '#059669' : lesson.type === 'challenge' ? '#dc2626' : '#0891b2'
                      }}>
                        {lesson.type === 'success' ? '✅' : lesson.type === 'challenge' ? '⚠️' : '📝'}
                      </span>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>
                          {lesson.category || 'درس مستفاد'}
                        </h4>
                        <p style={{ fontSize: '13px', color: '#4b5563', marginBottom: '8px' }}>
                          {lesson.description || '-'}
                        </p>
                        {lesson.recommendation && (
                          <p style={{ fontSize: '12px', color: '#059669', fontStyle: 'italic' }}>
                            💬 التوصية: {lesson.recommendation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#999', fontSize: '14px' }}>لم يتم تسجيل دروس مستفادة</p>
            )}
          </div>

          {/* خطة التفعيل */}
          <div style={{ marginBottom: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#059669' }}>
              🚀 خطة التفعيل
            </h3>
            
            {selectedProject.gate4Data?.activationPlan?.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#d1fae5' }}>
                      <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #e5e7eb' }}>النشاط</th>
                      <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #e5e7eb' }}>المسؤول</th>
                      <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #e5e7eb' }}>التاريخ المستهدف</th>
                      <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #e5e7eb' }}>الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProject.gate4Data.activationPlan.map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.activity || '-'}</td>
                        <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.responsible || '-'}</td>
                        <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>{item.targetDate || '-'}</td>
                        <td style={{ padding: '10px', border: '1px solid #e5e7eb' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            backgroundColor: item.status === 'completed' ? '#d1fae5' : item.status === 'inProgress' ? '#fef3c7' : '#f3f4f6',
                            color: item.status === 'completed' ? '#065f46' : item.status === 'inProgress' ? '#92400e' : '#6b7280'
                          }}>
                            {item.status === 'completed' ? 'مكتمل' : item.status === 'inProgress' ? 'جاري' : 'مجدول'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ color: '#999', fontSize: '14px' }}>لم يتم إنشاء خطة تفعيل</p>
            )}
          </div>

          {/* JSON الكامل */}
          <details style={{ marginTop: '20px' }}>
            <summary style={{ cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', color: '#6b7280' }}>
              📄 عرض JSON الكامل للبوابة 4
            </summary>
            <pre style={{ 
              backgroundColor: '#1f2937', 
              color: '#34d399', 
              padding: '15px', 
              borderRadius: '8px', 
              fontSize: '11px', 
              overflow: 'auto',
              maxHeight: '400px',
              marginTop: '10px'
            }}>
              {JSON.stringify(selectedProject.gate4Data, null, 2)}
            </pre>
          </details>
        </div>
      )}

      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#d1fae5', 
        borderRadius: '8px',
        fontSize: '13px'
      }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>ℹ️ معلومات البوابة 4:</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li>✅ الجدول الزمني الفعلي مقابل المخطط</li>
          <li>✅ الدروس المستفادة من المشروع</li>
          <li>✅ خطة التفعيل والتسليم</li>
          <li>✅ يتم الحفظ تلقائياً في PostgreSQL</li>
          <li>📊 المسار في قاعدة البيانات: data→gate4Data</li>
        </ul>
      </div>
    </div>
  );
}

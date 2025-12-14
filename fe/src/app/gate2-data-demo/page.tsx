'use client';

import { useState, useEffect } from 'react';

export default function Gate2DataDemo() {
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

  const showProjectData = (project) => {
    // تحويل البيانات من PostgreSQL
    const projectData = project.data || {};
    setSelectedProject({
      id: project.id,
      name: project.name,
      description: project.description,
      stage: project.stage,
      gate2Data: projectData.gate2Data || {},
      gate3Data: projectData.gate3Data || {},
      gate4Data: projectData.gate4Data || {},
      risks: projectData.risks || []
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#7c3aed' }}>
        🚀 عرض بيانات البوابة 2 - PostgreSQL
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
                  backgroundColor: selectedProject?.id === project.id ? '#dbeafe' : '#fff',
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
        <div style={{ marginTop: '30px', border: '2px solid #3b82f6', borderRadius: '12px', padding: '20px', backgroundColor: '#f8fafc' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#1e40af' }}>
            📊 بيانات المشروع: {selectedProject.name}
          </h2>

          {/* البوابة 2 - خطة المشتريات */}
          <div style={{ marginBottom: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#059669' }}>
              🛒 البوابة 2 - خطة المشتريات
            </h3>
            
            {selectedProject.gate2Data?.procurement ? (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>الخيار المختار:</h4>
                  <p style={{ padding: '10px', backgroundColor: '#f0fdf4', borderRadius: '6px', border: '1px solid #86efac' }}>
                    {selectedProject.gate2Data.procurement.selectedOption}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                  {['internal', 'hybrid', 'outsourced'].map((opt) => {
                    const option = selectedProject.gate2Data.procurement.options?.[opt];
                    const titles = {
                      internal: 'التنفيذ الداخلي',
                      hybrid: 'التنفيذ الهجين',
                      outsourced: 'التنفيذ الخارجي'
                    };
                    return (
                      <div key={opt} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '15px', backgroundColor: '#fafafa' }}>
                        <h5 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '10px', color: '#374151' }}>
                          {titles[opt]}
                        </h5>
                        {option ? (
                          <>
                            <p style={{ fontSize: '12px', margin: '5px 0' }}>💰 التكلفة: {option.cost || '-'} ر.س</p>
                            <p style={{ fontSize: '12px', margin: '5px 0' }}>⏱️ المدة: {option.duration || '-'} شهر</p>
                            <p style={{ fontSize: '12px', margin: '5px 0' }}>📊 النسبة: {option.percent || '-'}%</p>
                            <p style={{ fontSize: '12px', margin: '5px 0' }}>📅 البدء: {option.startDate || '-'}</p>
                          </>
                        ) : (
                          <p style={{ fontSize: '12px', color: '#999' }}>لم يتم التعبئة</p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div style={{ border: '1px solid #86efac', borderRadius: '8px', padding: '15px', backgroundColor: '#f0fdf4' }}>
                    <h5 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '10px', color: '#059669' }}>
                      ✅ الإيجابيات:
                    </h5>
                    <p style={{ fontSize: '12px', whiteSpace: 'pre-wrap' }}>
                      {selectedProject.gate2Data.procurement.selectedOptionAnalysis?.pros || 'لم يتم كتابة إيجابيات'}
                    </p>
                  </div>
                  <div style={{ border: '1px solid #fca5a5', borderRadius: '8px', padding: '15px', backgroundColor: '#fef2f2' }}>
                    <h5 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '10px', color: '#dc2626' }}>
                      ❌ السلبيات:
                    </h5>
                    <p style={{ fontSize: '12px', whiteSpace: 'pre-wrap' }}>
                      {selectedProject.gate2Data.procurement.selectedOptionAnalysis?.cons || 'لم يتم كتابة سلبيات'}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <p style={{ color: '#999', fontSize: '14px' }}>لم يتم ملء بيانات خطة المشتريات</p>
            )}
          </div>

          {/* البوابة 2 - النطاق */}
          <div style={{ marginBottom: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#0891b2' }}>
              🎯 البوابة 2 - نطاق المشروع
            </h3>
            
            {selectedProject.gate2Data?.scope ? (
              <div style={{ fontSize: '13px' }}>
                <p style={{ marginBottom: '10px' }}><strong>الهدف:</strong> {selectedProject.gate2Data.scope.goal || '-'}</p>
                <p style={{ marginBottom: '10px' }}><strong>النتيجة:</strong> {selectedProject.gate2Data.scope.result || '-'}</p>
                <p style={{ marginBottom: '10px' }}><strong>المبادرة:</strong> {selectedProject.gate2Data.scope.initiative || '-'}</p>
                <p style={{ marginBottom: '10px' }}><strong>البرنامج:</strong> {selectedProject.gate2Data.scope.program || '-'}</p>
                <p style={{ marginBottom: '10px' }}><strong>المخرجات:</strong> {selectedProject.gate2Data.scope.deliverables?.length || 0} مخرج</p>
              </div>
            ) : (
              <p style={{ color: '#999', fontSize: '14px' }}>لم يتم ملء بيانات النطاق</p>
            )}
          </div>

          {/* المخاطر */}
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#dc2626' }}>
              ⚠️ سجل المخاطر
            </h3>
            
            {selectedProject.risks?.length > 0 ? (
              <ul style={{ fontSize: '13px', listStyle: 'none', padding: 0 }}>
                {selectedProject.risks.map((risk, idx) => (
                  <li key={idx} style={{ padding: '10px', marginBottom: '10px', backgroundColor: '#fef2f2', borderRadius: '6px', border: '1px solid #fca5a5' }}>
                    <strong>{risk.title || risk.description}</strong>
                    {risk.probability && <span style={{ marginLeft: '10px', color: '#666' }}>احتمالية: {risk.probability}</span>}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#999', fontSize: '14px' }}>لا توجد مخاطر مسجلة</p>
            )}
          </div>

          {/* JSON الكامل */}
          <details style={{ marginTop: '20px' }}>
            <summary style={{ cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', color: '#6b7280' }}>
              📄 عرض JSON الكامل
            </summary>
            <pre style={{ 
              backgroundColor: '#1f2937', 
              color: '#10b981', 
              padding: '15px', 
              borderRadius: '8px', 
              fontSize: '11px', 
              overflow: 'auto',
              maxHeight: '400px',
              marginTop: '10px'
            }}>
              {JSON.stringify(selectedProject, null, 2)}
            </pre>
          </details>
        </div>
      )}

      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#dbeafe', 
        borderRadius: '8px',
        fontSize: '13px'
      }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>ℹ️ معلومات:</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li>✅ البيانات تُحفظ تلقائياً في PostgreSQL</li>
          <li>✅ يتم حفظ جميع بيانات البوابات (1, 2, 3, 4)</li>
          <li>✅ يمكنك عرض JSON الكامل لكل مشروع</li>
          <li>📊 قاعدة البيانات: projects (حقل data بصيغة JSONB)</li>
        </ul>
      </div>
    </div>
  );
}

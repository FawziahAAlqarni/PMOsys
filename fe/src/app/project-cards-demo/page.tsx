'use client';

import { useState, useEffect } from 'react';

interface Project {
  id: number;
  name: string;
  description: string;
  estimatedBudget: number;
  durationInWeeks: number;
  stage: string;
  data: any;
}

export default function ProjectCardsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:3030/project-cards', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ في الاتصال');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#1976d2' }}>
        📋 عرض جميع بيانات المشروع - PostgreSQL
      </h1>

      {error && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#ffebee', 
          color: '#c62828',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #ef5350'
        }}>
          ❌ خطأ: {error}
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={fetchProjects}
          style={{
            padding: '12px 24px',
            marginLeft: '10px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          🔄 تحديث البيانات
        </button>
      </div>

      {loading && <p style={{ fontSize: '16px' }}>⏳ جاري التحميل...</p>}

      {!loading && projects.length === 0 && !error && (
        <p style={{ fontSize: '16px', color: '#999' }}>لا توجد مشاريع حالياً</p>
      )}

      {!loading && projects.length > 0 && (
        <div>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>عدد المشاريع: {projects.length}</h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '15px',
            marginBottom: '30px'
          }}>
            {projects.map((project) => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(selectedProject?.id === project.id ? null : project)}
                style={{
                  border: selectedProject?.id === project.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '15px',
                  backgroundColor: selectedProject?.id === project.id ? '#e3f2fd' : '#f9f9f9',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>{project.name}</h3>
                <p style={{ margin: '5px 0', fontSize: '13px', color: '#666' }}>{project.description}</p>
                <div style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
                  <p>💰 الميزانية: {project.estimatedBudget?.toLocaleString('ar-SA')} ر.س</p>
                  <p>📅 المدة: {project.durationInWeeks} أسابيع</p>
                  <p>🎯 المرحلة: {project.stage || 'planning'}</p>
                  <p>🔑 ID: {project.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedProject && (
        <div style={{ 
          marginTop: '30px', 
          padding: '25px', 
          backgroundColor: '#f0f7ff', 
          borderRadius: '12px',
          border: '2px solid #1976d2'
        }}>
          <h2 style={{ fontSize: '20px', marginBottom: '25px', color: '#1976d2' }}>
            📊 بيانات المشروع: {selectedProject.name}
          </h2>

          {/* البيانات الأساسية */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            border: '1px solid #e3f2fd'
          }}>
            <h3 style={{ fontSize: '16px', marginBottom: '15px', color: '#1976d2' }}>📌 البيانات الأساسية</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666' }}>اسم المشروع</label>
                <p style={{ fontSize: '14px', marginTop: '5px' }}>{selectedProject.name}</p>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666' }}>الوصف</label>
                <p style={{ fontSize: '14px', marginTop: '5px' }}>{selectedProject.description}</p>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666' }}>الميزانية المقدرة</label>
                <p style={{ fontSize: '14px', marginTop: '5px', color: '#1976d2', fontWeight: 'bold' }}>
                  {selectedProject.estimatedBudget?.toLocaleString('ar-SA')} ر.س
                </p>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666' }}>المدة (أسابيع)</label>
                <p style={{ fontSize: '14px', marginTop: '5px' }}>{selectedProject.durationInWeeks}</p>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666' }}>المرحلة الحالية</label>
                <p style={{ fontSize: '14px', marginTop: '5px' }}>{selectedProject.stage}</p>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666' }}>معرف المشروع</label>
                <p style={{ fontSize: '14px', marginTop: '5px' }}>#{selectedProject.id}</p>
              </div>
            </div>
          </div>

          {/* بيانات البوابة 1 */}
          {selectedProject.data?.approvals && selectedProject.data.approvals.length > 0 && (
            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '8px', 
              marginBottom: '20px',
              border: '1px solid #e3f2fd'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px', color: '#0891b2' }}>✍️ بيانات البوابة 1: الموافقات</h3>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>عدد الموافقات: {selectedProject.data.approvals.length}</p>
            </div>
          )}

          {selectedProject.data?.risks && selectedProject.data.risks.length > 0 && (
            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '8px', 
              marginBottom: '20px',
              border: '1px solid #e3f2fd'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px', color: '#0891b2' }}>⚠️ بيانات البوابة 1: المخاطر</h3>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>عدد المخاطر: {selectedProject.data.risks.length}</p>
            </div>
          )}

          {/* بيانات البوابة 2 */}
          {selectedProject.data?.gate2Data && (
            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '8px', 
              marginBottom: '20px',
              border: '1px solid #e3f2fd'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px', color: '#7c3aed' }}>🎯 بيانات البوابة 2</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {selectedProject.data.gate2Data.procurement && (
                  <p style={{ fontSize: '12px', color: '#666' }}>✅ خطة المشتريات محفوظة</p>
                )}
                {selectedProject.data.gate2Data.scope && (
                  <p style={{ fontSize: '12px', color: '#666' }}>✅ نطاق المشروع محفوظ</p>
                )}
              </div>
            </div>
          )}

          {/* بيانات البوابة 3 */}
          {selectedProject.data?.gate3Data && (
            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '8px', 
              marginBottom: '20px',
              border: '1px solid #e3f2fd'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px', color: '#7c3aed' }}>🚀 بيانات البوابة 3</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {selectedProject.data.gate3Data.timeline && (
                  <p style={{ fontSize: '12px', color: '#666' }}>✅ الجدول الزمني: {selectedProject.data.gate3Data.timeline.length} مرحلة</p>
                )}
                {selectedProject.data.gate3Data.charter && (
                  <p style={{ fontSize: '12px', color: '#666' }}>✅ ميثاق المشروع محفوظ</p>
                )}
              </div>
            </div>
          )}

          {/* بيانات البوابة 4 */}
          {selectedProject.data?.gate4Data && (
            <div style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '8px', 
              marginBottom: '20px',
              border: '1px solid #e3f2fd'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px', color: '#059669' }}>✅ بيانات البوابة 4</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {selectedProject.data.gate4Data.timeline && (
                  <p style={{ fontSize: '12px', color: '#666' }}>✅ الجدول الفعلي: {selectedProject.data.gate4Data.timeline.length} مرحلة</p>
                )}
                {selectedProject.data.gate4Data.lessons && (
                  <p style={{ fontSize: '12px', color: '#666' }}>✅ دروس مستفادة: {selectedProject.data.gate4Data.lessons.length}</p>
                )}
              </div>
            </div>
          )}

          {/* JSON الكامل */}
          <details style={{ marginTop: '20px' }}>
            <summary style={{ cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', color: '#6b7280', padding: '10px' }}>
              📄 عرض JSON الكامل
            </summary>
            <pre style={{ 
              backgroundColor: '#1f2937', 
              color: '#10b981', 
              padding: '15px', 
              borderRadius: '8px', 
              fontSize: '11px', 
              overflow: 'auto',
              maxHeight: '500px',
              marginTop: '10px'
            }}>
              {JSON.stringify(selectedProject, null, 2)}
            </pre>
          </details>
        </div>
      )}

      {/* جدول معلومات الحقول المطلوبة */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#e8f5e9',
        borderRadius: '8px',
        border: '1px solid #4caf50'
      }}>
        <h3 style={{ fontSize: '16px', marginBottom: '15px', color: '#2e7d32' }}>📝 الحقول المطلوبة عند تسجيل مشروع جديد:</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#81c784' }}>
                <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #4caf50', color: '#fff', fontWeight: 'bold' }}>الحقل</th>
                <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #4caf50', color: '#fff', fontWeight: 'bold' }}>النوع</th>
                <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #4caf50', color: '#fff', fontWeight: 'bold' }}>الوصف</th>
                <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #4caf50', color: '#fff', fontWeight: 'bold' }}>مثال</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #4caf50', fontWeight: 'bold' }}>name</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50' }}>نص (Text)</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50' }}>اسم المشروع</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50', fontSize: '11px' }}>مشروع تطوير النظام</td>
              </tr>
              <tr style={{ backgroundColor: '#f1f8f6' }}>
                <td style={{ padding: '10px', border: '1px solid #4caf50', fontWeight: 'bold' }}>description</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50' }}>نص طويل (Text)</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50' }}>وصف المشروع</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50', fontSize: '11px' }}>تطوير نظام إدارة...</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #4caf50', fontWeight: 'bold' }}>estimatedBudget</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50' }}>رقم عشري (Decimal)</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50' }}>الميزانية المقدرة بالريال</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50', fontSize: '11px' }}>500000.50</td>
              </tr>
              <tr style={{ backgroundColor: '#f1f8f6' }}>
                <td style={{ padding: '10px', border: '1px solid #4caf50', fontWeight: 'bold' }}>durationInWeeks</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50' }}>رقم صحيح (Integer)</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50' }}>مدة المشروع بالأسابيع</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50', fontSize: '11px' }}>24</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #4caf50', fontWeight: 'bold' }}>stage</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50' }}>نص (Text)</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50' }}>مرحلة المشروع الحالية</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50', fontSize: '11px' }}>planning / gate1 / gate2...</td>
              </tr>
              <tr style={{ backgroundColor: '#fff9c4' }}>
                <td style={{ padding: '10px', border: '1px solid #4caf50', fontWeight: 'bold' }}>gate1Data</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50' }}>JSON</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50' }}>موافقات + مخاطر البوابة 1</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50', fontSize: '11px' }}>'approvals: [], risks: []'</td>
              </tr>
              <tr style={{ backgroundColor: '#fff9c4' }}>
                <td style={{ padding: '10px', border: '1px solid #4caf50', fontWeight: 'bold' }}>gate2Data</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50' }}>JSON</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50' }}>خطة المشتريات + النطاق</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50', fontSize: '11px' }}>'procurement: {}, scope: {}'</td>
              </tr>
              <tr style={{ backgroundColor: '#fff9c4' }}>
                <td style={{ padding: '10px', border: '1px solid #4caf50', fontWeight: 'bold' }}>gate3Data</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50' }}>JSON</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50' }}>جدول زمني + ميثاق</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50', fontSize: '11px' }}>'timeline: [], charter: {}'</td>
              </tr>
              <tr style={{ backgroundColor: '#fff9c4' }}>
                <td style={{ padding: '10px', border: '1px solid #4caf50', fontWeight: 'bold' }}>gate4Data</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50' }}>JSON</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50' }}>النتائج الفعلية والدروس</td>
                <td style={{ padding: '10px', border: '1px solid #4caf50', fontSize: '11px' }}>'timeline: [], lessons: []'</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff' ,borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>📌 ملاحظات مهمة:</h4>
          <ul style={{ margin: '0', paddingRight: '20px', fontSize: '13px', lineHeight: '1.8' }}>
            <li>✅ جميع الحقول الأساسية مطلوبة (name, description, estimatedBudget, durationInWeeks)</li>
            <li>✅ الحقول JSON (gate1Data, gate2Data, gate3Data, gate4Data) اختيارية عند الإنشاء</li>
            <li>✅ يتم إنشاء معرف فريد (ID) تلقائياً من قاعدة البيانات</li>
            <li>✅ المرحلة الافتراضية عند الإنشاء: "planning"</li>
            <li>✅ جميع البيانات تُحفظ في PostgreSQL تلقائياً</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

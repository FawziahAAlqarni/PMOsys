'use client';

import { useState, useEffect } from 'react';

interface Approval {
  roleId: string;
  status: string;
  date?: string;
  approvedBy?: string;
  comment?: string;
}

interface Risk {
  description: string;
  severity: string;
  status?: string;
  impact?: string;
  owner?: string;
  mitigation?: string;
}

interface Project {
  id: string;
  name: string;
  description?: string;
  stage?: string;
  data?: {
    approvals?: Approval[];
    risks?: Risk[];
  };
}

interface SelectedProject {
  id: string;
  name: string;
  description?: string;
  stage?: string;
  approvals: Approval[];
  risks: Risk[];
}

export default function Gate1DataDemo() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<SelectedProject | null>(null);

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

  const showProjectData = (project: Project) => {
    const projectData = project.data || {};
    setSelectedProject({
      id: project.id,
      name: project.name,
      description: project.description,
      stage: project.stage,
      approvals: projectData.approvals || [],
      risks: projectData.risks || []
    });
  };

  const getApprovalStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return '#d1fae5';
      case 'rejected':
        return '#fee2e2';
      case 'pending':
        return '#fef3c7';
      default:
        return '#f3f4f6';
    }
  };

  const getApprovalStatusTextColor = (status: string) => {
    switch (status) {
      case 'approved':
        return '#065f46';
      case 'rejected':
        return '#991b1b';
      case 'pending':
        return '#92400e';
      default:
        return '#6b7280';
    }
  };

  const getApprovalStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return '✅ موافق عليه';
      case 'rejected':
        return '❌ مرفوض';
      case 'pending':
        return '⏳ قيد الانتظار';
      default:
        return 'غير محدد';
    }
  };

  const getRiskSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return '#fee2e2';
      case 'medium':
        return '#fef3c7';
      case 'low':
        return '#d1fae5';
      default:
        return '#f3f4f6';
    }
  };

  const getRiskSeverityText = (severity: string) => {
    switch (severity) {
      case 'high':
        return '🔴 عالي';
      case 'medium':
        return '🟡 متوسط';
      case 'low':
        return '🟢 منخفض';
      default:
        return 'غير محدد';
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#0891b2' }}>
        🚀 عرض بيانات البوابة 1 - PostgreSQL
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
                  backgroundColor: selectedProject?.id === project.id ? '#cffafe' : '#fff',
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
        <div style={{ marginTop: '30px', border: '2px solid #0891b2', borderRadius: '12px', padding: '20px', backgroundColor: '#ecf9ff' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '30px', color: '#0891b2' }}>
            📊 بيانات البوابة 1: {selectedProject.name}
          </h2>

          {/* مسار الموافقات */}
          <div style={{ marginBottom: '40px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#0891b2', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ✍️ مسار الموافقات
            </h3>
            
            {selectedProject.approvals && selectedProject.approvals.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {selectedProject.approvals.map((approval, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      padding: '20px', 
                      backgroundColor: getApprovalStatusColor(approval.status), 
                      borderRadius: '12px', 
                      border: '2px solid #e5e7eb',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                  >
                    {/* Header Row with Role and Status */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', paddingBottom: '15px', borderBottom: '2px solid rgba(0,0,0,0.1)' }}>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>الدور</label>
                        <p style={{ fontSize: '16px', marginTop: '5px', color: '#1f2937', fontWeight: 'bold' }}>
                          {approval.roleId === 'sponsor' ? '💼 راعي المشروع' : 
                           approval.roleId === 'manager' ? '👨‍💼 مدير البرنامج' :
                           approval.roleId === 'director' ? '🎯 المدير التنفيذي' :
                           approval.roleId}
                        </p>
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>الحالة</label>
                        <p style={{ fontSize: '16px', marginTop: '5px', color: getApprovalStatusTextColor(approval.status), fontWeight: 'bold' }}>
                          {getApprovalStatusText(approval.status)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Details Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '10px' }}>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>التاريخ</label>
                        <p style={{ fontSize: '15px', marginTop: '5px', color: '#1f2937' }}>
                          {approval.date ? new Date(approval.date).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}
                        </p>
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>الموافق</label>
                        <p style={{ fontSize: '15px', marginTop: '5px', color: '#1f2937' }}>
                          {approval.approvedBy || '-'}
                        </p>
                      </div>
                    </div>
                    
                    {approval.comment && (
                      <div style={{ 
                        marginTop: '15px', 
                        paddingTop: '15px', 
                        borderTop: '2px solid rgba(0,0,0,0.1)',
                        fontSize: '14px',
                        color: '#374151',
                        lineHeight: '1.6'
                      }}>
                        <strong style={{ color: '#6b7280' }}>💬 الملاحظات:</strong> {approval.comment}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px', textAlign: 'center', color: '#999' }}>
                <p>لم يتم تسجيل موافقات حتى الآن</p>
              </div>
            )}
          </div>

          {/* سجل المخاطر */}
          <div style={{ marginBottom: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#0891b2', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⚠️ سجل المخاطر
            </h3>
            
            {selectedProject.risks && selectedProject.risks.length > 0 ? (
              <div style={{ display: 'grid', gap: '15px' }}>
                {selectedProject.risks.map((risk, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      padding: '15px', 
                      backgroundColor: getRiskSeverityColor(risk.severity), 
                      borderRadius: '8px', 
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '12px' }}>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280' }}>الخطر</label>
                        <p style={{ fontSize: '14px', marginTop: '5px', color: '#1f2937', fontWeight: 'bold' }}>
                          {risk.description || '-'}
                        </p>
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280' }}>الشدة</label>
                        <p style={{ fontSize: '14px', marginTop: '5px' }}>
                          {getRiskSeverityText(risk.severity)}
                        </p>
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280' }}>الحالة</label>
                        <p style={{ fontSize: '14px', marginTop: '5px', color: '#1f2937' }}>
                          {risk.status || '-'}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '12px' }}>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280' }}>التأثير المتوقع</label>
                        <p style={{ fontSize: '13px', marginTop: '5px', color: '#4b5563' }}>
                          {risk.impact || '-'}
                        </p>
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280' }}>المسؤول</label>
                        <p style={{ fontSize: '13px', marginTop: '5px', color: '#4b5563' }}>
                          {risk.owner || '-'}
                        </p>
                      </div>
                    </div>

                    {risk.mitigation && (
                      <div style={{ 
                        marginTop: '12px', 
                        paddingTop: '12px', 
                        borderTop: '1px solid rgba(0,0,0,0.1)',
                        fontSize: '13px',
                        color: '#4b5563'
                      }}>
                        <strong>🛡️ استراتيجية التخفيف:</strong> {risk.mitigation}
                      </div>
                    )}
                  </div>
                ))}

                {/* ملخص إحصائي */}
                <div style={{ 
                  marginTop: '20px', 
                  padding: '15px', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '8px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '15px'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626' }}>
                      {selectedProject.risks.filter(r => r.severity === 'high').length}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>مخاطر عالية</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>
                      {selectedProject.risks.filter(r => r.severity === 'medium').length}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>مخاطر متوسطة</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
                      {selectedProject.risks.filter(r => r.severity === 'low').length}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>مخاطر منخفضة</p>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px', textAlign: 'center', color: '#999' }}>
                <p>لم يتم تسجيل مخاطر حتى الآن</p>
              </div>
            )}
          </div>

          {/* JSON الكامل */}
          <details style={{ marginTop: '20px' }}>
            <summary style={{ cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', color: '#6b7280' }}>
              📄 عرض JSON الكامل للبوابة 1
            </summary>
            <pre style={{ 
              backgroundColor: '#1f2937', 
              color: '#0891b2', 
              padding: '15px', 
              borderRadius: '8px', 
              fontSize: '11px', 
              overflow: 'auto',
              maxHeight: '400px',
              marginTop: '10px'
            }}>
              {JSON.stringify({ approvals: selectedProject.approvals, risks: selectedProject.risks }, null, 2)}
            </pre>
          </details>
        </div>
      )}

      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#cffafe', 
        borderRadius: '8px',
        fontSize: '13px'
      }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>ℹ️ معلومات البوابة 1:</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li>✅ مسار الموافقات (راعي المشروع، مدير البرنامج، المدير التنفيذي)</li>
          <li>✅ سجل المخاطر الكامل (الوصف، الشدة، التأثير، استراتيجية التخفيف)</li>
          <li>✅ تتبع حالة كل موافقة وملاحظات الموافقين</li>
          <li>✅ إحصائيات المخاطر حسب الشدة (عالي/متوسط/منخفض)</li>
          <li>✅ يتم الحفظ تلقائياً في PostgreSQL</li>
          <li>📊 مسار البيانات: data→approvals و data→risks</li>
        </ul>
      </div>
    </div>
  );
}

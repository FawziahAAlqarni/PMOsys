import React, { createContext, useState, useEffect } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  
  // إضافة /project-cards إذا لم يكن موجوداً في المتغير
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://pmo-backend-dvy1.onrender.com';
  const API_URL = baseUrl.endsWith('/project-cards') ? baseUrl : `${baseUrl}/project-cards`;
  
  console.log('🔧 Environment Variable NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
  console.log('🔧 Using API_URL:', API_URL);

  // تحويل البيانات من PostgreSQL إلى صيغة التطبيق
  const transformFromDB = (dbProject) => {
    if (!dbProject) return null;
    const projectData = dbProject.data || {};
    
    // نزيل id من projectData لأننا نريد استخدام id من قاعدة البيانات فقط
    const { id: _, ...restProjectData } = projectData;
    
    console.log('🔄 تحويل المشروع من DB:', {
      projectName: dbProject.name,
      hasData: !!dbProject.data,
      programManagerEmail: projectData.data?.team?.programManagerEmail,
      currentApproverOrder: projectData.currentApproverOrder
    });
    
    return {
      // نستخدم id من قاعدة البيانات فقط (SERIAL)
      id: dbProject.id,
      name: dbProject.name || projectData.name || '',
      description: dbProject.description || projectData.description || '',
      estimatedBudget: dbProject.estimated_budget || projectData.estimatedBudget || 0,
      durationInWeeks: dbProject.duration_in_weeks || projectData.durationInWeeks || 0,
      stage: dbProject.stage || projectData.stage || 'planning',
      ...restProjectData,
      // التأكد من وجود risks في المستوى الرئيسي
      risks: projectData.risks || [],
      _dbFields: { created_at: dbProject.created_at, updated_at: dbProject.updated_at }
    };
  };

  // تحويل البيانات إلى صيغة PostgreSQL
  const transformToDB = (project) => {
    // إزالة الحقول الداخلية التي لا نريد إرسالها
    const { _dbFields, ...projectData } = project;
    
    return {
      name: projectData.name || '',
      description: projectData.description || '',
      estimatedBudget: projectData.estimatedBudget || 0,
      durationInWeeks: projectData.durationInWeeks || 0,
      stage: projectData.stage || 'planning',
      // نرسل كل البيانات الأخرى (البوابات، المخاطر، إلخ)
      ...projectData
    };
  };

  // 1. دالة جلب البيانات من السيرفر
  const fetchProjects = async () => {
    try {
      console.log('🔄 جاري جلب المشاريع من:', API_URL);
      const response = await fetch(API_URL);
      
      console.log('📡 Response Status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('📦 Raw data from API:', data);
        console.log('📦 Number of projects:', data.length);
        
        const transformedProjects = data.map(transformFromDB);
        console.log('✅ تم جلب المشاريع:', transformedProjects.length, 'مشاريع');
        console.log('✅ First project:', transformedProjects[0]);
        setProjects(transformedProjects);
      } else {
        console.error('❌ خطأ من السيرفر:', response.status, response.statusText);
        setProjects([]);
      }
    } catch (error) {
      console.error("❌ فشل الاتصال بالسيرفر:", error);
      console.error("❌ Error details:", error.message);
      setProjects([]);
    }
  };

  // استدعاء الجلب عند البدء
  useEffect(() => {
    fetchProjects();
  }, []);

  // 2. دالة إضافة مشروع جديد (POST)
  const addProject = async (newProject) => {
    try {
      console.log('📤 إرسال مشروع جديد:', {
        name: newProject.name,
        programManagerEmail: newProject.data?.team?.programManagerEmail,
        currentApproverOrder: newProject.currentApproverOrder,
        fullData: newProject
      });
      
      const projectToSave = transformToDB(newProject);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectToSave),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || 'Unknown error'}`);
      }

      const savedProject = await response.json();
      const transformedProject = transformFromDB(savedProject);
      
      setProjects((prev) => [...prev, transformedProject]);
      console.log("✅ تم حفظ المشروع:", transformedProject);
      alert("✅ تم الحفظ في قاعدة البيانات بنجاح");
      
      return transformedProject;
    } catch (error) {
      console.error("❌ خطأ في الحفظ:", error);
      alert(`❌ حدث خطأ أثناء الحفظ: ${error.message}`);
      throw error;
    }
  };

  // 3. دالة تحديث مشروع موجود (يشمل بيانات البوابات)
  const updateProject = async (updatedProject) => {
    try {
      const projectToSave = transformToDB(updatedProject);
      
      const response = await fetch(`${API_URL}/${updatedProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectToSave),
      });

      if (response.ok) {
        const savedProject = await response.json();
        const transformedProject = transformFromDB(savedProject);
        
        setProjects((prev) => 
          prev.map((p) => (p.id === updatedProject.id ? transformedProject : p))
        );
        
        console.log("✅ تم تحديث المشروع:", transformedProject);
        return transformedProject;
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error("❌ خطأ في التحديث:", error);
      throw error;
    }
  };

  // 4. دالة الحذف (DELETE)
  const deleteProject = async (id) => {
    if (window.confirm("هل أنت متأكد من الحذف؟")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
        console.error("خطأ في الحذف:", error);
      }
    }
  };

  // 5. جلب مشروع محدد
  const getProject = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (response.ok) {
        const project = await response.json();
        return transformFromDB(project);
      }
      return null;
    } catch (error) {
      console.error("❌ خطأ في جلب المشروع:", error);
      return null;
    }
  };

  // دالة التصدير
  const exportData = () => {
    const dataStr = JSON.stringify(projects, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MNG_PMO_System_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <ProjectContext.Provider value={{ 
      projects, 
      addProject, 
      updateProject, 
      deleteProject, 
      getProject,
      exportData,
      refreshProjects: fetchProjects
    }}>
      {children}
    </ProjectContext.Provider>
  );
};
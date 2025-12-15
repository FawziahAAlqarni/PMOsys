import React, { createContext, useState, useEffect } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  
  // رابط الباك اند - يستخدم NEXT_PUBLIC_API_URL من متغيرات البيئة أو Render
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pmo-backend-dvy1.onrender.com/project-cards';

  // 1. دالة جلب البيانات من السيرفر عند فتح الموقع
  const fetchProjects = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setProjects(data); // تحديث الحالة بالبيانات القادمة من قاعدة البيانات
      }
    } catch (error) {
      console.error("فشل الاتصال بالسيرفر:", error);
    }
  };

  // استدعاء الجلب عند البدء
  useEffect(() => {
    fetchProjects();
  }, []);

  // 2. دالة إضافة مشروع جديد (POST)
  const addProject = async (newProject) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || 'Unknown error'}`);
      }

      const savedProject = await response.json();
      // نضيف المشروع العائد من السيرفر (الذي يحتوي على ID حقيقي)
      setProjects((prev) => [...prev, savedProject]);
      alert("✅ تم الحفظ في قاعدة البيانات بنجاح");
    } catch (error) {
      console.error("خطأ في الحفظ:", error);
      alert(`❌ حدث خطأ أثناء الحفظ: ${error.message}`);
    }
  };

  // 3. دالة تحديث مشروع موجود (PUT/PATCH)
  const updateProject = async (updatedProject) => {
    try {
      const response = await fetch(`${API_URL}/${updatedProject.id}`, {
        method: 'PUT', // أو PATCH حسب برمجة الباك اند
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      });

      if (response.ok) {
        // تحديث الواجهة فوراً
        setProjects((prev) => 
          prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
        );
      }
    } catch (error) {
      console.error("خطأ في التحديث:", error);
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

  // دالة التصدير (تعمل محلياً ولا تحتاج سيرفر)
  const exportData = () => {
    const dataStr = JSON.stringify(projects, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `MNG_PMO_System.json`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

 return (
    // تأكد أن كلمة value موجودة وتمرر البيانات
    <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject, exportData }}>
      {children}
    </ProjectContext.Provider>
  );
};
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pmo-backend-dvy1.onrender.com';

const PermissionsManagement = ({ onNavigate }) => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPermission, setEditingPermission] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    role: 'viewer',
    permissions: {
      canViewProjects: false,
      canCreateProjects: false,
      canEditProjects: false,
      canDeleteProjects: false,
      canApproveProjects: false,
      canManageUsers: false,
      canViewReports: false,
      canManagePermissions: false,
    },
    isActive: true,
    notes: '',
  });

  const roleNames = {
    admin: 'مدير النظام',
    pmo: 'مكتب إدارة المشاريع',
    project_manager: 'مدير مشروع',
    program_manager: 'مدير برنامج',
    portfolio_manager: 'مدير محفظة',
    viewer: 'مشاهد',
  };

  const permissionLabels = {
    canViewProjects: 'عرض المشاريع',
    canCreateProjects: 'إنشاء المشاريع',
    canEditProjects: 'تعديل المشاريع',
    canDeleteProjects: 'حذف المشاريع',
    canApproveProjects: 'اعتماد المشاريع',
    canManageUsers: 'إدارة المستخدمين',
    canViewReports: 'عرض التقارير',
    canManagePermissions: 'إدارة الصلاحيات',
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/permissions`);
      setPermissions(response.data);
    } catch (error) {
      console.error('خطأ في جلب الصلاحيات:', error);
      alert('فشل في جلب البيانات');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (permission = null) => {
    if (permission) {
      setEditingPermission(permission);
      setFormData({
        email: permission.email,
        role: permission.role,
        permissions: permission.permissions,
        isActive: permission.isActive,
        notes: permission.notes || '',
      });
    } else {
      setEditingPermission(null);
      setFormData({
        email: '',
        role: 'viewer',
        permissions: {
          canViewProjects: false,
          canCreateProjects: false,
          canEditProjects: false,
          canDeleteProjects: false,
          canApproveProjects: false,
          canManageUsers: false,
          canViewReports: false,
          canManagePermissions: false,
        },
        isActive: true,
        notes: '',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPermission(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPermission) {
        await axios.patch(`${API_URL}/permissions/${editingPermission.id}`, formData);
        alert('تم تحديث الصلاحية بنجاح');
      } else {
        await axios.post(`${API_URL}/permissions`, formData);
        alert('تم إضافة الصلاحية بنجاح');
      }
      handleCloseModal();
      fetchPermissions();
    } catch (error) {
      console.error('خطأ في حفظ الصلاحية:', error);
      alert(error.response?.data?.message || 'فشل في حفظ البيانات');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذه الصلاحية؟')) return;
    
    try {
      await axios.delete(`${API_URL}/permissions/${id}`);
      alert('تم حذف الصلاحية بنجاح');
      fetchPermissions();
    } catch (error) {
      console.error('خطأ في حذف الصلاحية:', error);
      alert('فشل في حذف الصلاحية');
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await axios.patch(`${API_URL}/permissions/${id}/toggle-active`);
      fetchPermissions();
    } catch (error) {
      console.error('خطأ في تغيير الحالة:', error);
      alert('فشل في تغيير الحالة');
    }
  };

  const handlePermissionChange = (key) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [key]: !formData.permissions[key],
      },
    });
  };

  const handleRoleChange = (role) => {
    // Set default permissions based on role
    const defaultPermissions = {
      admin: {
        canViewProjects: true,
        canCreateProjects: true,
        canEditProjects: true,
        canDeleteProjects: true,
        canApproveProjects: true,
        canManageUsers: true,
        canViewReports: true,
        canManagePermissions: true,
      },
      pmo: {
        canViewProjects: true,
        canCreateProjects: true,
        canEditProjects: true,
        canDeleteProjects: false,
        canApproveProjects: true,
        canManageUsers: false,
        canViewReports: true,
        canManagePermissions: false,
      },
      project_manager: {
        canViewProjects: true,
        canCreateProjects: true,
        canEditProjects: true,
        canDeleteProjects: false,
        canApproveProjects: false,
        canManageUsers: false,
        canViewReports: true,
        canManagePermissions: false,
      },
      program_manager: {
        canViewProjects: true,
        canCreateProjects: false,
        canEditProjects: false,
        canDeleteProjects: false,
        canApproveProjects: true,
        canManageUsers: false,
        canViewReports: true,
        canManagePermissions: false,
      },
      portfolio_manager: {
        canViewProjects: true,
        canCreateProjects: false,
        canEditProjects: false,
        canDeleteProjects: false,
        canApproveProjects: true,
        canManageUsers: false,
        canViewReports: true,
        canManagePermissions: false,
      },
      viewer: {
        canViewProjects: true,
        canCreateProjects: false,
        canEditProjects: false,
        canDeleteProjects: false,
        canApproveProjects: false,
        canManageUsers: false,
        canViewReports: false,
        canManagePermissions: false,
      },
    };

    setFormData({
      ...formData,
      role,
      permissions: defaultPermissions[role] || formData.permissions,
    });
  };

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-primary-900 border-r-4 border-secondary-gold pr-3">
            إدارة الصلاحيات
          </h2>
          <span className="bg-primary-50 text-primary-600 text-xs px-2 py-1 rounded-full font-bold">
            {permissions.length} مستخدم
          </span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleOpenModal()}
            className="bg-secondary-gold hover:bg-yellow-600 text-primary-900 px-5 py-2 rounded-lg font-bold shadow-md transition flex items-center gap-2"
          >
            <i className="fa-solid fa-plus"></i>
            إضافة صلاحية جديدة
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition flex items-center gap-2"
          >
            <i className="fa-solid fa-arrow-left"></i>
            العودة
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {loading ? (
          <div className="p-20 text-center">
            <i className="fa-solid fa-spinner fa-spin text-4xl text-primary-600 mb-4"></i>
            <p className="text-gray-600">جاري التحميل...</p>
          </div>
        ) : permissions.length === 0 ? (
          <div className="p-20 text-center">
            <i className="fa-solid fa-users-slash text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 text-lg">لا توجد صلاحيات مسجلة</p>
            <button
              onClick={() => handleOpenModal()}
              className="mt-4 bg-secondary-gold text-primary-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-600 transition"
            >
              إضافة أول صلاحية
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary-900 text-white">
                <tr>
                  <th className="p-4 text-right">#</th>
                  <th className="p-4 text-right">البريد الإلكتروني</th>
                  <th className="p-4 text-right">الدور</th>
                  <th className="p-4 text-right">الصلاحيات</th>
                  <th className="p-4 text-right">الحالة</th>
                  <th className="p-4 text-right">تاريخ الإضافة</th>
                  <th className="p-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((permission, index) => (
                  <tr
                    key={permission.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-bold text-gray-600">{index + 1}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-envelope text-primary-600"></i>
                        <span className="font-bold text-gray-900">{permission.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-bold">
                        {roleNames[permission.role]}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(permission.permissions || {})
                          .filter(([_, value]) => value)
                          .map(([key]) => (
                            <span
                              key={key}
                              className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs"
                            >
                              {permissionLabels[key]}
                            </span>
                          ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleActive(permission.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                          permission.isActive
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        {permission.isActive ? '✓ نشط' : '✕ معطل'}
                      </button>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(permission.createdAt).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleOpenModal(permission)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition"
                          title="تعديل"
                        >
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(permission.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
                          title="حذف"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-primary-900 text-white p-5 rounded-t-2xl flex justify-between items-center">
              <h3 className="text-xl font-bold">
                {editingPermission ? 'تعديل الصلاحية' : 'إضافة صلاحية جديدة'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-red-300 transition"
              >
                <i className="fa-solid fa-times text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  البريد الإلكتروني <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                  placeholder="example@domain.com"
                />
              </div>

              {/* Role */}
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  الدور <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                >
                  {Object.entries(roleNames).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              {/* Permissions Checkboxes */}
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  الصلاحيات التفصيلية
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg">
                  {Object.entries(permissionLabels).map(([key, label]) => (
                    <label
                      key={key}
                      className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded transition"
                    >
                      <input
                        type="checkbox"
                        checked={formData.permissions[key]}
                        onChange={() => handlePermissionChange(key)}
                        className="w-5 h-5 text-primary-600"
                      />
                      <span className="text-sm font-bold text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Active Status */}
              <div className="mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 text-primary-600"
                  />
                  <span className="text-sm font-bold text-gray-700">الحساب نشط</span>
                </label>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  ملاحظات
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                  rows="3"
                  placeholder="أضف أي ملاحظات إضافية..."
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-secondary-gold text-primary-900 rounded-lg hover:bg-yellow-600 transition font-bold"
                >
                  {editingPermission ? 'حفظ التعديلات' : 'إضافة الصلاحية'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionsManagement;

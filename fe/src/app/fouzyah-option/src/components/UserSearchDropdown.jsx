import React, { useState, useEffect, useRef } from 'react';

const UserSearchDropdown = ({ 
  value, 
  onChange, 
  name,
  label, 
  placeholder = 'ابحث عن موظف...',
  accessToken 
}) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search users from Microsoft Graph API
  const searchUsers = async (query) => {
    if (!query || query.length < 2) {
      setUsers([]);
      return;
    }

    if (!accessToken) {
      // If no access token, allow manual input
      setError('');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://graph.microsoft.com/v1.0/users?$search="displayName:${query}" OR "mail:${query}"&$select=id,displayName,mail,jobTitle&$top=10`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'ConsistencyLevel': 'eventual',
          },
        }
      );

      if (!response.ok) {
        throw new Error('فشل البحث عن المستخدمين');
      }

      const data = await response.json();
      setUsers(data.value || []);
      setIsOpen(true);
    } catch (err) {
      setError('خطأ في البحث - يمكنك الكتابة يدوياً');
      console.error('User search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm && accessToken) {
        searchUsers(searchTerm);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, accessToken]);

  const handleSelectUser = (user) => {
    setSearchTerm(user.displayName);
    onChange({ 
      target: { 
        name: name,
        value: user.displayName,
        dataset: { email: user.mail }
      } 
    });
    setIsOpen(false);
    setUsers([]);
  };

  const handleManualInput = (e) => {
    setSearchTerm(e.target.value);
    onChange(e);
  };

  const handleClear = () => {
    setSearchTerm('');
    onChange({ target: { name: name, value: '' } });
    setUsers([]);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <label className="block text-xs font-bold mb-1">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {isLoading ? (
            <i className="fa-solid fa-spinner fa-spin text-primary-600"></i>
          ) : (
            <i className="fa-solid fa-search text-gray-400 text-sm"></i>
          )}
        </div>
        <input
          type="text"
          name={name}
          value={searchTerm}
          onChange={handleManualInput}
          onFocus={() => {
            if (users.length > 0) setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full p-2 pr-10 pl-8 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 left-0 flex items-center pl-3 hover:text-red-600"
          >
            <i className="fa-solid fa-xmark text-gray-400 text-sm"></i>
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-orange-600 mt-1"><i className="fa-solid fa-info-circle"></i> {error}</p>
      )}

      {isOpen && users.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {users.map((user) => (
            <button
              key={user.id}
              type="button"
              onClick={() => handleSelectUser(user)}
              className="w-full px-3 py-2 text-right hover:bg-primary-50 flex items-start gap-2 border-b border-gray-100 last:border-b-0 transition"
            >
              <i className="fa-solid fa-user text-primary-600 mt-1"></i>
              <div className="flex-1 text-right">
                <p className="text-sm font-bold text-gray-900">{user.displayName}</p>
                <p className="text-xs text-gray-600">{user.mail}</p>
                {user.jobTitle && (
                  <p className="text-xs text-gray-500">{user.jobTitle}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && !isLoading && users.length === 0 && searchTerm.length >= 2 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-3">
          <p className="text-sm text-gray-500 text-center">لا توجد نتائج</p>
        </div>
      )}
    </div>
  );
};

export default UserSearchDropdown;

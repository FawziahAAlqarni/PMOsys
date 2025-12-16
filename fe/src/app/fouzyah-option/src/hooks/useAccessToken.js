import { useState, useEffect } from 'react';

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('/api/auth/token');
        if (response.ok) {
          const data = await response.json();
          setAccessToken(data.accessToken);
        } else {
          // User not logged in or no token available
          setAccessToken(null);
        }
      } catch (err) {
        console.error('Error fetching access token:', err);
        setError(err);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  return { accessToken, loading, error };
};

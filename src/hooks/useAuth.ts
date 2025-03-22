import { useState } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (id, password) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/auth', { id, password });
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
};

export default useAuth;

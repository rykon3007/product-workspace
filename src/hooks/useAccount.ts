import { useState, useEffect } from 'react';
import axios from 'axios';

const useAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/user');
      setAccounts(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createAccount = async (account) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/user', account);
      setAccounts([...accounts, response.data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateAccount = async (account) => {
    setLoading(true);
    try {
      const response = await axios.put('/api/user', account);
      setAccounts(
        accounts.map((acc) => (acc.id === account.id ? response.data : acc))
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async (id) => {
    setLoading(true);
    try {
      await axios.delete('/api/user', { data: { id } });
      setAccounts(accounts.filter((acc) => acc.id !== id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return {
    accounts,
    loading,
    error,
    fetchAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
  };
};

export default useAccount;

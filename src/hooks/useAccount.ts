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

  const updateAccount = async (id, updatedAccount) => {
    setLoading(true);
    try {
      const response = await axios.put(`/api/user/${id}`, updatedAccount);
      setAccounts(
        accounts.map((account) =>
          account.id === id ? response.data : account
        )
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
      await axios.delete(`/api/user/${id}`);
      setAccounts(accounts.filter((account) => account.id !== id));
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

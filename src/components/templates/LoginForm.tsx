import React, { useState } from 'react';
import { Input } from 'shadcn/ui';
import { Button } from 'shadcn/ui';
import useAuth from '@/hooks/useAuth';

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(id, password);
      // Redirect to top page or handle successful login
    } catch (err) {
      // Handle login error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
      {error && <p className="text-red-500">{error.message}</p>}
    </form>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { useSession } from '../../context/SessionContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { setSession } = useSession();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      // Simular registro
      const token = 'fake-token';
      const user = { email };
      setSession(token, user);
      navigate('/agenda');
    } catch (err) {
      setError('Error al registrar usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2>Registro</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Registrarse</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};

export default RegisterPage;

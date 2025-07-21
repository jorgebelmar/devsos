import React, { useState } from 'react';
import { useSession } from '../../context/SessionContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const { setSession } = useSession();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validación básica
      if (!email || !password) {
        throw new Error('Por favor, completa todos los campos');
      }
      
      if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }
      
      // Simular login exitoso
      const token = 'fake-token-' + Date.now();
      const user = { 
        email, 
        name: email.split('@')[0],
        id: Math.random().toString(36).substr(2, 9)
      };
      
      setSession(token, user);
      navigate('/agenda');
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Bienvenido de vuelta</h2>
        
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <div className={styles.registerLink}>
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

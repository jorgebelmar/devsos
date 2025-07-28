import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return 'weak';
    if (password.length < 10 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return 'medium';
    return 'strong';
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      throw new Error('El nombre es requerido');
    }
    if (!formData.email.trim()) {
      throw new Error('El email es requerido');
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      throw new Error('El email no es válido');
    }
    if (formData.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
    if (formData.password !== formData.confirmPassword) {
      throw new Error('Las contraseñas no coinciden');
    }
    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      throw new Error('El teléfono no es válido');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      validateForm();
      
      // Simular registro exitoso
      setSuccess('¡Registro exitoso! Redirigiendo al login...');
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || 'Error al registrar usuario');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className={styles.registerContainer}>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <h2>Únete a nosotros</h2>
        
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="name"
            placeholder="Tu nombre completo *"
            value={formData.name}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico *"
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <input
            type="tel"
            name="phone"
            placeholder="Teléfono (opcional)"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <input
            type="password"
            name="password"
            placeholder="Contraseña *"
            value={formData.password}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
          {formData.password && (
            <div className={`${styles.passwordStrength} ${styles[passwordStrength]}`}></div>
          )}
        </div>
        
        <div className={styles.inputGroup}>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña *"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>
        
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        
        <div className={styles.loginLink}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;

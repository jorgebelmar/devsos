import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../../context/SessionContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, clearSession } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearSession();
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <h2>📅 AgendaApp</h2>
        </div>
        
        <div className={styles.navLinks}>
          <Link to="/agenda" className={styles.navLink}>
            Mi Agenda
          </Link>
          <Link to="/sucursales" className={styles.navLink}>
            Sucursales
          </Link>
        </div>
        
        <div className={styles.userSection}>
          <span className={styles.userName}>
            👋 Hola, {user?.name || user?.email}
          </span>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

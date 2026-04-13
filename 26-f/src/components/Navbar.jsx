import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/seprise_logo.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      onClick={() => setIsOpen(false)}
      style={{
        textDecoration: 'none',
        color: isActive(to) ? 'var(--primary)' : 'var(--text-light)',
        fontWeight: isActive(to) ? '700' : '500',
        fontSize: '0.95rem',
        padding: '8px 0',
        transition: '0.2s'
      }}
    >
      {children}
    </Link>
  );

  return (
    <nav style={{
      backgroundColor: 'white',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      padding: '0 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <img src={logo} alt="SePrise Logo" style={{ width: '50px', height: '50px' }} />
          <span style={{
            fontSize: '1.4rem',
            fontWeight: '800',
            color: 'var(--secondary)',
            letterSpacing: '-0.5px',
            display: window.innerWidth < 400 ? 'none' : 'block'
          }}>SePrise</span>
        </Link>

        {/* Hamburger Icon */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--secondary)',
            cursor: 'pointer',
            fontSize: '1.5rem'
          }}
          className="mobile-menu-btn"
        >
          <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>

        {/* Desktop Links */}
        <div style={{ 
          display: 'flex', 
          gap: '25px', 
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center'
        }} className="desktop-nav">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/institucional">Institucional</NavLink>
          <NavLink to="/especialidades">Especialidades</NavLink>
          
          {user?.role === 'paciente' && (
            <>
              <NavLink to="/paciente">Reservar Turno</NavLink>
              <NavLink to="/mis-turnos">Mis Turnos</NavLink>
            </>
          )}

          {user?.role === 'profesional' && (
            <>
              <NavLink to={`/profesional?profesionalId=${user.id}`}>Mi Agenda</NavLink>
              <NavLink to={`/admin/editar-profesional/${user.id}`}>Perfil</NavLink>
            </>
          )}

          {user?.role === 'administrativo' && (
            <>
              <NavLink to="/profesional">Agenda Global</NavLink>
              <NavLink to="/admin/alta-profesional">Alta Profesional</NavLink>
            </>
          )}
        </div>

        {/* User Actions */}
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexShrink: 0 }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ textAlign: 'right', display: window.innerWidth < 768 ? 'none' : 'flex', flexDirection: 'column' }} className="user-info-nav">
                 <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{user.nombre}</span>
                 <span style={{ fontSize: '0.65rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>{user.role}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="btn-danger-small"
                style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', borderRadius: '4px', cursor: 'pointer', color: 'white', backgroundColor: 'var(--error)' }}
              >
                <i className="fa-solid fa-sign-out-alt"></i> <span className="hide-mobile">Salir</span>
              </button>
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-sign-in-alt"></i> Ingresar
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div style={{
        display: isOpen ? 'flex' : 'none',
        flexDirection: 'column',
        padding: '20px 0',
        borderTop: '1px solid #f1f5f9',
        gap: '10px'
      }} className="mobile-nav">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/institucional">Institucional</NavLink>
        <NavLink to="/especialidades">Especialidades</NavLink>
        {user?.role === 'paciente' && (
          <>
            <NavLink to="/paciente">Reservar Turno</NavLink>
            <NavLink to="/mis-turnos">Mis Turnos</NavLink>
          </>
        )}
        {user?.role === 'profesional' && (
          <>
            <NavLink to={`/profesional?profesionalId=${user.id}`}>Mi Agenda Médica</NavLink>
            <NavLink to={`/admin/editar-profesional/${user.id}`}>Editar Mi Perfil</NavLink>
          </>
        )}
        {user?.role === 'administrativo' && (
          <>
            <NavLink to="/profesional">Agenda Global</NavLink>
            <NavLink to="/admin/alta-profesional">Alta Profesional</NavLink>
          </>
        )}
        {!user && <NavLink to="/login">Ingresar</NavLink>}
      </div>
    </nav>
  );
};

export default Navbar;

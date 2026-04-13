import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfesionalCard = ({ profesional }) => {
  const { user } = useAuth();

  return (
    <div className="glass-card" style={{ padding: '20px', width: '300px', textAlign: 'center' }}>
      <div style={{ 
        backgroundColor: 'var(--background)', 
        width: '100px', 
        height: '100px', 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        margin: '0 auto 15px',
        overflow: 'hidden',
        border: '3px solid #f0f0f0'
      }}>
        {profesional.imagen ? (
          <img 
            src={`http://localhost:3000${profesional.imagen}`} 
            alt={profesional.nombre} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        ) : (
          <i className="fa-solid fa-user-md" style={{ fontSize: '2.5rem', color: 'var(--primary)' }}></i>
        )}
      </div>
      <h3 style={{ color: 'var(--secondary)', marginBottom: '5px' }}>
        {profesional.nombre} {profesional.apellido}
      </h3>
      <p style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '10px' }}>
        {profesional.especialidad}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--text-light)', fontSize: '0.8rem' }}>
        <i className="fa-solid fa-id-card" style={{ fontSize: '0.8rem' }}></i>
        <span>Matrícula: {profesional.matricula}</span>
      </div>
      
      {user && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' }}>
          {/* VISTA ADMINISTRATIVA: Puede editar y ver agenda de cualquiera */}
          {user.role === 'administrativo' && (
            <>
              <Link to={`/admin/editar-profesional/${profesional._id}`} style={{ textDecoration: 'none' }}>
                <button style={{ width: '100%', padding: '10px', backgroundColor: 'var(--secondary)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <i className="fa-solid fa-user-edit"></i> Editar Perfil
                </button>
              </Link>
              <Link to={`/profesional?profesionalId=${profesional._id}`} style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ width: '100%', backgroundColor: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                   <i className="fa-solid fa-calendar-alt"></i> Agenda Médica
                </button>
              </Link>
            </>
          )}

          {/* VISTA PACIENTE: Solo puede reservar */}
          {user.role === 'paciente' && (
            <Link to={`/paciente?profesionalId=${profesional._id}`} style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <i className="fa-solid fa-calendar-alt"></i> Reservar Turno
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfesionalCard;

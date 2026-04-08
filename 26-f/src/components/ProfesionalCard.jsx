import React from 'react';
import { Link } from 'react-router-dom';
import { User, ClipboardList } from 'lucide-react';

const ProfesionalCard = ({ profesional }) => {
  return (
    <div className="glass-card" style={{ padding: '20px', width: '300px', textAlign: 'center' }}>
      <div style={{ 
        backgroundColor: 'var(--background)', 
        width: '60px', 
        height: '60px', 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        margin: '0 auto 15px'
      }}>
        <User size={32} color="var(--primary)" />
      </div>
      <h3 style={{ color: 'var(--secondary)', marginBottom: '5px' }}>
        {profesional.nombre} {profesional.apellido}
      </h3>
      <p style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '10px' }}>
        {profesional.especialidad}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', color: 'var(--text-light)', fontSize: '0.8rem' }}>
        <ClipboardList size={14} />
        <span>Matrícula: {profesional.matricula}</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' }}>
        <Link to={`/paciente?profesionalId=${profesional._id}`} style={{ width: '100%' }}>
          <button className="btn-primary" style={{ width: '100%' }}>
            Ver Agenda (Reserva)
          </button>
        </Link>
        <Link to={`/profesional?profesionalId=${profesional._id}`} style={{ width: '100%' }}>
          <button className="btn-primary" style={{ width: '100%', backgroundColor: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }}>
            Mi Dashboard (Médico)
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfesionalCard;

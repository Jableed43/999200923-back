import React from 'react';
import { useGetTurnosPaciente } from '../hooks/useGetTurnosPaciente';
import { updateEstadoTurno } from '../services/turnoService';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useAuth } from '../context/AuthContext';

const MisTurnos = () => {
  const { user } = useAuth();
  const pacienteId = user?.id; 
  const { turnos, loading, error, refetch } = useGetTurnosPaciente(pacienteId);

  const handleCancelar = async (turnoId) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción cancelará tu turno permanentemente.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--error)',
      cancelButtonColor: 'var(--text-light)',
      confirmButtonText: 'Sí, cancelar turno',
      cancelButtonText: 'No, mantener'
    });

    if (result.isConfirmed) {
      try {
        await updateEstadoTurno(turnoId, 'cancelado');
        Swal.fire('Cancelado', 'Tu turno ha sido cancelado.', 'success');
        refetch();
      } catch (err) {
        Swal.fire('Error', 'No se pudo cancelar el turno.', 'error');
      }
    }
  };

  const getStatusStyle = (estado) => {
    switch (estado) {
      case 'reservado': return { color: 'var(--secondary)', bg: '#ebf4ff' };
      case 'cancelado': return { color: 'var(--error)', bg: '#fff5f5' };
      case 'completado': return { color: 'var(--success)', bg: '#f0fff4' };
      default: return { color: 'gray', bg: '#f7fafc' };
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '30px', textDecoration: 'none', fontWeight: 'bold' }}>
        <i className="fa-solid fa-arrow-left"></i> Volver al Inicio
      </Link>

      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: 'var(--secondary)', marginBottom: '10px' }}>Mis Turnos</h1>
        <p style={{ color: 'var(--text-light)' }}>Aquí puedes consultar el historial y estado de tus citas médicas.</p>
      </div>

      {loading && <p>Cargando tus turnos...</p>}
      {error && <p style={{ color: 'var(--error)' }}>{error}</p>}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {!loading && turnos.length === 0 && <p style={{ fontStyle: 'italic', color: 'var(--text-light)' }}>Aún no tienes turnos agendados.</p>}
        
        {/* SECCIÓN PREVISTA: PRÓXIMAS CITAS */}
        {turnos.some(t => t.estado === 'reservado') && (
          <div>
            <h3 style={{ color: 'var(--secondary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fa-solid fa-calendar-check" style={{ color: 'var(--primary)' }}></i> Próximas Citas
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {turnos
                .filter(t => t.estado === 'reservado')
                .sort((a,b) => new Date(a.fecha) - new Date(b.fecha))
                .map(turno => (
                  <TurnoCard key={turno._id} turno={turno} onCancel={handleCancelar} />
                ))
              }
            </div>
          </div>
        )}

        {/* SECCIÓN HISTORIAL */}
        {turnos.some(t => t.estado !== 'reservado') && (
          <div>
            <h3 style={{ color: 'var(--text-light)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fa-solid fa-history"></i> Historial y Completados
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', opacity: 0.8 }}>
              {turnos
                .filter(t => t.estado !== 'reservado')
                .sort((a,b) => new Date(b.fecha) - new Date(a.fecha))
                .map(turno => (
                  <TurnoCard key={turno._id} turno={turno} isHistory />
                ))
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Subcomponente para limpieza de código
const TurnoCard = ({ turno, onCancel, isHistory = false }) => {
  const getStatusStyle = (estado) => {
    switch (estado) {
      case 'reservado': return { color: 'var(--secondary)', bg: '#ebf4ff', icon: 'fa-clock' };
      case 'cancelado': return { color: 'var(--error)', bg: '#fff5f5', icon: 'fa-times-circle' };
      case 'completado': return { color: 'var(--success)', bg: '#f0fff4', icon: 'fa-check-circle' };
      default: return { color: 'gray', bg: '#f7fafc', icon: 'fa-question-circle' };
    }
  };

  const status = getStatusStyle(turno.estado);

  return (
    <div className="glass-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderLeft: isHistory ? 'none' : '5px solid var(--primary)' }}>
      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', minWidth: '60px', paddingRight: '20px', borderRight: '1px solid #eee' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: isHistory ? 'var(--text-light)' : 'var(--primary)' }}>
            {format(parseISO(turno.fecha), 'dd')}
          </div>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-light)' }}>
            {format(parseISO(turno.fecha), 'MMM', { locale: es })}
          </div>
        </div>

        <div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
             <i className="fa-solid fa-user-md" style={{ color: 'var(--secondary)', fontSize: '0.9rem' }}></i>
             <span style={{ fontWeight: '700', color: 'var(--secondary)' }}>{turno.profesional?.nombre} {turno.profesional?.apellido}</span>
           </div>
           <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
             <span><i className="fa-regular fa-clock"></i> {turno.hora} hs</span>
             <span><i className="fa-regular fa-calendar"></i> {format(parseISO(turno.fecha), 'eeee', { locale: es })}</span>
           </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ 
          display: 'flex', alignItems: 'center', gap: '6px', 
          padding: '5px 12px', borderRadius: '15px', 
          fontSize: '0.75rem', fontWeight: 'bold',
          color: status.color, backgroundColor: status.bg
        }}>
          <i className={`fa-solid ${status.icon}`}></i> {turno.estado.toUpperCase()}
        </div>

        {turno.estado === 'reservado' && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link 
              to={`/paciente?rescheduleId=${turno._id}&profesionalId=${turno.profesional?._id}`}
              style={{ 
                textDecoration: 'none', backgroundColor: 'var(--secondary)', 
                color: 'white', padding: '6px 12px', borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s',
                display: 'flex', alignItems: 'center', gap: '5px'
              }}>
              <i className="fa-solid fa-calendar-alt"></i> Reprogramar
            </Link>
            <button 
              onClick={() => onCancel(turno._id)}
              style={{ 
                backgroundColor: 'transparent', border: '1px solid var(--error)', 
                color: 'var(--error)', padding: '6px 12px', borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem', cursor: 'pointer', transition: '0.2s', fontWeight: 'bold'
              }}>
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MisTurnos;

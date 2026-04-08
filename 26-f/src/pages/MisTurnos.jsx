import React from 'react';
import { useGetTurnosPaciente } from '../hooks/useGetTurnosPaciente';
import { updateEstadoTurno } from '../services/turnoService';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Clock, User, XCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MisTurnos = () => {
  const pacienteId = "65f1a2b3c4d5e6f7a8b9c0d1"; // Hardcoded ID as agreed
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
      case 'reservado': return { color: 'var(--secondary)', bg: '#ebf4ff', icon: <Clock size={16} /> };
      case 'cancelado': return { color: 'var(--error)', bg: '#fff5f5', icon: <XCircle size={16} /> };
      case 'completado': return { color: 'var(--success)', bg: '#f0fff4', icon: <CheckCircle size={16} /> };
      default: return { color: 'gray', bg: '#f7fafc', icon: null };
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary)', marginBottom: '30px' }}>
        <ArrowLeft size={20} /> Volver al Inicio
      </Link>

      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: 'var(--secondary)', marginBottom: '10px' }}>Mis Turnos</h1>
        <p style={{ color: 'var(--text-light)' }}>Aquí puedes consultar el historial y estado de tus citas médicas.</p>
      </div>

      {loading && <p>Cargando tus turnos...</p>}
      {error && <p style={{ color: 'var(--error)' }}>{error}</p>}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {!loading && turnos.length === 0 && <p style={{ fontStyle: 'italic', color: 'var(--text-light)' }}>Aún no tienes turnos agendados.</p>}
        
        {!loading && turnos.map(turno => {
          const status = getStatusStyle(turno.estado);
          return (
            <div key={turno._id} className="glass-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', paddingRight: '20px', borderRight: '1px solid #eee' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    {format(parseISO(turno.fecha), 'dd')}
                  </div>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-light)' }}>
                    {format(parseISO(turno.fecha), 'MMM', { locale: es })}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                    <User size={18} color="var(--secondary)" />
                    <span style={{ fontWeight: '600' }}>{turno.profesional?.nombre || 'Médico'}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={14} /> {turno.hora} hs
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={14} /> {format(parseISO(turno.fecha), 'eeee', { locale: es })}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  padding: '6px 12px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: '600',
                  color: status.color,
                  backgroundColor: status.bg
                }}>
                  {status.icon}
                  {turno.estado.toUpperCase()}
                </div>

                {turno.estado === 'reservado' && (
                  <button 
                    onClick={() => handleCancelar(turno._id)}
                    style={{ 
                      background: 'none', 
                      border: `1px solid var(--error)`, 
                      color: 'var(--error)', 
                      padding: '8px 15px', 
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}>
                    Cancelar Turno
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MisTurnos;

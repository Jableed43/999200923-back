import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useGetDisponibilidad } from '../hooks/useGetDisponibilidad';
import { reservarTurno, reprogramarTurno } from '../services/turnoService';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isBefore, isSameDay, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { useGetPacientes } from '../hooks/useGetPacientes';
import { useGetProfesionales } from '../hooks/useGetProfesionales';
import { useAuth } from '../context/AuthContext';

const Paciente = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [profesionalId, setProfesionalId] = useState(searchParams.get('profesionalId') || '');
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [pacienteIdSeleccionado, setPacienteIdSeleccionado] = useState(user?.role === 'paciente' ? user.id : '');

  // Sincronizar ID de paciente cuando el usuario cargue
  useEffect(() => {
    if (user?.role === 'paciente' && !pacienteIdSeleccionado) {
      setPacienteIdSeleccionado(user.id);
    }
  }, [user, pacienteIdSeleccionado]);

  const { data, loading, error, refetch } = useGetDisponibilidad(profesionalId, format(selectedDate, 'yyyy-MM-dd'));
  const { pacientes } = useGetPacientes();
  const { profesionales } = useGetProfesionales();

  const rescheduleId = searchParams.get('rescheduleId');
  const isRescheduling = !!rescheduleId;

  const handleMonthChange = (offset) => {
    const nextMonth = addMonths(currentMonth, offset);
    const diff = addMonths(new Date(), 3);
    if (offset > 0 && isBefore(diff, nextMonth)) return;
    if (offset < 0 && isBefore(nextMonth, startOfMonth(new Date()))) return;
    setCurrentMonth(nextMonth);
  };

  const startDay = startOfMonth(currentMonth).getDay();

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const handleBooking = async () => {
    try {
      if (!selectedSlot) {
        Swal.fire('Atención', 'Por favor selecciona un horario', 'warning');
        return;
      };

      if (isRescheduling) {
        await reprogramarTurno(rescheduleId, {
          fecha: format(selectedDate, 'yyyy-MM-dd'),
          hora: selectedSlot
        });
        Swal.fire({
          title: '¡Reprogramado!',
          text: 'El turno ha sido modificado con éxito.',
          icon: 'success',
          confirmButtonColor: 'var(--primary)'
        });
      } else {
        if (!pacienteIdSeleccionado) {
          Swal.fire('Atención', 'Por favor selecciona un paciente', 'warning');
          return;
        }

        await reservarTurno({
          fecha: format(selectedDate, 'yyyy-MM-dd'),
          hora: selectedSlot,
          profesionalId,
          pacienteId: pacienteIdSeleccionado, 
          motivo,
          creadoPor: user.id,
          onModel: user.role === 'administrativo' ? 'Administrativo' : 'Paciente'
        });
        
        Swal.fire({
          title: '¡Reservado!',
          text: 'Tu turno ha sido agendado con éxito.',
          icon: 'success',
          confirmButtonColor: 'var(--primary)'
        });
      }
      
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.error || 'No se pudo procesar la solicitud', 'error');
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '30px', textDecoration: 'none', fontWeight: 'bold' }}>
        <i className="fa-solid fa-arrow-left"></i> Volver al Inicio
      </Link>

      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: 'var(--secondary)', marginBottom: '10px' }}>
          {isRescheduling ? 'Reprogramar Turno' : 'Reservar Turno'}
        </h1>
        <p style={{ color: 'var(--text-light)', marginBottom: '30px' }}>
          {isRescheduling 
            ? 'Selecciona la nueva fecha y hora para este turno.' 
            : 'Selecciona el profesional y elige el horario que más te convenga.'}
        </p>
        
        {!isRescheduling && (
            <FormControl fullWidth style={{ maxWidth: '400px' }}>
            <InputLabel id="select-prof-booking-label">Selecciona el Profesional</InputLabel>
            <Select
                labelId="select-prof-booking-label"
                value={profesionalId}
                label="Selecciona el Profesional"
                onChange={(e) => {
                setProfesionalId(e.target.value);
                setSearchParams({ profesionalId: e.target.value });
                }}
            >
                {profesionales.map(p => (
                <MenuItem key={p._id} value={p._id}>{p.nombre} {p.apellido} ({p.especialidad})</MenuItem>
                ))}
            </Select>
            </FormControl>
        )}
      </div>

      {!profesionalId && (
        <div className="glass-card" style={{ padding: '60px', textAlign: 'center' }}>
          <h3>Por favor, selecciona un profesional para ver su disponibilidad.</h3>
        </div>
      )}

      {profesionalId && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', flexWrap: 'wrap' }}>
        
        {/* Calendario */}
        <div className="glass-card" style={{ padding: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h3 style={{ textTransform: 'capitalize' }}>{format(currentMonth, 'MMMM yyyy', { locale: es })}</h3>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button onClick={() => handleMonthChange(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}><i className="fa-solid fa-chevron-left"></i></button>
              <button onClick={() => handleMonthChange(1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}><i className="fa-solid fa-chevron-right"></i></button>
            </div>
          </div>

          <div style={{ gridTemplateColumns: 'repeat(7, 1fr)', display: 'grid', gap: '10px', textAlign: 'center' }}>
            {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map(d => (
              <div key={d} style={{ fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--text-light)' }}>{d}</div>
            ))}
            
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {days.map(day => {
              const isPast = isBefore(day, startOfDay(new Date())) && !isSameDay(day, new Date());
              
              // Lógica de filtrado por disponibilidad del profesional
              let isWorkingDay = true;
              if (profesionalId) {
                const selectedProf = profesionales.find(p => p._id === profesionalId);
                if (selectedProf) {
                  const dayNameRaw = format(day, 'eeee', { locale: es });
                  const dayNameNormalized = dayNameRaw.charAt(0).toUpperCase() + dayNameRaw.slice(1);
                  const dayPlan = selectedProf.disponibilidad?.find(d => d.dia === dayNameNormalized);
                  isWorkingDay = dayPlan?.activa && dayPlan?.slots?.length > 0;
                }
              }

              const isSelected = isSameDay(day, selectedDate);
              const isDisabled = isPast || !isWorkingDay;
              
              return (
                <div 
                  key={day.toString()}
                  onClick={() => !isDisabled && setSelectedDate(day)}
                  style={{
                    padding: '10px 0',
                    borderRadius: '8px',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    backgroundColor: isSelected ? 'var(--primary)' : 'transparent',
                    color: isSelected ? 'white' : (isDisabled ? '#ccc' : 'inherit'),
                    fontSize: '0.9rem',
                    transition: 'all 0.2s',
                    opacity: !isWorkingDay && !isPast ? 0.4 : 1,
                    position: 'relative'
                  }}
                >
                  {format(day, 'd')}
                  {isWorkingDay && !isPast && !isSelected && (
                    <div style={{ position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Slots */}
        <div>
          <h2 style={{ marginBottom: '10px', color: 'var(--secondary)' }}>
            {data?.profesional?.nombre || 'Cargando...'}
          </h2>
          <p style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-light)', marginBottom: '30px' }}>
            <i className="fa-solid fa-calendar-alt" style={{ color: 'var(--primary)' }}></i> {format(selectedDate, "eeee d 'de' MMMM", { locale: es })}
          </p>

          <h4 style={{ marginBottom: '15px', color: 'var(--text-light)' }}>Horarios disponibles:</h4>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {loading && <p>Buscando horarios...</p>}
            {!loading && data?.slots?.map(slot => (
                <button 
                key={slot} 
                className="glass-card"
                onClick={() => {
                   setSelectedSlot(slot);
                   setIsModalOpen(true);
                }}
                style={{ 
                  padding: '12px 20px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  color: 'var(--secondary)',
                  fontWeight: '600'
                }}
              >
                <i className="fa-solid fa-clock" style={{ color: 'var(--primary)', fontSize: '0.9rem' }}></i> {slot}
              </button>
            ))}
            {!loading && (!data?.slots || data.slots.length === 0) && (
              <p style={{ fontStyle: 'italic', color: 'var(--text-light)' }}>
                No hay turnos disponibles para este día.
              </p>
            )}
          </div>
        </div>
      </div>
    )}

    {/* MODAL DE CONFIRMACIÓN */}
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle style={{ borderBottom: '1px solid #eee', color: 'var(--secondary)', fontWeight: 'bold' }}>
          {isRescheduling ? 'Confirmar Reprogramación' : 'Confirmar Reserva'}
        </DialogTitle>
        <DialogContent style={{ paddingTop: '20px' }}>
          <div style={{ padding: '10px 0' }}>
            <p style={{ marginBottom: '15px', fontSize: '1rem' }}>
              <strong>Día:</strong> {format(selectedDate, "eeee d 'de' MMMM", { locale: es })} <br/>
              <strong>Hora:</strong> {selectedSlot} hs
            </p>

            {!isRescheduling ? (
              <>
                {user?.role === 'administrativo' ? (
                  <FormControl fullWidth style={{ marginBottom: '20px' }}>
                    <InputLabel id="select-paciente-label">¿Quién solicita el turno?</InputLabel>
                    <Select
                      labelId="select-paciente-label"
                      value={pacienteIdSeleccionado}
                      label="¿Quién solicita el turno?"
                      onChange={(e) => setPacienteIdSeleccionado(e.target.value)}
                    >
                      {pacientes.map(p => (
                        <MenuItem key={p._id} value={p._id}>{p.nombre} {p.apellido} (DNI: {p.dni || 'S/D'})</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                    <Typography variant="body2" style={{ color: 'var(--secondary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <i className="fa-solid fa-user-check" style={{ color: 'var(--primary)' }}></i> Turno para: {user?.nombre} {user?.apellido}
                    </Typography>
                  </div>
                )}

                <TextField
                  fullWidth
                  label="Motivo de la consulta"
                  variant="outlined"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  placeholder="Ej: Control anual, dolor lumbar, etc."
                />
              </>
            ) : (
              <div style={{ padding: '15px', backgroundColor: '#eebfcc22', borderRadius: '8px', border: '1px solid var(--accent)' }}>
                <p style={{ color: 'var(--secondary)', fontSize: '0.85rem', margin: 0 }}>
                  Estás moviendo este turno a un nuevo horario. El paciente mantendrá sus datos y el motivo original.
                </p>
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions style={{ padding: '20px', borderTop: '1px solid #eee' }}>
          <Button onClick={() => setIsModalOpen(false)} color="inherit">Cancelar</Button>
          <Button onClick={handleBooking} variant="contained" style={{ backgroundColor: 'var(--primary)' }}>
            {isRescheduling ? 'Mover Turno' : 'Confirmar Turno'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Paciente;

import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useGetDisponibilidad } from '../hooks/useGetDisponibilidad';
import { reservarTurno } from '../services/turnoService';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isBefore, isSameDay, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, ArrowLeft } from 'lucide-react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Swal from 'sweetalert2';
import { useGetPacientes } from '../hooks/useGetPacientes';

const Paciente = () => {
  const [searchParams] = useSearchParams();
  const profesionalId = searchParams.get('profesionalId');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [pacienteIdSeleccionado, setPacienteIdSeleccionado] = useState('');

  const { data, loading, error, refetch } = useGetDisponibilidad(profesionalId, format(selectedDate, 'yyyy-MM-dd'));
  const { pacientes } = useGetPacientes();

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
      if (!selectedSlot || !pacienteIdSeleccionado) {
        Swal.fire('Atención', 'Por favor selecciona un paciente', 'warning');
        return;
      };

      await reservarTurno({
        fecha: format(selectedDate, 'yyyy-MM-dd'),
        hora: selectedSlot,
        profesionalId,
        pacienteId: pacienteIdSeleccionado, 
        motivo,
        creadoPor: pacienteIdSeleccionado,
        onModel: "Paciente"
      });
      
      setIsModalOpen(false);
      Swal.fire({
        title: '¡Reservado!',
        text: 'Tu turno ha sido agendado con éxito.',
        icon: 'success',
        confirmButtonColor: 'var(--primary)'
      });
      refetch();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.error || 'No se pudo agendar el turno', 'error');
    }
  };

  if (!profesionalId) return (
    <div style={{ textAlign: 'center', padding: '100px' }}>
      <h2>Por favor, selecciona un profesional en el inicio.</h2>
      <Link to="/" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>Ir al Inicio</Link>
    </div>
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary)', marginBottom: '30px' }}>
        <ArrowLeft size={20} /> Volver al Staff
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', flexWrap: 'wrap' }}>
        
        {/* Calendario */}
        <div className="glass-card" style={{ padding: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h3 style={{ textTransform: 'capitalize' }}>{format(currentMonth, 'MMMM yyyy', { locale: es })}</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleMonthChange(-1)} style={{ background: 'none', border: 'none' }}><ChevronLeft /></button>
              <button onClick={() => handleMonthChange(1)} style={{ background: 'none', border: 'none' }}><ChevronRight /></button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', textAlign: 'center' }}>
            {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map(d => (
              <div key={d} style={{ fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--text-light)' }}>{d}</div>
            ))}
            
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {days.map(day => {
              const isPast = isBefore(day, startOfDay(new Date())) && !isSameDay(day, new Date());
              const isSelected = isSameDay(day, selectedDate);
              
              return (
                <div 
                  key={day.toString()}
                  onClick={() => !isPast && setSelectedDate(day)}
                  style={{
                    padding: '10px 0',
                    borderRadius: '8px',
                    cursor: isPast ? 'not-allowed' : 'pointer',
                    backgroundColor: isSelected ? 'var(--primary)' : 'transparent',
                    color: isSelected ? 'white' : (isPast ? '#ccc' : 'inherit'),
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                  }}
                >
                  {format(day, 'd')}
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
            <CalendarIcon size={18} /> {format(selectedDate, "eeee d 'de' MMMM", { locale: es })}
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
                  gap: '8px', 
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  color: 'var(--secondary)'
                }}
              >
                <Clock size={16} color="var(--primary)" /> {slot}
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

      {/* MODAL DE CONFIRMACIÓN */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>Confirmar Reserva</DialogTitle>
        <DialogContent>
          <p style={{ marginBottom: '20px', fontSize: '0.9rem' }}>
            Fecha: <strong>{format(selectedDate, 'dd/MM/yyyy')}</strong> | Hora: <strong>{selectedSlot} hs</strong>
          </p>
          
          <FormControl fullWidth style={{ marginBottom: '20px' }}>
            <InputLabel id="select-paciente-label">¿Quién solicita el turno?</InputLabel>
            <Select
              labelId="select-paciente-label"
              value={pacienteIdSeleccionado}
              label="¿Quién solicita el turno?"
              onChange={(e) => setPacienteIdSeleccionado(e.target.value)}
            >
              {pacientes.map(p => (
                <MenuItem key={p._id} value={p._id}>{p.nombre} {p.apellido}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            label="Motivo de la consulta"
            type="text"
            fullWidth
            variant="outlined"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
          />
        </DialogContent>
        <DialogActions style={{ padding: '20px' }}>
          <Button onClick={() => setIsModalOpen(false)} color="inherit">Cancelar</Button>
          <Button 
            onClick={handleBooking} 
            variant="contained" 
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Confirmar Turno
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Paciente;

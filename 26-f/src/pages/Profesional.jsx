import React, { useState } from 'react';
import { useGetTurnosProfesional } from '../hooks/useGetTurnosProfesional';
import { updateEstadoTurno } from '../services/turnoService';
import { addHistoriaEntry, getPaciente } from '../services/pacienteService';
import { format, parseISO, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, isBefore, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Clipboard, User, Clock, CheckCircle, Save, ArrowLeft, History, XCircle, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Chip, MenuItem, Select, FormControl, InputLabel, Paper, IconButton } from '@mui/material';
import Swal from 'sweetalert2';
import { useGetProfesionales } from '../hooks/useGetProfesionales';
import { safeParseDate } from '../utils/dateUtils';

const Profesional = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [profesionalId, setProfesionalId] = useState(searchParams.get('profesionalId') || ''); 
  
  const isFixed = !!searchParams.get('profesionalId');
  const { profesionales } = useGetProfesionales();
  const { turnos, loading, error, refetch } = useGetTurnosProfesional(profesionalId);
  
  // Estados para el Calendario
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Estados para Modal de Atención
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notas, setNotas] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [patientHistory, setPatientHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Estado para Modal de Historia Clínica Independiente
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Lógica de Calendario
  const handleMonthChange = (offset) => {
    setCurrentMonth(addMonths(currentMonth, offset));
  };

  const startDay = startOfMonth(currentMonth).getDay();
  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const getTurnosDelDia = (date) => {
    const targetStr = format(date, 'yyyy-MM-dd');
    return turnos.filter(t => {
        const turnoStr = format(safeParseDate(t.fecha), 'yyyy-MM-dd');
        return turnoStr === targetStr && t.estado !== 'cancelado';
    });
  };

  const handleOpenAtender = async (turno) => {
    setSelectedTurno(turno);
    setNotas('');
    setDiagnostico('');
    setIsModalOpen(true);
    
    try {
      const p = await getPaciente(turno.paciente._id);
      setPatientHistory(p.historiaClinica || []);
    } catch (err) {
      console.error("Error al cargar historial", err);
    }
  };

  const handleOpenHistory = async (turno) => {
    setSelectedTurno(turno);
    try {
      const p = await getPaciente(turno.paciente._id);
      setPatientHistory(p.historiaClinica || []);
      setIsHistoryModalOpen(true);
    } catch (err) {
      Swal.fire('Error', 'No se pudo cargar la historia clínica', 'error');
    }
  };

  const handleCancelar = async (turnoId) => {
    const result = await Swal.fire({
      title: '¿Confirmas la cancelación?',
      text: "El paciente será notificado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--error)',
      confirmButtonText: 'Sí, cancelar'
    });

    if (result.isConfirmed) {
      try {
        await updateEstadoTurno(turnoId, 'cancelado');
        Swal.fire('Cancelado', 'El turno ha sido cancelado.', 'success');
        refetch();
      } catch (err) {
        Swal.fire('Error', 'No se pudo cancelar el turno.', 'error');
      }
    }
  };

  const handleCompletarSesion = async () => {
    try {
      await addHistoriaEntry(selectedTurno.paciente._id, {
        profesionalId,
        notas,
        diagnostico,
        fecha: new Date()
      });
      await updateEstadoTurno(selectedTurno._id, 'completado');
      Swal.fire('Éxito', 'Sesión completada e historia clínica actualizada.', 'success');
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      Swal.fire('Error', 'No se pudo guardar la evolución.', 'error');
    }
  };

  const filteredTurnosDiarios = getTurnosDelDia(selectedDate);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary)', marginBottom: '30px' }}>
        <ArrowLeft size={20} /> Volver al Inicio
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ color: 'var(--secondary)', marginBottom: '10px' }}>
            {isFixed ? 'Mi Agenda Profesional' : 'Gestión Administrativa'}
          </h1>
          <p style={{ color: 'var(--text-light)' }}>
            {isFixed ? 'Consulta tus turnos y evoluciona a tus pacientes.' : 'Selecciona un profesional para gestionar su agenda.'}
          </p>
        </div>

        <FormControl style={{ minWidth: '300px' }}>
          <InputLabel id="select-profesional-admin-label">Ver agenda de:</InputLabel>
          <Select
            labelId="select-profesional-admin-label"
            value={profesionalId}
            label="Ver agenda de:"
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
      </div>

      {!profesionalId && !loading && (
        <div className="glass-card" style={{ padding: '80px', textAlign: 'center' }}>
          <History size={60} color="#cbd5e0" style={{ marginBottom: '20px' }} />
          <h3>Por favor, selecciona un profesional para ver su agenda en el calendario.</h3>
        </div>
      )}

      {loading && <p>Cargando agenda...</p>}
      {error && <p style={{ color: 'var(--error)' }}>{error}</p>}
      
      {profesionalId && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px', alignItems: 'start' }}>
          
          {/* Calendario de Agenda */}
          <Paper className="glass-card" style={{ padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ textTransform: 'capitalize', margin: 0 }}>{format(currentMonth, 'MMMM yyyy', { locale: es })}</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <IconButton onClick={() => handleMonthChange(-1)} size="small"><ChevronLeft /></IconButton>
                <IconButton onClick={() => handleMonthChange(1)} size="small"><ChevronRight /></IconButton>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', textAlign: 'center' }}>
              {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map(d => (
                <div key={d} style={{ fontWeight: 'bold', fontSize: '0.75rem', color: 'var(--text-light)', marginBottom: '10px' }}>{d}</div>
              ))}
              
              {Array.from({ length: startDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}

              {days.map(day => {
                const isSelected = isSameDay(day, selectedDate);
                const turnosHoy = getTurnosDelDia(day);
                const hasTurnos = turnosHoy.length > 0;
                
                return (
                  <div 
                    key={day.toString()}
                    onClick={() => setSelectedDate(day)}
                    style={{
                      padding: '12px 0',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      position: 'relative',
                      backgroundColor: isSelected ? 'var(--primary)' : (hasTurnos ? '#ebf4ff' : 'transparent'),
                      color: isSelected ? 'white' : (hasTurnos ? 'var(--primary)' : 'inherit'),
                      border: hasTurnos && !isSelected ? '1px solid #bee3f8' : '1px solid transparent',
                      fontWeight: hasTurnos ? 'bold' : 'normal',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s',
                      textAlign: 'center'
                    }}
                  >
                    {format(day, 'd')}
                    {hasTurnos && !isSelected && (
                        <div style={{ width: '4px', height: '4px', backgroundColor: 'var(--primary)', borderRadius: '50%', margin: '0 auto', position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)' }} />
                    )}
                  </div>
                );
              })}
            </div>
          </Paper>

          {/* Listado de Turnos del Día */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px' }}>
                <h2 style={{ fontSize: '1.4rem', color: 'var(--secondary)' }}>
                    Detalle del: {format(selectedDate, "d 'de' MMMM", { locale: es })}
                </h2>
                <Chip label={filteredTurnosDiarios.length + ' turnos'} color="primary" variant="outlined" />
            </div>

            {filteredTurnosDiarios.map(turno => (
              <div key={turno._id} className="glass-card" style={{ padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ backgroundColor: '#edf2f7', padding: '8px', borderRadius: '50%' }}>
                      <User size={20} color="var(--secondary)" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem' }}>{turno.paciente?.nombre} {turno.paciente?.apellido}</h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Paciente ID: {turno.paciente?._id.slice(-6)}</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '15px', color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '15px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={16} /> {turno.hora} hs
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Clipboard size={16} /> {turno.estado.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ padding: '10px', backgroundColor: '#fdfdfd', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-light)', marginBottom: '4px' }}>Motivo:</p>
                    <p style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>{turno.motivo || 'No especificado'}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {turno.estado === 'reservado' && (
                    <button 
                      onClick={() => handleOpenAtender(turno)}
                      className="btn-primary" 
                      style={{ padding: '8px 15px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <CheckCircle size={16} /> Atender
                    </button>
                  )}
                  
                  <button 
                    onClick={() => handleOpenHistory(turno)}
                    style={{ background: 'none', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '8px 15px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    <History size={16} /> Ver Historia
                  </button>

                  {turno.estado === 'reservado' && (
                    <>
                    <button 
                      onClick={() => {
                        const params = new URLSearchParams();
                        params.set('profesionalId', profesionalId);
                        params.set('rescheduleId', turno._id);
                        navigate(`/paciente?${params.toString()}`);
                      }}
                      style={{ background: 'none', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '8px 15px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                      <Calendar size={16} /> Reprogramar
                    </button>

                    <button 
                      onClick={() => handleCancelar(turno._id)}
                      style={{ background: 'none', border: '1px solid var(--error)', color: 'var(--error)', padding: '8px 15px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                      <XCircle size={16} /> Cancelar
                    </button>
                    </>
                  )}
                </div>
              </div>
            ))}

            {filteredTurnosDiarios.length === 0 && (
              <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '2px dashed #cbd5e0' }}>
                 <Clock size={48} color="#cbd5e0" style={{ marginBottom: '15px' }} />
                 <p style={{ color: 'var(--text-light)' }}>No hay turnos agendados para este día.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL DE ATENCIÓN / EVOLUCIÓN */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle style={{ color: 'var(--secondary)', borderBottom: '1px solid #eee', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Atendiendo a: {selectedTurno?.paciente?.nombre} {selectedTurno?.paciente?.apellido}</span>
          <Chip label={selectedTurno?.hora + ' hs'} variant="outlined" />
        </DialogTitle>
        <DialogContent style={{ paddingTop: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: showHistory ? '1fr 1fr' : '1fr', gap: '30px' }}>
            <div>
              <h4 style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Save size={18} /> Registro de Evolución
              </h4>
              <TextField
                label="Notas de la sesión"
                multiline rows={6} fullWidth variant="outlined"
                value={notas} onChange={(e) => setNotas(e.target.value)}
                style={{ marginBottom: '20px' }}
              />
              <TextField
                label="Diagnóstico / Impresión Clínica"
                fullWidth variant="outlined"
                value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)}
              />
              <Button onClick={() => setShowHistory(!showHistory)} startIcon={<History />} style={{ marginTop: '20px', color: 'var(--primary)' }}>
                {showHistory ? "Ocultar Historial" : "Ver Historia Clínica en este panel"}
              </Button>
            </div>
            {showHistory && (
              <div style={{ borderLeft: '1px solid #eee', paddingLeft: '30px', maxHeight: '400px', overflowY: 'auto' }}>
                <h4 style={{ marginBottom: '15px' }}>Antecedentes</h4>
                {patientHistory.map((entry, idx) => (
                  <div key={idx} style={{ padding: '15px', backgroundColor: '#f8fafc', borderRadius: '8px', marginBottom: '15px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '5px' }}>
                      {format(new Date(entry.fecha), 'dd/MM/yyyy HH:mm')}
                    </div>
                    <p style={{ fontWeight: '600', marginBottom: '5px' }}>{entry.diagnostico}</p>
                    <p style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>"{entry.notas}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions style={{ padding: '20px', borderTop: '1px solid #eee' }}>
          <Button onClick={() => setIsModalOpen(false)} color="inherit">Cerrar</Button>
          <Button onClick={handleCompletarSesion} variant="contained" style={{ backgroundColor: 'var(--primary)' }} disabled={!notas}>
            Finalizar y Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* MODAL DE HISTORIA CLÍNICA INDEPENDIENTE */}
      <Dialog open={isHistoryModalOpen} onClose={() => setIsHistoryModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle style={{ borderBottom: '1px solid #eee', color: 'var(--secondary)' }}>
          Historia Clínica: {selectedTurno?.paciente?.nombre} {selectedTurno?.paciente?.apellido}
        </DialogTitle>
        <DialogContent style={{ padding: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {patientHistory.length > 0 ? (
              patientHistory.map((entry, idx) => (
                <div key={idx} style={{ padding: '15px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Chip label={format(new Date(entry.fecha), 'dd/MM/yyyy')} size="small" />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Atendido por ID: {entry.profesionalId?.slice(-6)}</span>
                  </div>
                  <p style={{ fontWeight: 'bold', marginBottom: '5px', color: 'var(--secondary)' }}>{entry.diagnostico}</p>
                  <p style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>{entry.notas}</p>
                </div>
              ))
            ) : (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <History size={48} color="#cbd5e0" style={{ marginBottom: '15px' }} />
                    <p style={{ color: 'var(--text-light)' }}>Sin registros previos.</p>
                </div>
            )}
          </div>
        </DialogContent>
        <DialogActions style={{ borderTop: '1px solid #eee', padding: '15px' }}>
          <Button onClick={() => setIsHistoryModalOpen(false)} variant="contained" style={{ backgroundColor: 'var(--primary)' }}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profesional;

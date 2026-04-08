import React, { useState } from 'react';
import { useGetTurnosProfesional } from '../hooks/useGetTurnosProfesional';
import { updateEstadoTurno } from '../services/turnoService';
import { addHistoriaEntry, getPaciente } from '../services/pacienteService';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Clipboard, User, Clock, CheckCircle, Save, ArrowLeft, History, XCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Chip, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Swal from 'sweetalert2';
import { useGetProfesionales } from '../hooks/useGetProfesionales';

const Profesional = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [profesionalId, setProfesionalId] = useState(searchParams.get('profesionalId') || ''); 
  
  const isFixed = !!searchParams.get('profesionalId');
  const { profesionales } = useGetProfesionales();
  const { turnos, loading, error, refetch } = useGetTurnosProfesional(profesionalId);
  
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notas, setNotas] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [patientHistory, setPatientHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

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

  const handleCancelar = async (turnoId) => {
    const result = await Swal.fire({
      title: '¿Confirmas la cancelación?',
      text: "El paciente será notificado (simulado).",
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

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
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

        {!isFixed && (
          <FormControl style={{ minWidth: '300px' }}>
            <InputLabel id="select-profesional-admin-label">Ver agenda de:</InputLabel>
            <Select
              labelId="select-profesional-admin-label"
              value={profesionalId}
              label="Ver agenda de:"
              onChange={(e) => setProfesionalId(e.target.value)}
            >
              {profesionales.map(p => (
                <MenuItem key={p._id} value={p._id}>{p.nombre} {p.apellido} ({p.especialidad})</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>

      {!profesionalId && !loading && (
        <div className="glass-card" style={{ padding: '50px', textAlign: 'center' }}>
          <h3>Por favor, selecciona un profesional para ver su agenda.</h3>
        </div>
      )}

      {loading && <p>Cargando agenda...</p>}
      {error && <p style={{ color: 'var(--error)' }}>{error}</p>}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '20px' }}>
        {!loading && turnos.filter(t => t.estado !== 'cancelado').map(turno => (
          <div key={turno._id} className="glass-card" style={{ padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ backgroundColor: '#edf2f7', padding: '8px', borderRadius: '50%' }}>
                  <User size={20} color="var(--secondary)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem' }}>{turno.paciente?.nombre} {turno.paciente?.apellido}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>ID: {turno.paciente?._id.slice(-6)}</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '15px', color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '15px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={16} /> {turno.hora} hs
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clipboard size={16} /> {format(parseISO(turno.fecha), 'dd/MM/yyyy')}
                </span>
              </div>

              <Chip 
                label={turno.estado.toUpperCase()} 
                size="small" 
                style={{ 
                  backgroundColor: turno.estado === 'completado' ? '#f0fff4' : '#ebf4ff',
                  color: turno.estado === 'completado' ? 'var(--success)' : 'var(--secondary)',
                  fontWeight: 'bold'
                }} 
              />
            </div>

            {turno.estado === 'reservado' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button 
                  onClick={() => handleOpenAtender(turno)}
                  className="btn-primary" 
                  style={{ padding: '8px 15px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <CheckCircle size={16} /> Atender
                </button>
                <button 
                  onClick={() => handleCancelar(turno._id)}
                  style={{ background: 'none', border: '1px solid var(--error)', color: 'var(--error)', padding: '8px 15px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                  <XCircle size={16} /> Cancelar
                </button>
              </div>
            )}
          </div>
        ))}
        {!loading && turnos.length === 0 && <p style={{ fontStyle: 'italic' }}>No tienes turnos agendados en tu sistema.</p>}
      </div>

      {/* MODAL DE ATENCIÓN / EVOLUCIÓN */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle style={{ color: 'var(--secondary)', borderBottom: '1px solid #eee', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Sesión: {selectedTurno?.paciente?.nombre} {selectedTurno?.paciente?.apellido}</span>
          <Chip label={selectedTurno?.hora + ' hs'} variant="outlined" />
        </DialogTitle>
        <DialogContent style={{ paddingTop: '20px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: showHistory ? '1fr 1fr' : '1fr', gap: '30px' }}>
            
            {/* Formulario de Evolución */}
            <div>
              <h4 style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Save size={18} /> Registro de Evolución
              </h4>
              <TextField
                label="Notas de la sesión"
                multiline
                rows={6}
                fullWidth
                variant="outlined"
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                style={{ marginBottom: '20px' }}
              />
              <TextField
                label="Diagnóstico / Impresión Clínica"
                fullWidth
                variant="outlined"
                value={diagnostico}
                onChange={(e) => setDiagnostico(e.target.value)}
              />
              
              <Button 
                onClick={() => setShowHistory(!showHistory)} 
                startIcon={<History />} 
                style={{ marginTop: '20px', color: 'var(--primary)' }}
              >
                {showHistory ? "Ocultar Historial" : "Ver Historia Clínica"}
              </Button>
            </div>

            {/* Historial Clínico (Panel Lateral) */}
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
                {patientHistory.length === 0 && <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Sin antecedentes registrados.</p>}
              </div>
            )}
          </div>

        </DialogContent>
        <DialogActions style={{ padding: '20px', borderTop: '1px solid #eee' }}>
          <Button onClick={() => setIsModalOpen(false)} color="inherit">Cerrar</Button>
          <Button 
            onClick={handleCompletarSesion} 
            variant="contained" 
            style={{ backgroundColor: 'var(--primary)' }}
            disabled={!notas}
          >
            Finalizar y Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profesional;

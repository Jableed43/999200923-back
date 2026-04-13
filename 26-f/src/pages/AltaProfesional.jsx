import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProfesional, getProfesionalById, updateProfesional } from '../services/profesionalService';
import { 
  TextField, Button, MenuItem, Select, InputLabel, FormControl, 
  Checkbox, Typography, Paper, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Slider
} from '@mui/material';
import Swal from 'sweetalert2';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropImage';

const DISCIPLINAS = [
  'Psicología Adultos', 'Psicología Infantil', 'Psiquiatría', 
  'Neurología', 'Terapia Ocupacional', 'Psicopedagogía', 
  'Trabajo Social', 'Acompañamiento Terapéutico'
];

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const SLOTS_OPTIONS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', 
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
];

const AltaProfesional = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    matricula: '',
    antiguedad: 0,
    especialidad: '',
    email: '',
    password: '',
    trayectoria: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [disponibilidad, setDisponibilidad] = useState(
    DIAS.map(dia => ({ dia, slots: [], activa: false }))
  );

  // Estados para Recorte (Cropping)
  const [imageToCrop, setImageToCrop] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  // Estados para Drag & Select
  const [isDragging, setIsDragging] = useState(false);
  const [dragAction, setDragAction] = useState(null); // 'select' o 'deselect'
  
  // Estados para Clonación
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false);
  const [cloneSourceIdx, setCloneSourceIdx] = useState(null);
  const [cloneTargets, setCloneTargets] = useState([]);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  useEffect(() => {
    if (isEdit) {
      loadProfesional();
    }
  }, [id]);

  const loadProfesional = async () => {
    try {
      const p = await getProfesionalById(id);
      setFormData({
        nombre: p.nombre,
        apellido: p.apellido,
        matricula: p.matricula,
        antiguedad: p.antiguedad,
        especialidad: p.especialidad,
        email: p.email || '',
        password: '',
        trayectoria: p.trayectoria || ''
      });
      
      if (p.imagen) {
        setPreviewUrl(`http://localhost:3000${p.imagen}`);
      }

      const newDisp = DIAS.map(dia => {
        const found = p.disponibilidad.find(d => d.dia === dia);
        return found ? { ...found } : { dia, slots: [], activa: false };
      });
      setDisponibilidad(newDisp);
    } catch (err) {
      Swal.fire('Error', 'No se pudo cargar el profesional', 'error');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageToCrop(reader.result);
        setIsCropModalOpen(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCrop = async () => {
    try {
      const croppedBlob = await getCroppedImg(imageToCrop, croppedAreaPixels);
      const croppedFile = new File([croppedBlob], "perfil.jpg", { type: "image/jpeg" });
      
      setSelectedFile(croppedFile);
      setPreviewUrl(URL.createObjectURL(croppedBlob));
      setIsCropModalOpen(false);
    } catch (e) {
      console.error(e);
      Swal.fire('Error', 'No se pudo procesar el recorte de imagen', 'error');
    }
  };

  const updateSlot = (diaIdx, slot, action) => {
    setDisponibilidad(prev => {
      const newDisp = [...prev];
      const currentSlots = [...newDisp[diaIdx].slots];
      if (action === 'select' && !currentSlots.includes(slot)) {
        newDisp[diaIdx].slots = [...currentSlots, slot].sort();
      } else if (action === 'deselect' && currentSlots.includes(slot)) {
        newDisp[diaIdx].slots = currentSlots.filter(s => s !== slot);
      }
      if (newDisp[diaIdx].slots.length > 0) newDisp[diaIdx].activa = true;
      return newDisp;
    });
  };

  const handleSlotMouseDown = (diaIdx, slot) => {
    setIsDragging(true);
    const isSelected = disponibilidad[diaIdx].slots.includes(slot);
    const action = isSelected ? 'deselect' : 'select';
    setDragAction(action);
    updateSlot(diaIdx, slot, action);
  };

  const handleSlotMouseEnter = (diaIdx, slot) => {
    if (isDragging) {
      updateSlot(diaIdx, slot, dragAction);
    }
  };

  const handleDayActiveToggle = (diaIdx) => {
    const newDisp = [...disponibilidad];
    newDisp[diaIdx].activa = !newDisp[diaIdx].activa;
    if (!newDisp[diaIdx].activa) newDisp[diaIdx].slots = [];
    setDisponibilidad(newDisp);
  };

  const handleCloneDay = (sourceIdx) => {
    setCloneSourceIdx(sourceIdx);
    setCloneTargets([]);
    setIsCloneModalOpen(true);
  };

  const toggleCloneTarget = (targetIdx) => {
    setCloneTargets(prev => 
      prev.includes(targetIdx) ? prev.filter(i => i !== targetIdx) : [...prev, targetIdx]
    );
  };

  const applyClone = () => {
    const sourceSlots = [...disponibilidad[cloneSourceIdx].slots];
    setDisponibilidad(prev => {
      const newDisp = [...prev];
      cloneTargets.forEach(targetIdx => {
        newDisp[targetIdx].slots = [...sourceSlots];
        newDisp[targetIdx].activa = sourceSlots.length > 0;
      });
      return newDisp;
    });
    setIsCloneModalOpen(false);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Horarios replicados con éxito',
      showConfirmButton: false,
      timer: 2000
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = new FormData();
      data.append('nombre', formData.nombre);
      data.append('apellido', formData.apellido);
      data.append('matricula', formData.matricula);
      data.append('antiguedad', formData.antiguedad);
      data.append('especialidad', formData.especialidad);
      data.append('email', formData.email);
      data.append('trayectoria', formData.trayectoria);
      if (formData.password) {
        data.append('password', formData.password);
      }
      data.append('disponibilidad', JSON.stringify(disponibilidad.filter(d => d.activa && d.slots.length > 0)));
      
      if (selectedFile) {
        data.append('imagen', selectedFile);
      }

      if (isEdit) {
        await updateProfesional(id, data);
        Swal.fire('Éxito', 'Perfil actualizado correctamente', 'success');
      } else {
        await createProfesional(data);
        Swal.fire('Éxito', 'Profesional creado correctamente', 'success');
      }
      
      navigate('/');
    } catch (err) {
      Swal.fire('Error', 'No se pudo procesar la solicitud', 'error');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <Button 
        onClick={() => navigate(-1)} 
        startIcon={<i className="fa-solid fa-arrow-left"></i>} 
        style={{ marginBottom: '20px', color: 'var(--primary)', fontWeight: 'bold' }}
      >
        Volver
      </Button>

      <Typography variant="h4" style={{ color: 'var(--secondary)', fontWeight: 'bold', marginBottom: '10px' }}>
        {isEdit ? 'Editar Profesional' : 'Alta de Profesional'}
      </Typography>
      <Typography variant="body1" style={{ color: 'var(--text-light)', marginBottom: '40px' }}>
        Ajusta la fotografía y los horarios del profesional para su visualización en la clínica.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Paper className="glass-card" style={{ padding: '30px', marginBottom: '30px' }}>
          <Typography variant="h6" style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--secondary)', fontWeight: 'bold' }}>
            <i className="fa-solid fa-user-cog" style={{ color: 'var(--primary)' }}></i> Perfil Profesional
          </Typography>
          
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '160px', height: '160px', borderRadius: '50%', 
                backgroundColor: '#f1f5f9', margin: '0 auto 20px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', border: '3px solid white', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <i className="fa-solid fa-image" style={{ fontSize: '2.5rem', color: '#cbd5e0' }}></i>
                )}
              </div>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span" startIcon={<i className="fa-solid fa-upload"></i>} size="small" style={{ backgroundColor: 'var(--secondary)', fontWeight: 'bold' }}>
                  {previewUrl ? 'Cambiar Foto' : 'Subir Foto'}
                </Button>
              </label>
            </Grid>

            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Apellido" name="apellido" value={formData.apellido} onChange={handleInputChange} required />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Especialidad</InputLabel>
                    <Select name="especialidad" value={formData.especialidad} label="Especialidad" onChange={handleInputChange}>
                      {DISCIPLINAS.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Matrícula" name="matricula" value={formData.matricula} onChange={handleInputChange} required disabled={isEdit} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Años Antigüedad" name="antiguedad" type="number" value={formData.antiguedad} onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email de Acceso" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label={isEdit ? "Nueva Contraseña (opcional)" : "Contraseña Temporal"} name="password" type="password" value={formData.password} onChange={handleInputChange} required={!isEdit} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={4} label="Trayectoria Profesional" name="trayectoria" value={formData.trayectoria} onChange={handleInputChange} placeholder="Describe brevemente la experiencia, estudios y especializaciones del profesional..." />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        <Paper className="glass-card" style={{ padding: '30px' }}>
          <Typography variant="h6" style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--secondary)', fontWeight: 'bold' }}>
            <i className="fa-solid fa-id-badge" style={{ color: 'var(--primary)' }}></i> Agenda y Disponibilidad
          </Typography>
          
          {disponibilidad.map((diaInfo, idx) => (
            <div key={diaInfo.dia} style={{ 
              marginBottom: '15px', padding: '15px', borderRadius: '12px', 
              backgroundColor: diaInfo.activa ? '#f8fafc' : '#fff',
              border: '1px solid ' + (diaInfo.activa ? 'var(--primary)' : '#e2e8f0'),
              transition: 'all 0.3s'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Checkbox checked={diaInfo.activa} onChange={() => handleDayActiveToggle(idx)} />
                  <Typography style={{ fontWeight: 'bold' }}>{diaInfo.dia}</Typography>
                </div>
                {diaInfo.activa && diaInfo.slots.length > 0 && (
                  <Button 
                    size="small" 
                    startIcon={<i className="fa-solid fa-copy"></i>} 
                    onClick={() => handleCloneDay(idx)}
                    style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 'bold' }}
                  >
                    Copiar a otros días
                  </Button>
                )}
              </div>

              {diaInfo.activa && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px', userSelect: 'none' }}>
                  {SLOTS_OPTIONS.map(slot => (
                    <div 
                      key={slot}
                      onMouseDown={() => handleSlotMouseDown(idx, slot)}
                      onMouseEnter={() => handleSlotMouseEnter(idx, slot)}
                      style={{
                        padding: '6px 12px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.75rem',
                        backgroundColor: diaInfo.slots.includes(slot) ? 'var(--primary)' : '#fff',
                        color: diaInfo.slots.includes(slot) ? '#fff' : 'var(--text-light)',
                        border: '1px solid ' + (diaInfo.slots.includes(slot) ? 'var(--primary)' : '#cbd5e0'),
                        boxShadow: diaInfo.slots.includes(slot) ? '0 2px 5px rgba(0,0,0,0.1)' : 'none',
                        transition: 'background-color 0.1s'
                      }}
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Paper>

        <div style={{ marginTop: '40px', textAlign: 'right' }}>
           <Button type="submit" variant="contained" size="large" style={{ backgroundColor: 'var(--primary)', padding: '15px 50px', fontWeight: 'bold' }}>
             {isEdit ? 'Guardar Cambios' : 'Registrar Profesional'}
           </Button>
        </div>
      </form>

      {/* MODAL DE CLONACIÓN DE HORARIOS */}
      <Dialog open={isCloneModalOpen} onClose={() => setIsCloneModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>
          <i className="fa-solid fa-copy" style={{ color: 'var(--primary)', marginRight: '10px' }}></i> 
          Replicar Horarios de {cloneSourceIdx !== null && disponibilidad[cloneSourceIdx].dia}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" style={{ marginBottom: '20px', color: 'var(--text-light)' }}>
            Selecciona los días que quieres que tengan la misma agenda:
          </Typography>
          <Grid container spacing={1}>
            {disponibilidad.map((d, i) => (
              i !== cloneSourceIdx && (
                <Grid item xs={12} key={d.dia}>
                  <div 
                    onClick={() => toggleCloneTarget(i)}
                    style={{ 
                      padding: '10px', borderRadius: '8px', 
                      display: 'flex', alignItems: 'center', gap: '10px',
                      cursor: 'pointer', backgroundColor: cloneTargets.includes(i) ? '#f0f9ff' : 'transparent',
                      border: '1px solid ' + (cloneTargets.includes(i) ? 'var(--primary)' : '#eee')
                    }}
                  >
                    <Checkbox checked={cloneTargets.includes(i)} size="small" />
                    <Typography variant="body2">{d.dia}</Typography>
                  </div>
                </Grid>
              )
            ))}
          </Grid>
        </DialogContent>
        <DialogActions style={{ padding: '20px' }}>
          <Button onClick={() => setIsCloneModalOpen(false)}>Cancelar</Button>
          <Button 
            onClick={applyClone} 
            variant="contained" 
            disabled={cloneTargets.length === 0}
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Aplicar Cambios
          </Button>
        </DialogActions>
      </Dialog>

      {/* MODAL DE RECORTE DE IMAGEN */}
      <Dialog open={isCropModalOpen} onClose={() => setIsCropModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle style={{ borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--secondary)', fontWeight: '800' }}>
          <i className="fa-solid fa-cut" style={{ color: 'var(--primary)' }}></i> Ajustar Fotografía de Perfil
        </DialogTitle>
        <DialogContent style={{ backgroundColor: '#1a202c', height: '400px', position: 'relative', marginTop: '10px' }}>
          {imageToCrop && (
            <Cropper
              image={imageToCrop}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          )}
        </DialogContent>
        <DialogActions style={{ flexDirection: 'column', padding: '20px', gap: '15px', borderTop: '1px solid #eee' }}>
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Typography variant="caption">Zoom:</Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, zoom) => setZoom(zoom)}
              style={{ flex: 1 }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', gap: '10px' }}>
            <Button onClick={() => setIsCropModalOpen(false)} color="inherit">Cancelar</Button>
            <Button onClick={handleSaveCrop} variant="contained" style={{ backgroundColor: 'var(--primary)' }}>
              Aplicar y Guardar
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AltaProfesional;

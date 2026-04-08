import Turno from '../models/Turno.js';
import Profesional from '../models/Profesional.js';
import { format, parseISO, startOfDay, endOfDay } from 'date-fns';
import { es } from 'date-fns/locale';

export const fetchDisponibles = async (profesionalId, fechaStr) => {
    // 1. Parsear la fecha y obtener el día de la semana en español
    const fecha = parseISO(fechaStr);
    const diaSemana = format(fecha, 'eeee', { locale: es });
    
    // Capitalizar primera letra para matchear con el enum del modelo (Lunes, Martes...)
    const diaFormateado = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);

    // 2. Obtener la disponibilidad base del profesional
    const profesional = await Profesional.findById(profesionalId);
    if (!profesional) throw new Error("PROFESIONAL_NOT_FOUND");

    const agendaDia = profesional.disponibilidad.find(d => d.dia === diaFormateado && d.activa);
    
    // 3. Obtener turnos ya ocupados para ese día y profesional
    const turnosOcupados = await Turno.find({
        profesional: profesionalId,
        fecha: {
            $gte: startOfDay(fecha),
            $lte: endOfDay(fecha)
        },
        estado: { $ne: 'cancelado' }
    });

    const horasOcupadas = turnosOcupados.map(t => t.hora);

    return {
        profesional: {
            id: profesional._id,
            nombre: `${profesional.nombre} ${profesional.apellido}`,
            especialidad: profesional.especialidad
        },
        fecha: fechaStr,
        dia: diaFormateado,
        slots: agendaDia ? agendaDia.slots.filter(slot => !horasOcupadas.includes(slot)) : []
    };
};

export const processReserva = async (data) => {
    const { 
        fecha, 
        hora, 
        pacienteId, 
        profesionalId, 
        motivo, 
        creadoPor, 
        onModel 
    } = data;
    
    // 1. Validar colisión: ¿Ya existe un turno ocupado en ese horario?
    const parsedFecha = parseISO(fecha);
    const turnoExistente = await Turno.findOne({
        profesional: profesionalId,
        fecha: {
            $gte: startOfDay(parsedFecha),
            $lte: endOfDay(parsedFecha)
        },
        hora,
        estado: { $ne: 'cancelado' }
    });

    if (turnoExistente) {
        throw new Error("SLOT_ALREADY_BOOKED");
    }

    // 2. Creación del turno
    const nuevoTurno = await Turno.create({
        fecha: parsedFecha,
        hora,
        paciente: pacienteId,
        profesional: profesionalId,
        motivo: motivo || '',
        creadoPor,
        onModel,
        estado: 'reservado'
    });

    return nuevoTurno;
};

export const updateTurnoEstado = async (id, nuevoEstado) => {
    const turno = await Turno.findByIdAndUpdate(
        id, 
        { estado: nuevoEstado }, 
        { new: true }
    );
    
    if (!turno) throw new Error("TURNO_NOT_FOUND");
    
    return turno;
};

export const fetchByPaciente = async (pacienteId) => {
    return await Turno.find({ paciente: pacienteId })
        .populate('profesional', 'nombre apellido especialidad')
        .sort({ fecha: -1 });
};

export const fetchByProfesional = async (profesionalId) => {
    return await Turno.find({ profesional: profesionalId })
        .populate('paciente', 'nombre apellido')
        .sort({ fecha: 1 });
};

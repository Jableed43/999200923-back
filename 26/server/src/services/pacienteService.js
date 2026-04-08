import Paciente from '../models/Paciente.js';

export const createPaciente = async (data) => {
    return await Paciente.create(data);
};

export const getPacienteById = async (id) => {
    return await Paciente.findById(id);
};

export const getPacientes = async () => {
    return await Paciente.find();
};

export const addHistoriaEntrada = async (id, entrada) => {
    return await Paciente.findByIdAndUpdate(
        id,
        { $push: { historiaClinica: entrada } },
        { new: true }
    );
};

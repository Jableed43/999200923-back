import { parseISO } from 'date-fns';

/**
 * Normaliza una fecha ISO proveniente del backend (UTC) para que se represente 
 * correctamente en el calendario local del usuario, evitando el desfase de un día.
 * 
 * @param {string} dateStr - Fecha en formato ISO (ej: 2026-05-30T00:00:00.000Z)
 * @returns {Date} - Objeto Date ajustado a la zona horaria local preserve el día calendario.
 */
export const safeParseDate = (dateStr) => {
  if (!dateStr) return new Date();
  const date = parseISO(dateStr);
  // Añadimos el offset de la zona horaria para que el "00:00:00 UTC" se convierta en "00:00:00 Local"
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
};

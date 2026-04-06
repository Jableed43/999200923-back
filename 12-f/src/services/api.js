// Centralización de las llamadas al servidor (Fetch wrapper)

/**
 * Función genérica para hacer peticiones HTTP
 * @param {string} endpoint - La ruta específica (ej. '/product')
 * @param {object} options - Opciones de fetch (method, body, headers, etc)
 */
export const fetchApi = async (endpoint, options = {}) => {
  const url = `${import.meta.env.VITE_BASE_URL}${endpoint}`;
  
  // Extraemos el token del sessionStorage por si existe
  const token = window.sessionStorage.getItem('ecommerce_token');

  const defaultHeaders = {};
  
  // Si NO es un FormData, seteamos application/json por defecto
  if (!(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  // Si tenemos token guardado, lo inyectamos siempre como Bearer
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Si la respuesta no es OK (200-299), disparamos el catch
    if (!response.ok) {
      // Intentamos extraer el mensaje de error que envíe Express
      const errorData = await response.json().catch(() => ({})); 
      throw new Error(errorData.message || 'Error en la petición al servidor');
    }

    // Algunas peticiones (como DELETE o sin cuerpo) pueden no traer JSON
    const data = await response.json().catch(() => ({}));
    return data;

  } catch (error) {
    console.error(`Error de red en fetchApi a ${endpoint}:`, error);
    throw error; // Re-lanzar para que el Custom Hook lo atrape
  }
};

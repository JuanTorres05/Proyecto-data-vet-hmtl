// DataVet/frontend-vite/src/api/clientesApi.js
import axios from 'axios';

// *** VERIFICA ESTA URL: Debe coincidir con tu backend (Node.js/Express) ***
const BACKEND_URL = 'http://localhost:4000/api'; 

export const registrarClienteConMascota = async (datos) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/clientes/registrar`,
      datos
    );
    return response.data; 
  } catch (error) {
    console.error('Error al registrar cliente/mascota:', error.response?.data || error.message);
    // Lanzamos un error con un mensaje amigable para el frontend
    throw new Error(error.response?.data?.message || 'Error de conexión o validación del servidor.');
  }
};
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import clienteRoutes from './routes/cliente.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors()); // Permitir peticiones desde cualquier origen (para desarrollo)
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/clientes', clienteRoutes);

// Ruta base
app.get('/', (req, res) => {
    res.json({ message: 'DataVet Backend Node.js Funcionando 🚀' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

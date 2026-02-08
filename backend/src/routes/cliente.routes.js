import { Router } from 'express';
import { registrarClienteConMascota, listarClientes } from '../controllers/cliente.controller.js';

const router = Router();

router.post('/registrar', registrarClienteConMascota);
router.get('/', listarClientes);

export default router;

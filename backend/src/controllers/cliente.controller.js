import { pool } from '../config/db.js';

export const registrarClienteConMascota = async (req, res) => {
    const { cliente, mascota } = req.body;

    // Validación básica
    if (!cliente || !mascota) {
        return res.status(400).json({ message: 'Faltan datos requeridos.' });
    }

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // 1. Insertar Cliente
        const [clienteResult] = await connection.query(
            'INSERT INTO clientes (nombre_completo, telefono, email, direccion, fecha_registro) VALUES (?, ?, ?, ?, NOW())',
            [cliente.nombre, cliente.telefono, cliente.email, cliente.direccion]
        );
        const clienteId = clienteResult.insertId;

        // 2. Insertar Mascota
        await connection.query(
            'INSERT INTO mascotas (cliente_id, nombre, especie, raza, fecha_nacimiento, peso, observaciones, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
            [
                clienteId,
                mascota.nombre,
                mascota.especie,
                mascota.raza,
                mascota.fechaNacimiento,
                mascota.peso,
                mascota.observaciones
            ]
        );

        await connection.commit();

        res.status(200).json({
            message: 'Cliente y mascota registrados correctamente',
            clienteId: clienteId
        });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: 'Error al registrar en base de datos', error: error.message });
    } finally {
        connection.release();
    }
};

export const listarClientes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clientes');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener clientes' });
    }
};

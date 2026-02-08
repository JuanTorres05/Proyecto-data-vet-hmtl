import { createConnection } from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar .env desde la raíz del backend (un nivel arriba de scripts/)
dotenv.config({ path: path.join(__dirname, '../.env') });

async function initDB() {
    const config = {
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        port: process.env.DB_PORT || 3306,
        multipleStatements: true
    };

    console.log('Intentando conectar a MySQL con:', { ...config, password: '****' });

    let connection;
    try {
        connection = await createConnection(config);
        console.log('Conexión exitosa a MySQL.');

        const sqlPath = path.join(__dirname, '../db/init.sql');
        console.log(`Leyendo script SQL desde: ${sqlPath}`);

        const sql = await fs.readFile(sqlPath, 'utf8');

        console.log('Ejecutando script de inicialización...');
        await connection.query(sql);

        console.log('¡Base de datos inicializada correctamente!');
        console.log('Tablas creadas: clientes, mascotas, historias_clinicas, medicamentos, recetas_medicas');

    } catch (error) {
        console.error('ERROR FATAL:', error.message);
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('\n>>> Verifica tu usuario y contraseña de base de datos en el archivo .env <<<');
        }
        process.exit(1);
    } finally {
        if (connection) await connection.end();
    }
}

initDB();

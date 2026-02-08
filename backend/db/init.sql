-- Script de Base de Datos para DataVet

CREATE DATABASE IF NOT EXISTS datavet_db;
USE datavet_db;

-- Tabla de Clientes (Propietarios)
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    direccion VARCHAR(255),
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_cliente_nombre (nombre_completo)
);

-- Tabla de Mascotas (Pacientes)
CREATE TABLE IF NOT EXISTS mascotas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    raza VARCHAR(50),
    fecha_nacimiento DATE,
    peso DECIMAL(5,2),
    observaciones TEXT,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    INDEX idx_mascota_nombre (nombre)
);

-- Tabla de Historias Clínicas (Consultas)
CREATE TABLE IF NOT EXISTS historias_clinicas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mascota_id INT NOT NULL,
    fecha_visita DATETIME DEFAULT CURRENT_TIMESTAMP,
    motivo_consulta VARCHAR(255),
    diagnostico TEXT,
    tratamiento TEXT,
    peso_visita DECIMAL(5,2),
    temperatura DECIMAL(4,1),
    notas TEXT,
    proxima_cita DATETIME,
    estado ENUM('activa', 'cerrada', 'cancelada') DEFAULT 'activa',
    FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE CASCADE,
    INDEX idx_historia_fecha (fecha_visita)
);

-- Tabla de Medicamentos (Catálogo)
CREATE TABLE IF NOT EXISTS medicamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    stock INT DEFAULT 0
);

-- Tabla Pivote para Medicamentos Recetados en una Historia Clínica
CREATE TABLE IF NOT EXISTS recetas_medicas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    historia_clinica_id INT NOT NULL,
    medicamento_id INT NOT NULL,
    dosis VARCHAR(100),
    frecuencia VARCHAR(100),
    duracion VARCHAR(50),
    FOREIGN KEY (historia_clinica_id) REFERENCES historias_clinicas(id) ON DELETE CASCADE,
    FOREIGN KEY (medicamento_id) REFERENCES medicamentos(id)
);

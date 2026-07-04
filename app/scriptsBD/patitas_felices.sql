CREATE DATABASE patitas_felices;
USE patitas_felices;

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('ADMIN', 'MEDICO', 'CLIENTE') NOT NULL DEFAULT 'CLIENTE',
    estado ENUM('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO',
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE propietarios (
    id_propietario INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE medicos (
    id_medico INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    especialidad VARCHAR(100),
    codigo_profesional VARCHAR(50),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE mascotas (
    id_mascota INT AUTO_INCREMENT PRIMARY KEY,
    id_propietario INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    raza VARCHAR(80),
    edad INT,
    sexo ENUM('Macho', 'Hembra'),
    vacunado BOOLEAN DEFAULT FALSE,
    observaciones TEXT,
    FOREIGN KEY (id_propietario) REFERENCES propietarios(id_propietario)
);

CREATE TABLE citas (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    id_mascota INT NOT NULL,
    id_medico INT NULL,
    fecha DATETIME NOT NULL,
    motivo VARCHAR(255),
    estado ENUM('PENDIENTE', 'ATENDIDA', 'CANCELADA') DEFAULT 'PENDIENTE',
    FOREIGN KEY (id_mascota) REFERENCES mascotas(id_mascota),
    FOREIGN KEY (id_medico) REFERENCES medicos(id_medico)
);

CREATE TABLE expedientes (
    id_expediente INT AUTO_INCREMENT PRIMARY KEY,
    id_mascota INT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    diagnostico TEXT,
    observaciones TEXT,
    FOREIGN KEY (id_mascota) REFERENCES mascotas(id_mascota)
);

CREATE TABLE medicamentos (
    id_medicamento INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    stock INT DEFAULT 0
);

CREATE TABLE vacunas (
    id_vacuna INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

CREATE TABLE tratamientos (
    id_tratamiento INT AUTO_INCREMENT PRIMARY KEY,
    id_expediente INT NOT NULL,
    id_medicamento INT NULL,
    descripcion TEXT NOT NULL,
    dosis VARCHAR(100),
    duracion VARCHAR(100),
    FOREIGN KEY (id_expediente) REFERENCES expedientes(id_expediente),
    FOREIGN KEY (id_medicamento) REFERENCES medicamentos(id_medicamento)
);

CREATE TABLE reportes (
    id_reporte INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_generado DATETIME DEFAULT CURRENT_TIMESTAMP
);
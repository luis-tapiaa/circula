CREATE DATABASE luis

\c luis

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE bibliotecas(
    id UUID DEFAULT uuid_generate_v4(),
    codigo VARCHAR(10) UNIQUE,
    nombre VARCHAR(50),
    url VARCHAR(100),
    PRIMARY KEY(id)
);

CREATE TABLE grupos_usuario(
    id UUID DEFAULT uuid_generate_v4(),
    codigo VARCHAR(10) UNIQUE,
    nombre VARCHAR(50),
    biblioteca_id UUID,
    staff BOOLEAN,
    PRIMARY KEY(id),
    CONSTRAINT fk_grupo_biblioteca FOREIGN KEY(biblioteca_id) REFERENCES bibliotecas(id)
);

CREATE TABLE usuarios(
    id UUID DEFAULT uuid_generate_v4(),
    codigo VARCHAR(10) UNIQUE,
    a_paterno VARCHAR(20),
    a_materno VARCHAR(20),
    nombre VARCHAR(30),
    f_nacimiento TIMESTAMP,
    genero CHAR(1),
    biblioteca_id UUID NOT NULL,
    grupo_usuario_id UUID NOT NULL,
    f_registro TIMESTAMP,
    f_vencimiento TIMESTAMP,
    email VARCHAR(100),
    telefono VARCHAR(15),
    celular VARCHAR(15),
    usuario VARCHAR(20) UNIQUE,
    password VARCHAR(64),
    foto VARCHAR(130),
    PRIMARY KEY(id),
    CONSTRAINT fk_usuario_biblioteca FOREIGN KEY(biblioteca_id) REFERENCES bibliotecas(id),
    CONSTRAINT fk_usuario_grupo FOREIGN KEY(grupo_usuario_id) REFERENCES grupos_usuario(id)
);

CREATE TABLE tipos_item(
    id UUID DEFAULT uuid_generate_v4(),
    codigo VARCHAR(10) UNIQUE,
    nombre VARCHAR(50),
    costo_prestamo NUMERIC(7,2),
    disponible_prestamo BOOLEAN,
    PRIMARY KEY(id)
);

CREATE TABLE registros_bib(
    id UUID DEFAULT uuid_generate_v4(),
    autor VARCHAR(50),
    titulo VARCHAR(50),
    tipo_item_id UUID NOT NULL,
    isbn_issn VARCHAR(25),
    editorial VARCHAR(50),
    l_publicacion VARCHAR(50),
    f_publicacion TIMESTAMP,
    PRIMARY KEY(id),
    CONSTRAINT fk_registro_tipo FOREIGN KEY(tipo_item_id) REFERENCES tipos_item(id)
);

CREATE TABLE items(
    id UUID DEFAULT uuid_generate_v4(),
    codigo VARCHAR(10) UNIQUE,
    registro_bib_id UUID NOT NULL,
    f_adquisicion TIMESTAMP,
    estado_item VARCHAR(20),
    ubicacion VARCHAR(10),
    precio NUMERIC(7,2),
    biblioteca_id UUID NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_item_registro FOREIGN KEY(registro_bib_id) REFERENCES registros_bib(id),
    CONSTRAINT fk_item_biblioteca FOREIGN KEY(biblioteca_id) REFERENCES bibliotecas(id)
);

CREATE TABLE prestamos(
    id UUID DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL,    
    item_id UUID NOT NULL,    
    f_prestamo TIMESTAMP,
    f_vencimiento TIMESTAMP,
    f_devolucion TIMESTAMP,
    renovaciones INTEGER,
    PRIMARY KEY(id),
    CONSTRAINT fk_prestamo_usuario FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
    CONSTRAINT fk_prestamo_item FOREIGN KEY(item_id) REFERENCES items(id)
);

CREATE TABLE multas(
    id UUID DEFAULT uuid_generate_v4(),
    codigo VARCHAR(10) UNIQUE,
    nombre VARCHAR(50),
    biblioteca_id UUID,
    cargo NUMERIC(7,2),    
    PRIMARY KEY(id),
    CONSTRAINT fk_multa_biblioteca FOREIGN KEY(biblioteca_id) REFERENCES bibliotecas(id)
);

CREATE TABLE cuentas(
    id UUID DEFAULT uuid_generate_v4(),
    cargo NUMERIC(7,2),
    pendiente NUMERIC(7,2),
    multa_id UUID,
    item_id UUID,
    usuario_id UUID NOT NULL,
    nota TEXT,
    PRIMARY KEY(id),
    CONSTRAINT fk_cuenta_multa FOREIGN KEY(multa_id) REFERENCES multas(id),
    CONSTRAINT fk_cuenta_item FOREIGN KEY(item_id) REFERENCES items(id),
    CONSTRAINT fk_cuenta_usuario FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE politicas(
    id UUID DEFAULT uuid_generate_v4(),
    nombre VARCHAR(20),
    descripcion TEXT,
    biblioteca_id UUID,
    grupo_usuario_id UUID,
    tipo_item_id UUID,
    prestamos INTEGER,
    p_prestamo VARCHAR(10),
    p_sancion VARCHAR(10),
    multa NUMERIC(7,2),
    renovaciones INTEGER,
    p_gracia VARCHAR(10),
    PRIMARY KEY(id),
    CONSTRAINT fk_politica_biblioteca FOREIGN KEY(biblioteca_id) REFERENCES bibliotecas(id),
    CONSTRAINT fk_politica_grupo FOREIGN KEY(grupo_usuario_id) REFERENCES grupos_usuario(id),
    CONSTRAINT fk_politica_tipo FOREIGN KEY(tipo_item_id) REFERENCES tipos_item(id)
);

CREATE TABLE direcciones(
    id UUID DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL,
    direccion1 TEXT,
    direccion2 TEXT,
    municipio VARCHAR(30),
    estado VARCHAR(30),
    c_postal VARCHAR(10),
    PRIMARY KEY(id),
    CONSTRAINT fk_direccion_usuario FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE bloqueos(
    id UUID DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL,
    f_inicio TIMESTAMP,
    f_termino TIMESTAMP,
    PRIMARY KEY(id),
    CONSTRAINT fk_bloqueo_usuario FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE temporal (
    NOMBRE_VICTIMA              VARCHAR2(75),
    APELLIDO_VICTIMA            VARCHAR2(75),
    DIRECCION_VICTIMA           VARCHAR2(75),
    FECHA_PRIMERA_SOSPECHA      DATE,
    FECHA_CONFIRMACION          DATE,
    FECHA_MUERTE                DATE,
    ESTADO_VICTIMA              VARCHAR2(75),
    NOMBRE_ASOCIADO             VARCHAR2(75),
    APELLIDO_ASOCIADO           VARCHAR2(75),
    FECHA_CONOCIO               DATE,
    CONTACTO_FISICO             VARCHAR2(75),
    FECHA_INICIO_CONTACTO       DATE,
    FECHA_FIN_CONTACTO          DATE,
    NOMBRE_HOSPITAL             VARCHAR2(75),
    DIRECCION_HOSPITAL          VARCHAR2(75),
    UBICACION_VICTIMA           VARCHAR2(75),
    FECHA_LLEGADA               DATE,
    FECHA_RETIRO                DATE,
    TRATAMIENTO                 VARCHAR2(75),
    EFECTIVIDAD                 INTEGER,
    FECHA_INICIO_TRATAMIENTO    DATE,
    FECHA_FIN_TRATAMIENTO       DATE,
    EFECTIVIDAD_EN_VICTIMA      INTEGER
);

CREATE TABLE asociado (
    idasociado  INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
    nombre      VARCHAR2(50) NOT NULL,
    apellido    VARCHAR2(50) NOT NULL
);

CREATE TABLE contacto (
    idcontacto                    INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
    fecha_conocio                 DATE NOT NULL,
    fecha_inicio_contacto         DATE NOT NULL,
    fecha_fin_contacto            DATE NOT NULL,
    victima_idvictima             INTEGER NOT NULL,
    asociado_idasociado           INTEGER NOT NULL,
    tipo_contacto_idtipocontacto  INTEGER NOT NULL
);

CREATE TABLE hospital (
    idhospital  INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
    nombre      VARCHAR2(50) NOT NULL,
    direccion   VARCHAR2(70) NOT NULL
);

CREATE TABLE registroubicacion (
    idregistroubicacion  INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
    ubicacionvictima     VARCHAR2(70) NOT NULL,
    fecha_llegada        DATE NOT NULL,
    fecha_retiro         DATE NOT NULL,
    victima_idvictima    INTEGER NOT NULL
);

CREATE TABLE tipo_contacto (
    idtipocontacto  INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
    contacto        VARCHAR2(25) NOT NULL
);


CREATE TABLE tratamiento (
    idtratamiento  INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
    tratamiento    VARCHAR2(50) NOT NULL,
    efectividad    INTEGER NOT NULL
);


CREATE TABLE tratamiento_victima (
    idtratamientovictima       INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
    fecha_inicio_tratamiento   DATE NOT NULL,
    fecha_fin_tratamiento      DATE NOT NULL,
    efectividad_vicitma        INTEGER NOT NULL,
    hospital_idhospital        INTEGER NOT NULL,
    tratamiento_idtratamiento  INTEGER NOT NULL,
    victima_idvictima          INTEGER NOT NULL
);

CREATE TABLE victima (
    idvictima           INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
    nombre              VARCHAR2(50) NOT NULL,
    apellido            VARCHAR2(50) NOT NULL,
    direccion           VARCHAR2(75) NOT NULL,
    fecha_sospecha      DATE NOT NULL,
    fecha_confirmacion  DATE NOT NULL,
    fecha_muerte        DATE,
    estado              VARCHAR2(20) NOT NULL
);

ALTER TABLE contacto
    ADD CONSTRAINT contacto_asociado_fk FOREIGN KEY ( asociado_idasociado )
        REFERENCES asociado ( idasociado );

ALTER TABLE contacto
    ADD CONSTRAINT contacto_tipo_contacto_fk FOREIGN KEY ( tipo_contacto_idtipocontacto )
        REFERENCES tipo_contacto ( idtipocontacto );

ALTER TABLE contacto
    ADD CONSTRAINT contacto_victima_fk FOREIGN KEY ( victima_idvictima )
        REFERENCES victima ( idvictima );

ALTER TABLE registroubicacion
    ADD CONSTRAINT registroubicacion_victima_fk FOREIGN KEY ( victima_idvictima )
        REFERENCES victima ( idvictima );

ALTER TABLE tratamiento_victima
    ADD CONSTRAINT trata_victima_hospital_fk FOREIGN KEY ( hospital_idhospital )
        REFERENCES hospital ( idhospital );

ALTER TABLE tratamiento_victima
    ADD CONSTRAINT trata_victima_tratamiento_fk FOREIGN KEY ( tratamiento_idtratamiento )
        REFERENCES tratamiento ( idtratamiento );

ALTER TABLE tratamiento_victima
    ADD CONSTRAINT trata_victima_victima_fk FOREIGN KEY ( victima_idvictima )
        REFERENCES victima ( idvictima );
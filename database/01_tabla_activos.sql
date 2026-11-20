-- Ejecutar conectado a la base "inventario_cfe".
-- (pgAdmin: clic derecho en inventario_cfe > Query Tool, pegar y presionar F5)

CREATE TABLE IF NOT EXISTS activos (
    id            SERIAL PRIMARY KEY,
    marca         VARCHAR(60)  NOT NULL,
    modelo        VARCHAR(80)  NOT NULL,
    numero_serie  VARCHAR(80)  NOT NULL UNIQUE,
    ubicacion     VARCHAR(120) NOT NULL,
    estado        VARCHAR(30)  NOT NULL DEFAULT 'En uso'
                  CHECK (estado IN ('En uso', 'En mantenimiento', 'Dado de baja')),
    responsable   VARCHAR(100) NOT NULL,
    creado_en     TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- Datos de prueba (ficticios)
INSERT INTO activos (marca, modelo, numero_serie, ubicacion, estado, responsable) VALUES
    ('Dell',    'Latitude 5420',     'DL5420-0001', 'Oficina de Sistemas',    'En uso',           'Ana López'),
    ('HP',      'LaserJet Pro M404', 'HP404-0002',  'Recepción',              'En uso',           'Carlos Méndez'),
    ('Lenovo',  'ThinkPad E14',      'LN-E14-0003', 'Almacén general',        'En mantenimiento', 'Laura Gómez'),
    ('Cisco',   'Catalyst 2960',     'CS2960-0004', 'Cuarto de comunicaciones','En uso',          'Jorge Ramírez'),
    ('Epson',   'EcoTank L3250',     'EP3250-0005', 'Archivo',                 'Dado de baja',     'María Torres')
ON CONFLICT (numero_serie) DO NOTHING;

-- Comprobación: debe mostrar las 5 filas
SELECT * FROM activos ORDER BY id;

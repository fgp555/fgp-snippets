SHOW DATABASES;

USE ${1:progresar_db};

SHOW TABLES;

SELECT * FROM ${2:progresar_document_types};

INSERT INTO ${2:progresar_document_types} (code, name)
VALUES 
  ('CC', 'Cédula de ciudadanía'),
  ('CE', 'Cédula de extranjería'),
  ('TI', 'Tarjeta de identidad'),
  ('NIT', 'Número de Identificación Tributaria'),
  ('PSP', 'Pasaporte'),
  ('PEP', 'Permiso Especial de Permanencia');
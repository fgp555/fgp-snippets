-- Active: 1758649665176@@127.0.0.1@3306@${1:my_database}

CREATE DATABASE ${1:my_database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP DATABASE ${1:my_database};

USE ${1:my_database};

SHOW DATABASES;

-- ===============================
-- ${2:users} TABLE - FULL CRUD EXAMPLE
-- MySQL / MariaDB
-- ===============================

-- CREATE TABLE
CREATE TABLE IF NOT EXISTS ${2:users} (
    id INT AUTO_INCREMENT PRIMARY KEY,           -- Unique user identifier
    name VARCHAR(100) NOT NULL,                   -- User full name
    email VARCHAR(150) NOT NULL UNIQUE,            -- User email (must be unique)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Record creation time
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP               -- Record last update time
);

-- DROP TABLE (DANGER: REMOVES EVERYTHING)
DROP TABLE ${2:users};

-- INSERT DATA (CREATE)
INSERT INTO ${2:users} (name, email) VALUES
('John Doe', 'john@example.com'),
('Bob Smith', 'bob@example.com');

-- READ ALL ${2:users}
SELECT * FROM ${2:users};

-- READ USER BY ID
SELECT * FROM ${2:users}
WHERE id = 1;

-- READ USER BY EMAIL
SELECT * FROM ${2:users}
WHERE email = 'john@example.com';

-- UPDATE USER (by ID)
UPDATE ${2:users}
SET name = 'John Updated',
    email = 'john@example.com'
WHERE id = 1;

-- UPDATE ONLY NAME
UPDATE ${2:users}
SET name = 'Bob Updated'
WHERE id = 1;

-- DELETE USER BY ID
DELETE FROM ${2:users}
WHERE id = 1;

-- DELETE ALL ${2:users} (TABLE STRUCTURE REMAINS)
DELETE FROM ${2:users};

-- SHOW ALL TABLES
SHOW TABLES;

-- SHOW TABLE STRUCTURE
SHOW COLUMNS FROM ${2:users};


/* 

host: "localhost",
user: "root",
password: "",
database: "${1:my_database}",

*/

-- mysql -u root
-- system clear
-- system cls
-- Active: 1758649665176@@127.0.0.1@3306@${1:my_database}

CREATE DATABASE ${1:my_database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP DATABASE ${1:my_database};

USE ${1:my_database};

SHOW DATABASES;

CREATE TABLE IF NOT EXISTS ${2:users} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE ${2:users};

SELECT * FROM ${2:users};

INSERT INTO
    ${2:users} (name, email)
VALUES (
        'John Doe',
        'john@example.com'
    ),
    (
        'Bob Smith',
        'bob@example.com'
    );

SHOW TABLES;

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
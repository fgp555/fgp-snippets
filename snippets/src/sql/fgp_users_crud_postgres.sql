-- Active: 1767538078936@@127.0.0.1@5432@postgres

-- Create the database (drop if exists first)
DROP DATABASE IF EXISTS ${1:my_database};

CREATE DATABASE ${1:my_database}
WITH
    ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8' TEMPLATE = template0;

-- Connect to the database
-- \c ${1:my_database};

-- Create the users table
CREATE TABLE IF NOT EXISTS ${2:users} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS ${2:users};

-- Insert sample data
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

-- Select all ${2:users}
SELECT * FROM ${2:users};

-- List all tables
SELECT tablename FROM pg_tables WHERE schemaname = 'public';

-- List all columns in the ${2:users} table
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE
    table_name = '${2:users}';

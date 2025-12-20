SET @userId := '895f5dec-d18a-4e78-8046-154d0bbb7c28';

SELECT @userId;

SELECT *
FROM users
WHERE id = @userId;

-- =========================
-- Variables
-- =========================
SET @db_name = 'my_database';
SET @table_name = 'my_table';

SELECT @db_name;
SELECT @table_name;

-- =========================
-- DROP / CREATE DATABASE
-- =========================
SET @sql = CONCAT('DROP DATABASE IF EXISTS ', @db_name);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = CONCAT(
  'CREATE DATABASE ', @db_name,
  ' CHARACTER SET ', 'utf8mb4',
  ' COLLATE ', 'utf8mb4_unicode_ci'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- =========================
-- USE DATABASE
-- =========================
SET @sql = CONCAT('USE ', @db_name);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- =========================
-- DROP / CREATE TABLE
-- =========================
SET @sql = CONCAT('DROP TABLE IF EXISTS ', @table_name);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = CONCAT(
  'CREATE TABLE ', @table_name, ' (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255),
     email VARCHAR(255)
   )'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- =========================
-- SHOW TABLES / COLUMNS
-- =========================
SHOW TABLES;

SET @sql = CONCAT('SHOW COLUMNS FROM ', @table_name);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- =========================
-- INSERT DATA
-- =========================
SET @sql = CONCAT(
  'INSERT INTO ', @table_name, ' (name, email) VALUES
   ("John Doe","john@example.com"),
   ("Jane Doe","jane@example.com"),
   ("Bob Smith","bob@example.com")'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- =========================
-- SELECT DATA
-- =========================
SET @sql = CONCAT('SELECT * FROM ', @table_name);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

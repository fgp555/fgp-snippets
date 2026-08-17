-- Active: 1782796945864@@127.0.0.1@3306@my_db

DROP DATABASE IF EXISTS ${1:my_db};

CREATE DATABASE ${1:my_db} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'my_db_user'@'%' IDENTIFIED BY 'my_db_user_pass';

GRANT ALL PRIVILEGES ON ${1:my_db}.* TO 'my_db_user'@'%';

FLUSH PRIVILEGES;

USE ${1:my_db};


/* 
DB_HOST=localhost
DB_PORT=3306
DB_TYPE=mysql
DB_DATABASE=my_db
DB_USERNAME=my_db_user
DB_PASSWORD=my_db_user_pass
 */
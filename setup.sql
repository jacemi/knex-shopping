-- DROP USER IF EXISTS jacemi;
-- DROP DATABASE IF EXISTS knex_shopping;

-- CREATE USER jacemi;
-- CREATE DATABASE knex_shopping WITH OWNER jacemi;

DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email varchar(225),
  password varchar(225),
  created_at timestamp,
  updated_at timestamp
);

CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  title varchar(225),
  descrption text,
  inventory integer,
  price decimal(8, 2),
  created_at timestamp,
  updated_at timestamp
);

CREATE TABLE cart(
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id),
  products_id integer REFERENCES products(id),
  created_at timestamp,
  updated_at timestamp
);

INSERT INTO users(email, password)
VALUES ('email@email.com', 'password');

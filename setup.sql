DROP DATABASE IF EXISTS knex_shopping;
DROP USER IF EXISTS jacemi;

CREATE USER jacemi;
CREATE DATABASE knex_shopping WITH OWNER jacemi;

\c knex_shopping jacemi


DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;


CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email varchar(225) UNIQUE,
  password varchar(225),
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  title varchar(225),
  description text,
  inventory integer,
  price decimal(8, 2), --use money
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

CREATE TABLE cart(
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id),
  products_id integer REFERENCES products(id),
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);


INSERT INTO users(email, password)
VALUES ('email@email.com', 'password');

INSERT INTO users(email, password)
VALUES ('bowlcut@email.com', 'superspoon');

INSERT INTO users(email, password)
VALUES ('cut@email.com', 'spoon');

INSERT INTO products(title, description, inventory, price)
VALUES ('cup', 'from starbucks', 4, 2.44);

INSERT INTO products(title, description, inventory, price)
VALUES ('fork', 'from nevada', 10, 43.44);

INSERT INTO products(title, description, inventory, price)
VALUES ('igloo', 'to keep you warm while in the devleague full time room', 1, 999.99);
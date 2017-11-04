DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("toilet paper", "bathroom", 10, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tooth brush", "bathroom", 5, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tooth paste", "bathroom", 5, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("basketball", "recreation", 20, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("water bottle", "food", 1, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chicken", "food", 20, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("beef", "food", 20, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptop", "electronics", 300, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("phone", "electronics", 300, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("headphones", "electronics", 20, 100);


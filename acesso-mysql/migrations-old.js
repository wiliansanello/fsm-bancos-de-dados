const db = require('./db')
const fs = require('fs')

const versao1 = [`
                    CREATE TABLE categories (
                        id INT NOT NULL AUTO_INCREMENT,
                        category VARCHAR(250) NULL DEFAULT NULL,
                        PRIMARY KEY(id)
                    )
                        CREATE TABLE products (
                            id INT NOT NULL AUTO_INCREMENT,
                            product VARCHAR(250) NULL DEFAULT NULL,
                            price FLOAT,
                            PRIMARY KEY(id)
                        )
                    CREATE TABLE images(
                        id INT NOT NULL AUTO_INCREMENT,
                        description TEXT NULL DEFAULT NULL,
                        url VARCHAR(500) NULL DEFAULT NULL,
                        product_id INT NOT NULL,
                        PRIMARY KEY (id),
                        KEY fk_images_products_index (product_id),
                        CONSTRAINT fk_images_products_constraint FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
                    )
                    CREATE TABLE categories_products (
                        product_id INT NOT NULL,
                        category_id INT NOT NULL,
                        KEY fk_categories_products_index (product_id, category_id),
                        CONSTRAINT fk_categories_products_constraint1 FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
                        CONSTRAINT fk_categories_products_constraint2 FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE   
                    )                
                    `]

    const versao1Undo = [`
            DROP TABLE categories;
            DROP TABLE products;
            DROP TABLE images;
            DROP TABLE categories_products;
    `]
CREATE IF NOT EXISTS burgers_db;

USE burgers_db;

CREATE TABLE burgers (
    id AUTO INCREMENT NOT NULL INTEGER,
    burger_name VARCHAR(255),
    devoured BOOLEAN,
    PRIMARY KEY(id)
);


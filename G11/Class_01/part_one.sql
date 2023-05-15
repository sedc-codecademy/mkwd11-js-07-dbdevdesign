CREATE TABLE Costumer (
    id integer NOT NULL,
    name varchar(100) NOT NULL,
    city varchar(100)
);
-- * MEANS EVERY COLUMN OF THE TABLE
SELECT *
FROM costumer;
-- Selecting just the NAME column from the customer table;
SELECT name
FROM costumer;
-- Selecting the name and the city column from the customer table;
SELECT name,
    city
FROM costumer;
-- Add values to the table
INSERT INTO costumer(id, name, city)
VALUES (1, 'Vero Skopje', 'Skopje')
INSERT INTO costumer(id, name, city)
VALUES (2, 'Vero Strumica', 'Strumica');
INSERT INTO costumer(id, name, city)
VALUES (3, 'Kit-Go', 'Gevgelija'),
    (4, 'Tinex', 'Skopje'),
    (5, 'Tinex', 'Strumica');
--READ ALL
SELECT *
FROM costumer;
SELECT id,
    name,
    city
FROM costumer;
-- ERROR: USE SINGLE QUOTES
-- INSERT INTO costumer(id, name, city)
-- VALUES (6, "Reptil", "Bitola");
-- ERROR: We must have value of NOT OPTIONAL column (name is NOT NULL WHICH MEANS WE MUST HAVE VALUE)
-- INSERT INTO costumer(id)
-- VALUES(6)
-- NO VALUE FOR CITY, THAT COLUMN IS NULLABLE (OPTIONAL)
INSERT INTO costumer(id, name)
VALUES (6, 'Vero 2');
-- WHERE CLAUSE
SELECT name,
    city
FROM costumer
WHERE city = 'Strumica';
SELECT *
FROM costumer
WHERE city = 'Gevgelija';
SELECT id,
    name,
    city
FROM costumer
WHERE id = 1;
-- UPDATE
UPDATE costumer
SET name = 'Solun53'
WHERE city = 'Gevgelija';
UPDATE costumer
SET name = 'Tinex-Strumica'
WHERE city = 'Strumica';
UPDATE costumer
SET name = 'Solun53'
WHERE id = 3;
SELECT *
FROM costumer;
-- DELETE
DELETE FROM costumer
WHERE id = 2;
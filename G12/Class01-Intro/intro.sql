--Creating a table in sql
CREATE TABLE consumer (
--	By adding serial the id column will be generated with integers automatically
	id serial PRIMARY KEY,
	name varchar(100),
	city varchar(100)
);

--Selecting all columns from a table
SELECT * FROM consumer; 

--Reading only specific columns
SELECT name, city FROM consumer;

-- Inserting data intop table ( use single quotes only)
INSERT INTO consumer (name,city)
VALUES 
	('Blazho', 'Bogdanci'),
	('Kire', 'Kriva Palanka'),
	('Borche', 'Strmosh'),
	('Jovancho', 'Resen'),
	('Hristina', 'Kochani/Kratovo')

--Using where to filter data
SELECT c.id, c.name FROM consumer c
WHERE name = 'Jovancho' AND city = 'Strmosh'

--If an update operation is successful then the updated rows should return a number if it returns 0 nothing was update
UPDATE consumer SET city = 'Kratovo'
WHERE id = 6

SELECT * FROM consumer c
WHERE c.id = 7


INSERT INTO consumer (name, city)
VALUES ('Jovancho', 'Novo Selo')

DELETE FROM consumer WHERE  name = 'Jovancho' AND city = 'Resen' AND id > 5

SELECT * FROM consumer c 

SELECT * FROM consumer c 
WHERE name = 'Jovancho'
--Limit returns the number we have specified
LIMIT 1

	
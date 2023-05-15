CREATE TABLE manager (
	id SERIAL PRIMARY KEY,
	firstName VARCHAR(40) NOT NULL,
	lastName VARCHAR(40) NOT NULL,
	age INTEGER CHECK(age >= 18) NOT NULL,
	salary INTEGER NOT NULL,
	yearsOfExperience INTEGER NOT NULL
)

INSERT INTO manager (firstName,lastName, age, salary, yearsofexperience)
VALUES ('Risto', 'Blazheski', 26, 15000, 10)

SELECT * FROM manager m 

CREATE TABLE team (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) UNIQUE NOT NULL,
	budget INTEGER NOT NULL,
	ranking INTEGER CHECK(ranking > 0) NOT NULL,
	managerId INTEGER REFERENCES manager(id)
)

DROP TABLE team


SELECT * FROM team t 

INSERT INTO team (name, budget, ranking)
VALUES ('Fk Shkendija', 12000, 25)

SELECT name AS team_name, firstname AS manager_firstname, lastname AS manager_lastname FROM team t
JOIN manager m
ON t.managerid  = m.id

SELECT * FROM team t
--JOIN combines two tables and only returns rows where the ON statement is true
INNER JOIN manager m 
ON t.managerid  = m.id


SELECT * FROM team t
LEFT JOIN manager m
ON t.managerid  = m.id

SELECT * FROM manager m
RIGHT JOIN team t
ON t.managerid  = m.id

SELECT * FROM team t
FULL OUTER JOIN manager m 
ON t.managerid  = m.id

playerid  matchid
ON p.id = 



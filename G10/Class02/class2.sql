-- Default date YYYY-MM-DD


-- Find all Employees with FirstName = Goran
SELECT *
FROM employee
Where FirstName = 'Goran'

-- Find all Employees with LastName starting With ‘S’

SELECT *
FROM employee
Where LastName LIKE 'S%'

-- Find all Employees with DateOfBirth greater than "01.01.1980"

SELECT *
FROM employee
Where dateOfBirth > '1980-01-01'

-- Find all Male employees

SELECT *
FROM employee
WHERE gender = 'M'

-- Find all employees hired in June/2010

SELECT *
FROM Employee
WHERE hiredate BETWEEN '2010-06-01' AND '2010-06-30'

--  Find all Employees with LastName starting with "M" hired in January/2010

SELECT *
FROM Employee
WHERE lastName LIKE 'M%'
AND hiredate BETWEEN '2010-01-01' AND '2010-01-31'

-- Find alll employees hired in june 2010

SELECT *
From Employee
WHERE hiredate BETWEEN '2010-06-01' AND '2010-06-30'

-- Find all employees with lastname starting with M hired in january 2010

SELECT *
from Employee
WHERE lastname like 'M%'
AND hiredate BETWEEN '2010-01-01' AND '2010-01-31'

-- ORDERING

--ASCENDING
SELECT *
from Employee
ORDER BY dateofbirth

SELECT *
from Employee
ORDER BY dateofbirth ASC

-- DESCENDING
SELECT *
from Employee
ORDER BY dateofbirth DESC


SELECT *
from Customer
ORDER BY name DESC


-- find all employees with firstname Aleksanar ordered by lastname

SELECT * 
FROM Employee
WHERE firstname = 'Aleksandar'
ORDER BY lastname


-- list all employees ordered by first name

SELECT *
FROM Employee
ORDER BY firstname

-- find all male employees ordered by hiredate, starting from the last hired

SELECT *
FROM EMployee
WHERE gender = 'M'
ORDER BY hiredate DESC


-- UNION

SELECT region
FROM BusinessEntity
UNION
SELECT regionname
FROM CUSTOMER


-- UNION ALL

SELECT region
FROM BusinessEntity
UNION ALL
SELECT regionname
FROM customer

-- INTERSECT

SELECT firstname, lastname
FROM Employee
INTERSECT


-- List all BusinessEntity Names and Customer Names in single result set with duplicates

SELECT name
FROM BusinessEntity
UNION ALL
SELECT name
FROM Customer

-- List all regions where some BusinessEntity is based, or some Customer is based. Remove duplicates

SELECT region
from BusinessEntity
UNION
SELECT regionname
from Customer

-- List all regions where we have BusinessEntities and Customers in the same time

SELECT region
from BusinessEntity
INTERSECT
SELECT regionname
from customer

-- CONSTRAINS

-- CHECK

CREATE TABLE "User" (
	id serial primary key not null,
	name varchar(30) NOT NULL,
	age smallint CHECK(age >= 18)
)


insert into "User" (name, age)
values ('Todor', 34),
	   ('Ivo', 33)
	   --('Mario', 17)

select * from "User"


CREATE TABLE managers (
	id serial primary key,
	email varchar(20) UNIQUE
)


insert into managers (email)
values ('test@mail.com')

insert into managers (email)
values ('test2@mail.com')

select * from managers

-- Foreign Keys

CREATE TABLE Artist (
	id serial primary key,
	name varchar(20)
)

CREATE TABLE Song (
	id serial primary key,
	title varchar(20),
	artist_id integer REFERENCES Artist (id)
)

insert into Artist (name)
values ('Eminem'),
		('Shakira'),
		('Bob Marley'),
		('The Weekend'),
		('Jordan Mitev'),
		('Naum Petreski')
		
Select * from artist
		
insert into Song (title, artist_id)
values ('Mocking Bird', 1),
		('Waka Waka', 2),
		('Dont worry be happy', 3),
		('After Hours', 4),
		('Zena za 100 godini', 5),
		('Loose Yourself', 1)
		
Select * from Song

-- INNER JOIN

SELECT * FROM Artist a
INNER JOIN Song s
ON a.id = s.artist_id

SELECT * FROM Song s
INNER JOIN Artist a
ON s.artist_id = a.id

SELECT * FROM Song s
LEFT JOIN Artist a
ON s.artist_id = a.id
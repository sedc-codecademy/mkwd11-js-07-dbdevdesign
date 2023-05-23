-- DDL statements

CREATE TABLE IF NOT EXISTS test ();

CREATE TABLE users ();

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS test;

-- 1. Name of the column 
-- 2. Data type of the column
-- 3. Options on columns

CREATE TABLE BusinessEntity (
	Id INTEGER PRIMARY KEY,
	Name varchar(100),
	Region varchar(1000) NULL,
	ZipCode char(4) NULL,
	Size varchar(10) NULL
)

INSERT INTO BusinessEntity (Id, Name, Region, ZipCode, Size)
VALUES (1, 'Tinex', 'Skopje', '1000', 'large')

INSERT INTO BusinessEntity (Id, Name, Region, ZipCode, Size)
VALUES (2, 'Vero', 'Bitola', '2000', 'medium')

-- we only need to add NOT NULL values
INSERT INTO BusinessEntity (Name, id)
VALUES ('Zito', 3)

-- THIS IS INVALID! Be careful on the ordering od the parameters!
INSERT INTO BusinessEntity (Name, id)
VALUES ('Zito', 3)

SELECT * FROM BusinessEntity

-- varchar in SQL === string in JS

-- NULL = OPTIONAL
-- NOT NULL = REQUIRED

CREATE TABLE Employee
(
	Id INTEGER PRIMARY KEY NOT NULL,
	FirstName varchar(100) NOT NULL,
	LastName varchar(100) NOT NULL,
	DateOfBirth date NULL,
	Gender nchar(1) NULL,
	HireDate date NULL,
	NationalIdNumber varchar(20) NULL
)

DROP TABLE Employee

-- DATE FORMAT YEAR/DATE/MONTH

INSERT INTO Employee (Id, FirstName, LastName, DateOfBirth, Gender, HireDate, NationalIdNumber)
VALUES (1, 'Nikola', 'Stojkovski', '07/08/2003', 'M', '10/05/2023', '1234569')

INSERT INTO Employee (Id, FirstName, LastName, DateOfBirth, Gender, HireDate, NationalIdNumber)
VALUES (2, 'Todor', 'Pelivanov', '2003-02-01', 'M', '11/05/2023', '123456931')


SELECT * FROM Employee


SELECT Id, FirstName, LastName, DateOfBirth FROM Employee

SELECT * FROM Employee
WHERE FirstName = 'Todor'

-- UPDATE STATEMENTS

UPDATE Employee
SET DateOfBirth = '05/02/2000'
WHERE ID = 2


-- DELETE STATEMENTS

DELETE
FROM Employee
WHERE ID = 1

-- Customer
-- id
-- Name - string
-- AccountNmber - number
-- City - string
-- RegionName -- string
-- PhoneNumber -- string
-- isActive -- boolean

CREATE TABLE Customer 
(
	Id INTEGER PRIMARY KEY,
	Name varchar(50),
	AccountNumber INTEGER,
	City varchar(50),
	RegionName varchar(50),
	PhoneNumber varchar(50), -- +389(0)21236978
	isActive boolean
)

select * from Customer

INSERT INTO Customer (Id, name, accountnumber, city, regionname, phonenumber, isactive)
VALUES (3, 'Ivan', 1, 'Kumanovo', 'Kumanovo', '+8673125361', '1')

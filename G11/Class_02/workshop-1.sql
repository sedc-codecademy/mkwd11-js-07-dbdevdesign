-- WORKSHOP * 1
-- FIRST
SELECT *
FROM employee
WHERE firstname = 'Goran';
-- SECOND
SELECT firstname,
    lastname,
    dateofbirth,
    gender
FROM employee
WHERE lastname LIKE 'S%';
SELECT *
FROM employee;
SELECT *
FROM employee
WHERE firstname LIKE '%o%';
SELECT *
FROM employee
WHERE firstname LIKE '%o';
SELECT *
FROM employee
WHERE firstname like '%or%';
-- THIRD
SELECT *
FROM employee
WHERE dateofbirth > '01.01.1980';
-- FOUR
SELECT *
FROM employee
WHERE gender = 'M';
-- FIVE
SELECT *
FROM employee
WHERE hiredate BETWEEN '2014-01-01' AND '2014-12-31';
-- SIX
SELECT *
FROM employee
WHERE lastname LIKE 'M%'
    AND hiredate BETWEEN '2010-09-01' AND '2010-09-30';
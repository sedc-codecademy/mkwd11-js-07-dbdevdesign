SELECT * FROM employee e 
ORDER BY e.id
LIMIT 10
OFFSET 20

--.take(10)
--.skip(30)

SELECT * FROM  employee
WHERE firstname  = 'Goran' OR firstname  = 'Ana'

SELECT * FROM employee e 
WHERE lastname LIKE 'S%'

SELECT * FROM employee e 
WHERE dateofbirth > '1980-01-01'

SELECT * FROM employee e 
WHERE gender = 'M'
ORDER BY dateofbirth  ASC

SELECT * FROM employee e 
WHERE hiredate >= '2010-06-01' AND hiredate <= '2010-06-30'

SELECT * FROM employee e 
WHERE gender = 'F' AND hiredate >= '2010-01-01' AND hiredate <= '2010-01-31'

--Order by must always be used after a filtering statement such as where or having
SELECT * FROM employee e 
WHERE firstname  = 'Aleksandar'
ORDER BY lastname




SELECT * FROM employee e 
ORDER BY firstname 

SELECT * FROM employee e 
WHERE gender = 'M'
ORDER BY hiredate DESC

--UNION/INTERSECT 
SELECT region  FROM businessentity b
WHERE region LIKE 'S%'
UNION
SELECT regionname  FROM customer c
WHERE regionname LIKE 'S%'

SELECT region  FROM businessentity b 
INTERSECT 
SELECT regionname  FROM customer c 

SELECT name FROM businessentity b 
UNION ALL
SELECT name FROM customer c 

SELECT region  FROM businessentity b 
UNION
SELECT regionname  FROM customer c

SELECT * FROM "Order" o 


ALTER TABLE "Order" 
ADD CONSTRAINT customers_orders FOREIGN KEY(customerid) REFERENCES customer(id)



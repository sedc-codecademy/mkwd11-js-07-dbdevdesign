-- UNION AND INTERSECT 
SELECT *
FROM businessentity;
SELECT *
FROM customer;
-- ONE
SELECT name
FROM businessentity
UNION ALL
SELECT name
FROM customer;
-- TWO
SELECT region
FROM businessentity
UNION
SELECT regionname
FROM customer;
-- THREE
SELECT region
FROM businessentity
INTERSECT
SELECT regionname
from customer;
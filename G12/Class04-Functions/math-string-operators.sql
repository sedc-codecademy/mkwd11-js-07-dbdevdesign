--Calculate “(price + cost) / weight” for all products.
SELECT *, (price + cost) / weight AS price_weight_ratio FROM product p 

--Get a round number that is higher or equal for the costs and a round number that is lower or equal for the prices for all products.
SELECT ceil(cost) AS price_ceil, floor(cost) AS price_floor FROM product p 

--Get all orders and generate a random number between 0 and 100 for every order.
SELECT o.id, round(random() * 100)  AS random_num FROM "Order" o 

--Concatenate the name, region and zipcode from every business entity and add the delimiter ‘; ‘ between them.
SELECT concat(b.name, '; ', b.region, '; ', b.zipcode ) FROM businessentity b  

--Concatenate the first and last name for every employee and show the character length for the full name.
SELECT concat(e.firstname,' ', e.lastname) AS fullname, length(concat(e.firstname, e.lastname)) AS char_count FROM employee e

--Replace every employee’s last name that ends with ‘ski’ with ‘ic’.
SELECT e.lastname , replace(e.lastname, 'ski','ic') FROM employee e 

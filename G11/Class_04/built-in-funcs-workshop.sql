--Calculate “(price + cost) / weight” for all products.
SELECT name,
    (price + cost) / weight as Calculation
from product;
-- Get a round number that is higher or equal for the costs and a round number that is lower or equal for the prices for all products.
SELECT ceil(cost) as cost_ceil,
    floor(price) as price_floor
FROM product;
-- Get all orders and generate a random number between 0 and 100 for every order
SELECT id,
    floor(random() * 100) as RandomNumber
from "Order";
-- Concatenate the name, region and zipcode from every business entity and add the delimiter ‘; ‘ between them.
SELECT name || '; ' || region || '; ' || zipcode as concatanaitedColumns
FROM businessentity;
-- Concatenate the first and last name for every employee and show the character length for the full name.
select length(firstname || ' ' || LastName) as Version1,
    length(concat(firstname, ' ', Lastname)) as Version2,
    concat(firstname, ' ', lastname) as fullName
from employee;
-- Replace every employee’s last name that ends with ‘ski’ with ‘ic’.
select replace(lastname, 'ski', 'ic') as ReplacedLastName
from employee;
-- Create a temporary table ‘Holidays’ that will contain the columns: id (PK), startDate, endDate; add some values and select them.
CREATE TEMPORARY TABLE holidays (
    id integer primary key,
    startdate date,
    enddate date
);
SELECT *
FROM holidays;
INSERT INTO holidays (id, startdate, enddate)
VALUES (1, '2022-06-12', '2022-06-20');
-- 4 Calculate the total amount per BusinessEntity on all orders in the system from Customers with ID < 5
SELECT be.name as nameOfEntity,
    SUM(o.totalprice) as totalPrice
FROM businessentity as be
    inner join "Order" as o on o.businessentityid = be.id
    inner join customer as c on c.id = o.customerid
where o.customerid < 5
group by be.name;
-- 5 Find the Maximal Order amount, and the Average Order amount per BusinessEntity on all orders in the system
select o.businessentityid,
    max(o.totalprice),
    avg(o.totalprice)
FROM "Order" as o
GROUP BY o.businessentityid;
-- *************** WORKSHOP 2 ******* -- GROUPING FUNCTIONS
-- Find the highest order for every customer
SELECT customerid,
    COUNT(customerid) as OrdersMade,
    max(totalprice) as HighestOrder
FROM "Order"
GROUP BY customerid;
-- Find the average price of orders per employee, only when the customer ID > 5
select employeeid,
    avg(totalprice)
from "Order"
where customerId > 5
group by employeeid
order by employeeid;
-- Find the maximum price of an order for every customer, showing their name
SELECT c.name,
    max(o.totalprice) as HighestOrder
FROM customer as c
    INNER JOIN "Order" as o ON o.customerid = c.id
GROUP by c.name;
--Find the minimum price of an order for every business entity, showing their name, and region and zip code concatenated in one column
select b.name as businessentity_name,
    region || '-' || zipcode as region_zipcode,
    min(totalprice) as MinimumPrice
from public."Order" o
    inner join businessentity b on o.businessentityid = b.id
group by b.name,
    region || '-' || zipcode;
--Concatenate all the prices of the orders for every business entity with a ‘; ’ delimiter and show their names
select b.Name as businessentity_name,
    string_agg(totalprice::text, ';') as prices_concatenated
from public."Order" o
    inner join businessentity b on o.businessentityid = b.id
group by b.Name;
--Show the quantities (from OrderDetails table) of the highest price order for every business entity
select o.businessentityid,
    o.id as OrderId,
    sum(Quantity) as Quantities,
    max(TotalPrice) as HighesPriceOrder
from public."Order" o
    inner join OrderDetails od on o.id = od.OrderId
group by o.businessentityid,
    o.id;
-- HAVING BASIC MOVIE EXAMPLE
select name,
    count (name) as watched_times
FROM movies_watched
GROUP BY name
having count(name) > 1;
--  *********** WORKSHOP 3  WORKSHOP GROUPING FUNCTIONS FILTERING
-- Calculate the sum of prices of orders per business entities and show the records where their sum is greater than 400
SELECT businessentityid,
    SUM(totalprice) as Totalamount
FROM "Order"
GROUP BY businessentityid
HAVING SUM(totalprice) > 400;
-- Calculate the sum of prices per business entity on all orders from customers with ID < 5 and filter only records with sums less then 1000
SELECT businessentityid,
    SUM(totalprice) as Totalamount
FROM "Order"
WHERE customerid < 5 -- filters before the grouping result
GROUP BY businessentityid -- filters after the grouping result
HAVING SUM(totalprice) < 1000;
--Find the Maximum Order amount, and the Average Order amount per business entity on all orders in the system. Filter only records where the max price is 1.5x bigger than the average.
select businessentityid,
    max(TotalPrice) as MaxTotalAmount,
    avg(TotalPrice) as AvgTotalPrice
from "Order"
group by businessentityid
having max(TotalPrice) > avg(TotalPrice) * 1.5
order by businessentityid;
--List all BusinessEntity names, region and zipcode next to the other details from the previous query
select b.Name as BusinessEntity_names,
    b.Region,
    b.ZipCode,
    max(TotalPrice) as MaxTotalAmount,
    avg(TotalPrice) as AvgTotalPrice
from "Order" o
    inner join businessentity b on o.businessentityid = b.id
group by b.Name,
    b.Region,
    b.ZipCode
having max(TotalPrice) > avg(TotalPrice) * 1.5
order by b.Name;
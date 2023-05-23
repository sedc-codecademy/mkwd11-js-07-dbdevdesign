-- MOVIES LIST BASIC VIEW EXAMPLES
CREATE VIEW MoviesList AS
SELECT name,
    genre
FROM movies;
-- SELECT THE PREVIOUS VIEW
select *
from movieslist;
-- NEW VIEW THAT RETURNS MOVIES THAT HAS RATING
CREATE VIEW MoviesWithRating AS
SELECT mo.name,
    mo.genre
FROM movies as mo
    INNER JOIN movie_reviews as mr ON mo.id = mr.movie_id;
-- SELECTING THE VIEW
SELECT *
FROM MoviesWithRating;
-- WORKSHOP
--Create new view (vw_CustomerOrders) that will List all CustomerIds and sum of total Orders per customer
CREATE VIEW vw_CustomerOrders -- NAME OF THE VIEW
AS -- THE VALUES FROM THE SELECT QUERY THAT THIS VIEW IS GOING TO HAVE
SELECT customerid,
    SUM(totalprice) as Total
FROM "Order"
GROUP BY customerid;
-- 
SELECT *
FROM vw_CustomerOrders;
-- Change the view to show the results ordered by the customer with biggest total price
DROP VIEW vw_CustomerOrders;
CREATE OR REPLACE VIEW vw_CustomerOrders AS
SELECT c.name,
    SUM(o.totalprice) as TotalOrderPrice,
    MAX(o.totalprice) as MaximumTotalPrice
FROM "Order" as o
    INNER JOIN customer as c ON c.id = o.customerid
GROUP BY c.name;
SELECT *
FROM vw_CustomerOrders;
CREATE TABLE IF NOT EXISTS Product (
    Id serial PRIMARY KEY NOT NULL,
    Code varchar(50) NULL,
    Name varchar(100) UNIQUE NULL,
    Description varchar(5000) NULL,
    Weight float(2) NULL,
    Price float(2) CHECK(price > cost) NULL,
    Cost float(2) NULL
);
UPDATE Product
SET Weight = random() * id * 10,
    Cost = random() * id,
    Price = random() * id * 20,
    Code = (SUBSTRING (Name, 0, 3) || id::text),
    Description = Name || ' description'
WHERE Code IS NULL;
SELECT *
FROM product;
INSERT INTO product (code, name, description, weight, price, cost)
VALUES (
        'E11',
        'Protein Chips',
        'We love to lift',
        100,
        80,
        40
    );
-- PART TWO
select *
from businessentity;
select *
from customer;
select *
from employee;
select *
from "Order";
ALTER TABLE "Order"
ADD CONSTRAINT order_businessentity_id_fkey FOREIGN KEY(businessentityid) REFERENCES businessentity(id);
ALTER TABLE "Order"
ADD CONSTRAINT order_customerid_fkey FOREIGN KEY(customerid) REFERENCES customer(id);
ALTER TABLE "Order"
ADD CONSTRAINT order_employeeid_fkey FOREIGN KEY(employeeid) REFERENCES employee(id);
-- JOINS
SELECT *
FROM movies;
SELECT *
FROM movie_reviews;
-- give me the name of the movie that has a review
SELECT name
FROM movies
    INNER JOIN movie_reviews ON movies.id = movie_reviews.movie_id;
-- same as above but using assertion
SELECT name as MovieName
FROM movies as mo
    INNER JOIN movie_reviews as mr ON mo.id = mr.movie_id;
-- left join / left outer join
SELECT name,
    genre
FROM movies as mo
    LEFT OUTER JOIN movie_reviews as mr ON mo.id = mr.movie_id;
-- right join
SELECT name,
    genre
FROM movies as mo
    RIGHT OUTER JOIN movie_reviews as mr ON mo.id = mr.movie_id;
-- cross join
SELECT *
FROM movies
    CROSS JOIN movie_reviews;
-- LAST WORKSHOP
SELECT *
from customer;
select *
from product;
-- ONe
SELECT *
FROM customer
    CROSS JOIN product;
-- 2
SELECT *
from "Order";
DELETE FROM "Order"
where businessentityid = 4;
--3
SELECT *
FROM businessentity AS be
    INNER JOIN "Order" AS ord ON be.id = ord.businessentityid;
-- 4
SELECT *
FROM businessentity AS be
    LEFT JOIN "Order" AS ord ON be.id = ord.businessentityid
WHERE ord.businessentityid is null;
-- 5
DELETE FROM "Order"
where customerid = 1;
SELECT *
FROM customer as c
    LEFT OUTER JOIN "Order" as o ON c.id = o.customerid
WHERE o.id IS NULL;
-- left with easy example
select *
from movies as mo
    LEFT JOIN movie_reviews as mr ON mo.id = mr.movie_id;
select *
from movies as mo
    LEFT JOIN movie_reviews as mr ON mo.id = mr.movie_id
WHERE mr.id IS NULL;
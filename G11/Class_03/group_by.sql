CREATE TABLE movies_watched (id serial PRIMARY KEY, name text);
insert into movies_watched (name)
values ('Harry Potter'),
    ('Harry Potter'),
    ('Harry Potter'),
    ('LOTR'),
    ('LOTR'),
    ('Mr.Bean');
SELECT *
FROM movies_watched;
-- COUNT
SELECT COUNT(id) as total_movies_watched
FROM movies_watched;
-- DISTINCT
SELECT DISTINCT name
FROM movies_watched;
-- return the name of the movie with the amount of time watched
SELECT name,
    count(name) as watched_times
from movies_watched
GROUP BY name
order by watched_times desc;
-- WORKSHOP GROUP BY
select *
from "Order";
-- 1
SELECT SUM(o.totalprice) as totalPrice
FROM "Order" as o;
-- 2
SELECT be.name,
    SUM(ord.totalprice)
FROM businessentity as be
    INNER JOIN "Order" as ord ON be.id = ord.businessentityid
GROUP by be.name
ALTER TABLE orderdetails 
ADD CONSTRAINT fk_orderdetails_product FOREIGN KEY(productid) REFERENCES product(id)

SELECT sum(o.totalprice) AS total_amount FROM "Order" o 

SELECT * FROM businessentity b 

SELECT * FROM "Order" o 

SELECT b.id, b."name" , sum(o.totalprice), avg(o.totalprice), count(*), min(o.totalprice), max(o.totalprice )  FROM "Order" o 
LEFT JOIN businessentity b 
ON o.businessentityid = b.id
WHERE o.customerid < 5
GROUP BY b.id  

SELECT c.id , c.name, max(o.totalprice) AS max_order  FROM "Order" o
LEFT JOIN customer c 
ON c.id = o.customerid 
GROUP BY c.id
ORDER BY max_order DESC

SELECT o.employeeid, avg(o.totalprice) AS avg_price FROM "Order" o 
WHERE o.customerid > 5
GROUP BY o.employeeid 

SELECT c.id, c.name, max(o.totalprice) AS max_price FROM "Order" o 
JOIN customer c 
ON c.id = o.customerid 
GROUP BY c.id
ORDER BY max_price DESC

--|| is used to concatinate strings
SELECT  b.name || ' ,' || b.region || ' - ' || b.zipcode AS entity_details , min(o.totalprice) AS min_price FROM "Order" o 
JOIN businessentity b 
ON b.id = o.customerid 
GROUP BY b.id

SELECT * FROM "Order" o 

SELECT b.name, string_agg(o.totalprice::text, '; ')  FROM "Order" o 
JOIN businessentity b 
ON b.id = o.customerid 
GROUP BY b.id

SELECT b.id, b.name, max(o.totalprice) , sum(od.quantity) FROM orderdetails od
JOIN "Order" o
ON o.id = od.orderid 
JOIN businessentity b 
ON o.businessentityid = b.id
GROUP BY b.id
--Having is used to filter group by tables and is always used below group by (idential to where instead for groups)
HAVING sum(od.quantity) > 700 AND name LIKE('%Ohrid')
ORDER BY sum(od.quantity)



--  Create new view (vw_CustomerOrders) that will List all CustomerIds and sum of total Orders per customer
CREATE VIEW vw_CustomerOrders AS
SELECT CustomerId,
    SUM(TotalPrice) as TotalOrders
FROM "Order"
GROUP BY CustomerId;
-- Change the view to show Customer Names instead of CustomerId
DROP VIEW vw_CustomerOrders
CREATE OR REPLACE VIEW vw_CustomerOrders AS
SELECT c.Name as CustomerId,
    SUM(TotalPrice) as TotalOrdersNEW
FROM "Order" o
    inner join Customer c on o.CustomerId = c.Id
GROUP BY c.Name;
-- Change the view to show the results ordered by the customer with biggest total price
CREATE OR REPLACE VIEW vw_CustomerOrders AS
SELECT c.Name as CustomerName,
    SUM(TotalPrice) as TotalOrdersNEW,
    MAX(TotalPrice) as MaxTotalPrice
FROM "Order" o
    inner join Customer c on o.CustomerId = c.Id
GROUP BY c.Name
ORDER BY SUM(TotalPrice) DESC;
-- Selecting from view
select *
from vw_CustomerOrders;
-- Create new view (vw_EmployeeOrders) that will List all Employees (FirstName and LastName), Product name and total quantity sold 
CREATE VIEW vw_EmployeeOrders AS
SELECT e.Firstname,
    e.LastName,
    p.Name,
    od.Quantity
FROM "Order" o
    INNER JOIN OrderDetails od ON o.Id = od.OrderId
    INNER JOIN Product p ON od.ProductId = p.Id
    INNER JOIN Employee e ON o.EmployeeId = e.Id;
-- selecting from view
SELECT *
FROM vw_EmployeeOrders;
-- Alter the view to show only sales from Business entities belonging to region 'Skopski'
CREATE OR REPLACE VIEW vw_EmployeeOrders AS
SELECT e.Firstname,
    e.LastName,
    p.Name,
    od.Quantity
FROM "Order" o
    INNER JOIN OrderDetails od ON o.Id = od.OrderId
    INNER JOIN Product p ON od.ProductId = p.Id
    INNER JOIN Employee e ON o.EmployeeId = e.Id
    INNER JOIN BusinessEntity b on o.BusinessEntityId = b.Id
WHERE b.Region = 'Skopski';

-- Selecting from view*************** *********** WOIRKSHIOOP 3 
SELECT *
FROM vw_EmployeeOrders;
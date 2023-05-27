-- Create a table valued function that for a specific order returns every column of the OrderDetails table.
CREATE OR REPLACE FUNCTION get_order_details (o_id int) returns table (
        id int,
        order_id int,
        product_id int,
        quantity int,
        price real
    ) language plpgsql as $$ begin return query
select *
from orderdetails od
where od.id = o_id;
end;
$$;
-- selection 
select *
from get_order_details (5);
-- ROWTYPE
-- Create a function that for a specific order returns the name of the product. Use row variables for the result sets of both the Product and OrderDetails tables.
CREATE OR REPLACE FUNCTION get_product_name(order_id INT) RETURNS VARCHAR AS $$
DECLARE -- name;       name of table%rowtype 
    order_details orderdetails %rowtype;
products product %rowtype;
BEGIN -- HERE IS THE LOGIC OF THE FUNCTION
SELECT *
FROM orderdetails INTO order_details
WHERE orderid = order_id;
SELECT *
FROM product INTO products
WHERE id = order_details.productId;
-- FINALY RETURN THE RESULT
RETURN products.name;
END;
$$ LANGUAGE plpgsql;
SELECT get_product_name(1)
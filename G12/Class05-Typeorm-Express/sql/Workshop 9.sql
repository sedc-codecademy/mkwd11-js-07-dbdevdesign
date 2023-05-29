
/*
Create a function that returns the customer’s name if an order’s quantity is less than 50, 
or the business entity’s name if it is higher than 50. Determine the order by providing its ID. If it does not exist, show a message.
*/
CREATE OR REPLACE FUNCTION get_customer_or_be_name (order_id int)
RETURNS varchar
language plpgsql
AS $$
DECLARE
	name varchar;
	order_quantity real;
BEGIN
	SELECT od.Quantity FROM orderdetails od INTO order_quantity
	WHERE orderid = order_id;
	
	IF NOT FOUND THEN
		RAISE NOTICE 'Cannot find order with ID: %', order_id;
	ELSEIF (order_quantity > 50) THEN
		SELECT b.Name INTO name
		FROM "Order" o
		JOIN BusinessEntity b ON o.businessentityid = b.id
		WHERE 
			o.id = order_id;
		return name;
	ELSE 
		SELECT b.Name INTO name
		FROM "Order" o
		JOIN Customer b ON o.customerid = b.id
		WHERE 
			o.id = order_id;
		RETURN name;
	END IF;
END;
$$;

--select get_customer_or_be_name (6);

-- Create a function that for a specific product ID returns all information for all customers that bought it. Store the result sets of the intermediate tables in row variables.
CREATE OR REPLACE FUNCTION get_customer_names (product_id INT)
RETURNS TABLE 
	(
		id int,
		name varchar,
		accountnumber varchar,
		city varchar,
		regionname varchar,
		phonenumber varchar,
		isactive bool
	)
language plpgsql
as $$
declare 
	products product%rowtype;
	order_details orderdetails%rowtype;
	orders "Order"%rowtype;
begin

	-- LOGIC HERE
	select * from product as p INTO products
	where p.id = product_id;
	
	select * from orderdetails as o INTO order_details
	where o.productid = products.id;
	
	select * from "Order" as ord INTO orders
	where ord.id = order_details.orderid;
	
	RETURN QUERY
	select * from customer as c
	where c.id = orders.customerid;
	
end;

$$;
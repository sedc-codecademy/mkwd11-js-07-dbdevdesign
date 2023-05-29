CREATE OR REPLACE FUNCTION get_customer_names (product_id int)
	returns table
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
	order_details orderdetails%rowtype;
	products product%rowtype;
	orders "Order"%rowtype;
begin
	select * from product p into products
	where p.id = product_id;
	
	select * from orderdetails into order_details
	where productid = products.id;
	
	select * from "Order" o into orders
	where o.id = orders.id;
	
	return query
	select * from customer c
	where c.id = orders.customerid;
end;
$$;


select * from get_customer_names (2)

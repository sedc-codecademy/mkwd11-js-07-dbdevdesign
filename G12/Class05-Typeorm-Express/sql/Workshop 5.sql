
CREATE OR REPLACE FUNCTION get_product1 (order_id int)
returns table
(
	id int,
	code varchar,
	name varchar,
	description varchar,
	weight real,
	price real,
	cost real
)
language plpgsql
as $$
declare
	order_details record;
	orders record;
begin
	select * from "Order" o into orders
	where o.id = order_id;
	select * from orderdetails od into order_details
	where od.id = orders.id;
	
	return query
	select * from product p
	where p.id = order_details.productid;
end;
$$;

select * from get_product1 (5)

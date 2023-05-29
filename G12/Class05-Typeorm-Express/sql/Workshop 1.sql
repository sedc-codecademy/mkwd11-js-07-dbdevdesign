
CREATE OR REPLACE FUNCTION get_order_details1 (orderid1 int)
returns table
(
	id int,
	code varchar,	-- from Product
	name varchar,	-- from Product
	description varchar,--from Product
	weight real,	-- from Product
	price real,		-- from Product
	cost real		-- from Product
)
language plpgsql
as
$$
begin
	return query
	select 
	od.id, p.Code, p.Name, p.Description, p.weight, p.price, p.cost 
	from orderdetails od 
	inner join product p on od.productid = p.id
	where od.id = orderid1;
end;
$$;


select * from get_order_details1 (1)


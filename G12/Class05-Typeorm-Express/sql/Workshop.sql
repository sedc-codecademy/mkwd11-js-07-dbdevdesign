
drop FUNCTION get_order_details 

CREATE OR REPLACE FUNCTION get_order_details (orderid1 int)
returns table
(
	id int,
	order_id int,
	product_id int,
	quantity int,
	price real
)
language plpgsql
as
$$
begin
	return query
	select 
	* 
	from orderdetails od
	where od.id = orderid1;
end;
$$;


select * 
from get_order_details (5) as tvf
left join product p on tvf.product_id = p.id



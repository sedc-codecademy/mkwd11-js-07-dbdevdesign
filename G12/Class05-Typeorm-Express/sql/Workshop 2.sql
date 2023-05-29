
drop function get_products;
CREATE OR REPLACE FUNCTION get_products (business_entity_id int, customer_id int)
returns table
(
	product_name varchar,
	total_quantity bigint,
	total_price real
)
language plpgsql
as
$$
begin
	return query
	select 
			p.Name as Product_name
		,	sum(od.Quantity) as total_quantity
		,	sum(od.price) as total_price
	from product p
	join orderdetails od on p.id = od.productId
	join "Order" o on od.orderid = o.id
	where 
		o.businessentityid = business_entity_id 
	and o.customerid = customer_id
	group by p.Name;
end;
$$;

select * from get_products (1,1)

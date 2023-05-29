
create or replace function get_product_name (order_id int)
	returns varchar
	language plpgsql
as 
$$
declare 
	order_details orderdetails%rowtype;
	products product%rowtype;
begin 
	select * from orderdetails into order_details
	where orderid = order_id;
	select * from product into products
	where id = order_details.productid;
	
	return products.name;
end;
$$;

select get_product_name (5)

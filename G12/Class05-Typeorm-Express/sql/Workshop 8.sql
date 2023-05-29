
--Create a function that returns the name of a product for a given order ID, 
--only if the order’s total price is above 50. 
--If it’s below than 50, raise a notice saying so. 
--If an order with that ID does not exist, show a different message.
create or replace function get_product_name4 (order_id int)
returns varchar
language plpgsql
as $$
declare
	product_name varchar;
	total_price real;
begin
	select totalprice from "Order" into total_price
	where id = order_id;
	
	if not found then
		raise notice 'Cannot find order with ID: %', order_id;
	elseif (total_price > 50) then
			select p.Name 
			from "Order" o into product_name
			join orderdetails od on o.id = od.orderid
			join product p on od.productid = p.id
			where o.id = order_id;
			return product_name;
	else 
		raise notice 'The total price (%), is less than 50!', total_price;
	end if;
end;
$$;


--select get_product_name4 (1)

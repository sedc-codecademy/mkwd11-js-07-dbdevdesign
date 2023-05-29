--Create a function that returns the name of the product for a given product ID. 
--If a product does not exist with that ID, show a notice. Use an if statement to determine if the product exists.
CREATE OR REPLACE FUNCTION get_product_name3 (product_id int)
returns varchar
language plpgsql
as $$
declare
	product_name varchar;
begin
	select name from product p into product_name
	where p.id = product_id;

	if found then
		return product_name;
	else 
		raise notice 'Could not find a product with the ID: %', product_id;
	end if;
end;
$$

select get_product_name3 (-1)



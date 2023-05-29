/*Create a function that:
Returns the totalPrice from Orders table, price from OrderDetails table and price from Products table for a given order ID. 
Uses records to store the result sets. 
Returns all three values concatenated into a string into the following format: ‘ORDER_TOTAL_PRICE: %; ORDER_DETAIL_PRICE: %; PRODUCT_PRICE: %’. 
Each value is to be modified by a percentage, order’s total price 20%, order detail’s price by 15% and product’s price by 10%. Store all three percentages as constants. 
*/
CREATE OR REPLACE FUNCTION get_prices (order_id int)
returns varchar
language plpgsql
as $$
declare 
	order_details record;
	orders record;
	products record;
	
	order_modifier constant numeric := 1.2;
	order_detail_modifier constant numeric := 1.15;
	product_modifier constant numeric := 1.1;
	concatened_return_sting varchar;
begin
	select * from "Order" o into orders
	where o.id = order_id;
	
	select * from orderdetails od into order_details
	where od.orderid = orders.id;
	
	select * from product p into products
	where p.id = order_details.productid;
	
	SELECT FORMAT('ORDER_TOTAL_PRICE: %s; ORDER_DETAIL_PRICE: %s; PRODUCT_PRICE: %s'
				  , orders.totalprice * order_modifier
				  , order_details.price * order_detail_modifier
				  , products.price * product_modifier
				  ) into concatened_return_sting;
	return concatened_return_sting;			  
end;
$$;

--select get_prices (5)


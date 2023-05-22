do $$ --     name of var; type of var;  value of var;
declare full_name varchar(50) := 'John Doe';
age integer := 28;
begin -- the variable can be accesed only in this scope
-- raise notice => console.log
raise notice 'Full name of person is %, and person is % years old',
full_name,
age;
end $$;
-- trigger function
CREATE OR REPLACE FUNCTION movie_insert_trigger_function()
RETURNS TRIGGER
AS $$

BEGIN
	RAISE NOTICE 'A new movie has been added, with title % ', NEW.title;

	-- NEW . OLD
	
	RETURN NEW; 
END;
$$ LANGUAGE plpgsql;

-- binding the trigger
CREATE TRIGGER movie_insert_trigger
AFTER INSERT ON Movies
FOR EACH ROW -- for each new row inserted
EXECUTE FUNCTION movie_insert_trigger_function();

-- Inserting new row in movies table
INSERT INTO Movies (title, release_year, genre, rating)
VALUES ('Some new movie', 2009, 'Fantasy', 6.3);

SELECT * FROM Movies;

-- Example two, logging into movie_logging_table

CREATE TABLE movie_logging_table(
	log_id SERIAL PRIMARY KEY,
	movie_title VARCHAR(100),
	insertion_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	action_done VARCHAR(100) -- INSERT / UPDATE
)

SELECT * FROM movie_logging_table;

-- trigger function
CREATE OR REPLACE FUNCTION movie_insert_trigger_function()
RETURNS TRIGGER
AS $$

BEGIN
	-- LOGGING INTO THE MOVIE LOG TABLE
	INSERT INTO movie_logging_table(movie_title, action_done)
	VALUES(NEW.title, 'NEW_MOVIE_ADDED');
	
	RETURN NEW; 
END;
$$ LANGUAGE plpgsql;

-- binding the trigger
CREATE TRIGGER movie_insert_trigger
AFTER INSERT ON Movies
FOR EACH ROW -- for each new row inserted
EXECUTE FUNCTION movie_insert_trigger_function();


-- Inserting new row in movies table
INSERT INTO Movies (title, release_year, genre, rating)
VALUES ('Gladiator', 2009, 'Fantasy', 10);

SELECT * FROM Movies;


SELECT * FROM movie_logging_table;


-- Example three, trigger on UPDATE on movies

CREATE OR REPLACE FUNCTION movie_update_trigger_function()
RETURNS TRIGGER
AS $$

BEGIN
	INSERT INTO movie_logging_table(movie_title, action_done)
	VALUES(NEW.title, 'MOVIE_UPDATE');
	
	RETURN NEW;
END;


$$ LANGUAGE plpgsql;

-- BINDING THE TRIGGER FOR THE TRIGGER FUNCTION
CREATE TRIGGER movie_update_trigger
BEFORE UPDATE ON Movies -- EXECUTES BEFORE EACH ROW SAVED
FOR EACH ROW
EXECUTE FUNCTION movie_update_trigger_function();-- EXECUTES THIS FUNCTION

-- QUERY TO UPDATE A ROW;
UPDATE Movies
SET title = 'Interstellar'
WHERE movie_id = 9;

SELECT * FROM Movies;

SELECT * FROM movie_logging_table;

-- Example four

CREATE OR REPLACE FUNCTION movie_update_trigger_function()
RETURNS TRIGGER
AS $$

BEGIN
	-- NEW => accessing the new value
	-- OLD => accessing the old value
	-- <> => Operator that checks if are different
	IF NEW.release_year <> OLD.release_year THEN
	 NEW.title := NEW.title || ' ( ' || NEW.release_year || ' )';
	 
	 -- more complex login
	 -- if condition is true make an insert in one more table =)
	END IF;
	
	INSERT INTO movie_logging_table(movie_title, action_done)
	VALUES(NEW.title, 'MOVIE_UPDATE');

	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- QUERY TO UPDATE A ROW;
UPDATE Movies
SET title = 'Terminator', release_year = 2022
WHERE movie_id = 9;
CREATE OR REPLACE PROCEDURE AddMovie(
	IN movie_title VARCHAR(100),
	IN release_year INT,
	IN genre VARCHAR(50),
	IN rating DECIMAL(3,1)
)
AS $$

BEGIN
	INSERT INTO Movies(title, release_year, genre, rating)
	VALUES(movie_title, release_year, genre, rating);
	
	
	COMMIT; -- If everything went well, COMMIT THE RESULTS
	
	-- ROLLBACK; -- Will Rollback/Return the previous state and the result of the query wont be inserted/affected
END;

$$ LANGUAGE plpgsql;


CALL AddMovie('Some Movie', 2014, 'Sci-Fi', 8.4);


SELECT * FROM Movies;
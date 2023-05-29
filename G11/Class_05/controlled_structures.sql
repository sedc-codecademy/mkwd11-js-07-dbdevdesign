-- 1 Find movie

CREATE OR REPLACE FUNCTION find_movie_by_id(id INT)
RETURNS TEXT
AS $$
DECLARE
	movie_name CONSTANT VARCHAR(50) := 'The Shawshank Redemption';
	movie_title VARCHAR(100);
BEGIN
	SELECT title INTO movie_title
	FROM Movies
	WHERE id = movie_id;
	
	IF movie_title = movie_name THEN
	RETURN 'FOUND: ' || movie_title;
	ELSE RETURN 'Movie not found or does not match';
	END IF;
	
END;
$$ LANGUAGE plpgsql;

SELECT find_movie_by_id(1);


-- 2

CREATE OR REPLACE FUNCTION check_movie_length(movie_duration INTEGER) 
RETURNS TEXT
AS $$
DECLARE movie_message TEXT;

BEGIN

	IF movie_duration < 120 THEN
	movie_message := 'Movie is to short, only for the weak.';
	ELSIF movie_duration >= 120 AND movie_duration < 180 THEN
	movie_message := 'This movie is medium, it is acceptable';
	ELSE movie_message := 'Only for the strong =)';
	END IF;
	
	RETURN movie_message;
END;


$$ LANGUAGE plpgsql;


SELECT check_movie_length(220);
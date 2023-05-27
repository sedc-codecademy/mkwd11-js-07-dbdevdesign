-- FUNCTIONS
-- Requirement: Create a function named "get_movie_count" that calculates and returns the total count of movies.
CREATE OR REPLACE FUNCTION get_movie_count() RETURNS INTEGER AS $$ -- THIS IS DECLARE BLOCK WHERE WE DECLARE VARIABLES
DECLARE movie_count INTEGER;
BEGIN -- HERE IS LOGIN OF THE FUNCTION
SELECT COUNT(*) INTO movie_count
FROM Movies;
RETURN movie_count;
END;
$$ LANGUAGE plpgsql;
SELECT get_movie_count();
--  Create a function named "get_movies_by_year" that accepts a release year as a parameter and returns a table of movie details for movies released in that year. The movie details should include the title, genre, and rating.
CREATE OR REPLACE FUNCTION get_movies_by_year(input_year INTEGER) RETURNS TABLE (
        title VARCHAR(50),
        genre VARCHAR(50),
        rating DECIMAL
    ) LANGUAGE plpgsql AS $$ BEGIN RETURN QUERY
SELECT Movies.title,
    Movies.genre,
    Movies.rating
FROM Movies
WHERE Movies.release_year = input_year;
END;
$$;
SELECT *
FROM get_movies_by_year(1994)
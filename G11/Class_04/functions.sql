-- FUNCTION THAT RETURNS VALUE
CREATE FUNCTION get_movies_by_genre(genre_name VARCHAR) RETURNS VARCHAR LANGUAGE plpgsql AS $$
DECLARE movie_name VARCHAR;
BEGIN
SELECT name INTO movie_name
FROM movies
WHERE genre = genre_name;
RETURN movie_name;
END $$;
-- CALL THE FUNCTION
SELECT *
FROM get_movies_by_genre('Fantasy');
SELECT *
FROM get_movies_by_genre('Action');
-- FUNCTION THAT RETURN TABLE
CREATE OR REPLACE FUNCTION get_movies_by_genre_table(genre_name VARCHAR) RETURNS table(name_of_movie text, genre_of_movie text) LANGUAGE plpgsql AS $$ BEGIN return query
SELECT name,
    genre
FROM movies
WHERE genre = genre_name;
END $$;
select *
from get_movies_by_genre_table('Fantasy');
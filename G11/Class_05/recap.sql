-- Task 1: Retrieve the movies along with their genres and ratings, and the names of the actors who starred in them.
SELECT m.title,
    m.genre,
    m.rating,
    a.name
FROM Movies AS m
    INNER JOIN MovieActors AS ma ON ma.movie_id = m.movie_id
    INNER JOIN Actors AS a ON ma.actor_id = a.actor_id;
-- Task 2: Retrieve the movies that have a rating above 8.5 and the names of the actors who starred in them.
SELECT m.title,
    a.name
FROM Movies AS m
    INNER JOIN MovieActors AS ma ON ma.movie_id = m.movie_id
    INNER JOIN Actors AS a ON ma.actor_id = a.actor_id
WHERE m.rating > 9;
-- Task 3:  Retrieve the count of movies in each genre.
SELECT genre,
    COUNT(genre) as movie_count
FROM Movies
GROUP BY genre;
-- Task 4:  Retrieve the genres that have at least two movies released.
SELECT genre,
    COUNT(genre) as movie_count
FROM Movies
GROUP BY genre
HAVING COUNT(genre) >= 2;
-- Task 5: Create a view that displays the movies with their titles, release years, genres, and ratings.
CREATE VIEW MovieDetailsView AS
SELECT title,
    release_year,
    genre,
    rating
FROM Movies;
SELECT *
FROM MovieDetailsView;
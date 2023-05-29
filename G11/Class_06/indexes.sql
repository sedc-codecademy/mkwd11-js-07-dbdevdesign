CREATE INDEX idx_movies_release_year ON Movies(release_year);


SELECT * FROM movies
WHERE release_year > 1994;
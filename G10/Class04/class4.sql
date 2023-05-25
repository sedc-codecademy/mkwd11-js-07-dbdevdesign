-- Retrieve the average rating of all albums.
SELECT AVG(rating) from albums

-- Find the maximum duration of songs in an album.
SELECT MAX(duration) FROM songs WHERE album_id = 1;

-- Retrieve the minimum rating of albums by a specific artist.
SELECT MIN(rating) FROM albums WHERE artist_id = 1;

-- Get the count of songs in each album.
SELECT album_id, COUNT(*) FROM songs GROUP BY album_id;

-- Retrieve the names of all artists along with a comma-separated list of their album names.
SELECT ar.artist_name, STRING_AGG(al.album_name, ', ') AS album_names
FROM artists ar
JOIN albums al ON ar.artist_id = al.artist_id
GROUP BY ar.artist_name

-- Get a comma-separated list of genres for each song along with their respective song names.
SELECT s.song_name, STRING_AGG(g.genre_name, ', ') AS genre_names
FROM SONGS s
JOIN songs_genres sg ON s.song_id = sg.song_id
JOIN genres g ON sg.genre_id = g.genre_id
GROUP BY s.song_name

-- Retrieve the album names along with a concatenated string of song names in each album.
SELECT a.album_name, STRING_AGG(s.song_name, ' - ') AS song_names
FROM albums a
JOIN songs s ON a.album_id = s.album_id
GROUP BY a.album_name

-- Retrieve the names of all artists along with a concatenated string of album names sorted
-- alphabetically for each artist.
SELECT ar.artist_name, STRING_AGG(al.album_name, ', ' ORDER BY al.album_name) AS album_names
FROM artists ar
JOIN albums al ON ar.artist_id = al.artist_id
GROUP BY ar.artist_name

-- Retrieve the names of all artists who have albums with more than 1 song.
SELECT ar.artist_name
FROM artists ar
JOIN albums al ON ar.artist_id = al.artist_id
JOIN songs s ON al.album_id = s.album_id
GROUP BY ar.artist_name
HAVING COUNT(*) > 1

-- Find the average duration of songs in a specific genre.
SELECT AVG(duration)
FROM songs s
JOIN songs_genres sg ON s.song_id = sg.song_id
JOIN genres g ON sg.genre_id = g.genre_id
WHERE g.genre_id = 1

-- to visualize the data above
SELECT AVG(duration), g.genre_name
FROM songs s
JOIN songs_genres sg ON s.song_id = sg.song_id
JOIN genres g ON sg.genre_id = g.genre_id
GROUP BY g.genre_name

-- Retrieve the minimum duration of songs in a specific album.
SELECT MIN(duration)
FROM songs
WHERE album_id = 1

-- VIEWS

-- View to retrieve the album names and their respective artist names:
CREATE VIEW album_artist_view AS
SELECT al.album_name, ar.artist_name
FROM albums al
JOIN artists ar ON al.artist_id = ar.artist_id

SELECT * FROM album_artist_view

-- View to get the count of songs in each album along with the album name:
CREATE VIEW album_songs_count_view AS
SELECT al.album_name, COUNT(*) AS song_count
FROM albums al
JOIN songs s ON al.album_id = s.album_id
GROUP BY al.album_name

SELECT * FROM album_songs_count_view

-- View to retrieve the average rating of albums released by each artist:
CREATE VIEW artist_avg_rating_view AS
SELECT ar.artist_name, AVG(al.rating) AS avg_rating
FROM artists ar
JOIN albums al ON ar.artist_id = al.artist_id
GROUP BY ar.artist_name

SELECT * FROM artist_avg_rating_view

-- View to retrieve the names of all artists who have albums with a rating higher than the
-- average rating of all albums:
CREATE VIEW high_rated_artists_view AS
SELECT ar.artist_name, al.rating
FROM artists ar
JOIN albums al ON ar.artist_id = al.artist_id
WHERE al.rating > (SELECT AVG(rating) from albums)

SELECT * FROM high_rated_artists_view

-- View to retrieve the names of all albums that have songs with a duration longer than 4m
CREATE VIEW long_duration_albums_view AS
SELECT al.album_name, s.duration
from albums al
JOIN songs s ON al.album_id = s.album_id
WHERE s.duration > INTERVAL '4:00'

SELECT * FROM long_duration_albums_view

-- LIMIT

-- Retrieve the top 3 albums based on rating, along with their artists:
SELECT al.album_name, ar.artist_name, al.rating
FROM albums al
INNER JOIN artists ar ON al.artist_id = ar.artist_id
ORDER BY al.rating DESC
LIMIT 3

-- Retrieve the 3 shortest songs and their corresponding albums:
SELECT s.song_name, al.album_name, s.duration
FROM songs s
INNER JOIN albums al ON s.album_id = al.album_id
ORDER BY s.duration ASC
LIMIT 3

-- Retrieve the songs and their genres, ordered by genre name:
SELECT s.song_name, g.genre_name
FROM songs s
INNER JOIN songs_genres sg ON s.song_id = sg.song_id
INNER JOIN genres g ON sg.genre_id = g.genre_id
ORDER BY g.genre_name

-- Retrieve the albums along with the count of songs in each album, ordered by the number
-- of songs in descending order:
SELECT al.album_name, COUNT(s.song_id) AS song_count
FROM albums al
LEFT JOIN songs s ON s.album_id = al.album_id
GROUP BY al.album_name
ORDER BY song_count DESC

-- Retrieve the artists who have at least 2 albums, ordered alphabetically by artist name:
SELECT ar.artist_name
FROM artists ar
INNER JOIN albums al ON ar.artist_id = al.artist_id
GROUP BY ar.artist_name
HAVING COUNT(al.album_id) >= 2
ORDER BY ar.artist_name
LIMIT 1

-- Get the count of songs in each album along with the corresponding album name.
SELECT a.album_name, COUNT(*) AS song_count
FROM songs s
INNER JOIN albums a ON s.album_id = a.album_id
GROUP BY a.album_name

-- Retrieve the album names and their rating in descending order of average rating.
SELECT a.album_name, a.rating
FROM albums a
ORDER BY a.album_name DESC

-- Find the average duration of songs in albums with a rating greater than 4.0
SELECT AVG(duration)
FROM songs s
JOIN albums a ON s.album_id = a.album_id
WHERE a.rating > 4.0

-- Get the maximum rating among albums in a specific genre.
SELECT MAX(rating)
FROM albums a
INNER JOIN songs s ON a.album_id = s.album_id
INNER JOIN songs_genres sg ON s.song_id = sg.song_id
WHERE sg.genre_id = 1

-- Find the count of songs in each genre.
SELECT g.genre_name, COUNT(*) song_count
FROM genres g
JOIN songs_genres sg ON g.genre_id = sg.genre_id
GROUP BY g.genre_name

-- Retrieve the album names and their respective artist names.
SELECT al.album_name, ar.artist_name
FROM albums al
JOIN artists ar ON al.artist_id = ar.artist_id

-- Get the average duration of songs in albums by a specific artist.
SELECT AVG(duration)
FROM songs s
INNER JOIN albums al ON s.album_id = al.album_id
WHERE al.artist_id = 2

-- Retrieve the names of all genres associated with a specific song.
SELECT g.genre_name
FROM genres g
JOIN songs_genres sg ON g.genre_id = sg.genre_id
WHERE sg.song_id = 2

-- Find the count of albums released by each artist.
SELECT ar.artist_name, COUNT(*) AS album_count
FROM albums al
JOIN artists ar ON al.artist_id = ar.artist_id
GROUP BY ar.artist_name

-- Retrieve the names of all artists who have albums with a rating higher than 4.0 and
-- have at least 3 songs in their albums.
SELECT ar.artist_name
FROM artists ar
INNER JOIN albums al ON ar.artist_id = al.artist_id
INNER JOIN songs s ON al.album_id = s.album_id
WHERE al.rating > 4.0
GROUP BY ar.artist_name
HAVING COUNT(s.song_id) >= 2

-- Retrieve the album names along with a concatenated string of song names in each album.
SELECT al.album_name, STRING_AGG(s.song_name, ', ') as song_names
FROM albums al
JOIN songs s ON s.album_id = al.album_id
GROUP BY al.album_name

-- Retrieve the names of all artists who have albums with a rating higher than the average
-- rating of all albums and have at least one song longer than 5 minutes.
SELECT ar.artist_name
FROM artists ar
JOIN albums al ON ar.artist_id = al.artist_id
JOIN songs s ON s.album_id = al.album_id
WHERE al.rating > (SELECT AVG(rating) FROM albums)
GROUP BY ar.artist_name
HAVING MAX(s.duration) > INTERVAL '5:00'



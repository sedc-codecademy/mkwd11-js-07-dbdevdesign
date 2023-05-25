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


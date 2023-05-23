-- CREATING TABLES

CREATE TABLE employees (
	employee_id SERIAL PRIMARY KEY,
	first_name varchar(50),
	last_name varchar(50),
	department_id INT
);

CREATE TABLE departments (
	department_id SERIAL PRIMARY KEY,
	department_name varchar(50)
);

-- INSERTING DATA

INSERT INTO employees (first_name, last_name, department_id)
VALUES ('John', 'Doe', 1),
		('Jane', 'Smith', 2),
		('Michael', 'Johnson', 1);

INSERT INTO departments (department_name)
VALUES ('Sales'),
		('Marketing'),
		('Development');
		
-- SELECT DATA

SELECT * FROM employees
SELECT * FROM departments

-- INNER JOIN

SELECT e.employee_id, e.first_name, e.last_name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id

-- LEFT JOIN

SELECT e.employee_id, e.first_name, e.last_name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id

SELECT e.employee_id, e.first_name, d.department_name
FROM departments d
LEFT JOIN employees e on d.department_id = e.employee_id

-- RIGHT JOIN

SELECT e.employee_id, e.first_name, e.last_name, d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id

SELECT e.employee_id, e.first_name, d.department_name
FROM departments d
RIGHT JOIN employees e ON d.department_id = e.employee_id

-- OUTER JOIN
SELECT e.employee_id, e.first_name, d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.department_id

-- !!! MUSIC !!!

-- CREATING TABLES
CREATE TABLE artists (
	artist_id SERIAL PRIMARY KEY,
	artist_name VARCHAR(50)
);

CREATE TABLE albums (
	album_id SERIAL PRIMARY KEY,
	album_name VARCHAR(50),
	rating DECIMAL(3,2),
	artist_id INT,
	FOREIGN KEY (artist_id) REFERENCES artists (artist_id)
);


CREATE TABLE songs (
	song_id SERIAL PRIMARY KEY,
	song_name VARCHAR(50),
	duration INTERVAL, -- '02:56'
	album_id INT,
	FOREIGN KEY (album_id) REFERENCES albums (album_id)
);

CREATE TABLE genres (
	genre_id SERIAL PRIMARY KEY,
	genre_name VARCHAR(50)
);

CREATE TABLE songs_genres (
	song_id INT,
	genre_id INT,
	PRIMARY KEY (song_id, genre_id),
	FOREIGN KEY (song_id) REFERENCES songs (song_id),
	FOREIGN KEY (genre_id) REFERENCES genres (genre_id)
);

-- INSERTING DATA

INSERT INTO artists (artist_name)
values ('Ed Sheeran'),
		('50 Cent'),
		('Naum Petreski'),
		('Nirvana'),
		('Jordan Mitev');
		
INSERT INTO albums (album_name, artist_id, rating)
values ('X', 1, 4.8),
		('Get rich or die trying', 2, 5.0),
		('1989', 1, 4.5),
		('Best Hits', 3, 3.4),
		('Bleach', 4, 4.7);
		
INSERT INTO songs (song_name, album_id, duration)
values ('Shape of you', 1, '03:45'),
		('Castle of the hill', 1, '04:21'),
		('In the club', 2, '03:32'),
		('Odi zvezdo', 4, '05:34'),
		('Ne kani me', 4, '06:45'),
		('Papercuts', 5, '04:56'),
		('If I cant', 2, '03:32');

INSERT INTO genres (genre_name)
values ('Pop'),
		('Rock'),
		('Folk'),
		('Rap'),
		('Indie');

INSERT INTO songs_genres (song_id, genre_id)
VALUES (1, 1),
		(2, 1),
		(3, 4),
		(4, 3),
		(5, 3),
		(6, 2),
		(7, 4),
		(2, 2),
		(4, 2);

-- SELECTS

SELECT * FROM artists
SELECT * FROM albums
SELECT * FROM songs
SELECT * FROM genres
SELECT * FROM songs_genres

-- ONE TO MANY Relations (Artist to Albums)

-- 1. Retrieve the artist for a specific album

SELECT ar.artist_name, al.album_name
FROM artists ar
INNER JOIN albums al ON ar.artist_id = al.artist_id
WHERE al.album_name = 'Best Hits';

-- Example 2: Retrieve the number of albums for each artist.

SELECT ar.artist_name, COUNT(al.album_name) AS album_count
from artists ar
LEFT JOIN albums al on ar.artist_id = al.artist_id
GROUP BY ar.artist_name

-- Retrieve the album for a specific song
SELECT a.album_name, s.song_name
FROM albums a
LEFT JOIN songs s ON a.album_id = s.album_id
WHERE s.song_name = 'Odi zvezdo'

-- Retrieve albums that do not have any songs.
SELECT a.album_name, s.song_name
FROM albums a
LEFT JOIN songs s ON a.album_id = s.album_id
WHERE s.song_name IS NULL

-- Many-to-Many Relationship (Songs to Genres):
-- Example 1: Retrieve all songs belonging to a specific genre.
SELECT s.song_name, g.genre_name
FROM songs s
INNER JOIN songs_genres sg ON s.song_id = sg.song_id
INNER JOIN genres g ON sg.genre_id = g.genre_id
WHERE g.genre_name = 'Rock'

-- Example 2: Retrieve all genres for a specific song.
SELECT g.genre_name
FROM genres g
INNER JOIN songs_genres sg ON g.genre_id = sg.genre_id
INNER JOIN songs s ON sg.song_id = s.song_id
WHERE s.song_name = 'Odi zvezdo'

-- Example 3: Retrieve songs that belong to multiple genres.
SELECT s.song_name, COUNT(sg.genre_id) as genre_count
FROM songs s
INNER JOIN songs_genres sg ON s.song_id = sg.song_id
GROUP BY s.song_name
HAVING COUNT(sg.genre_id) > 1

-- Retrieve the songs and their corresponding album names:
SELECT s.song_name, a.album_name
FROM songs s
INNER JOIN albums a ON s.album_id = a.album_id

-- Retrieve the songs, their album names, and the artist names:
SELECT s.song_name, al.album_name, ar.artist_name
FROM songs s
INNER JOIN albums al ON s.album_id = al.album_id
INNER JOIN artists ar ON ar.artist_id = al.artist_id

-- Retrieve all albums and their corresponding songs (including albums with no songs):
SELECT al.album_name, s.song_name
FROM albums al
LEFT JOIN songs s ON al.album_id = s.album_id

-- Retrieve all artists and their corresponding albums (including artists with no albums):

-- Retrieve all songs and their corresponding album names (including songs without albums):

-- Retrieve all albums and their corresponding artist names (including albums without artists):

-- Retrieve all songs and their corresponding album names, including songs without albums and albums without songs:

-- Retrieve all albums and their corresponding artist names, including albums without artists and artists without albums:

-- Retrieve the number of songs for each album, only including albums with more than 2 songs:
SELECT al.album_name, COUNT(s.song_id) as song_count
FROM albums al
INNER JOIN songs s ON al.album_id = s.album_id
GROUP BY al.album_name
HAVING COUNT(s.song_id) > 2

-- Retrieve the number of songs for each genre, only including genres with more than 1 song:
SELECT g.genre_name, COUNT(sg.song_id) AS song_count
FROM genres g
LEFT JOIN songs_genres sg ON g.genre_id = sg.genre_id
GROUP BY g.genre_name
HAVING COUNT(sg.song_id) > 1

-- Retrieve the album with the maximum number of songs:

-- Retrieve the genre with the maximum number of songs:
SELECT genres.genre_name, COUNT(songs_genres.song_id) AS song_count
FROM genres
INNER JOIN songs_genres ON genres.genre_id = songs_genres.genre_id
GROUP BY genres.genre_name
HAVING COUNT(songs_genres.song_id) = (
	SELECT MAX(song_count) FROM (
		SELECT COUNT(song_id) AS song_count FROM songs_genres GROUP BY genre_id
	) AS subquery
);


-- TEMPORARY TABLES

CREATE TEMPORARY TABLE temp_album_artists AS
SELECT albums.album_name, artists.artist_name, albums.rating
FROM albums
INNER JOIN artists ON albums.artist_id = artists.artist_id

SELECT * FROM temp_album_artists

-- BUILD IN FUNCTIONS

-- CONCAT

DO $$
DECLARE
	full_title VARCHAR(100);
BEGIN
	SELECT CONCAT(ar.artist_name, ' - ', al.album_name)
	INTO full_title
	FROM artists ar
	INNER JOIN albums al ON ar.artist_id = al.artist_id
	WHERE al.album_id = 1;
	
	RAISE NOTICE 'Full Title: %', full_title;
END $$;

-- UPPER

DO $$
DECLARE
	album_id_var INT := 2;
	upper_song_name VARCHAR(100);
BEGIN
	SELECT UPPER(song_name)
	INTO upper_song_name
	FROM songs
	WHERE album_id = album_id_var;
	
	RAISE NOTICE 'Uppercase Song Name:';
	RAISE NOTICE '%', upper_song_name;
END $$;

-- LOWER

DO $$
DECLARE
	album_id_var INT := 1;
	upper_song_name VARCHAR(100);
BEGIN
	SELECT LOWER(song_name)
	INTO upper_song_name
	FROM songs
	WHERE album_id = album_id_var;
	
	RAISE NOTICE 'Uppercase Song Name:';
	RAISE NOTICE '%', upper_song_name;
END $$;

-- LENGTH

DO $$
DECLARE
	v_album_id INT := 3;
	artist_length INT;
BEGIN
	SELECT LENGTH(ar.artist_name)
	INTO artist_length
	FROM artists ar
	INNER JOIN albums al ON ar.artist_id = al.artist_id
	WHERE al.album_id = v_album_id;
	
	RAISE NOTICE 'Artist Name Length: %', artist_length;
END $$;

-- ABS - Absolute value

DO $$
DECLARE
	song1_duration NUMERIC := 200;
	song2_duration NUMERIC := 180;
	duration_diff NUMERIC;
BEGIN
	duration_diff := ABS(song1_duration - song2_duration);
	RAISE NOTICE 'Absolute Duration Difference: %', duration_diff;
END $$

-- RANDOM

DO $$
DECLARE
	random_song_id NUMERIC;
	random_song_name VARCHAR(100);
BEGIN
	SELECT song_id, song_name
	INTO random_song_id, random_song_name
	FROM songs
	ORDER BY RANDOM()
	LIMIT 1;
	
	RAISE NOTICE 'Random song ID: %', random_song_id;
	RAISE NOTICE 'Random song Name: %', random_song_name;
END $$;

-- FLOOR

DO $$
DECLARE
	average_duration NUMERIC;
	rounded_duration NUMERIC;
BEGIN
	SELECT AVG(EXTRACT(EPOCH FROM duration)) -- Convert Interval into seconds
	INTO average_duration
	FROM songs;

	rounded_duration := FLOOR(average_duration);
	RAISE NOTICE 'Rounded Average Duration (in seconds): %', rounded_duration;
END $$

-- ROUND

DO $$
DECLARE
	average_rating NUMERIC;
	rounded_rating NUMERIC;
BEGIN
	SELECT AVG(rating)
	INTO average_rating
	FROM albums;
	
	rounded_rating := ROUND(average_rating, 1); -- Round to one decimal place
	RAISE NOTICE 'Rounded Average Rating: %', rounded_rating;
END $$

-- SUM

-- FUNCTION DEFINITION
CREATE OR REPLACE FUNCTION calculate_total_duration(p_album_id INT)
	RETURNS INTERVAL
AS $$
DECLARE
	total_duration INTERVAL;
BEGIN
	SELECT SUM(duration)
	INTO total_duration
	FROM songs
	WHERE songs.album_id = p_album_id;
	
	RETURN total_duration;
END;
$$ LANGUAGE plpgsql;

-- FUNCTION EXECUTION
SELECT calculate_total_duration(4);

-- Function to format the duration of a song in minutes and seconds:
CREATE OR REPLACE FUNCTION format_duration(p_duration INTERVAL)
	RETURNS VARCHAR
AS $$
DECLARE
	minutes INT;
	seconds INT;
	formated_duration VARCHAR;
BEGIN
	minutes := EXTRACT(MINUTE FROM p_duration);
	seconds := EXTRACT(SECOND FROM p_duration);
	
	IF minutes > 0 THEN
		formated_duration := minutes || 'm ';
	ELSE
		formated_duration := '';
	END IF;
	
	formated_duration := formated_duration || seconds || 's';
	
	return formated_duration;
END;
$$ LANGUAGE plpgsql;

SELECT format_duration('00:02:34'::INTERVAL)

-- TABLE VALUED FUNCTION
CREATE OR REPLACE FUNCTION get_songs_with_duration()
	RETURNS TABLE(song_name VARCHAR, formated_duration VARCHAR)
AS $$
BEGIN
	RETURN QUERY
		SELECT s.song_name, format_duration(duration) AS formated_duration
		FROM songs s;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM get_songs_with_duration();

-- IF NOT FOUND
CREATE OR REPLACE FUNCTION get_song_duration(p_song_id INT)
	RETURNS INTERVAL
AS $$
DECLARE
	song_duration INTERVAL;
BEGIN
	-- Retrieve the duration of the song
	SELECT duration INTO song_duration
	FROM songs
	WHERE songs.song_id = p_song_id;
	
	-- Handle duration doesn't exist
	IF NOT FOUND THEN
		song_duration := NULL;
	END IF;
	
	return song_duration;
END;
$$ LANGUAGE plpgsql;
	
SELECT get_song_duration(10);

-- TRIGGERS

ALTER TABLE albums
ADD COLUMN total_duration INTERVAL;

-- Creating a trigger function
CREATE OR REPLACE FUNCTION update_album_duration()
	RETURNS TRIGGER
AS $$
BEGIN
	-- Update the total duration of the album when a song is inserted
	IF TG_OP = 'INSERT' THEN
		UPDATE albums
		SET total_duration = COALESCE(total_duration, '00:00:00') + NEW.duration
		WHERE album_id = NEW.album_id;
	
	-- Update the total duration of the album when a song is deleted
	ELSEIF TG_OP = 'DELETE' THEN
		UPDATE albums
		SET total_duration = COALESCE(total_duration, '00:00:00') - OLD.duration
		WHERE album_id = OLD.album_id;
	
	-- Update the total duration of the album when a song is updated
	ELSEIF TG_OP = 'UPDATE' THEN
		-- Calculate the difference in duration
		DECLARE
			duration_diff INTERVAL := NEW.duration - OLD.duration;
		BEGIN
			-- Update the total duration of the album by adding duration difference
			UPDATE albums
			SET total_duration = COALESCE(total_duration, '00:00:00') + duration_diff
			WHERE album_id = NEW.album_id;
		END;
	END IF;
		
		
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- CREATE THE TRIGGER


	





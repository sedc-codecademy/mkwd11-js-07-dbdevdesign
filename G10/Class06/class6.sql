-- Inserting data into artists table
INSERT INTO artists (artist_name)
VALUES
('Ed Sheeran'),
('50 Cent'),
('Naum Petreski'),
('Nirvana'),
('Jordan Mitev'),
('Aleksandra Radović'),
('Bijelo Dugme'),
('Sergej Ćetković'),
('Jelena Rozga'),
('Plavi Orkestar'),
('Gibonni'),
('Zdravko Čolić'),
('Dino Merlin'),
('Severina'),
('Tose Proeski'),
('Crvena Jabuka'),
('Zeljko Joksimovic'),
('Divlje Jagode'),
('Bajaga'),
('Riblja Corba'),
('Zdravko Colic'),
('Parni Valjak'),
('Prljavo Kazaliste'),
('Zabranjeno Pusenje'),
('Dino Dvornik'),
('Goran Bregovic'),
('Bijelo Dugme'),
('Kemal Monteno'),
('Maja Odzaklijevska'),
('Goran Karan');

-- Inserting data into albums table
INSERT INTO albums (album_name, artist_id, rating)
VALUES
('X', 1, 4.8),
('Get rich or die trying', 2, 5.0),
('1989', 1, 4.5),
('Best Hits', 3, 3.4),
('Bleach', 4, 4.7),
('Carry Me Home', 6, 4.2),
('Bitanga i Princeza', 7, 4.9),
('Kad ti jednom srce slome', 8, 4.6),
('Bižuterija', 9, 4.1),
('Everblue', 11, 4.3),
('Kad pogledaš me preko ramena', 12, 4.7),
('Sredinom', 13, 4.5),
('Feminnem Show', 14, 3.9),
('Best of Tose Proeski', 15, 4.8),
('Sve Ove Godine', 16, 4.6),
('Lane Moje', 18, 4.2),
('Motori', 19, 4.7),
('Na Slatkoj Muci', 20, 4.4),
('Uzalud vam trud sviraci', 21, 4.9),
('Mrtva priroda', 22, 4.5),
('Milo moje', 24, 4.1),
('Dino', 25, 4.3),
('Goran Bregovic & Bijelo Dugme', 26, 4.8),
('Nostalgija', 28, 4.6),
('Zlatna kolekcija', 29, 4.2),
('Goran Karan', 30, 4.7);

-- Inserting data into songs table
INSERT INTO songs (song_name, album_id, duration)
VALUES
('Shape of You', 1, '03:45'),
('Castle on the Hill', 1, '04:21'),
('In da Club', 2, '03:32'),
('Odi Zvezdo', 4, '05:34'),
('Ne Kani Me', 4, '06:45'),
('Papercuts', 5, '04:56'),
('If I Can''t', 2, '03:32'),
('Zagrli Me', 6, '04:09'),
('Evo', 7, '03:55'),
('Kad zaboravis juli', 7, '03:40'),
('Nije Ljubav Stvar', 9, '04:06'),
('Ja Sam Samo Vaga', 10, '03:50'),
('Kad zamirisu jorgovani', 10, '05:23'),
('Zivot je nekad siv, nekad zut', 11, '04:15'),
('Da Te Ne Volim', 13, '04:08'),
('Dalmatinka', 14, '03:35'),
('Boze, brani je od zla', 15, '03:53'),
('Samo malo', 16, '03:48'),
('Ruza vjetrova', 17, '04:24'),
('Motori', 19, '04:58'),
('Stakleno zvono', 20, '04:15'),
('Nedostajes mi ti', 22, '03:42'),
('Pesma slobode', 23, '03:58'),
('Zlatne godine', 25, '04:32'),
('Kada zaspu andjeli', 26, '04:15');

-- Inserting data into genres table
INSERT INTO genres (genre_name)
VALUES
('Pop'),
('Rock'),
('Folk'),
('Rap'),
('Indie'),
('Metal'),
('Electronic'),
('Jazz'),
('Blues'),
('Classical');

-- Inserting data into songs_genres table
INSERT INTO songs_genres (song_id, genre_id)
VALUES
(1, 1),
(2, 1),
(3, 4),
(4, 3),
(5, 3),
(6, 2),
(7, 4),
(2, 2),
(4, 2),
(9, 3),
(11, 3),
(12, 3),
(14, 4),
(16, 2),
(17, 2),
(19, 5),
(21, 5),
(22, 5),
(24, 6);
 
select * from artists
select * from albums
select * from songs
select * from genres
select * from songs_genres
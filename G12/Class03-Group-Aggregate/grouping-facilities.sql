SELECT * FROM bookings b 

SELECT * FROM members m 

SELECT * FROM facilities f 

SELECT * FROM facilities f 
WHERE f.membercost > 0

SELECT facid , "name" ,membercost , monthlymaintenance, (monthlymaintenance / 50) AS cost_ratio   FROM facilities f 
WHERE membercost > 0 AND membercost < (monthlymaintenance / 50)

--IN operator matches all rows that have the values in the list and returns them
SELECT * FROM facilities f 
WHERE f.facid IN(1,5)

SELECT m.firstname , m.surname , m.joindate  FROM members m 
ORDER BY m.memid DESC 
LIMIT 1

SELECT * FROM members m 

SELECT * FROM bookings b 
JOIN facilities f 
ON f.facid = b.facid 
ORDER BY b.facid 

--Three way join
SELECT b.bookid, f.name AS facility_name, concat(m.firstname,' ', m.surname) AS member_fullname  FROM bookings b 
JOIN facilities f 
ON f.facid = b.facid 
JOIN members m 
ON m.memid = b.memid 
ORDER BY member_fullname

SELECT count(memid)
FROM bookings b 

SELECT * FROM members m 

SELECT m.memid , m.firstname, m.surname, count(*)  FROM members m 
JOIN bookings b 
ON b.memid = m.memid 
GROUP BY m.memid 
ORDER BY memid 

SELECT memid , joindate , ROW_NUMBER() OVER (ORDER BY joindate) AS row_number FROM members m 
ORDER BY memid 

SELECT b.bookid, concat(m.firstname, ' ', m.surname) AS fullname FROM bookings b 
JOIN members m 
ON m.memid  = b.memid
WHERE concat(m.firstname, ' ', m.surname) = 'David Farrell'

SELECT f.name AS facility_name, b.starttime AS booking_time FROM facilities f 
JOIN bookings b 
ON b.facid = f.facid 
WHERE f.name LIKE 'Tennis Court%'
ORDER BY b.starttime ASC

SELECT DISTINCT m.firstname , m.surname  FROM members m 
JOIN members m2
ON m.memid = m2.recommendedby 

SELECT count(*) AS members_count FROM members m 

--null values are not counted by count()
SELECT count(recommendedby) FROM members m

SELECT * FROM bookings b 

SELECT min(slots) AS total_slots FROM bookings b 

SELECT * FROM facilities f 

--::type allows us to typecast some column into a specifc type to be used in the query
SELECT string_agg(f.membercost::varchar(50), '; ') FROM facilities f 

SELECT * FROM bookings b 

SELECT b.facid, COUNT(*) AS booking_count, SUM(b.slots) AS total_slots, AVG(b.slots) AS avg_slots FROM bookings b
WHERE facid  > 4
GROUP BY b.facid 
ORDER BY b.facid 

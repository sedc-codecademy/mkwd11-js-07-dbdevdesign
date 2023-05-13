CREATE TABLE BusinessEntity (
    id INTEGER PRIMARY KEY,
    name varchar(100),
    region varchar(500),
    zipcode char(4),
    size varchar(10)
);
SELECT *
FROM businessentity;
CREATE TABLE Employee (
    id integer PRIMARY KEY NOT NULL,
    firstname varchar(100) NOT NULL,
    lastname varchar(100) NOT NULL,
    dateOfBirth date NULL,
    gender nchar(1) NULL,
    hireDate date NULL,
    nationalIdNumber varchar(20) NULL
)
SELECT *
FROM employee;
-- INSERT DATA
INSERT INTO businessentity (id, name, region, zipcode, size)
VALUES (1, 'Coffe to take', 'Veles', '0000', '30');
INSERT INTO businessentity (id, name, region, zipcode, size)
VALUES (2, 'Piljara', 'Ohrid', '0001', '10'),
    (3, 'Mobile store', 'Skopje', '0002', '501');
INSERT INTO employee (
        id,
        firstname,
        lastname,
        dateOfBirth,
        gender,
        hiredate,
        nationalIdNumber
    )
VALUES (
        1,
        'John',
        'Doe',
        '1990-05-05',
        'M',
        '2022-02-09',
        '123'
    )
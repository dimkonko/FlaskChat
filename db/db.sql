CREATE TABLE IF NOT EXISTS 'users' (
	id INTEGER PRIMARY KEY NOT NULL,
	nickname CHAR(40) NOT NULL,
	email CHAR(80) NOT NULL,
	password CHAR(52) NOT NULL
)
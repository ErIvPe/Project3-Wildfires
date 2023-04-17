CREATE TABLE wildfire (
	objectID INT NOT NULL PRIMARY KEY,
	lat FLOAT,
	lon FLOAT,
	init_lat FLOAT,
	init_lon FLOAT,
	date TIMESTAMP,
	fire_size FLOAT,
	acres FLOAT,
	fire_cause VARCHAR(100),
	fire_name VARCHAR(100),
	fire_type VARCHAR(20),
	county VARCHAR(50),
	fire_state VARCHAR(20),
	landowner VARCHAR(50),
	fuel_model VARCHAR(100)
	
);


CREATE TABLE containment (
	objectID INT NOT NULL PRIMARY KEY,
	contained_date TIMESTAMP
);

ALTER TABLE containment
	ADD CONSTRAINT objectID_fk
		FOREIGN KEY (objectID) REFERENCES fire_cause_details (objectID);



CREATE TABLE date_time (
	objectID INT NOT NULL PRIMARY KEY,
	date TIMESTAMP
);
INSERT INTO date_time (objectID, date)
	SELECT objectID, date
		FROM wildfire;

ALTER TABLE date_time
	ADD CONSTRAINT objectID_fk
		FOREIGN KEY (objectID) REFERENCES fire_cause_details (objectID);




CREATE TABLE coordinates (
	objectID INT NOT NULL PRIMARY KEY,
	lat FLOAT,
	lon FLOAT,
	init_lat FLOAT,
	init_lon FLOAT
);
INSERT INTO coordinates (objectID, lat, lon, init_lat, init_lon)
	SELECT objectID, lat, lon, init_lat, init_lon
		FROM wildfire;

ALTER TABLE coordinates
	ADD CONSTRAINT objectID_fk
		FOREIGN KEY (objectID) REFERENCES fire_cause_details (objectID);




CREATE TABLE location (
	objectID INT NOT NULL PRIMARY KEY,
	county VARCHAR(50),
	fire_state VARCHAR(20)
);
INSERT INTO location (objectID, county, fire_state)
	SELECT objectID, county, fire_state
		FROM wildfire;

ALTER TABLE location
	ADD CONSTRAINT objectID_fk
		FOREIGN KEY (objectID) REFERENCES fire_cause_details (objectID);




CREATE TABLE cause (
	objectID INT NOT NULL PRIMARY KEY,
	fire_cause VARCHAR(100)
);
INSERT INTO cause (objectID, fire_cause)
	SELECT objectID, fire_cause
		FROM wildfire;
		
ALTER TABLE cause
	ADD CONSTRAINT objectID_fk
		FOREIGN KEY (objectID) REFERENCES fire_cause_details (objectID);




CREATE TABLE fire_cause_details (
	objectID INT NOT NULL PRIMARY KEY,
	fire_name VARCHAR(100),
	fire_type VARCHAR(20),
	landowner VARCHAR(50),
	fuel_model VARCHAR(100)
);
INSERT INTO fire_cause_details (objectID, fire_name, fire_type, landowner, fuel_model)
	SELECT objectID, fire_name, fire_type, landowner, fuel_model
		FROM wildfire;




CREATE TABLE size (
	objectID INT NOT NULL PRIMARY KEY,
	fire_size FLOAT,
	acres FLOAT
);
INSERT INTO size (objectID, fire_size, acres)
	SELECT objectID, fire_size, acres
		FROM wildfire;	

ALTER TABLE size
	ADD CONSTRAINT objectID_fk
		FOREIGN KEY (objectID) REFERENCES fire_cause_details (objectID);


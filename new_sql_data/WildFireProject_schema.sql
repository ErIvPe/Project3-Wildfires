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



ALTER TABLE wildfire ADD COLUMN contained_date TIMESTAMP;

	UPDATE wildfire SET contained_date = containment.contained_date
		FROM containment
			WHERE wildfire.objectID = containment.objectID;
			
			





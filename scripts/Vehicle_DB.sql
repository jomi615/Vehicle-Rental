CREATE DATABASE IF NOT EXISTS Vehicle;
USE Vehicle;
DROP TABLE IF EXISTS Rent;
DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS Messages;
DROP TABLE IF EXISTS Vehicle;
DROP TABLE IF EXISTS User; 
CREATE TABLE User(
 fname VARCHAR (20) NOT NULL,
 lname VARCHAR (20) NOT NULL, 
 email VARCHAR (50) NOT NULL, 
 pass VARCHAR (225)  NOT NULL,
 phone VARCHAR (12) NOT NULL,
 userID INT PRIMARY KEY NOT NULL auto_increment,
 username VARCHAR (12) NOT NULL, 
 check (length(phone) >= 9),
 check (email like "%@%")
);

 CREATE TABLE Vehicle(
 vehicleID INT PRIMARY KEY NOT NULL auto_increment,
 price DOUBLE (12,2) NOT NULL,
 vehicle_name VARCHAR (30) NOT NULL,
 vehicle_description TEXT (200) NOT NULL, 
 address VARCHAR(50) NOT NULL, 
 vehicle_type VARCHAR(10) NOT NULL,
 vehicle_host INT NOT NULL, 
 start_date DATE NOT NULL,
 end_date DATE NOT NULL, 
 total_quantity INT NOT NULL,
 CONSTRAINT FK_vehicle_host FOREIGN KEY (vehicle_host) references User(userID), 
 check (end_date >= start_date), 
 check (total_quantity > 0)
 );

 
  CREATE TABLE Rent(
 renter INT NOT NULL,
 vehicle_rented INT NOT NULL, 
 end_date DATE NOT NULL, 
 start_date DATE NOT NULL, 
 rent_quantity INT NOT NULL, 
 CONSTRAINT FK_renter FOREIGN KEY(renter) references User(userID), 
 CONSTRAINT FK_vehicle_rent FOREIGN KEY(vehicle_rented) references Vehicle(vehicleID), 
 CONSTRAINT PK_end PRIMARY KEY (end_date, renter, vehicle_rented),
 check (end_date >= start_date), 
 check (rent_quantity > 0)
 );

CREATE TABLE Review(
reviewer INT NOT NULL, 
reviewee int not null, 
review_date date not null, 
review_content text (255), 
stars_given bit not null,
CONSTRAINT FK_reviewer FOREIGN KEY (reviewer) references User(userID), 
CONSTRAINT FK_reviewee FOREIGN KEY (reviewee) references User(userID) ,  
CONSTRAINT PK_review PRIMARY KEY (reviewer, reviewee, review_date),
check  (stars_given between 1 AND 5)
); 

CREATE TABLE VehicleReview(
reviewer INT NOT NULL, 
vehicle_reviewed INT NOT NULL,
review_date date not null, 
review_content text (225), 
stars_given tinyint not null, 
CONSTRAINT FK_usereviewed FOREIGN KEY (reviewer) references User(userID), 
CONSTRAINT FK_vehireviewed FOREIGN KEY (vehicle_reviewed) references Vehicle(vehicleID), 
CONSTRAINT PK_review PRIMARY KEY (reviewer, vehicle_reviewed, review_date),
check (stars_given between 1 AND 5)
);

CREATE TABLE Messages(
from_user int not null, 
to_user int not null, 
content text(1000) not null, 
date_time datetime not null, 
CONSTRAINT FK_from FOREIGN KEY (from_user) references User(userID), 
CONSTRAINT FK_to FOREIGN KEY (to_user) references User(userID), 
CONSTRAINT PK_message PRIMARY KEY (from_user, to_user, date_time)
);







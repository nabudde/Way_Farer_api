import {Pool} from 'pg';
import dotenv from "dotenv";

dotenv.config();
const DB_LINK = process.env.DATABASE_URL;
const pool = new Pool({connectionString: process.env.DATABASE_URL});

pool.on('connect', () => {
  console.log('connected to the db');
});



const createTables = async () => {
  const users =
  `CREATE TABLE IF NOT EXISTS
   reflections(
    user_id UUID PRIMARY KEY ,
    email VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    is_admin BOOLEAN NOT NULL);

  CREATE TABLE IF NOT EXISTS
   trips(
    trip_id UUID PRIMARY KEY can,
    bus_license_number VARCHAR(20) NOT NULL,
    seating_capacity INT NOT NULL,
    origin VARCHAR(20) NOT NULL,
    destination VARCHAR(20) NOT NULL,
    trip_date VARCHAR(10) NOT NULL,
    fare FLOAT(4) NOT NULL,
    date_created  VARCHAR NOT NULL,
    status VARCHAR(10) NOT NULL DEFAULT 'active'
    );
    CREATE TABLE IF NOT EXISTS
    bookings(
    booking_id UUID PRIMARY KEY ,
    bus_license_number VARCHAR(20) NOT NULL,
    user_email VARCHAR NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    trip_date VARCHAR(10) NOT NULL,
    is_admin BOOLEAN NOT NULL)`
    
    await pool.query(users)
    .then((res) => {
      console.log(res);
      // pool.end();
    })
    .catch((err) => {
      console.log(err);
      // pool.end();
    });
  }

   
module.exports = createTables ;
require('make-runnable');



import {Pool} from 'pg';
import dotenv from "dotenv";

dotenv.config();
const DB_LINK = process.env.DATABASE_URL;
const pool = new Pool({connectionString: process.env.DATABASE_URL});

pool.on('connect', () => {
    console.log('connected to the db');
  });
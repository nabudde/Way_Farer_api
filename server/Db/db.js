import {Pool} from 'pg';
import dotenv from "dotenv";

dotenv.config();
const DB_LINK = process.env.DATABASE_URL;
const pool = new Pool({connectionString: process.env.DATABASE_URL});

pool.on('connect', () => {
  console.log('connected to the db');
});



const createTables = () => {
  const users =
  `CREATE TABLE IF NOT EXISTS
   reflections(
    userId UUID PRIMARY KEY,
    email VARCHAR(20) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    is_admin BOOLEAN NOT NULL
     )`;
    
    pool.query(users)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
    // const dropTables = () => {
    //   const users = 'DROP TABLE IF EXISTS reflections';
    //   pool.query(users)
    //     .then((res) => {
    //       console.log(res);
    //       pool.end();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       pool.end();
    //     });
    // }
    
    // pool.on('remove', () => {
    //   console.log('client removed');
    //   process.exit(0);
    // });
    
    module.exports = {
      createTables,
      // dropTables
    };
  }
  
  // export default pool;
module.exports = createTables;
require('make-runnable');



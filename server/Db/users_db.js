import {Pool} from 'pg';
import dotenv from "dotenv";

// const createTables = () => {
//     const users =
//     `CREATE TABLE IF NOT EXISTS
//      reflections(
//       id UUID PRIMARY KEY,
//       success VARCHAR(128) NOT NULL,
//       low_point VARCHAR(128) NOT NULL,
//       take_away VARCHAR(128) NOT NULL,
//       created_date TIMESTAMP,
//       modified_date TIMESTAMP
//       )`;
      
//       pool.query(users)
//       .then((res) => {
//         console.log(res);
//         pool.end();
//       })
//       .catch((err) => {
//         console.log(err);
//         pool.end();
//       });
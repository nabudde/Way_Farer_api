import  jwt from'jsonwebtoken';
import Joi from  'joi';
import uuid from 'uuid';
import {Pool} from 'pg';
import dotenv from "dotenv";
dotenv.config();
const pool = new Pool({connectionString: process.env.DATABASE_URL});


exports.signup = async(req, res) => {
    const schema = Joi.object().keys({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        first_name: Joi.string().alphanum().min(3).max(30).required(),
        last_name: Joi.string().alphanum().min(3).max(30).required(),
        is_admin:Joi.boolean().required()
      });
      const validate_data = Joi.validate(req.body, schema);
      if (validate_data.error) {
        res.status(400).json({
            status: 400,
            error:validate_data.error.details[0].message
        });
      }

    
    const text = `INSERT INTO
      reflections(userid, email, first_name, last_name, is_admin)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      uuid.v4(),
      req.body.email,
      req.body.first_name,
      req.body.last_name,
      req.body.is_admin
    ];
      const { rows } = await pool.query(text, values);
      return res.status(201).send(rows[0]);
    
  }
    

//     const { email,password } = req.body; 
//     const user=users.users.find(e => e.email === req.body.email);
//     if(!user){
//       return res.status(400).json({
//         status:400,
//         error:"You are not signed up"
//       })
//   }
//   const userId = users.userId;
// const is_admin=users_status.is_admin;
// jwt.sign({userId,is_admin}, "secretkey" ,(error,token)=>{
//     res.status(200).json({
//     status: 200,
//     data:{
//         token,
//         userId,
//         email,
//         first_name:users.first_name,
//         last_name:users.last_name
        
//     }    
// });
// });
// }
// module.exports [signup];
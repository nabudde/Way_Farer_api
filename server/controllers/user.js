import token from "../middleware/index"
import Joi from  'joi';
import uuid from 'uuid'
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
      reflections(user_id, password, email, first_name, last_name, is_admin)
      VALUES($1, $2, $3, $4, $5 ,$6)
      returning *`;
    const values = [
      uuid.v4(),
      req.body.email,
      req.body.password,
      req.body.first_name,
      req.body.last_name,
      req.body.is_admin
    ];
      const { rows } = await pool.query(text, values);
      console.log(token);
      return res.status(201).json({
        status:201,
        token,
        data:rows[0]
      }); 
    }
    
   
  exports.signin= async(req,res)=>{
    const schema = Joi.object().keys({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().required()
      });
      const validate_data = Joi.validate(req.body, schema);
      if (validate_data.error) {
        res.status(400).json({
            status: 400,
            error:validate_data.error.details[0].message
        });
      }
      const  login = `SELECT * FROM reflections WHERE email=$1;`;
    const values = [
      req.body.email
    ];
      const rows = await pool.query(login, values);
      const pssd = rows;
      if(pssd){
      return res.status(201).json({
        status:201,
        message:"You are logged in"
      }); 
      } res.status(400).json({
        status:400,
        error:"invalid password"
      }); 
    }


const jwt = require('jsonwebtoken');
const Joi =require ("joi");
const { users } = require('../models');
const{ users_status }=require('../models');
exports.signup = (req, res) => {
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
      const user_existance=users.find(e => e.email === req.body.email);
      if(user_existance){
          res.status(400).json({
              status: 400,
              error:"email already exists"
          });
      };
      const { email,first_name,last_name, password,is_admin } = req.body;
    const userId = users.length + 1;   
    const result = {
        userId, 
        email,
        first_name,
        last_name
    }; 
    const user_status= [];
    user_status.push({
        userId,
        is_admin
    })
    users.push(result);
    users_status.push(user_status);
    jwt.sign({userId, is_admin}, "secretkey" ,(error,token)=>{
        res.status(201).json({
            status: 201,
            data:{
                token,
                result 
            }
        })
    })
}




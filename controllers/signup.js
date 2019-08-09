const jwt = require('jsonwebtoken');
const Joi =require ("joi");
const { users } = require('../models');
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
    const { email,first_name,last_name, password,is_admin } = req.body;

    const userId = users.length + 1;   
    const result = {
        userId, 
        email,
        password,
        first_name,
        last_name
    };

    users.push(result);
   
    jwt.sign({userId}, "secretkey" ,(error,token)=>{
        res.status(201).json({
            status: 201,
            data:{
                token,
                result 
            }
        })
    })
}
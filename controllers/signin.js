const Joi =require ("joi");
const jwt = require('jsonwebtoken');
const { users } = require('../models');
const {users_status}=require('../models');

exports.signin=(req,res)=>{
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
    const { email,password } = req.body; 
    const user=users.find(e => e.email === req.body.email);
    if(!user){
      return res.status(400).json({
        status:400,
        error:"You are not signed up"
      })
  }
  const userId = users.userId;
const is_admin=users_status.is_admin;
jwt.sign({userId,is_admin}, "secretkey" ,(error,token)=>{
    res.status(200).json({
    status: 200,
    data:{
        token,
        userId,
        email,
        first_name:users.first_name,
        last_name:users.last_name
        
    }    
});
});
}

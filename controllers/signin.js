const Joi =require ("joi");
const jwt = require('jsonwebtoken');
const { users } = require('../models');

exports.signin=(req,res)=>{
    const schema = Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
      });
      const validate_data = Joi.validate(req.body, schema);
      if (validate_data.error) {
        res.status(400).send(validate_data.error.details[0].message);
      }
    const { email,password } = req.body;
    
    const checkIfSignup=users.find(e => e.email === req.body.email);
    if(!checkIfSignup){
      return res.status(400).send("You are not signed up")
  }
  const result = {
    email,
    first_name:checkIfSignup.first_name,
    last_name:checkIfSignup.last_name
};
jwt.sign({result}, "secretkey" ,(error,token)=>{
    res.status(200).json({
    status: "success",
    data:{
        token,
        result
    }    
});
});
}

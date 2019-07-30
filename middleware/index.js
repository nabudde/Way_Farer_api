const jwt=require("jsonwebtoken");
const secret="secret";

exports.token_verification=(req,res,next)=>{
    const token=req.headers["access-token"] ||req.headers.authorisation;
    if(!token){
        return res.status(400).json({
            error:"enter the token"
        });
    };
    console.log(res.body);
    jwt.verify(token,"secretkey",(error,response)=>{
        console.log(response);
        if(error){
            return res.status(400).json({
                error:"invalid token"
            });
        };
        req.userId=response.userId
        next();

    });
    
};
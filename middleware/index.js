const jwt=require("jsonwebtoken");
const secret="secret";

exports.token_verification=(req,res,next)=>{
    const token=req.headers["access-token"] ||req.headers.authorisation;
    if(!token){
        return res.status(400).json({
            error:"enter the token"
        });
    };
    
    jwt.verify(token,"secretkey",(error,response)=>{
        
        if(error){
            return res.status(400).json({
                error:"invalid token"
            });
        };
        req.userId=response.userId
        next();

    });
    
};
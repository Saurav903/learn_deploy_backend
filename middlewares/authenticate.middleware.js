const jwt = require("jsonwebtoken");

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                console.log(decoded.userID);
                req.body.userID=decoded.userID
                next();
            }else {
                res.send("login please");
            }
        })
    } else {
        res.send("login please")
    }
}

module.exports={
    authenticate
}

// 63ee8173c2f19482a3c579fb
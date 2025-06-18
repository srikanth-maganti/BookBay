import jwt from "jsonwebtoken"
export const authenticate_user=(req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if(!token)
    {   
        return res.status(401).send("Access Denied: No Token Provided");
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET, (err, user) => {
        
        if (err) {
            console.log(err.message);
            return res.status(403).send("Invalid Token");
        }
        req.user_id=user.userId;
        
        
        
    })
    next();
}
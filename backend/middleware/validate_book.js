const bookschema=require("../schema.js");
const ExpressError=require("./ExpressError.js");
export function validatebook(req,res,next)
{
    let {error}=bookschema.validate(req.body);
    if(error)
    {
        let msg=error.details.map(el=>el.message).join(",");
        throw new ExpressError(400,msg);
    }
    else
    {
        next();
    }
}
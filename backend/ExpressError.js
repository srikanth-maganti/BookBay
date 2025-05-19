const { model } = require("mongoose");

class ExpressError extends Error
{
    constructor(status,message,discription)
    {   super();
        this.status=status;
        this.message=message;
        
    }
}
module.exports=ExpressError;
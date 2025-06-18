import mongoose from "mongoose"
export function db_connection()
{
    async function main()
    {
        await mongoose.connect('mongodb://127.0.0.1:27017/buyabook');
    }
    
    main()
    .then(()=>{
        console.log("connected to database");
    })
    .catch((err)=>{
        console.log(err);
    })
    
}
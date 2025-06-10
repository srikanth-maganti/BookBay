const mongoose=require("mongoose");
const initdata=require("./data.js");
const books=require("../models/book.js");


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

async function insertdb()
{
    await books.deleteMany({});
    await books.insertMany(initdata);

}

insertdb().then(()=>{
    console.log("inserted all data");
})
.catch((Err)=>{
    console.log(Err);
})
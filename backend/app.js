const express=require("express");
const path=require("path");
const mongoose=require("mongoose");
const cors = require("cors");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const methodoverride=require("method-override");
const ExpressError=require("./ExpressError.js");
const asyncWrap=require("./middleware/asyncWrap.js");
const bookschema=require("./schema.js");

const User=require("./models/user.js");
const Book=require("./models/book.js");
const Cart=require("./models/cart.js");
const app=express();

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


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodoverride('_method'));

app.use(cors());  // Enable CORS for all routes

// If you want to allow only specific origins:
app.use(
  cors({
    origin: "http://localhost:5175", // Allow only your frontend
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type",
  })
);

function validatebook(req,res,next)
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

//home page
// app.get("/",asyncWrap(async (req,res)=>{
//     let data=await Book.find({});
//     res.json(data);
// }))


//books 
app.get("/books",asyncWrap(async(req,res)=>{

    let {category}=req.query;
    console.log(category);
    let data= null;
    if(category=="All")
    {
       data=await Book.find({});
    }
    else
    {
        data=await Book.find({Category:category});
        

    }
    if(!data)
    {
        throw new ExpressError(400,"Data Not Found");
    }
   
    res.json(data);
 
}))

app.get("/books/show/:id",asyncWrap(async(req,res)=>{
    let {id}=req.params;
    let [data]=await Book.find({_id:id});
    
    if(!data)
    {
        throw new ExpressError(400,"Book Not Found");
    }
    res.json(data);
}))




app.post("/books/search",asyncWrap(async(req,res)=>{

    let x=req.body.search;
    
    let data=await book.find({$or :[{Title:{ $regex: `^${x}$`, $options: "i" }},{Category:{ $regex: `^${x}$`, $options: "i" }},{Author:{ $regex: `^${x}$`, $options: "i" }}]});
    if(!data)
    {
        throw new ExpressError(400,"Book Not Found");
    }
    res.json(data);
}))


app.post('/books',validatebook,asyncWrap(async(req,res)=>{
    let newbook=new book(req.body.book);
    newbook.save();
    res.redirect("/books");
}))


app.get("/seller",(req,res)=>{
    res.render("./pages/registration.ejs");
})

app.post("/seller",(req,res)=>{
    console.log(req.body);
    res.render("./pages/sell.ejs");

})
app.get("/cart/payment",(req,res)=>{
    res.render("./pages/payment.ejs");
})

//cart
app.get("/cart",asyncWrap(async(req,res)=>{
    let data=await cart.find({});
    res.render("./pages/cart.ejs",{data});
}))

app.post("/cart/:id", asyncWrap(async (req, res) => {
    
        const { id } = req.params;
        const bookData = await book.findById(id);

        if (!bookData) {
            return res.status(404).send("Book not found");
        }

        const cartItem = await cart.findById(id);

        if (!cartItem) {
            const newCartItem = { ...bookData.toObject(), Count: 1 };
           
            await cart.insertMany([newCartItem]);
            console.log(`Added new book with id: ${id} to cart`);
        } else {
            const updatedCount = cartItem.Count + 1;
            await cart.findByIdAndUpdate(id, { Count: updatedCount });
            
        }

        res.redirect(`/books/show/${id}`);
    
}))

app.patch("/cart/:id",asyncWrap(async(req,res)=>{
    let {id}=req.params;
    

    let count=req.body.count;
    
    await cart.findByIdAndUpdate(id,{Count:count});
    res.redirect("/cart");
}))

app.delete("/cart/:id",asyncWrap(async(req,res)=>{
    let {id}=req.params;
    await cart.findByIdAndDelete(id);
    res.redirect("/cart");
}))


//authentication
app.get("/login",(req,res)=>{
    res.render("./pages/login.ejs");
})

app.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    let user=await User.findOne({email});
    if(!user)
    {
        throw new ExpressError(400,"Invalid Email");
    }
    const passwordmatch=await bcrypt.compare(password,user.password);
    if(!passwordmatch)
    {
        throw new ExpressError(400,"Invalid Password");
    }
    
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
        expiresIn: '1h',
        });
    res.send(token);
})

app.get("/signup",async(req,res)=>{
    
    res.render("./pages/signup.ejs");
})

app.post("/signup",async(req,res)=>{
    let {fullname,email,password}=req.body;
    console.log(req.body);
    let newpassword=await bcrypt.hash(password,10);
    
    let user={fullname,email,password:newpassword};

    let newuser=new User(user);
    await newuser.save();
    
})





//Error handling
app.all("*",(req,res,next)=>{
    next( new ExpressError(400,"Page not found")) ;
})


 
app.use((err,req,res,next)=>{
   
    if(err.name=="ValidationError")
    {   console.log(err);
        err.message="Validataion Error";
    }
    if(err.name=="CastError")
    {
        err.message=" Invalid Book Id";
    }
    next(err);
})
app.use((err,req,res,next)=>{
    
    let{status=500,message="Page not found"}=err;
    
    res.status(status).render("./pages/error.ejs",{message});
})

app.listen(3000,()=>{
    console.log("server started listening to port 3000");
})
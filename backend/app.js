const express=require("express");
const path=require("path");
const mongoose=require("mongoose");
const cors = require("cors");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
const methodoverride=require("method-override");
const ExpressError=require("./ExpressError.js");
const asyncWrap=require("./middleware/asyncWrap.js");
const bookschema=require("./schema.js");
const { OAuth2Client } = require("google-auth-library");
const User=require("./models/user.js");
const Book=require("./models/book.js");
const Cart=require("./models/cart.js");
dotenv.config();
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
    origin: "http://localhost:5173", // Allow only your frontend
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["Content-Type","Authorization"],
  })
);


const client = new OAuth2Client(process.env.CLIENT_ID);
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


const authenticate_user=(req, res, next) => {
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




app.get("/books", asyncWrap(async (req, res) => {
    const { category, search } = req.query;
    let data;
    
    if (search) {
        data = await Book.find({
            $or: [
                { Title: { $regex: search, $options: "i" } },
                { Author: { $regex: search, $options: "i" } },
                { Category: { $regex: search, $options: "i" } }
            ]
        });
    } else if (category && category !== "All") {
        data = await Book.find({ Category: category });
    } else {
        data = await Book.find({});
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ message: "No books found" });
    }

    res.json(data);
}));


app.get("/books/show/:id",asyncWrap(async(req,res)=>{
    let {id}=req.params;
    let [data]=await Book.find({_id:id});
    
    if(!data)
    {
        throw new ExpressError(400,"Book Not Found");
    }
    
    res.json(data);
}))

app.get("/books/trending",asyncWrap(async(req,res)=>{
    
}))


app.post('/books',validatebook,asyncWrap(async(req,res)=>{
    let newbook=new Book(req.body.book);
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
app.get("/cart/payment",authenticate_user,(req,res)=>{
    res.render("./pages/payment.ejs");
})
app.get("/cart", authenticate_user, asyncWrap(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user_id }).populate("items.book"); // Optional: populate book details
    
  if (!cart || cart.items.length === 0) {
    
    return res.json({items:[]});
  }

  res.json(cart);
}));


app.post("/cart/:id", authenticate_user, asyncWrap(async (req, res) => {
    const { id } = req.params;
    const user_id = req.user_id;
    
    // Check if book exists
    const bookData = await Book.findById(id);
    if (!bookData) {
        console.log("book not found");
        return res.status(404).send("Book not found");
    }

    // Check if cart exists for the user
    let userCart = await Cart.findOne({ userId: user_id });

    if (!userCart) {
        // If cart doesn't exist, create a new one
        const newCart = new Cart({
            userId: user_id,
            items: [{ book: id, count: 1 }]
        });
        await newCart.save();
        
        return res.send("Cart created and book added");
    }

    // If cart exists, check if book is already in the cart
    const itemIndex = userCart.items.findIndex(item => item.book.toString() === id);

    if (itemIndex > -1) {
        // Book exists in cart, increment count
        userCart.items[itemIndex].count += 1;
    } else {
        // Book not in cart, add it
        userCart.items.push({ book: id, count: 1 });
    }

    await userCart.save();
    
    res.send("Book added updated in cart successfully");
}));


app.patch("/cart/:bookId", authenticate_user, asyncWrap(async (req, res) => {
    const { bookId } = req.params;
    const { action } = req.body;
    const userId = req.user_id;

    const incValue = action === "increment" ? 1 : action === "decrement" ? -1 : null;
    if (incValue === null) return res.status(400).send("Invalid action");

    const result = await Cart.updateOne(
        { userId, "items.book": bookId },
        { $inc: { "items.$.count": incValue } }
    );

    if (result.modifiedCount === 0) {
        return res.status(404).send("Book not found in cart");
    }

    res.send(`Book count ${action}ed successfully`);
}));

app.delete("/cart/:id", authenticate_user, asyncWrap(async (req, res) => {
    const { id } = req.params;
    const userId = req.user_id;

    const result = await Cart.updateOne(
        { userId },
        { $pull: { items: { book:id } } }
    );

    if (result.modifiedCount === 0) {
        return res.status(404).send("Book not found in cart");
    }

    res.send("Book removed from cart successfully");
}));



//authentication

app.post("/api/auth/google", async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ fullname:name,email:email });
    }

    // Create JWT token for session
    const appToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log("success",appToken);
    res.json({ token: appToken });

  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
});

app.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    
    let user=await User.findOne({email});
    if(!user)
    {
        return res.status(400).send("User not found with this email");
    }
    const passwordmatch=await bcrypt.compare(password,user.password);
    if(!passwordmatch)
    {
       return res.status(400).send("Invalid Password");
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
        });
    
    res.json({token});
})


app.post("/signup", asyncWrap(async (req, res) => {
  let { fullname, email, password } = req.body;

  let existingUser = await User.findOne({ email: email });
  if (existingUser) {
    console.log("exist");
    return res.status(400).send("User already exists with this email");
  }

  let hashedPassword = await bcrypt.hash(password, 10);

  let newUser = new User({
    fullname,
    email,
    password: hashedPassword
  });

  await newUser.save();

  // No need to fetch again, you already have the user
  let token = jwt.sign(
    { userId: newUser._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  console.log(token);
  res.json({ token });
}));






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
    
    res.send(message);
})

app.listen(3000,()=>{
    console.log("server started listening to port 3000");
})
import Book from "../models/book.js"

export const allbooks=async (req, res) => {
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
}

export const showbook=async(req,res)=>{
    let {id}=req.params;
    let [data]=await Book.find({_id:id});
    
    if(!data)
    {
        throw new ExpressError(400,"Book Not Found");
    }
    
    res.json(data);
}

export const trendingbooks=(req,res)=>{
    res.send("trendng");
}

export const addbook=async(req,res)=>{
    let newbook=new Book(req.body.book);
    newbook.save();
    res.redirect("/books");
}
import express from "express"
import asyncWrap from "../utils/asyncWrap.js";
import { validatebook } from "../middleware/validate_book.js";
import { allbooks,showbook,trendingbooks,addbook } from "../controllers/books.controllers.js";
const bookrouter=express.Router();

bookrouter.get("/",asyncWrap(allbooks));
bookrouter.get("/show/:id",asyncWrap(showbook));
bookrouter.get("/trending",asyncWrap(trendingbooks));
bookrouter.post("/",validatebook,asyncWrap(addbook));

export default bookrouter;
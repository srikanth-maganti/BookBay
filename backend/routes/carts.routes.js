import express from "express";
import asyncWrap from "../utils/asyncWrap";
import { authenticate_user } from "../middleware/authenticate_user";
import { getcartitem,createcartitem,modifycartitem,deletecartitem } from "../controllers/carts.controllers.js";

const cartrouter=express.Router();

cartrouter.get("/",authenticate_user,asyncWrap(getcartitem));
cartrouter.post("/:id",authenticate_user , asyncWrap(createcartitem) );
cartrouter.patch("/:bookId",authenticate_user,asyncWrap(modifycartitem));
cartrouter.delete("/:id",authenticate_user,asyncWrap(deletecartitem));

export default cartrouter;

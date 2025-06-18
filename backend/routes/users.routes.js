import express from "express"
import asyncWrap from "../utils/asyncWrap";
import { loginuser,signupuser } from "../controllers/users.controllers";
const userrouter=express.Router();

userrouter.post("/login",asyncWrap(loginuser));
userrouter.post("/signup",asyncWrap(signupuser));


export default userrouter;
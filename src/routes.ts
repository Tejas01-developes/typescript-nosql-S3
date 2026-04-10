import express from "express";
import { insertfile, insertuser, login, upload } from "./controller.js";
import { cookiefilter } from "./filter.js";



const router=express.Router();


router.post("/",insertuser);
router.post("/login",login);
router.post("/post",cookiefilter,upload.single("image"),insertfile)

export default router
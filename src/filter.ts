import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

type reqdata=JwtPayload&{
    id:string
}

export const cookiefilter=(req:reqdata,resp:Response,next:NextFunction)=>{
    const refreshtoken:string=req.cookies.refresh;

    if(!refreshtoken){
        return resp.status(400).json({success:false,message:"no token avalible in the cookie"})
    }
try{
    const decode=  jwt.verify(refreshtoken,process.env.REFRESH_KEY as string) as reqdata

    req.id=decode.id
    console.log(req.id);
    next();
}catch(err){
    return resp.status(400).json({success:false,message:"token filter failed"})
}
}
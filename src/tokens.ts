import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

type tokendata={
    id:string
}
export const accesstoken=(data:tokendata):string=>{
 return jwt.sign(
    {id:data.id},
    process.env.ACCESS_KEY as string,
    {expiresIn:'15m'}
)

}



export const refreshtoken=(data:tokendata):string=>{
    return jwt.sign(
       {id:data.id},
       process.env.REFRESH_KEY as string,
       {expiresIn:'15m'}
   )
   
   }
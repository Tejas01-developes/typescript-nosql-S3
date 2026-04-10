import  {Db, MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const client=new MongoClient(process.env.MONGODB_LINK as string)
let database:Db;
// let collection:Collection;
export const db=async()=>{
try{
    await client.connect();
    database=client.db(process.env.DB as string)
    // collection=database.collection(process.env.COLLECTION as string)
    console.log("mongo db connected")
}catch(err){
    throw new Error("db connection failed")
}
}
export {database}
// export {collection}
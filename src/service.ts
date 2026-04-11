
import {  database } from "./dbconnection.js"






type insertdata={
    name:string,
    email:string,
    password:string
}

export const insertquery=async(data:insertdata)=>{
try{
const dbinsert=database.collection(process.env.COLLECTION as string).insertOne({name:data.name,email:data.email,password:data.password})
return dbinsert

}catch(err){
throw new Error("db insert failed")
}
}

type details={
    email:string
}

type datatype={
    _id:string,
    password:string,
    name:string

}

export const getdetail=async(data:details):Promise<datatype | null>=>{
try{
    const res=await database.collection(process.env.COLLECTION as string).findOne<datatype>({email:data.email});

    return res
}catch(err){
    throw new Error("no detail get from the database")
}
}

type tkndata={
    userid:string
}
type tknreturndata={
    name:string,
    email:string,
    added_at:number,
    expired_at:number
    token:string
}

export const gettkndetails=async(data:tkndata):Promise<tknreturndata | null>=>{
try{
    const refreshdetails=await database.collection<tknreturndata>(process.env.TOKEN_COLLECTION as string).findOne({userid:data.userid})
    if(!refreshdetails){
        return null
    }
return refreshdetails
}catch(err){
    return null
}
}


type updatedta={
   
    token:string,
 
}



export const updatetokendetail=async(data:updatedta):Promise<boolean | string>=>{
    try{
        const refreshdetailsupdate=await database.collection(process.env.TOKEN_COLLECTION as string).updateOne({token:data.token},{
            $set:{added_at:new Date(Date.now()),expired_at:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            }})
       return true
    }catch(err){
        return "token update  failed "
    }
    }


    type inserttkndta={
        userid:string,
        token:string,
       
    }

    export const inserttoken=async(data:inserttkndta):Promise<string>=>{
        try{
            const inserttoken=await database.collection(process.env.TOKEN_COLLECTION as string).insertOne({userid:data.userid,token:data.token,added_at:new Date(Date.now()),expired_at:new Date(Date.now() +  7 * 24 * 60 * 60 * 1000)}) 
            return "token inserted"
        }catch(err){
            return "token insertion failed"
        }
    }

type filedata={
    userid:string
    filename:string,
    key:string,
    extension:string
    url:string
}

export const filemetadata=async(data:filedata):Promise<string>=>{
try{
const insetfiledta=await database.collection(process.env.FILE_COLLECTION as string).insertOne({userid:data.userid,filename:data.filename,key:data.key,extension:data.extension,url:data.url})
return "file uploaded"

}catch(err){
    return "file upload error"
}

}

type filedta={
id:string
}

type returnfiledata={
    url:string,
}

export const getfiledta=async(data:filedta):Promise<returnfiledata | null>=>{
try{
    const res=await database.collection(process.env.FILE_COLLECTION as string).findOne<returnfiledata>({userid:data.id})
    return res
}catch(err){
return null
}
}
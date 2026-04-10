import { S3Client } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
dotenv.config();
export const client=new S3Client({
    region:process.env.AWS_REGION as string,
    credentials:{
        accessKeyId:process.env.ACCESS_AWS as string,
        secretAccessKey:process.env.SECRET_AWS as string
    }
})

import bcrypt from "bcrypt";
import { filemetadata, getdetail, getfiledta, gettkndetails, insertquery, inserttoken, updatetokendetail } from "./service.js";
import { accesstoken, refreshtoken } from "./tokens.js";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { client } from "./fileupload.js";
import multer from "multer";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
export const insertuser = async (req, resp) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        resp.status(400).json({ success: false, message: "body not recived" });
        return;
    }
    const hash = await bcrypt.hash(password, 10);
    try {
        const insert = await insertquery({ name, email, password: hash });
        resp.status(200).json({ success: true, message: "insert success" });
        return;
    }
    catch (err) {
        resp.status(400).json({ success: false, message: "insert failed" });
        return;
    }
};
export const login = async (req, resp) => {
    const { email, password } = req.body;
    if (!email || !password) {
        resp.status(400).json({ success: false, message: "body not recived" });
        return;
    }
    try {
        const details = await getdetail({ email });
        if (!details) {
            resp.status(400).json({ success: false, message: "no details in the database" });
            return;
        }
        const compare = await bcrypt.compare(password, details?.password);
        if (!compare) {
            resp.status(400).json({ success: false, message: "password is incorrect" });
            return;
        }
        const access = accesstoken({ id: details._id.toString() });
        let refresh;
        const finddetails = await gettkndetails({ userid: details._id.toString() });
        if (!finddetails) {
            refresh = refreshtoken({ id: details._id });
            const insert = await inserttoken({ userid: details._id.toString(), token: refresh });
        }
        else {
            const now = Date.now();
            const expireddate = finddetails.expired_at;
            if (now > expireddate) {
                refresh = refreshtoken({ id: details._id });
                const update = await updatetokendetail({ token: refresh });
            }
            refresh = finddetails.token;
        }
        resp.cookie("refresh", refresh, {
            httpOnly: true,
            sameSite: 'lax',
            secure: true,
            path: "/"
        });
        resp.status(200).json({ success: true, message: "login succesfull" });
        return;
    }
    catch (err) {
        resp.status(400).json({ success: false, message: "login failed" });
        return;
    }
};
const storage = multer.memoryStorage();
export const upload = multer({ storage });
export const insertfile = async (req, resp) => {
    if (!req.file) {
        resp.status(400).json({ success: false, message: "file not recived from the frontend" });
        return;
    }
    const filename = req.file.originalname;
    const uniquename = Date.now() + "_" + filename;
    const params = {
        Bucket: process.env.BUCKET,
        Key: uniquename,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    };
    try {
        await client.send(new PutObjectCommand(params));
        const url = `https://${process.env.BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniquename}`;
        const userid = req.id;
        const insert = await filemetadata({ userid: userid, filename: filename, key: uniquename, extension: req.file.mimetype, url: url });
        resp.status(200).json({ success: true, message: "file insert succesfull" });
        return;
    }
    catch (err) {
        resp.status(400).json({ success: false, message: "unable to insert image" });
        return;
    }
};
export const getfile = async (req, resp) => {
    if (!req.id) {
        resp.status(400).json({ success: false, message: "login first for token" });
        return;
    }
    try {
        const getfiledetail = await getfiledta({ id: req.id });
        if (!getfiledetail) {
            resp.status(400).json({ success: false, message: "file detaqils is not there in the database" });
            return;
        }
        const key = getfiledetail.key;
        const getfile = new GetObjectCommand({
            Bucket: process.env.BUCKET,
            Key: key
        });
        // const data=await client.send(getfile);
        // resp.setHeader("Content-Type",data.ContentType || "application/octet-stream");
        // (data.Body as any).pipe(resp)
        const signedurl = await getSignedUrl(client, getfile, { expiresIn: 3600 });
        resp.json(signedurl);
        // console.log(signedurl)
        return;
    }
    catch (err) {
        resp.status(400).json({ success: false, message: "file fetch failed" });
        return;
    }
};
//# sourceMappingURL=controller.js.map
import { database } from "./dbconnection.js";
export const insertquery = async (data) => {
    try {
        const dbinsert = database.collection(process.env.COLLECTION).insertOne({ name: data.name, email: data.email, password: data.password });
        return dbinsert;
    }
    catch (err) {
        throw new Error("db insert failed");
    }
};
export const getdetail = async (data) => {
    try {
        const res = await database.collection(process.env.COLLECTION).findOne({ email: data.email });
        return res;
    }
    catch (err) {
        throw new Error("no detail get from the database");
    }
};
export const gettkndetails = async (data) => {
    try {
        const refreshdetails = await database.collection(process.env.TOKEN_COLLECTION).findOne({ userid: data.userid });
        if (!refreshdetails) {
            return null;
        }
        return refreshdetails;
    }
    catch (err) {
        return null;
    }
};
export const updatetokendetail = async (data) => {
    try {
        const refreshdetailsupdate = await database.collection(process.env.TOKEN_COLLECTION).updateOne({ token: data.token }, {
            $set: { added_at: new Date(Date.now()), expired_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            }
        });
        return true;
    }
    catch (err) {
        return "token update  failed ";
    }
};
export const inserttoken = async (data) => {
    try {
        const inserttoken = await database.collection(process.env.TOKEN_COLLECTION).insertOne({ userid: data.userid, token: data.token, added_at: new Date(Date.now()), expired_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
        return "token inserted";
    }
    catch (err) {
        return "token insertion failed";
    }
};
export const filemetadata = async (data) => {
    try {
        const insetfiledta = await database.collection(process.env.FILE_COLLECTION).insertOne({ userid: data.userid, filename: data.filename, key: data.key, extension: data.extension, url: data.url });
        return "file uploaded";
    }
    catch (err) {
        return "file upload error";
    }
};
export const getfiledta = async (data) => {
    try {
        const res = await database.collection(process.env.FILE_COLLECTION).findOne({ userid: data.id });
        return res;
    }
    catch (err) {
        return null;
    }
};
//# sourceMappingURL=service.js.map
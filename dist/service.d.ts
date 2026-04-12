type insertdata = {
    name: string;
    email: string;
    password: string;
};
export declare const insertquery: (data: insertdata) => Promise<import("mongodb").InsertOneResult<import("bson").Document>>;
type details = {
    email: string;
};
type datatype = {
    _id: string;
    password: string;
    name: string;
};
export declare const getdetail: (data: details) => Promise<datatype | null>;
type tkndata = {
    userid: string;
};
type tknreturndata = {
    name: string;
    email: string;
    added_at: number;
    expired_at: number;
    token: string;
};
export declare const gettkndetails: (data: tkndata) => Promise<tknreturndata | null>;
type updatedta = {
    token: string;
};
export declare const updatetokendetail: (data: updatedta) => Promise<boolean | string>;
type inserttkndta = {
    userid: string;
    token: string;
};
export declare const inserttoken: (data: inserttkndta) => Promise<string>;
type filedata = {
    userid: string;
    filename: string;
    key: string;
    extension: string;
    url: string;
};
export declare const filemetadata: (data: filedata) => Promise<string>;
type filedta = {
    id: string;
};
type returnfiledata = {
    url: string;
    key: string;
};
export declare const getfiledta: (data: filedta) => Promise<returnfiledata | null>;
export {};
//# sourceMappingURL=service.d.ts.map
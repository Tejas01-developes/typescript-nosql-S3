import { Request, Response } from "express";
import multer from "multer";
type bodydata = {
    name: string;
    email: string;
    password: string;
};
export declare const insertuser: (req: Request<{}, {}, bodydata>, resp: Response) => Promise<void>;
type bodydta = {
    email: string;
    password: string;
};
export declare const login: (req: Request<{}, {}, bodydta>, resp: Response) => Promise<void>;
export declare const upload: multer.Multer;
interface filerequest extends Request {
    file: Express.Multer.File;
    id: string;
}
export declare const insertfile: (req: filerequest, resp: Response) => Promise<void>;
export {};
//# sourceMappingURL=controller.d.ts.map
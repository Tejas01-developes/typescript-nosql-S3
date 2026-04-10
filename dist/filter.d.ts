import { NextFunction, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
type reqdata = JwtPayload & {
    id: string;
};
export declare const cookiefilter: (req: reqdata, resp: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=filter.d.ts.map
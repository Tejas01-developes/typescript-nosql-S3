import { NextFunction, Request, Response } from 'express';
type reqdata = Request & {
    id: string;
};
export declare const cookiefilter: (req: reqdata, resp: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=filter.d.ts.map
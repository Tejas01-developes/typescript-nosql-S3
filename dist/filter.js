import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const cookiefilter = (req, resp, next) => {
    const refreshtoken = req.cookies.refresh;
    if (!refreshtoken) {
        return resp.status(400).json({ success: false, message: "no token avalible in the cookie" });
    }
    try {
        const decode = jwt.verify(refreshtoken, process.env.REFRESH_KEY);
        req.id = decode.id;
        next();
    }
    catch (err) {
        console.log("JWT ERROR", err);
        return resp.status(400).json({ success: false, message: "token filter failed" });
    }
};
//# sourceMappingURL=filter.js.map
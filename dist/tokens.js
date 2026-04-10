import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const accesstoken = (data) => {
    return jwt.sign({ id: data.id }, process.env.ACCESS_KEY, { expiresIn: '15m' });
};
export const refreshtoken = (data) => {
    return jwt.sign({ id: data.id }, process.env.REFRESH_KEY, { expiresIn: '15m' });
};
//# sourceMappingURL=tokens.js.map
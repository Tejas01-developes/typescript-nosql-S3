import express from "express";
import { db } from "./dbconnection.js";
import router from "./routes.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
db();
app.use("/apis", router);
app.listen(3000, () => {
    console.log("port started on the port 3000");
});
//# sourceMappingURL=app.js.map
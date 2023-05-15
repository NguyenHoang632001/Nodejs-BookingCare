import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

let app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "http//localhost:3000");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use(bodyParser.json({ limit: "5000mb" }));
app.use(bodyParser.urlencoded({ limit: "5000mb" }, { extended: true }));
app.use(express.json());
viewEngine(app);
initWebRoutes(app);
connectDB();
let port = process.env.PORT || 6969;
console.log(process.env.PORT);
app.listen(port, () => {
  console.log("backend with Hoang" + port);
});

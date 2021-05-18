import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import flash from "express-flash";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./db";
import "./model/User";
import "./model/Video";
import "./passport";
import globalRouter from "./router/globalRouter";
import videoRouter from "./router/videoRouter";
import { globalVar } from "./middlewares";



//미들웨어 && 기초셋팅
const app = express();
const PORT = 5000;
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "pug");

//회원가입
const CokieStore = MongoStore(session);
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(globalVar); //받은 req.user를 위해 쿠키 생성 이후로 내림


//라우터
app.use('/', globalRouter);
app.use('/video', videoRouter);



app.listen(PORT, () => console.log(`✅ Express Running at PORT ${PORT}`));
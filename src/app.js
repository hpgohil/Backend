import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";

//routes declaration

//Earlier we used to write app.GET() (when we were not exporting router;
//Earlier it was working because with the help of "app", we used to write routes & controllers ie. app.GET(), app.POST();
//but now since Router() is also defined & router is separated, we need to use middleware to bring the router here
//so we will write app.use("/path name", routerName (which router we want to bring on this page));
//eg. app.use("/users", userRouter)
//so in url, if any user writes "/users", then we will give control to userRouter
//now control is passed to userRouter. so we will reach in user.routes.js file.
// now we will write further routes where we want to take our user on.
//eg. router.route("/register").POST(name of the method we want to run on POST)
//ie url will be - http://localhost:8000/users/register
//using route variable, we will use "route" instead of "app".

app.use("/api/v1/users", userRouter);
export { app };

import  express  from "express";
import  Router  from "express";
import cors from "cors";
import userRouter from "./router/user";

// app.use("api/v1/user", userRouter);
// app.use("api/v1/zap", zapouter);

const app = express();

app.use(cors());
app.use(express.json());



// app.get("/", (req, res) => {
//     res.send()
// }) 
 
console.log(myFunc);


function myFunc() {
    console.log("test");
}
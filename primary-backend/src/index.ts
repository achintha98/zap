import  express  from "express";
import  Router  from "express";
import cors from "cors";
import userRouter from "./router/user";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", userRouter);
 
app.listen(3000);
import  express  from "express";
import cors from "cors";
import userRouter from "./router/user";
import zapRouter from "./router/zap";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", userRouter);
app.use("/api/v1", zapRouter); 

app.listen(3000);
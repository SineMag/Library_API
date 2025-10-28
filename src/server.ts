import bodyParser from "body-parser";
import { log } from "console";
import express, { Express } from "express";
import { loggerMiddleware } from "./middleware/logger";
import router from "./routes/user";



const app: Express = express();
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(bodyParser.json())


app.use(loggerMiddleware);
//http://localhost:3000/v1/users/8
app.use("/v1/users", router)


app.listen(PORT,  () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
})
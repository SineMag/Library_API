import bodyParser from "body-parser";
import { log } from "console";
import express, { Express } from "express";
import { loggerMiddleware } from "./middleware/logger";
import router from "./routes/users";



const app: Express = express();
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(bodyParser.json())


app.use(loggerMiddleware);
//http://localhost:3000/v1/users/8
import authorRouter from "./routes/author";
import bookRouter from "./routes/book";

app.use("/v1/authors", authorRouter);
app.use("/v1/books", bookRouter);

import { errorHandler } from "./middleware/errorHandler";

app.use(errorHandler);


app.listen(PORT,  () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
})
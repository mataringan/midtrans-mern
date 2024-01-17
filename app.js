import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import apiRouters from "./src/routes/index.js";
import { mongoose } from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", apiRouters);

mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
    })
    .then(() => {
        app.listen(9000, () => {
            console.log("Connection Success");
        });
    })
    .catch((err) => console.log(err));

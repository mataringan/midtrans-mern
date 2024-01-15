import app from "./app.js";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send(`Server Berjalan di port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});

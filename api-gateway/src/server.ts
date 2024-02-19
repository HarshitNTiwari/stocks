import dotenv from "dotenv";
import { app } from "./app.ts";

dotenv.config({
    path: '../.env'
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`)
})
import dotenv from "dotenv"
import { app } from "./app.ts";

// setting path for loading environment variables
dotenv.config({
    path: '../.env'
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`)
})
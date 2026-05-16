import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";

dotenv.config({ path: "src/.env" });

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
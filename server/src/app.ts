import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/lead.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
    res.send("API Running");
});

export default app;
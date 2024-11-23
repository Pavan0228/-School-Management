import express from "express";
import schoolRoutes from "./routes/schoolRoutes.js";
import { initializeDatabase } from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json({ limit: "16kb" }));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use("/", schoolRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await initializeDatabase();
        console.log("Database initialized successfully");
    } catch (error) {
        console.error("Failed to initialize the database:", error.message);
    }
});

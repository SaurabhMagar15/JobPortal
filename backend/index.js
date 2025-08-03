import express from 'express';
import path from 'path';
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config({});
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import fs from 'fs';
import { User } from "./models/user.model.js";

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
}
app.use(cors(corsOptions));

//apis
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.get("/", (req, res) => {
    res.send("Welcome to the Job Portal API");
});

console.log(process.env.PORT);
app.listen(port, "0.0.0.0", () => {
    connectDB().catch((error) => {
        console.log("Database connection failed:", error);
    });
    console.log(`Server is running on http://localhost:${port}`);
});

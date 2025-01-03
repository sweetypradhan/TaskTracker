import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskRoutes from './routes/taskRoutes.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', 
}));

// MongoDB connection
mongoose.connect("mongodb+srv://todo:todolist@cluster0.5znj4.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connection is successful");
        app.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
    })
    .catch(err => {
        console.error("Database connection error:", err);
    });

// Routes
app.use('/api', taskRoutes);
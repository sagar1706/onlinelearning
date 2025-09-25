import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js"
import lessonModuleRoutes from "./routes/lessonModuleRoutes.js";


dotenv.config();  // load .env variables
connectDB();      // connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON request bodies

app.use("/api/auth", authRoutes)
app.use("/api/courses", courseRoutes)
app.use("/api/user", userRoutes);
app.use("/api/lesson-modules", lessonModuleRoutes);



app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
console.log("MY NEW CHANGES");
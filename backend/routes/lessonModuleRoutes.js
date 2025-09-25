import express from "express";
import LessonModule from "../models/LessonModule.js";
import Course from "../models/Course.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new LessonModule (Instructor/Admin only)
router.post("/:courseId", protect, async (req, res) => {
  try {
    // 1️⃣ Role Check: Only instructor or admin can create a module
    if (req.user.role !== "instructor" && req.user.role !== "admin") {
      return res.status(403).json({ error: "Only instructors can add modules" });
    }

    // 2️⃣ Destructure title and content from request body
    const { title, content } = req.body;

    // 3️⃣ Find the course by ID
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    // 4️⃣ Create the LessonModule linked to the course
    const lessonModule = await LessonModule.create({
      title,
      content,
      course: course._id,
    });

    // 5️⃣ Send back success response
    res.status(201).json({ message: "LessonModule created", lessonModule });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all LessonModules for a course (anyone can view)
router.get("/:courseId", async (req, res) => {
  try {
    const lessonModules = await LessonModule.find({ course: req.params.courseId });
    res.json(lessonModules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

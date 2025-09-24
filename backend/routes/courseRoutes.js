import express from "express";
import Course from "../models/Course.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a course (instructor only)
router.post("/", protect, async (req, res) => {
  try {
    if (req.user.role !== "instructor" && req.user.role !== "admin") {
      return res.status(403).json({ error: "Only instructors can create courses" });
    }
    const { title, description } = req.body;
    const course = await Course.create({ title, description, instructor: req.user._id });
    res.json({ message: "Course created", course });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all courses
router.get("/", async (req, res) => {
  const courses = await Course.find().populate("instructor", "name email");
  res.json(courses);
});

// Enroll in a course (student)
router.post("/:id/enroll", protect, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ error: "Only students can enroll" });
    }
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    if (course.students.includes(req.user._id)) {
      return res.status(400).json({ error: "Already enrolled" });
    }

    course.students.push(req.user._id);
    await course.save();
    res.json({ message: "Enrolled successfully", course });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;

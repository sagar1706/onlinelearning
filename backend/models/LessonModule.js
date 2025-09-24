import mongoose from "mongoose";

const lessonModuleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String, // text, video URL, quiz, etc.
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

const LessonModule = mongoose.model("LessonModule", lessonModuleSchema);
export default LessonModule;

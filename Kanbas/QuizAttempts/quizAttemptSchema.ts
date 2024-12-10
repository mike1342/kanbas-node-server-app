import mongoose from "mongoose";

const questionAttemptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  questionType: {
    type: String,
    enum: ['MC', 'TF', 'FillIn'],
    required: true,
  },
  selectedChoice: String, // For MC questions
  selectedAnswer: mongoose.Schema.Types.Mixed, // String for MC/FillIn, Boolean for TF
}, { _id: false });

const quizAttemptSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  answers: [
   {type: questionAttemptSchema, required: true} 
  ],
  score: {
    type: Number,
    required: true,
  },
  timeStarted: {
    type: Date,
    required: true,
  },
  timeEnded: {
    type: Date,
    required: true,
  },
}, { collection: "quizAttempts" });

export default quizAttemptSchema;
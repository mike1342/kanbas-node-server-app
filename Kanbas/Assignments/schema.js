import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  description: String
}, {collection: "assignments"});

export default assignmentSchema;

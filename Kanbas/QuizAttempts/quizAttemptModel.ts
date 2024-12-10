import mongoose, { Model } from "mongoose";
import quizAttemptSchema from "./quizAttemptSchema";
import { QuizAttempt } from "../types";

const quizAttemptModel: Model<QuizAttempt> = mongoose.model<QuizAttempt>("QuizAttempt", quizAttemptSchema);
export default quizAttemptModel;
import mongoose, { Model } from "mongoose";
import quizSchema from "./quizSchema";
import { Quiz } from "../types";

const quizModel: Model<Quiz> = mongoose.model<Quiz>("Quiz", quizSchema);
export default quizModel;
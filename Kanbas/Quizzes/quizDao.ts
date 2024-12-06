/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddQuizResponse, Quiz } from "../types";
import quizModel from "./quizModel";

export const saveQuiz = async (quiz: Quiz): Promise<AddQuizResponse> => {
  try {
    const newQuiz: Quiz = await quizModel.create(quiz);
    return newQuiz;
  } catch (error: unknown) {
    return { error: 'Error when saving quiz' };
  }
};
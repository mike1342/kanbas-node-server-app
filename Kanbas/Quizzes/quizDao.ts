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

export const findQuizById = async (qid: string): Promise<AddQuizResponse> => {
  try {
    const quiz: Quiz | null = await quizModel.findById(qid);
    if (!quiz) {
      return { error: 'Quiz not found' };
    }
    return quiz;
  } catch (error: unknown) {
    return { error: 'Error when fetching quiz' };
  }
}
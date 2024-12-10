/* eslint-disable @typescript-eslint/no-unused-vars */
import quizModel from "../Quizzes/quizModel";
import { AddQuizResponse, GetQuizAttemptsForQuizResponse, QuizAttempt, SubmitQuizAttemptResponse } from "../types";
import quizAttemptModel from "./quizAttemptModel";

export const saveQuizAttempt = async (quizAttempt: QuizAttempt): Promise<SubmitQuizAttemptResponse> => {
  try {
    const newQuizAttempt: QuizAttempt = await quizAttemptModel.create(quizAttempt);

    return newQuizAttempt;
  } catch (error: unknown) {
    return { error: 'Error when saving quiz attempt' };
  }
};

export const addAttemptToQuiz = async (attempt: QuizAttempt): Promise<AddQuizResponse | null> => {
  try {

    const quiz = await quizModel.findById(attempt.quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    // Validate answers against quiz questions - TODO

    const result = await quizModel.findByIdAndUpdate(
      { _id: attempt.quizId },
      { $push: { quizAttempts: attempt._id } },
      { new: true }
    );
    console.log(result);
    return result;
  } catch (error: unknown) {
    quizAttemptModel.findByIdAndDelete(attempt._id);
    return { error: 'Error when adding attempt to quiz' };
  }
};

export const removeQuizAttempt = async (qaid: string) => {
  try {
    const status = await quizAttemptModel.findByIdAndDelete(qaid);
    if (!status) {
      return { error: 'Quiz attempt not found' };
    }
    return status;
  } catch (error: unknown) {
    return { error: 'Error when deleting quiz attempt' };
  }
};

export const findQuizAttemptById = async (qaid: string): Promise<SubmitQuizAttemptResponse> => {
  try {
    const quizAttempt: QuizAttempt | null = await quizAttemptModel.findById(qaid);
    if (!quizAttempt) {
      throw new Error('Quiz attempt not found');
    }
    return quizAttempt;
  } catch (error: unknown) {
    return { error: 'Error when fetching quiz attempt' };
  }
}

export const findQuizAttemptsForQuiz = async (qid: string, uid: string): Promise<GetQuizAttemptsForQuizResponse> => {
  try {
    const quizAttempts: QuizAttempt[] = await quizAttemptModel.find({ quizId: qid, studentId: uid });
    return quizAttempts;
  } catch (error: unknown) {
    return { error: 'Error when fetching quiz attempts' };
  }
}
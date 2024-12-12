/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddQuizResponse, FindQuizzesByCourseResponse, Quiz } from '../types';
import model from '../Users/model';
import quizModel from './quizModel';

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
};

export const findQuizzesByCourse = async (cid: string, uid: string): Promise<FindQuizzesByCourseResponse> => {
  try {

    const user = await model.findById(uid);
    if (!user) {
      return { error: 'User not found' };
    }
    const query: Partial<Quiz> = { cid: cid };
    if (user.role === 'STUDENT') {
      query['isPublished'] = true;
    }

    const quizzes: Quiz[] = await quizModel.find(query);
    //Shuffle questions if needed
    quizzes.forEach((quiz) => {
      if (quiz.shuffleAnswers) {
        quiz.questions.sort(() => Math.random() - 0.5);
      }
    });
    return quizzes;
  } catch (error: unknown) {
    return { error: 'Error when fetching quizzes' };
  }
};

export const setQuiz = async (quiz: Quiz): Promise<AddQuizResponse> => {
  try {
    const updatedQuiz: Quiz | null = await quizModel.findByIdAndUpdate(quiz._id, quiz, {
      new: true,
    });
    if (!updatedQuiz) {
      return { error: 'Quiz not found' };
    }
    return updatedQuiz;
  } catch (error: unknown) {
    return { error: 'Error when updating quiz' };
  }
};

export const removeQuiz = async (qid: string) => {
  try {
    const status = await quizModel.findByIdAndDelete(qid);
    if (!status) {
      return { error: 'Quiz not found' };
    }
    return status;
  } catch (error: unknown) {
    return { error: 'Error when deleting quiz' };
  }
}

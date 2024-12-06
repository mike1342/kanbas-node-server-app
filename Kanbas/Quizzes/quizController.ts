import { Response, Router } from 'express';
import { AddQuizRequest, FillInQuestion, MCQuestion, Quiz, TFQuestion } from '../types';
import { saveQuiz } from './quizDao';

const quizController = (app: Router) => {
  const isQuizValid = (quiz: Quiz) => {
    const initCheck =
      !!quiz.title &&
      !!quiz.quizType &&
      !!quiz.points &&
      !!quiz.assignmentGroup &&
      !!quiz.shuffleAnswers &&
      !!quiz.timeLimit &&
      !!quiz.multipleAttempts &&
      !!quiz.howManyAttempts &&
      !!quiz.showCorrectAnswers &&
      !!quiz.oneQuestionAtATime &&
      !!quiz.webcamRequired &&
      !!quiz.lockQuestionsAfterAnswering &&
      !!quiz.dueDate &&
      !!quiz.availableFrom &&
      !!quiz.availableUntil &&
      !!quiz.description &&
      !!quiz.isPublished &&
      quiz.questions.length > 0;
    if (!initCheck) {
      return false;
    }
    for (const question of quiz.questions) {
      const questionInitCheck =
        !!question.title && !!question.question && !!question.points && !!question.questionType;
      if (!questionInitCheck) {
        return false;
      }

      switch (question.questionType) {
        case 'MC': {
          const mcQuestion = question as MCQuestion;
          if (
            mcQuestion.choices.length < 2 ||
            !mcQuestion.correctAnswer ||
            !mcQuestion.choices.includes(mcQuestion.correctAnswer)
          ) {
            return false;
          }
          break;
        }
        case 'TF': {
          const tfQuestion = question as TFQuestion;
          if (!tfQuestion.correctAnswer) {
            return false;
          }
          break;
        }
        case 'FillIn': {
          const fillInQuestion = question as FillInQuestion;
          if (
            !fillInQuestion.question ||
            !fillInQuestion.correctAnswers ||
            fillInQuestion.correctAnswers.length < 1
          ) {
            return false;
          }
          break;
        }
        default:
          return false;
      }
    }
    return true;
  };

  const addQuiz = async (req: AddQuizRequest, res: Response) => {
    if (!req.body || !isQuizValid(req.body)) {
      res.status(400).send('Invalid quiz');
      return;
    }

    const quiz: Quiz = req.body;
    try {
      const result = await saveQuiz(quiz);
      if ('error' in result) {
        throw new Error(result.error);
      }
      res.json(result);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(`Error when saving quiz: ${err.message}`);
      } else {
        res.status(500).send(`Error when saving quiz`);
      }
    }
  };

  app.post('/quiz', addQuiz);
};

export default quizController;

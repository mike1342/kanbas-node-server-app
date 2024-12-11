import { Response, Router } from 'express';
import { AddQuizRequest, FillInQuestion, FindQuizByIdRequest, FindQuizzesByCourseRequest, MCQuestion, Quiz, TFQuestion } from '../types';
import { findQuizById, findQuizzesByCourse, removeQuiz, saveQuiz, setQuiz } from './quizDao';

const quizTypes = ['gradedQuiz', 'practiceQuiz', 'gradedSurvey', 'ungradedSurvey'];
const assignmentGroups = ['quiz', 'exam', 'assignment', 'project'];

const quizController = (app: Router) => {
  const isQuizValid = (quiz: Quiz) => {
    const initCheck =
      !!quiz.title &&
      quizTypes.includes(quiz.quizType || '') &&
      !!quiz.points &&
      assignmentGroups.includes(quiz.assignmentGroup || '') &&
      typeof quiz.shuffleAnswers === "boolean" &&
      typeof quiz.timeLimit === "number" &&
      typeof quiz.multipleAttempts === "boolean" &&
      !!quiz.howManyAttempts &&
      typeof quiz.showCorrectAnswers === "boolean" &&
      typeof quiz.oneQuestionAtATime === "boolean" &&
      typeof quiz.webcamRequired === "boolean" &&
      typeof quiz.lockQuestionsAfterAnswering === "boolean" &&
      !!quiz.dueDate &&
      !!quiz.availableFrom &&
      !!quiz.availableUntil &&
      !!quiz.description &&
      typeof quiz.isPublished === "boolean" &&
      !!quiz.cid &&
      quiz.questions.length > 0;
    if (!initCheck) {
      return false;
    }
    for (const question of quiz.questions) {
      delete question._id;
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
          if (typeof tfQuestion.correctAnswer !== 'boolean') {
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
      delete quiz._id;
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

  const getQuizById = async (req: FindQuizByIdRequest, res: Response) => {
    const { qid } = req.params;
    try {
      const result = await findQuizById(qid);
      if ('error' in result) {
        throw new Error(result.error);
      }
      res.json(result);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(`Error when fetching quiz: ${err.message}`);
      } else {
        res.status(500).send(`Error when fetching quiz`);
      }
    }
  };

  const getQuizzesByCourse = async (req: FindQuizzesByCourseRequest, res: Response) => {
    const { cid } = req.params;
    try {
      const result = await findQuizzesByCourse(cid);
      res.json(result);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(`Error when fetching quizzes for course: ${err.message}`);
      } else {
        res.status(500).send(`Error when fetching quizzes for course`);
      }
    }
  };

  const updateQuiz = async (req: AddQuizRequest, res: Response) => {
    if (!req.body || !isQuizValid(req.body)) {
      res.status(400).send('Invalid quiz');
      return;
    }

    const quiz: Quiz = req.body;

    if (!quiz._id) {
      res.status(400).send('Quiz ID is required');
      return;
    }

    try {
      const result = await setQuiz(quiz);
      if ('error' in result) {
        throw new Error(result.error);
      }
      res.json(result);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(`Error when updating quiz: ${err.message}`);
      } else {
        res.status(500).send(`Error when updating quiz`);
      }
    }
  };

  const deleteQuiz = async (req: FindQuizByIdRequest, res: Response) => {
    const { qid } = req.params;
    try {
      const result = await removeQuiz(qid);
      if ('error' in result) {
        throw new Error(result.error);
      }
      res.send(result);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(`Error when deleting quiz: ${err.message}`);
      } else {
        res.status(500).send(`Error when deleting quiz`);
      }
    }
  }

  app.post('/addQuiz', addQuiz);
  app.get('/getQuizById/:qid', getQuizById);
  app.get('/getQuizzesByCourse/:cid', getQuizzesByCourse);
  app.put('/updateQuiz', updateQuiz);
  app.delete('/deleteQuiz/:qid', deleteQuiz);

};

export default quizController;

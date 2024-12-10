import { Response, Router } from "express";
import { FillInQuestionAttempt, GetQuizAttemptByIdRequest, GetQuizAttemptsForQuizRequest, MCQuestionAttempt, QuizAttempt, SubmitQuizAttemptRequest, TFQuestionAttempt } from "../types";
import { addAttemptToQuiz, findQuizAttemptById, findQuizAttemptsForQuiz, saveQuizAttempt } from "./quizAttemptDao";

const quizAttemptController = (app: Router) => {
  const isQuizAttemptValid = (quizAttempt: QuizAttempt) => {
    const initCheck =
      !!quizAttempt.quizId &&
      !!quizAttempt.studentId &&
      !!quizAttempt.score &&
      !!quizAttempt.timeStarted &&
      !!quizAttempt.timeEnded &&
      quizAttempt.answers.length > 0;
    if (!initCheck) {
      return false;
    }
    for (const questionAttempt of quizAttempt.answers) {
      const questionInitCheck =
        !!questionAttempt.title &&
        !!questionAttempt.question &&
        !!questionAttempt.points &&
        !!questionAttempt.questionType;
      if (!questionInitCheck) {
        return false;
      }
      switch (questionAttempt.questionType) {
        case 'MC': {
          const mcQuestionAttempt = questionAttempt as MCQuestionAttempt;
          if (
            mcQuestionAttempt.choices.length < 2 ||
            !mcQuestionAttempt.selectedChoice ||
            !mcQuestionAttempt.choices.includes(mcQuestionAttempt.selectedChoice)
          ) {
            return false;
          }
          break;
        }
        case 'TF': {
          const tfQuestionAttempt = questionAttempt as TFQuestionAttempt;
          if (typeof tfQuestionAttempt.selectedAnswer !== 'boolean') {
            return false;
          }
          break;
        }
        case 'FillIn': {
          const fillInQuestionAttempt = questionAttempt as FillInQuestionAttempt;
          if (
            fillInQuestionAttempt.correctAnswers.length === 0 ||
            !fillInQuestionAttempt.selectedAnswer ||
            !fillInQuestionAttempt.correctAnswers.includes(fillInQuestionAttempt.selectedAnswer)
          ) {
            return false;
          }
          break;
        }
        default:
          return false;
      }
    };
    return true;
  };

  const submitQuizAttempt = async (req: SubmitQuizAttemptRequest, res: Response) => {
    if (!req.body || !isQuizAttemptValid(req.body)) {
      res.status(400).send('Invalid quiz attempt');
      return;
    }

    const quizAttempt: QuizAttempt = req.body;
    try {
      delete quizAttempt._id;
      const result = await saveQuizAttempt(quizAttempt);
      if ('error' in result) {
        throw new Error(result.error);
      }

      const status = await addAttemptToQuiz(result);
      if (!status || 'error' in status) {
        throw new Error(status?.error || 'Error when adding attempt to quiz');
      }

      res.json(result);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(`Error when saving quiz attempt: ${err.message}`);
      } else {
        res.status(500).send(`Error when saving quiz attempt`);
      }
    }
  };

  const getQuizAttemptById = async (req: GetQuizAttemptByIdRequest, res: Response) => {
    const {qaid} = req.params;
    if (!qaid) {
      res.status(400).send('Invalid request');
      return;
    };

    try {
      const quizAttempt = await findQuizAttemptById(qaid);

      if ('error' in quizAttempt) {
        throw new Error(quizAttempt.error);
      }

      res.json(quizAttempt);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(`Error when fetching quiz attempt: ${err.message}`);
      }
      else {
        res.status(500).send(`Error when fetching quiz attempt`);
      }
    }
  };


  const getQuizAttemptsForQuiz = async (req: GetQuizAttemptsForQuizRequest, res: Response) => {
    const {qid, uid} = req.params;
    if (!qid || !uid) {
      res.status(400).send('Invalid request');
      return;
    };

    try {
      const quizAttempts = await findQuizAttemptsForQuiz(qid, uid);

      if ('error' in quizAttempts) {
        throw new Error(quizAttempts.error);
      }

      res.json(quizAttempts);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(`Error when fetching quiz attempts: ${err.message}`);
      }
      else {
        res.status(500).send(`Error when fetching quiz attempts`);
      }
    }
  };

  app.post('/submitQuizAttempt', submitQuizAttempt);
  app.get('/getQuizAttemptById/:qaid', getQuizAttemptById);
  app.get('/getQuizAttemptsForQuiz/:qid/:uid', getQuizAttemptsForQuiz);
};

export default quizAttemptController;
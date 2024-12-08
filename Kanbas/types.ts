import { Request } from "express";


export type QuizType = 'gradedQuiz' | 'practiceQuiz' | 'gradedSurvey' | 'ungradedSurvey';
export type AssignmentType = 'quiz' | 'exam' | 'assignment' | 'project';
export type QuestionType = 'MC' | 'TF' | 'FillIn';

export interface Question {
  _id: string;
  title: string;
  question: string;
  points: number;
  questionType: QuestionType;
};

export type QuestionAttempt = Question

export interface MCQuestion extends Question {
  choices: string[];
  correctAnswer: string;
}

export interface MCQuestionAttempt extends QuestionAttempt, MCQuestion {
  selectedChoice: string;
}

export interface TFQuestion extends Question {
  correctAnswer: boolean;
}

export interface TFQuestionAttempt extends QuestionAttempt, TFQuestion {
  selectedAnswer: boolean;
}

export interface FillInQuestion extends Question {
  correctAnswers: string[];
}

export interface FillInQuestionAttempt extends QuestionAttempt, FillInQuestion {
  selectedAnswer: string;
}

export interface QuizAttempt {
  _id: string;
  quizId: string;
  studentId: string;
  score: number;
  timeStarted: Date;
  timeEnded: Date;
  answers: QuestionAttempt[];
}

export interface Quiz {
  _id?: string;
  title: string;
  quizType: QuizType;
  points: number;
  assignmentGroup: AssignmentType;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: boolean;
  accessCode?: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: Date;
  availableFrom: Date;
  availableUntil: Date;
  questions: Question[];
  quizAttempts: QuizAttempt[];
  description: string;
  isPublished: boolean;
  cid: string;
};

export interface AddQuizRequest extends Request {
  body: Quiz;
};

export type AddQuizResponse = Quiz | { error: string };

export type FindQuizzesByCourseResponse = Quiz[] | { error: string };

export interface FindQuizByIdRequest extends Request {
  params: {
    qid: string;
  };
};

export interface FindQuizzesByCourseRequest extends Request {
  params: {
    cid: string;
  };
};


// TYPES FOR REST OF SYSTEM
export interface Assignment {
  _id?: string;
  title: string;
  course: string;
  start_date: string;
  end_date: string;
  points: number;
  description: string;
}

export interface Course {
  _id?: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
}

export interface Enrollment {
  _id?: string; 
  user: string; 
  course: string;
  grade: number;
  letterGrade: string,
  enrollmentDate: Date,
  status: {
    type: string,
    enum: "ENROLLED" | "DROPPED" | "COMPLETED",
  },
}

export interface Lesson {
  _id?: string;
  name: string;
  description: string;
  module: string;
}

export interface Module {
  _id?: string;
  name: string;
  description: string;
  course: string;
  lessons: Lesson[];
}

export interface User {
  _id?: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: Date | string;
  role: 'STUDENT' | 'FACULTY' | 'ADMIN';
  loginId: string;
  section: string;
  lastActivity: Date | string;
  totalActivity: string;
}

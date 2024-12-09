import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  questionType: {
    type: String,
    enum: ['MC', 'TF', 'FillIn'],
    required: true,
  },
  choices: [String], // For MC questions
  correctAnswer: mongoose.Schema.Types.Mixed, // String for MC/FillIn, Boolean for TF
  correctAnswers: [String], // For FillIn questions
}, { _id: false });

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  quizType: {
    type: String,
    enum: ['gradedQuiz', 'practiceQuiz', 'gradedSurvey', 'ungradedSurvey'],
    default: 'gradedQuiz',
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  assignmentGroup: {
    type: String,
    enum: ['quiz', 'exam', 'assignment', 'project'],
    default: 'quiz',
    required: true,
  },
  shuffleAnswers: {
    type: Boolean,
    default: true,
    required: true,
  },
  timeLimit: {
    type: Number,
    default: 20,
    required: true,
  },
  multipleAttempts: {
    type: Boolean,
    default: false,
    required: true,
  },
  howManyAttempts: {
    type: Number,
    default: 1,
    required: true,
  },
  showCorrectAnswers: {
    type: Boolean,
    required: true,
  },
  accessCode: {
    type: String,
    required: false,
  },
  oneQuestionAtATime: {
    type: Boolean,
    default: true,
    required: true,
  },
  webcamRequired: {
    type: Boolean,
    default: false,
    required: true,
  },
  lockQuestionsAfterAnswering: {
    type: Boolean,
    default: false,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  availableFrom: {
    type: Date,
    required: true,
  },
  availableUntil: {
    type: Date,
    required: true,
  },
  questions: [{type: questionSchema, required: true}],
  quizAttempts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuizAttempt',
    },
  ],
  description: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
  },
  cid: {
    type: String,
    required: true,
  }
});

export default quizSchema;

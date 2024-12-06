import express from 'express'
import cors from 'cors';
import session from 'express-session';
import 'dotenv/config';
import quizController from './Kanbas/Quizzes/quizController';
import EnrollmentRoutes from './Kanbas/Enrollments/routes';
import AssignmentRoutes from './Kanbas/Assignments/routes';
import UserRoutes from './Kanbas/Users/routes';
import CourseRoutes from './Kanbas/Courses/routes';
import ModuleRoutes from './Kanbas/Modules/routes';
import mongoose from 'mongoose';

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas_final";
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);

const sessionOptions: session.SessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

app.use(express.json())
UserRoutes(app)
CourseRoutes(app)
ModuleRoutes(app)
AssignmentRoutes(app)
EnrollmentRoutes(app)
quizController(app)
app.listen(process.env.PORT || 4000)
console.log(`Server running on port ${process.env.PORT || 4000}`)
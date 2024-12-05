import { Router } from "express";
import { deleteEnrollment, findEnrollmentsForUser, enrollUserInCourse } from "./dao";

export default function EnrollmentRoutes(app: Router) {
 app.delete("/api/enrollments/:enrollmentId", async (req, res) => {
   const { enrollmentId } = req.params;
   const status = await deleteEnrollment(enrollmentId);
   res.send(status);
 });

 app.get("/api/enrollments/:userId", (req, res) => {
  const { userId } = req.params;
  const enrollments = findEnrollmentsForUser(userId);
  res.json(enrollments);
});

app.post("/api/enrollments/:userId/:courseId", (req, res) => {
  const { userId, courseId } = req.params;
  const newEnrollment = enrollUserInCourse(userId, courseId);
  res.send(newEnrollment);
});
}
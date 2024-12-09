// import * as enrollmentsDao from "./dao.js";
// export default function EnrollmentRoutes(app) {
//  app.delete("/api/enrollments/:enrollmentId", async (req, res) => {
//    const { enrollmentId } = req.params;
//    const status = await enrollmentsDao.deleteEnrollment(enrollmentId);
//    res.send(status);
//  });

//  app.get("/api/enrollments/:userId", async (req, res) => {
//   const { userId } = req.params;
//   const enrollments = await enrollmentsDao.findEnrollmentsForUser(userId);
//   res.json(enrollments);
// });

// app.post("/api/enrollments/:userId/:courseId", async (req, res) => {
//   const { userId, courseId } = req.params;
//   const newEnrollment = await enrollmentsDao.enrollUserInCourse(userId, courseId);
//   res.send(newEnrollment);
// });
// }

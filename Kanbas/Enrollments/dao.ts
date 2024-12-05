import Database from "../Database";

export function enrollUserInCourse(userId: string, courseId: string) {
  const { enrollments } = Database;
  const newEnrollment = { _id: Date.now().toString(), user: userId, course: courseId };
  enrollments.push(newEnrollment);
  return newEnrollment;
}

export function deleteEnrollment(enrollmentId: string) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter((enrollment) => enrollment._id !== enrollmentId);
}

export function findEnrollmentsForUser(userId: string) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.user === userId);
}
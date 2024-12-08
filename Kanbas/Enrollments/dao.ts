import mongoose from "mongoose";
import model from "./model";

export async function findCoursesForUser(userId: string) {
 const enrollments = await model.find({ user: new mongoose.Types.ObjectId(userId) }).populate("course");
 return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId: string) {
 const enrollments = await model.find({ course: new mongoose.Types.ObjectId(courseId) }).populate("user");
 return enrollments.map((enrollment) => enrollment.user);
}
export function enrollUserInCourse(user: string, course: string) {
 return model.create({ user, course });
}
export function unenrollUserFromCourse(user: string, course: string) {
 return model.deleteOne({ user, course });
}

export async function findEnrollmentsForUser(userId: string) {
  const enrollments = await model.find({ user: new mongoose.Types.ObjectId(userId) });
  console.log(enrollments);
  return enrollments;
};

export const deleteEnrollment = async (enrollmentId: string) => {
  return model.findByIdAndDelete(enrollmentId);
};
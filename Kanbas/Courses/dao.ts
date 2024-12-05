import Database from "../Database";
import { Course } from "../types";
export function findAllCourses() {
  return Database.courses;
}

export function findCoursesForEnrolledUser(userId: string) {
  const { courses, enrollments } = Database;
  const enrolledCourses = courses.filter((course) =>
    enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
  return enrolledCourses;
}

export function createCourse(course: Course) {
  const newCourse = { ...course, _id: Date.now().toString() };
  Database.courses = [...Database.courses, newCourse];
  return newCourse;
}

export function deleteCourse(courseId: string) {
  const { courses, enrollments } = Database;
  Database.courses = courses.filter((course) => course._id !== courseId);
  Database.enrollments = enrollments.filter(
    (enrollment) => enrollment.course !== courseId
);}

export function updateCourse(courseId: string, courseUpdates: Course) {
  const { courses } = Database;
  const course = courses.find((course) => course._id === courseId);
  if (!course) throw new Error("Course not found");
  Object.assign(course, courseUpdates);
  return course;
}


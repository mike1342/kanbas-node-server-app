import { Course } from "../types";
import model from "./model";
export function findAllCourses() {
  return model.find();
}
 
export function createCourse(course: Course) {
  delete course._id;
  return model.create(course);
}

export function deleteCourse(courseId: string) {
  return model.deleteOne({ _id: courseId });
}; 

export function updateCourse(courseId: string, courseUpdates: Course) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}


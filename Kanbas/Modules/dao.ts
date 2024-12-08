import { Module } from "../types";
import model from "./model";

export async function findModulesForCourse(courseId: string) {
  const modules = await model.find({ course: courseId });
  return modules;
}

export function createModule(module: Module) {
  delete module._id;
  return model.create(module);
}

export function deleteModule(moduleId: string) {
  return model.deleteOne({ _id: moduleId });
 }

export async function updateModule(moduleId: string, moduleUpdates: Module) {
  const updates = await model.updateOne({ _id: moduleId }, moduleUpdates);
  return updates;
}

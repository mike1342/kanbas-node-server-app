import Database from "../Database";
import { Module } from "../types";
export function findModulesForCourse(courseId: string) {
  const { modules } = Database;
  return modules.filter((module) => module.course === courseId);
}

export function createModule(module: Module) {
  const newModule = { ...module, _id: Date.now().toString() };
  Database.modules = [...Database.modules, newModule];
  return newModule;
}

export function deleteModule(moduleId: string) {
  const { modules } = Database;
  Database.modules = modules.filter((module) => module._id !== moduleId);
 }

export function updateModule(moduleId: string, moduleUpdates: Module) {
  const { modules } = Database;
  const module = modules.find((module) => module._id === moduleId);
  if (!module) throw new Error("Module not found");
  Object.assign(module, moduleUpdates);
  return module;
}

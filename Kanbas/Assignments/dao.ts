import Database from '../Database';
import { Assignment } from '../types';
export function findAssignmentsForCourse(courseId: string) {
  const { assignments } = Database;
  return assignments.filter((assignment) => assignment.course === courseId);
}

export function createAssignment(assignment: Assignment) {
  const newAssignment = { ...assignment, _id: Date.now().toString() };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}

export function deleteAssignment(assignmentId: string) {
  const { assignments } = Database;
  Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
}

export function updateAssignment(assignmentId: string, assignmentUpdates: Assignment) {
  const { assignments } = Database;
  const assignment = assignments.find((assignment) => assignment._id === assignmentId);
  if (!assignment) throw new Error('Assignment not found');
  Object.assign(assignment, assignmentUpdates);
  return assignment;
}

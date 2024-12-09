import model from "./model.js";

export async function findAssignmentsForCourse(courseId) {
  const assignments = await model.find({ course: courseId });
  return assignments;
}

export async function createAssignment(assignment) {
  delete assignment._id;
  return model.create(assignment);
}

export async function deleteAssignment(assignmentId) {
  return model.deleteOne({ _id: assignmentId });
}

export async function updateAssignment(assignmentId, assignmentUpdates) {
  return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
}

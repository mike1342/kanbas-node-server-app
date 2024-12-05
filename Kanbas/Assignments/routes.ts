import { Router } from "express";
import { deleteAssignment, updateAssignment } from "./dao";

export default function AssignmentRoutes(app: Router) {
 app.delete("/api/assignments/:assignmentId", async (req, res) => {
   const { assignmentId } = req.params;
   const status = await deleteAssignment(assignmentId);
   res.send(status);
 });

 app.put("/api/assignments/:assignmentId", async (req, res) => {
  const { assignmentId } = req.params;
  const assignmentUpdates = req.body;
  const status = await updateAssignment(assignmentId, assignmentUpdates);
  res.send(status);
});

}

import { Router } from "express";
import { createModule, findModulesForCourse } from "../Modules/dao";
import { createAssignment, findAssignmentsForCourse } from "../Assignments/dao";
import { deleteCourse, findAllCourses, updateCourse } from "./dao";

export default function CourseRoutes(app: Router) {

  app.get("/api/courses", (req, res) => {
    const courses = findAllCourses();
    res.send(courses);
  });

  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const status = deleteCourse(courseId);
    res.send(status);
  });

  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = updateCourse(courseId, courseUpdates);
    res.send(status);
  });

  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = findModulesForCourse(courseId);
    res.json(modules);
  });

  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = createModule(module);
    res.send(newModule);
  });

  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = createAssignment(assignment);
    res.send(newAssignment);
  });

}

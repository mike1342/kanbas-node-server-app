import { Router } from "express";
import { deleteModule, updateModule } from "./dao";

export default function ModuleRoutes(app: Router) {
 app.delete("/api/modules/:moduleId", async (req, res) => {
   const { moduleId } = req.params;
   const status = await deleteModule(moduleId);
   res.send(status);
 });

 app.put("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = await updateModule(moduleId, moduleUpdates);
    res.send(status);
  });

}

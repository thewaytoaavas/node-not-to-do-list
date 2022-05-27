import express from "express";

import {
  insertTask,
  readTask,
  //   deleteTask,
  deleteMultipleTask,
  updateTask,
} from "../model/Taskmodel.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await readTask();
  res.json({
    status: "success",
    result,
  });
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const result = await insertTask(req.body);
  console.log(result);
  result?._id
    ? res.json({
        status: "success",
        message: "Task added successful",
      })
    : res.json({
        status: "error",
        message: "Task Failed",
      });
});

router.patch("/", async (req, res) => {
  const { _id, taskType } = req.body;
  const result = await updateTask({ _id }, { taskType });

  console.log(result);

  result?._id
    ? res.json({
        status: "success",
        message: "Task has been updated",
      })
    : res.json({
        status: "error",
        message: "Unable to update the task, try again later",
      });
});

router.delete("/", async (req, res) => {
  const { deletedCount } = await deleteMultipleTask(req.body);
  deletedCount
    ? res.json({
        status: "success",
        message: "selected task has been deleted",
      })
    : res.json({
        status: "error",
        message: "Invalid request",
      });
});

export default router;

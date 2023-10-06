import express from "express";
import {addTask,getTasks,editTasks,deleteTask,getTaskById} from "../controller/Task_controller.js"

const route=express.Router();
route.post("/add_task",addTask)
route.get("/task_list",getTasks)
route.get("/get_task/:id",getTaskById)
route.put("/edit_task/:id",editTasks)
route.delete("/delete_task/:id",deleteTask)

export default route;
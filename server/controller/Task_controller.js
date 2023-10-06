import Task from "../model/task_model.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        if (tasks.length === 0) {
            return res.status(404).json({ mesage: "No Task Present" })
        }
        res.status(200).json(tasks)
    }
    catch (error) {
        res.status(500).json({ error: "Internal Status Error" })
    }
}


export const addTask = async (req, res) => {
    try {
        const add_task = new Task(req.body);
        const { task_id } = add_task;
        const taskExists = await Task.findOne({ task_id });
        if (taskExists) {
            return res.status(400).json({ error: "Task Id already exists" });
        }
        const taskAdded = await add_task.save();
        res.status(201).json(taskAdded);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: "Validation Error", details: error.message });
        }
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const editTasks = async (req, res) => {
    try {
        const id = req.params.id;
        const task_excist = await Task.findOne({ _id: id })
        if (!task_excist) {
            return res.status(404).json({ message: "Task Not Excist" })
        }
        console.log(id,req.body)
        const edit_Task = await Task.findByIdAndUpdate(id, req.body, { new: true })
        res.status(201).json(edit_Task)
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task_excist = await Task.findOne({ _id: id })
        if (!task_excist) {
            return res.status(404).json({ message: "Task Not Excist" })
        }
        const delete_Task = await Task.findByIdAndDelete(id)
        res.status(201).json({ message: "Task Deleted Successfully" })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
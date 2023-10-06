import mongoose from "mongoose";

const tasklistSchema = new mongoose.Schema(
    {
        task_id: {
            type: String,
            required: true
        },
        task_name: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "completed", "in-progress"],
            required: true
        },
        added_date: {
            type: Date,
            default: Date.now
        }
    }

)

export default mongoose.model("task", tasklistSchema)
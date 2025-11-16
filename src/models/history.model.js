import mongoose from "mongoose";

// this is the hstory of how many times the user has used the ml model for diagnosis
const historySchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
            default: Date.now,
        },
        diagnosis: {
            type: String,
            required: true,
        },
        userid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    { timestamps: true }
);
const historyModel = mongoose.model("History", historySchema);
export default historyModel;

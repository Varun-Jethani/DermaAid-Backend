import mongoose from "mongoose";

// this is the hstory of how many times the user has used the ml model for diagnosis
historySchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        diagnosis: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
const historyModel = mongoose.model("History", historySchema);
export default historyModel;

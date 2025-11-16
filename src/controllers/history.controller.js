import historyModel from "../models/history.model.js";
import asyncHandler from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { ApiError } from "../utils/ApiError.js";


const createHistory = asyncHandler(async (req, res) => {
    const { date, diagnosis } = req.body;

    if (!diagnosis) {
        throw new ApiError(400, "Diagnosis is required");
    }
    const userId = req.user._id;
    if (!userId) {
        throw new ApiError(401, "Unauthorized: User ID not found");
    }

    const newHistory = await historyModel.create({
        date: date ? date : Date.now(),
        diagnosis,
        userid: userId
    });
    if (!newHistory) {
        throw new ApiError(500, "Failed to create history record");
    } 
    return res.status(201).json(new ApiResponse(201, "History record created successfully", newHistory));
});

const getUserHistory = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    if (!userId) {
        throw new ApiError(401, "Unauthorized: User ID not found");
    }
    const histories = await historyModel.find({ userid: userId }).sort({ date: -1 });
    return res.status(200).json(new ApiResponse(200, "User history fetched successfully", histories));
});
export { createHistory, getUserHistory };


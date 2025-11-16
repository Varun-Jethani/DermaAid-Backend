import { Router } from "express";

import { verifyJWT } from "../middlewares/userAuth.middleware.js";
import { getUserHistory, createHistory } from "../controllers/history.controller.js";

const historyRouter = Router();
historyRouter.route("/").get(verifyJWT, getUserHistory);
historyRouter.route("/").post(verifyJWT, createHistory);

export default historyRouter;
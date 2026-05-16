import express from "express";

import {
    registerUser,
    loginUser,
    getProfile,
} from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";

import { registerValidation } from "../validators/auth.validator";

const router = express.Router();

router.post(
    "/register",
    registerValidation,
    validate,
    registerUser
);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

export default router;

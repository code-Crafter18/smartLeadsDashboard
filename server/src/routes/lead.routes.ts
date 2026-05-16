import express from "express";

import {
    createLead,
    getLeads,
    getSingleLead,
    updateLead,
    deleteLead,
} from "../controllers/lead.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protect, createLead);
router.get("/", protect, getLeads);
router.get("/:id", protect, getSingleLead);
router.put("/:id", protect, updateLead);
router.delete("/:id", protect, deleteLead);

export default router;

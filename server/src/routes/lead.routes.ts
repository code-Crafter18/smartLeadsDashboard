import express from "express";

import {
    createLead,
    getLeads,
    getSingleLead,
    updateLead,
    deleteLead,
} from "../controllers/lead.controller";
import { exportLeadsCSV } from "../controllers/csv.controller";
import { protect } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";

const router = express.Router();

router.post("/", protect, createLead);
router.get("/", protect, getLeads);
router.get("/export/csv", protect, exportLeadsCSV);
router.get("/:id", protect, getSingleLead);
router.put("/:id", protect, updateLead);
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteLead
);

export default router;

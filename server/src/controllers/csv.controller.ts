import { Response } from "express";

import { Parser } from "json2csv";

import Lead from "../models/Lead.model";
import { AuthRequest } from "../middleware/auth.middleware";

export const exportLeadsCSV = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const leads = await Lead.find();

        const fields = [
            "name",
            "email",
            "status",
            "source",
        ];

        const parser = new Parser({
            fields,
        });

        const csv = parser.parse(leads);

        res.header(
            "Content-Type",
            "text/csv"
        );
        res.attachment("leads.csv");

        res.send(csv);
    } 
    catch (error) {
        res.status(500).json({
            message:
                "CSV export failed",
        });
    }
};

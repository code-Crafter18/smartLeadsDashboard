import { Response } from "express";

import Lead from "../models/Lead.model";
import { AuthRequest } from "../middleware/auth.middleware";

export const createLead = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const { name, email, status, source } = req.body;

        const lead = await Lead.create({
            name,
            email,
            status,
            source,
            createdBy: req.user?.id,
        });

        res.status(201).json({
            message: "Lead created successfully",
            lead,
        });
    } 
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const getLeads = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const {
            status,
            source,
            search,
            sort,
        } = req.query;

        const query: any = {};

        if (status) {
            query.status = status;
        }

        if (source) {
            query.source = source;
        }

        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        let sortOption = {};

        if (sort === "oldest") {
            sortOption = {
                createdAt: 1,
            };
        } 
        else {
            sortOption = {
                createdAt: -1,
            };
        }

        const leads = await Lead.find(query).sort(sortOption);

        res.status(200).json({
            count: leads.length,
            leads,
        });
    } 
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const getSingleLead = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            res.status(404).json({
                message: "Lead not found",
            });

            return;
        }

        res.status(200).json(lead);
    } 
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const updateLead = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            res.status(404).json({
                message: "Lead not found",
            });

            return;
        }

        const updatedLead = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        res.status(200).json({
            message: "Lead updated successfully",
            updatedLead,
        });
    } 
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const deleteLead = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            res.status(404).json({
                message: "Lead not found",
            });

            return;
        }

        await Lead.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Lead deleted successfully",
        });
    } 
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};

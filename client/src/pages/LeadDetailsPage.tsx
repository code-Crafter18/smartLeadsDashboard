import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

import API from "../api/axios";

interface Lead {
    _id: string;
    name: string;
    email: string;
    status: string;
    source: string;
}

const LeadDetailsPage = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [lead, setLead] =
        useState<Lead | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [darkMode] =
        useState(
            localStorage.getItem(
                "darkMode"
            ) === "true"
        );

    const fetchLead = async () => {
        try {
            const token =
                localStorage.getItem("token");

            const response =
                await API.get(
                    `/leads/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

            setLead(response.data);
        } 
        catch (err: any) {
            setError(
                err.response?.data?.message ||
                    "Failed to fetch lead"
            );
        } 
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLead();
    }, []);

    return (
        <div
            className={`min-h-screen p-6 transition-all ${
                darkMode
                    ? "bg-[#111827] text-white"
                    : "bg-gray-100 text-black"
            }`}
        >
            <button
                onClick={() =>
                    navigate(-1)
                }
                className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-xl transition ${
                    darkMode
                        ? "bg-[#1f2937] hover:bg-[#374151] text-gray-200"
                        : "bg-white hover:bg-gray-100 text-gray-700 shadow-sm"
                }`}
            >
                <FaArrowLeft />

                Back
            </button>

            {loading && (
                <div>
                    Loading...
                </div>
            )}

            {error && (
                <div className="bg-red-100 text-red-600 p-4 rounded-xl">
                    {error}
                </div>
            )}

            {lead && (
                <div className={`${
                    darkMode
                        ? "bg-[#1f2937]"
                        : "bg-white"
                } rounded-3xl shadow-xl p-8 max-w-2xl`}>
                    <h1 className="text-4xl font-bold mb-8">
                        Lead Details
                    </h1>

                    <div className="space-y-5">
                        <div>
                            <p className={`${
                                darkMode
                                    ? "text-gray-400"
                                    : "text-gray-500"
                            }`}>
                                Name
                            </p>

                            <h2 className="text-2xl font-semibold">
                                {
                                    lead.name
                                }
                            </h2>
                        </div>

                        <div>
                            <p className={`${
                                darkMode
                                    ? "text-gray-400"
                                    : "text-gray-500"
                            }`}>
                                Email
                            </p>

                            <h2 className="text-xl">
                                {
                                    lead.email
                                }
                            </h2>
                        </div>

                        <div>
                            <p className={`${
                                darkMode
                                    ? "text-gray-400"
                                    : "text-gray-500"
                            }`}>
                                Status
                            </p>

                            <h2 className="text-xl">
                                {
                                    lead.status
                                }
                            </h2>
                        </div>

                        <div>
                            <p className={`${
                                darkMode
                                    ? "text-gray-400"
                                    : "text-gray-500"
                            }`}>
                                Source
                            </p>

                            <h2 className="text-xl">
                                {
                                    lead.source
                                }
                            </h2>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeadDetailsPage;

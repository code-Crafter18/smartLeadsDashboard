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
import DeleteModal from "../components/DeleteModal";
import UpdateLeadModal from "../components/UpdateLeadModal";

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

    const [showUpdateModal, setShowUpdateModal] =
        useState(false);

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const token =
        localStorage.getItem("token");

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const isAdmin =
        user.role === "admin";

    const fetchLead = async () => {
        try {
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

    const handleUpdate = async (updates: {
        name: string;
        email: string;
        status: string;
        source: string;
    }) => {
        if (!lead) {
            return;
        }

        try {
            const response = await API.put(
                `/leads/${lead._id}`,
                updates,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setLead(response.data.updatedLead);
            setShowUpdateModal(false);
        } 
        catch (err: any) {
            setError(
                err.response?.data?.message ||
                    "Update failed"
            );
        }
    };

    const handleDelete = async () => {
        if (!lead) {
            return;
        }

        try {
            await API.delete(
                `/leads/${lead._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            navigate("/dashboard");
        } 
        catch (err: any) {
            setError(
                err.response?.data?.message ||
                    "Delete failed"
            );
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
                <div
                    className={`p-4 rounded-xl ${
                        darkMode
                            ? "bg-red-950/40 text-red-200"
                            : "bg-red-100 text-red-600"
                    }`}
                >
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

                    <div className="flex flex-wrap gap-3 mt-10">
                        <button
                            type="button"
                            onClick={() =>
                                setShowUpdateModal(true)
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
                        >
                            Edit
                        </button>

                        {isAdmin && (
                            <button
                                type="button"
                                onClick={() =>
                                    setShowDeleteModal(true)
                                }
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            )}

            <DeleteModal
                isOpen={showDeleteModal}
                darkMode={darkMode}
                onClose={() =>
                    setShowDeleteModal(false)
                }
                onConfirm={() => {
                    handleDelete();
                    setShowDeleteModal(false);
                }}
            />

            <UpdateLeadModal
                isOpen={showUpdateModal}
                darkMode={darkMode}
                lead={lead}
                onClose={() =>
                    setShowUpdateModal(false)
                }
                onConfirm={handleUpdate}
            />
        </div>
    );
};

export default LeadDetailsPage;

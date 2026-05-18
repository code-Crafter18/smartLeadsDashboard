import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

import API from "../api/axios";

const CreateLeadPage = () => {
    const navigate = useNavigate();

    const [darkMode] =
        useState(
            localStorage.getItem(
                "darkMode"
            ) === "true"
        );

    const [name, setName] = useState("");

    const [email, setEmail] =
        useState("");

    const [source, setSource] =
        useState("Website");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    useEffect(() => {
        document.body.style.backgroundColor =
            darkMode ? "#111827" : "#f3f4f6";
        document.body.style.color =
            darkMode ? "#ffffff" : "#000000";
    }, [darkMode]);

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            const token =
                localStorage.getItem("token");

            await API.post(
                "/leads",
                {
                    name,
                    email,
                    source,
                },
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
                    "Failed to create lead"
            );
        } 
        finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`min-h-screen flex justify-center items-center px-4 transition-all ${
                darkMode
                    ? "bg-[#111827] text-white"
                    : "bg-gray-100 text-black"
            }`}
        >
            <div
                className={`w-full max-w-xl rounded-3xl shadow-xl p-8 ${
                    darkMode
                        ? "bg-[#1f2937]"
                        : "bg-white"
                }`}
            >
                <button
                    onClick={() =>
                        navigate(-1)
                    }
                    className={`flex items-center gap-2 mb-6 transition ${
                        darkMode
                            ? "text-gray-300 hover:text-white"
                            : "text-gray-600 hover:text-black"
                    }`}
                >
                    <FaArrowLeft />

                    Back
                </button>

                <h1 className="text-3xl font-bold mb-8">
                    Create New Lead
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <input
                        type="text"
                        placeholder="Lead Name"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                        className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            darkMode
                                ? "bg-[#374151] border-gray-600 text-white placeholder:text-gray-400"
                                : "bg-white border-gray-300 text-black"
                        }`}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Lead Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            darkMode
                                ? "bg-[#374151] border-gray-600 text-white placeholder:text-gray-400"
                                : "bg-white border-gray-300 text-black"
                        }`}
                        required
                    />

                    <select
                        value={source}
                        onChange={(e) =>
                            setSource(
                                e.target.value
                            )
                        }
                        className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            darkMode
                                ? "bg-[#374151] border-gray-600 text-white placeholder:text-gray-400"
                                : "bg-white border-gray-300 text-black"
                        }`}
                    >
                        <option>
                            Website
                        </option>

                        <option>
                            Instagram
                        </option>

                        <option>
                            Referral
                        </option>
                    </select>

                    {error && (
                        <p className="text-red-500">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-xl font-semibold"
                    >
                        {loading
                            ? "Creating..."
                            : "Create Lead"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateLeadPage;

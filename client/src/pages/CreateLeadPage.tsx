import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

import API from "../api/axios";

const CreateLeadPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [email, setEmail] =
        useState("");

    const [source, setSource] =
        useState("Website");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

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
        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
            <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl p-8">
                <button
                    onClick={() =>
                        navigate(-1)
                    }
                    className="flex items-center gap-2 mb-6 text-gray-600 hover:text-black"
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
                        className="w-full border border-gray-300 rounded-xl px-4 py-3"
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
                        className="w-full border border-gray-300 rounded-xl px-4 py-3"
                        required
                    />

                    <select
                        value={source}
                        onChange={(e) =>
                            setSource(
                                e.target.value
                            )
                        }
                        className="w-full border border-gray-300 rounded-xl px-4 py-3"
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

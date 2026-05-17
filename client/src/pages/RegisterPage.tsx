import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../api/axios";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] = useState("");

    const handleRegister = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("All fields are required");

            return;
        }

        if (password.length < 6) {
            setError(
                "Password must be at least 6 characters"
            );

            return;
        }

        try {
            setLoading(true);

            setError("");

            await API.post("/auth/register", {
                name,
                email,
                password,
            });

            navigate("/");
        } 
        catch (err: any) {
            setError(
                err.response?.data?.message ||
                    "Registration failed"
            );
        } 
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f3ef] flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">
                <h1 className="text-3xl font-bold mb-8 text-center">
                    Create Account
                </h1>

                <form
                    onSubmit={handleRegister}
                    className="space-y-5"
                >
                    <div>
                        <label className="block mb-2 font-medium">
                            Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
                    >
                        {loading
                            ? "Creating..."
                            : "Create Account"}
                    </button>

                    <p className="text-center text-sm">
                        Already have account?{" "}
                        <Link
                            to="/"
                            className="font-semibold"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import API from "../api/axios";

const LoginPage = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] =
        useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] = useState("");

    const handleLogin = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!email || !password) {
            setError("All fields are required");

            return;
        }

        try {
            setLoading(true);

            setError("");

            const response = await API.post(
                "/auth/login",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            if (
                response.data.user.role === "admin"
            ) {
                navigate("/admin-dashboard");
            } 
            else {
                navigate("/sales-dashboard");
            }
        } 
        catch (err: any) {
            setError(
                err.response?.data?.message ||
                    "Login failed"
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
                    Log in
                </h1>

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >
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

                        <div className="relative">
                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target
                                            .value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2"
                            >
                                {showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </button>
                        </div>
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
                            ? "Logging in..."
                            : "Let's go →"}
                    </button>

                    <p className="text-center text-sm">
                        Don&apos;t have account?{" "}
                        <Link
                            to="/register"
                            className="font-semibold"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

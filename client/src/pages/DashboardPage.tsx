import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import LogoutModal from "../components/LogoutModal";
import Pagination from "../components/Pagination";
import useDebounce from "../hooks/useDebounce";
import exportCSV from "../utils/exportCSV";

interface Lead {
    _id: string;
    name: string;
    email: string;
    status: string;
    source: string;
}

const DashboardPage = () => {
    const navigate = useNavigate();

    const [leads, setLeads] = useState<Lead[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [initialLoad, setInitialLoad] =
        useState(true);

    const [error, setError] = useState("");

    // Filters
    const [status, setStatus] =
        useState("");

    const [source, setSource] =
        useState("");

    const [search, setSearch] =
        useState("");

    const [sort, setSort] =
        useState("latest");

    const [showFilters, setShowFilters] =
        useState(false);

    const [currentPage, setCurrentPage] =
        useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    const [darkMode, setDarkMode] =
        useState(
            localStorage.getItem(
                "darkMode"
            ) === "true"
        );

    const [showLogoutModal, setShowLogoutModal] =
        useState(false);

    const debouncedSearch =
        useDebounce(search, 500);

    const token =
        localStorage.getItem("token");

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const isAdmin =
        user.role === "admin";

    const fetchLeads = async () => {
        try {
            setLoading(true);

            const queryParams =
                new URLSearchParams();

            if (status) {
                queryParams.append(
                    "status",
                    status
                );
            }

            if (source) {
                queryParams.append(
                    "source",
                    source
                );
            }

            if (debouncedSearch) {
                queryParams.append(
                    "search",
                    debouncedSearch
                );
            }

            if (sort) {
                queryParams.append(
                    "sort",
                    sort
                );
            }

            queryParams.append(
                "page",
                currentPage.toString()
            );

            const response = await API.get(
                `/leads?${queryParams.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setLeads(response.data.leads);
            setTotalPages(
                response.data.totalPages || 1
            );
        } 
        catch (err: any) {
            setError(
                err.response?.data?.message ||
                    "Failed to fetch leads"
            );
        } 
        finally {
            setLoading(false);
            setInitialLoad(false);
        }
    };


    useEffect(() => {
        fetchLeads();
    }, [status, source, debouncedSearch, sort, currentPage]);

    useEffect(() => {
        document.body.style.backgroundColor =
            darkMode ? "#111827" : "#f3f4f6";
        document.body.style.color =
            darkMode ? "#ffffff" : "#000000";
    }, [darkMode]);

    const logout = () => {
        localStorage.clear();

        window.location.href = "/";
    };

    if (loading && initialLoad) {
        return (
            <div
                className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
                    darkMode
                        ? "bg-[#111827] text-white"
                        : "bg-gray-100 text-black"
                }`}
            >
                <div
                    className={`px-6 py-4 rounded-2xl shadow ${
                        darkMode
                            ? "bg-[#1f2937] text-gray-200"
                            : "bg-white text-gray-700"
                    }`}
                >
                    Loading leads...
                </div>
            </div>
        );
    }

    return (
        <div
            className={`min-h-screen overflow-x-hidden transition-all duration-300 ${
                darkMode
                    ? "bg-[#111827] text-white"
                    : "bg-gray-100 text-black"
            }`}
        >
            {/* Navbar */}
            <div
                className={`px-8 py-5 flex items-center justify-between shadow-sm ${
                    darkMode
                        ? "bg-[#1f2937]"
                        : "bg-white"
                }`}
            >
                <div>
                    <h1 className="text-3xl font-bold">
                        {isAdmin
                            ? "Admin Dashboard"
                            : "User Dashboard"}
                    </h1>

                    <p
                        className={`text-sm mt-1 ${
                            darkMode
                                ? "text-gray-400"
                                : "text-gray-500"
                        }`}
                    >
                        Manage your leads efficiently
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            const newMode = !darkMode;

                            setDarkMode(newMode);
                            localStorage.setItem(
                                "darkMode",
                                String(newMode)
                            );
                        }}
                        className={`px-4 py-2 rounded-xl font-medium transition ${
                            darkMode
                                ? "bg-white text-black"
                                : "bg-black text-white"
                        }`}
                    >
                        {darkMode
                            ? "Light"
                            : "Dark"}
                    </button>

                    <button
                        onClick={() =>
                            setShowFilters(
                                !showFilters
                            )
                        }
                        className={`px-4 py-2 rounded-xl font-medium transition ${
                            showFilters
                                ? "bg-blue-600 text-white"
                                : darkMode
                                ? "bg-[#374151] text-white"
                                : "bg-gray-200 text-black"
                        }`}
                    >
                        Filters
                    </button>

                    <button
                        onClick={exportCSV}
                        className="bg-green-600 text-white px-4 py-2 rounded-xl"
                    >
                        Export CSV
                    </button>

                    <button
                        onClick={() =>
                            navigate(
                                "/create-lead"
                            )
                        }
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                    >
                        + Add Lead
                    </button>

                    <button
                        onClick={() =>
                            setShowLogoutModal(true)
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-xl"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="p-8 space-y-6">
                {/* Filters */}
                {showFilters && (
                    <div className={`${
                        darkMode
                            ? "bg-[#1f2937]"
                            : "bg-white"
                    } p-6 rounded-3xl shadow-sm border border-gray-200/20 grid md:grid-cols-4 gap-4`}>
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            className={`border rounded-xl px-4 py-3 outline-none ${
                                darkMode
                                    ? "bg-[#374151] border-gray-600 text-white placeholder:text-gray-400"
                                    : "bg-white border-gray-300 text-black"
                            }`}
                        />

                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(
                                    e.target.value
                                )
                            }
                            className={`border rounded-xl px-4 py-3 outline-none ${
                                darkMode
                                    ? "bg-[#374151] border-gray-600 text-white placeholder:text-gray-400"
                                    : "bg-white border-gray-300 text-black"
                            }`}
                        >
                            <option value="">
                                All Status
                            </option>

                            <option value="New">
                                New
                            </option>

                            <option value="Contacted">
                                Contacted
                            </option>

                            <option value="Qualified">
                                Qualified
                            </option>

                            <option value="Lost">
                                Lost
                            </option>
                        </select>

                        <select
                            value={source}
                            onChange={(e) =>
                                setSource(
                                    e.target.value
                                )
                            }
                            className={`border rounded-xl px-4 py-3 outline-none ${
                                darkMode
                                    ? "bg-[#374151] border-gray-600 text-white placeholder:text-gray-400"
                                    : "bg-white border-gray-300 text-black"
                            }`}
                        >
                            <option value="">
                                All Sources
                            </option>

                            <option value="Website">
                                Website
                            </option>

                            <option value="Instagram">
                                Instagram
                            </option>

                            <option value="Referral">
                                Referral
                            </option>
                        </select>

                        <select
                            value={sort}
                            onChange={(e) =>
                                setSort(
                                    e.target.value
                                )
                            }
                            className={`border rounded-xl px-4 py-3 outline-none ${
                                darkMode
                                    ? "bg-[#374151] border-gray-600 text-white placeholder:text-gray-400"
                                    : "bg-white border-gray-300 text-black"
                            }`}
                        >
                            <option value="latest">
                                Latest
                            </option>

                            <option value="oldest">
                                Oldest
                            </option>
                        </select>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div
                        className={`p-4 rounded-xl mb-4 ${
                            darkMode
                                ? "bg-red-950/40 text-red-200"
                                : "bg-red-100 text-red-600"
                        }`}
                    >
                        {error}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div
                        className={`p-6 rounded-2xl shadow text-center ${
                            darkMode
                                ? "bg-[#1f2937] text-gray-200"
                                : "bg-white text-gray-700"
                        }`}
                    >
                        Loading...
                    </div>
                )}

                {/* Table */}
                {!loading &&
                    leads.length > 0 && (
                        <>
                            <div
                                className={`rounded-3xl overflow-hidden shadow-sm border overflow-auto ${
                                    darkMode
                                        ? "bg-[#18212f] border-gray-700"
                                        : "bg-white border-gray-200"
                                }`}
                            >
                                <table className="w-full">
                                    <thead
                                        className={`${
                                            darkMode
                                                ? "bg-[#111827] text-gray-200"
                                                : "bg-gray-100 text-gray-700"
                                        }`}
                                    >
                                        <tr>
                                            <th
                                                className={`p-4 text-left font-semibold ${
                                                    darkMode
                                                        ? "text-gray-200"
                                                        : "text-gray-700"
                                                }`}
                                            >
                                                Name
                                            </th>

                                            <th
                                                className={`p-4 text-left font-semibold ${
                                                    darkMode
                                                        ? "text-gray-200"
                                                        : "text-gray-700"
                                                }`}
                                            >
                                                Email
                                            </th>

                                            <th
                                                className={`p-4 text-left font-semibold ${
                                                    darkMode
                                                        ? "text-gray-200"
                                                        : "text-gray-700"
                                                }`}
                                            >
                                                Status
                                            </th>

                                            <th
                                                className={`p-4 text-left font-semibold ${
                                                    darkMode
                                                        ? "text-gray-200"
                                                        : "text-gray-700"
                                                }`}
                                            >
                                                Source
                                            </th>

                                            <th
                                                className={`p-4 text-left font-semibold ${
                                                    darkMode
                                                        ? "text-gray-200"
                                                        : "text-gray-700"
                                                }`}
                                            >
                                                View
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {leads.map(
                                            (lead) => (
                                                <tr
                                                    key={
                                                        lead._id
                                                    }
                                                    className={`border-t transition hover:scale-[1.002] ${
                                                        darkMode
                                                            ? "border-gray-700 hover:bg-[#243041]"
                                                            : "border-gray-200 hover:bg-gray-50"
                                                    }`}
                                                >
                                                    <td
                                                        className={`p-4 ${
                                                            darkMode
                                                                ? "text-gray-200"
                                                                : "text-gray-700"
                                                        }`}
                                                    >
                                                        {
                                                            lead.name
                                                        }
                                                    </td>

                                                    <td
                                                        className={`p-4 ${
                                                            darkMode
                                                                ? "text-gray-200"
                                                                : "text-gray-700"
                                                        }`}
                                                    >
                                                        {
                                                            lead.email
                                                        }
                                                    </td>

                                                    <td
                                                        className={`p-4 ${
                                                            darkMode
                                                                ? "text-gray-200"
                                                                : "text-gray-700"
                                                        }`}
                                                    >
                                                        {
                                                            lead.status
                                                        }
                                                    </td>

                                                    <td
                                                        className={`p-4 ${
                                                            darkMode
                                                                ? "text-gray-200"
                                                                : "text-gray-700"
                                                        }`}
                                                    >
                                                        {
                                                            lead.source
                                                        }
                                                    </td>

                                                    <td
                                                        className={`p-4 ${
                                                            darkMode
                                                                ? "text-gray-200"
                                                                : "text-gray-700"
                                                        }`}
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/lead/${lead._id}`
                                                                )
                                                            }
                                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
                                                        >
                                                            View
                                                        </button>
                                                    </td>

                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                darkMode={darkMode}
                            />
                        </>
                    )}

                <LogoutModal
                    isOpen={showLogoutModal}
                    onClose={() =>
                        setShowLogoutModal(false)
                    }
                    onConfirm={logout}
                    darkMode={darkMode}
                />
            </div>
        </div>
    );
};

export default DashboardPage;

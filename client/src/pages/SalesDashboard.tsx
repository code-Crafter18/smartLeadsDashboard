import { useEffect, useState } from "react";

import API from "../api/axios";
import Pagination from "../components/Pagination";

interface Lead {
    _id: string;
    name: string;
    email: string;
    status: string;
    source: string;
}

const SalesDashboard = () => {
    const [leads, setLeads] = useState<Lead[]>([]);

    const [loading, setLoading] =
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

    const token =
        localStorage.getItem("token");

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

            if (search) {
                queryParams.append(
                    "search",
                    search
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
        }
    };

    useEffect(() => {
        fetchLeads();
    }, [status, source, search, sort, currentPage]);

    const logout = () => {
        localStorage.clear();

        window.location.href = "/";
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold">
                    Sales Dashboard
                </h1>
                <div className="flex gap-3">
                    <button
                        onClick={() =>
                            setShowFilters(
                                !showFilters
                            )
                        }
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                            showFilters
                                ? "bg-black text-white"
                                : "bg-white text-black"
                        }`}
                    >
                        Filters
                    </button>

                    <button
                        onClick={() =>
                            (window.location.href =
                                "/create-lead")
                        }
                        className="bg-white text-black px-4 py-2 rounded-lg font-medium"
                    >
                        + Add Lead
                    </button>

                    <button
                        onClick={logout}
                        className="bg-black border border-white text-white px-4 py-2 rounded-lg"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="p-6">
                {/* Filters */}
                {showFilters && (
                    <div className="bg-white p-5 rounded-2xl shadow mb-6 grid md:grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            className="border rounded-xl px-4 py-3"
                        />

                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(
                                    e.target.value
                                )
                            }
                            className="border rounded-xl px-4 py-3"
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
                            className="border rounded-xl px-4 py-3"
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
                            className="border rounded-xl px-4 py-3"
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
                    <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-4">
                        {error}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="bg-white p-6 rounded-2xl shadow text-center">
                        Loading...
                    </div>
                )}

                {/* Table */}
                {!loading &&
                    leads.length > 0 && (
                        <>
                            <div className="bg-white rounded-2xl shadow overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="p-4 text-left">
                                                Name
                                            </th>

                                            <th className="p-4 text-left">
                                                Email
                                            </th>

                                            <th className="p-4 text-left">
                                                Status
                                            </th>

                                            <th className="p-4 text-left">
                                                Source
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
                                                    className="border-t"
                                                >
                                                    <td className="p-4">
                                                        {
                                                            lead.name
                                                        }
                                                    </td>

                                                    <td className="p-4">
                                                        {
                                                            lead.email
                                                        }
                                                    </td>

                                                    <td className="p-4">
                                                        {
                                                            lead.status
                                                        }
                                                    </td>

                                                    <td className="p-4">
                                                        {
                                                            lead.source
                                                        }
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
                            />
                        </>
                    )}
            </div>
        </div>
    );
};

export default SalesDashboard;
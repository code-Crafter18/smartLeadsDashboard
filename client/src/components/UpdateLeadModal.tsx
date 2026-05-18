import { useEffect, useState } from "react";

interface UpdateLeadModalProps {
    isOpen: boolean;
    darkMode: boolean;
    lead: {
        _id: string;
        name: string;
        email: string;
        status: string;
        source: string;
    } | null;
    onClose: () => void;
    onConfirm: (updates: {
        name: string;
        email: string;
        status: string;
        source: string;
    }) => void;
}

const UpdateLeadModal = ({
    isOpen,
    darkMode,
    lead,
    onClose,
    onConfirm,
}: UpdateLeadModalProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("New");
    const [source, setSource] = useState("Website");

    useEffect(() => {
        if (lead) {
            setName(lead.name || "");
            setEmail(lead.email || "");
            setStatus(lead.status || "New");
            setSource(lead.source || "Website");
        }
    }, [lead]);

    if (!isOpen || !lead) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div
                className={`rounded-3xl p-8 w-full max-w-md shadow-2xl ${
                    darkMode
                        ? "bg-[#1f2937] text-white"
                        : "bg-white text-black"
                }`}
            >
                <h2 className="text-2xl font-bold mb-4">
                    Update Lead
                </h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Lead Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            darkMode
                                ? "bg-[#374151] border-gray-600 text-white placeholder:text-gray-400"
                                : "bg-white border-gray-300 text-black"
                        }`}
                    />

                    <input
                        type="email"
                        placeholder="Lead Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            darkMode
                                ? "bg-[#374151] border-gray-600 text-white placeholder:text-gray-400"
                                : "bg-white border-gray-300 text-black"
                        }`}
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            darkMode
                                ? "bg-[#374151] border-gray-600 text-white placeholder:text-gray-400"
                                : "bg-white border-gray-300 text-black"
                        }`}
                    >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Lost">Lost</option>
                    </select>

                    <select
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        className={`w-full border rounded-xl px-4 py-3 outline-none ${
                            darkMode
                                ? "bg-[#374151] border-gray-600 text-white placeholder:text-gray-400"
                                : "bg-white border-gray-300 text-black"
                        }`}
                    >
                        <option value="Website">Website</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Referral">Referral</option>
                    </select>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                    <button
                        onClick={onClose}
                        className={`px-5 py-2 rounded-xl ${
                            darkMode
                                ? "bg-[#374151] text-white"
                                : "bg-gray-200 text-black"
                        }`}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() =>
                            onConfirm({
                                name,
                                email,
                                status,
                                source,
                            })
                        }
                        className="px-5 py-2 rounded-xl bg-blue-600 text-white"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateLeadModal;

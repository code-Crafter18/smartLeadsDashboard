interface LogoutModalProps {
    isOpen: boolean;

    onClose: () => void;

    onConfirm: () => void;

    darkMode: boolean;
}

const LogoutModal = ({
    isOpen,
    onClose,
    onConfirm,
    darkMode,
}: LogoutModalProps) => {
    if (!isOpen) {
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
                    Logout
                </h2>

                <p
                    className={`mb-8 ${
                        darkMode
                            ? "text-gray-300"
                            : "text-gray-600"
                    }`}
                >
                    Are you sure you want to logout?
                </p>

                <div className="flex justify-end gap-4">
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
                        onClick={onConfirm}
                        className="px-5 py-2 rounded-xl bg-red-600 text-white"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;

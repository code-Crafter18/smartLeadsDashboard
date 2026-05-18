interface DeleteModalProps {
    isOpen: boolean;
    darkMode: boolean;

    onClose: () => void;

    onConfirm: () => void;
}

const DeleteModal = ({
    isOpen,
    darkMode,
    onClose,
    onConfirm,
}: DeleteModalProps) => {
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
                    Delete Lead
                </h2>

                <p
                    className={`${
                        darkMode
                            ? "text-gray-300"
                            : "text-gray-600"
                    } mb-8`}
                >
                    Are you sure you want to
                    delete this lead?
                </p>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl border border-gray-300"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-5 py-2 rounded-xl bg-red-600 text-white"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;

interface PaginationProps {
    currentPage: number;

    totalPages: number;

    onPageChange: (page: number) => void;

    darkMode: boolean;
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    darkMode,
}: PaginationProps) => {
    return (
        <>
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-6">
                    {/* Prev */}
                    <button
                        disabled={
                            currentPage ===
                            1
                        }
                        onClick={() =>
                            onPageChange(
                                currentPage -
                                    1
                            )
                        }
                        className={`px-4 py-2 rounded-xl font-medium transition ${
                            currentPage ===
                            1
                                ? darkMode
                                    ? "bg-[#374151] text-gray-500 cursor-not-allowed"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : darkMode
                                ? "bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                                : "bg-black text-white"
                        }`}
                    >
                        Prev
                    </button>

                    {/* Numbers */}
                    <div className="flex gap-2">
                        {[
                            ...Array(
                                totalPages
                            ),
                        ].map(
                            (
                                _,
                                index
                            ) => (
                                <button
                                    key={
                                        index
                                    }
                                    onClick={() =>
                                        onPageChange(
                                            index +
                                                1
                                        )
                                    }
                                    className={`w-10 h-10 rounded-xl font-medium transition ${
                                        currentPage ===
                                        index +
                                            1
                                            ? "bg-blue-600 text-white"
                                            : darkMode
                                            ? "bg-[#374151] text-gray-200 hover:bg-[#4b5563]"
                                            : "bg-white border border-gray-300 text-black"
                                    }`}
                                >
                                    {index +
                                        1}
                                </button>
                            )
                        )}
                    </div>

                    {/* Next */}
                    <button
                        disabled={
                            currentPage ===
                            totalPages
                        }
                        onClick={() =>
                            onPageChange(
                                currentPage +
                                    1
                            )
                        }
                        className={`px-4 py-2 rounded-xl font-medium transition ${
                            currentPage ===
                            totalPages
                                ? darkMode
                                    ? "bg-[#374151] text-gray-500 cursor-not-allowed"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : darkMode
                                ? "bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                                : "bg-black text-white"
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
};

export default Pagination;

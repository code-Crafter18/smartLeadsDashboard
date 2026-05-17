interface PaginationProps {
    currentPage: number;

    totalPages: number;

    onPageChange: (page: number) => void;
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
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
                        className={`px-4 py-2 rounded-lg ${
                            currentPage ===
                            1
                                ? "bg-gray-300 cursor-not-allowed"
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
                                    className={`w-10 h-10 rounded-lg ${
                                        currentPage ===
                                        index +
                                            1
                                            ? "bg-blue-600 text-white"
                                            : "bg-white border"
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
                        className={`px-4 py-2 rounded-lg ${
                            currentPage ===
                            totalPages
                                ? "bg-gray-300 cursor-not-allowed"
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

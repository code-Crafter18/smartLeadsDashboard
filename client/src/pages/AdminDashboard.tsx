const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-black text-white p-5 flex justify-between">
                <h1 className="text-2xl font-bold">
                    Admin Dashboard
                </h1>

                <button
                    onClick={() => {
                        localStorage.clear();

                        window.location.href = "/";
                    }}
                    className="bg-white text-black px-4 py-2 rounded-lg"
                >
                    Logout
                </button>
            </div>

            <div className="p-6">
                <div className="grid md:grid-cols-3 gap-5">
                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-lg font-semibold">
                            Total Leads
                        </h2>

                        <p className="text-4xl font-bold mt-4">
                            120
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-lg font-semibold">
                            Qualified Leads
                        </h2>

                        <p className="text-4xl font-bold mt-4">
                            45
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-lg font-semibold">
                            Lost Leads
                        </h2>

                        <p className="text-4xl font-bold mt-4">
                            12
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

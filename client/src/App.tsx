import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CreateLeadPage from "./pages/CreateLeadPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LeadDetailsPage from "./pages/LeadDetailsPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<LoginPage />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "admin",
                                "sales",
                            ]}
                        >
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/lead/:id"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "admin",
                                "sales",
                            ]}
                        >
                            <LeadDetailsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                <Route
                    path="/create-lead"
                    element={<CreateLeadPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
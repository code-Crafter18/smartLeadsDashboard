import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    allowedRoles: string[];
    children: ReactNode;
}

const ProtectedRoute = ({
    allowedRoles,
    children,
}: ProtectedRouteProps) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    if (!token || !user.role) {
        return (
            <Navigate to="/" replace />
        );
    }

    if (!allowedRoles.includes(user.role)) {
        return (
            <Navigate to="/" replace />
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;

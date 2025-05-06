import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
    const { token } = useAuth();

    if (!token) {
        console.log("No token, redirecting to /login");
        return <Navigate to="/login" replace />;
    }
    console.log("Token found, rendering protected page");
    return <Outlet />;
}

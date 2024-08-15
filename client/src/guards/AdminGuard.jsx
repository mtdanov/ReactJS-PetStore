import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext"
import Path from "../path";

export default function AdminGuard() {
    const { role, isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to={Path.Login} />
    }

    if (role !== 'admin') {
        return <Navigate to={Path.NotFound} />;
    }

    return <Outlet />;
}

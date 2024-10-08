import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext"
import Path from "../path";

export default function GuestGuard() {
    const { isAuthenticated } = useContext(AuthContext);
    if (isAuthenticated) {
        return <Navigate to={Path.Home} />
    }
    return <Outlet />;
}

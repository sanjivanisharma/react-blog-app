import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, authRequired }) {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    if (authRequired && !isAuthenticated) {
        return <Navigate to="/login" replace />
    } else if (!authRequired && isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return children;
}
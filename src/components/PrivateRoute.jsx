/* React Router
=============== */
import { Navigate } from "react-router-dom"

/* Auth
======= */
import { useAuth } from "../context/AuthContext"

function PrivateRoute({ children }) {
    const { currentUser } = useAuth();

    return (
      currentUser ? children : <Navigate to={"/login"} />
    );
};

export default PrivateRoute;
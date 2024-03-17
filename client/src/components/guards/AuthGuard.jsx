import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/authStore"

const AuthGuard = ({ children }) => {
    const { user } = useAuthStore();

    if (!user) {
        return <Navigate to={'/login'} />
    }
    return children;
}

export default AuthGuard

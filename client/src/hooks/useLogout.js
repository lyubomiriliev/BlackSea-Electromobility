import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      navigate("/login");
    } catch (error) {}
  };

  return { handleLogout, loading, error };
};

export default useLogout;

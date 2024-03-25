import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const useLogout = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth).then(() => {
        toast.success("Logged out succesfully");
      });
      localStorage.removeItem("user-info");
      localStorage.removeItem("stationData");
      localStorage.removeItem("modalShown");
      localStorage.removeItem("mobileModalShown");
      navigate("/login");
    } catch (error) {}
  };

  return { handleLogout, loading, error };
};

export default useLogout;

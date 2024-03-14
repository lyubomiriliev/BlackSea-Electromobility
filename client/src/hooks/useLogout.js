import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";

const useLogout = () => {
  const [signOut, loading, error] = useSignOut(auth);

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
    } catch (error) {}
  };

  return { handleLogout, loading, error };
};

export default useLogout;

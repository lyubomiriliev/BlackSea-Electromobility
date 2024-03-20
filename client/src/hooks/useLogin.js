import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../firebase.config";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

import { toast } from "react-toastify";

const useLogin = () => {
  const [signInWithEmailAndPassword, error] =
    useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.login);

  const handleUserLogin = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      return alert("Моля попълнете празните полета");
    }
    try {
      const userCredentials = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (userCredentials) {
        const docRef = doc(firestore, "users", userCredentials.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        loginUser(docSnap.data());
        navigate("/");
        toast.success("Logged in successfully");
      }
    } catch (error) {
      toast.error("Failed to log in. Please check your credentials");
      console.error("Error logging in", error);
    }
  };
  return { error, handleUserLogin };
};

export default useLogin;

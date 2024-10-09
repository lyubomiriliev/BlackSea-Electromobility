import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../firebase.config";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

import { toast } from "react-toastify";

const useLogin = () => {
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.login);

  const handleFirebaseErrors = (error) => {
    const errorCode = error.code;

    switch (errorCode) {
      case "INVALID_LOGIN_CREDENTIALS":
        toast.error("The password you entered is incorrect.");
        break;
      case "auth/user-not-found":
        toast.error("No account found with this email address.");
        break;
      case "auth/too-many-requests":
        toast.error(
          "Access to this account has been temporarily disabled due to too many failed login attempts. Please try again later."
        );
        break;
      case "auth/invalid-email":
        toast.error("The email address is not valid.");
        break;
      default:
        toast.error("Failed to log in. Please check your credentials.");
        break;
    }
  };

  const handleUserLogin = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      return toast.error("Please fill in the required fields.");
    }
    try {
      const userCredentials = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (userCredentials) {
        const docRef = doc(firestore, "users", userCredentials.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
          loginUser(docSnap.data());
          navigate("/");
          toast.success("Logged in successfully");
        } else {
          toast.error("User data not found");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      handleFirebaseErrors(error)
    }
  };

  return { handleUserLogin };
};

export default useLogin;

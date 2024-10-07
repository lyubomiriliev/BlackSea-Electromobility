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

  const handleUserLogin = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      return alert("Моля попълнете празните полета");
    }
    try {
      const userCredentials = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      )
        .then(
          (userCredentials) => {
            const user = userCredentials.user;
          },
          (error) => {
            console.error(error);
          }
        )
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (
            errorCode === "400" &&
            errorMessage === "INVALID_LOGIN_CREDENTIALS"
          ) {
            toast.error("The password you entered is incorrect.");
          }
        });

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
      console.log(JSON.stringify(error));
    }
  };

  const handleFirebaseErrors = (error) => {
    const errorCode = error.code;

    switch (errorCode) {
      case "auth/wrong-password":
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

  return { handleUserLogin };
};

export default useLogin;

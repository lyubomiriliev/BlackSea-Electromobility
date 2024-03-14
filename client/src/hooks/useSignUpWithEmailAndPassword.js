import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase.config";
import { doc, setDoc } from "firebase/firestore";

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const signup = async (inputs) => {
    if (!inputs.email || !inputs.name || !inputs.password) {
      console.log("Моля попълнете всички полета.");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser && error) {
        console.log(error);
        return;
      }
      if (newUser) {
        const userDoc = {
          name: inputs.name,
          surname: inputs.surname,
          uid: newUser.user.uid,
          email: inputs.email,
          password: inputs.password,
          phone: inputs.phone,
          profilePicURL: "",
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;

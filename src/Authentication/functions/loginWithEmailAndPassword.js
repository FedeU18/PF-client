import { auth } from "../firebase/credenciales";
import { signInWithEmailAndPassword } from "firebase/auth";
import getCurrentUser from "./getCurrentUser";

const LoginWithEmailPassword = async (email, password) => {
  try {
    const usuario = await signInWithEmailAndPassword(auth, email, password);
    const getFirestoreData = await getCurrentUser(usuario.user.uid);

    const dataAuth = JSON.stringify(usuario.user); 
    const dataFirestore = JSON.stringify(getFirestoreData);

    localStorage.setItem("userDataAuth", dataAuth);
    localStorage.setItem("userData", dataFirestore);
    localStorage.setItem("user", "true");
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      return "this account does not exist";
    } else if (err.code === "auth/invalid-email") {
      return "Invalid Email, try again please";
    } else if (err.code === "auth/wrong-password") {
      return "Incorrect password, try again";
    } else if (err.code === "auth/internal-error") {
      return "We are sorry a unkwon error happen";
    }
  }
};

export default LoginWithEmailPassword;

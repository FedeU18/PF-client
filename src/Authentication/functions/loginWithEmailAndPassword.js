import { auth } from "../firebase/credenciales";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginWithEmailPassword = async (email, password) => {
  try {
    const usuario = await signInWithEmailAndPassword(auth, email, password);
    console.log(usuario);
  } catch (err) {
    console.error(err.message);
    console.error(err.code);

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

// auth/user-not-found => no existe el usuario
// auth/invalid-email => email invalido

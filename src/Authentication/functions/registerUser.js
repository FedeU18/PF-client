import { auth } from "../firebase/credenciales";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Metodo de Registro con Email y Contraseña
export default async function registerUser(email, password) {
  try {
    //  llamamos a "createUserWithEmailAndPassword"
    // dentro de una funcion asincrona
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user, "registrando");
    return user;
  } catch (error) {
    console.log(error.message);
    console.log(error.code);
    const objectError = {
      msg: error.message,
      code: error.code,
    };

    if(objectError.code === "auth/weak-password"){
      return "password is too short, try another more long, please"
    } else if (objectError.code === "auth/email-already-in-use"){
      return "the email is already try another please"
    } else if (objectError.code === "auth/invalid-email") {
      return "the email is invalid ,please try another"
    } else if (objectError.code === "auth/internal-error") {
      return "We are sorry a unkwon error happen"
    } else if (objectError.code === "auth/missing-email") {
      return "please enter a email, the input is empty"
    }
  }
}

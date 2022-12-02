import { auth } from "../firebase/credenciales";
import { createUserWithEmailAndPassword } from "firebase/auth";
import setUserData from "./setUserData";
import getCurrentUser from "./getCurrentUser";

// Metodo de Registro con Email y Contraseña
export default async function registerUser(email, password, form) {
  try {
    //  llamamos a "createUserWithEmailAndPassword"
    // dentro de una funcion asincrona
    const userCreate = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setUserData(userCreate.user.uid, {
      id: userCreate.user.uid,
      ...form,
    });
    const getFirestoreData = await getCurrentUser(userCreate.user.uid);

    const dataAuth = JSON.stringify(userCreate.user);
    const dataFirestore = JSON.stringify(getFirestoreData);

    localStorage.setItem("userDataAuth", dataAuth);
    localStorage.setItem("userData", dataFirestore);
    localStorage.setItem("user", "true");

    return userCreate;
  } catch (error) {
    if (error.code === "auth/weak-password") {
      return "password is too short, try another more long, please";
    } else if (error.code === "auth/email-already-in-use") {
      return "the email is already try another please";
    } else if (error.code === "auth/invalid-email") {
      return "the email is invalid ,please try another";
    } else if (error.code === "auth/internal-error") {
      return "We are sorry a unkwon error happen";
    } else if (error.code === "auth/missing-email") {
      return "please enter a email, the input is empty";
    }
  }
}

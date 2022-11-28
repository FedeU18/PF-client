import { auth } from "../firebase/credenciales";
import {
  GoogleAuthProvider,
  signInWithPopup, // registro con ventana modal
  signInWithRedirect, // registro con redireccion
} from "firebase/auth";

export default async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    const currentAuthGoogle = auth.currentUser;
    const currentUserJSON = JSON.stringify(currentAuthGoogle);
    localStorage.setItem("user", "true");
    localStorage.setItem("userDataAuth", currentUserJSON);
  } catch (error) {
    console.error(error);
  }
}

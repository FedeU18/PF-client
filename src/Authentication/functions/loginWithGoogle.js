import { auth } from "../firebase/credenciales";
import {
  GoogleAuthProvider,
  signInWithPopup, // registro con ventana modal
  signInWithRedirect, // registro con redireccion
} from "firebase/auth";

export default async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    console.log(provider);
  } catch (error) {
    console.error(error);
  }
}

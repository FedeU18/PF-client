import { auth } from "../firebase/credenciales";
import {
  GoogleAuthProvider,
  signInWithPopup, // registro con ventana modal
  signInWithRedirect, // registro con redireccion
} from "firebase/auth";

export default async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const loginUser = await signInWithPopup(auth, provider);
    return loginUser
  } catch (error) {
    console.error(error);
  }
}

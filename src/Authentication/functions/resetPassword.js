import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/credenciales";

export default async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  }
}

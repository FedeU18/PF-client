import { getAuth, sendPasswordResetEmail } from "firebase/auth";
// import { auth } from "../firebase/credenciales";

export default async function resetPassword(email) {
  try {
    const auth = getAuth();
    const data = await sendPasswordResetEmail(auth, email);
    console.log(data);
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }
}

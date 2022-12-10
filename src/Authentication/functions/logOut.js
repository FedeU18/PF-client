import { auth } from "../firebase/credenciales";
import { signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

export default async function logOut() {
  try {
    localStorage.removeItem("userDataAuth");
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    localStorage.removeItem("data-payment");
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
}

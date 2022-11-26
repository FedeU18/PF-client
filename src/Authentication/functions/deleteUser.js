import { deleteUser } from "firebase/auth";
import { auth } from "../firebase/credenciales";

export default async function deleteCurrentUser() {
  try {
    const eliminarUsuario = await deleteUser(auth);
    localStorage.removeItem("user");
    console.log(eliminarUsuario);
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }
}

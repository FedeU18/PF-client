import { db } from "../firebase/credenciales";
import { doc, deleteDoc } from "firebase/firestore";

export default async function deleteFirestoreUser(idUser) {
  try {
    console.log(idUser)
    await deleteDoc(doc(db, "users", idUser));
  } catch (error) {
    console.log(error.message);
    console.log(error.code);
  }
}

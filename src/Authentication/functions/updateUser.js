import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/credenciales";

export default async function updateUser(id, editedData) {
  try {
    const firebaseUsers = doc(db, "users", id);

    await updateDoc(firebaseUsers, {});
  } catch (error) {
    console.error(error);
  }
}

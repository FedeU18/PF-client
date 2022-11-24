// me trae los datos del usuario que acaba de iniciar sesion
import { db } from "../firebase/credenciales";
import { doc, getDoc } from "firebase/firestore";

// GET doc nos permite obtener la data que deseamos

export default async function getCurrentUser(uid) {
  try {
    const docRef = doc(db, `users/${uid}`);
    const docuCifrada = await getDoc(docRef);
    const finalInfo = docuCifrada.data();
    return finalInfo;
  } catch (error) {
    console.error(error);
  }
}



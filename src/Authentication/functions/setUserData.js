// guarda a los usuarios en la base de datos

import { db } from "../firebase/credenciales";
import { doc, setDoc } from "firebase/firestore";

export default function setUserData(id, data) {
  try {
    const docuRef = doc(db, `users/${id}`);
    const value = setDoc(docuRef, data);
    return value;
  } catch (error) {
    console.error(error);
  }
}


// calectiones / documentsos / data

// users /  hfejkfjkslfa835 /
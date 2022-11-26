import { deleteUser } from "firebase/auth";
import { auth } from "../firebase/credenciales";

export default async function deleteCurrentUser() {
  try {
    await deleteUser(auth.currentUser);
    localStorage.removeItem("user");
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }
}


// const deleteAcount = async () => {
//   await deleteFirestoreUser(user.userDataAuth.uid)
//   // 1 - elimina en firestore
//   deleteCurrentUser() 
//   // 2 - borra la authenticacion de firebase
//   logOut() 
//   // 3 - deslogea al usuario
//   navigate("/") 
//   // 4 - nos lleva al landing
// }
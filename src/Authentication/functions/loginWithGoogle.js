import { auth } from "../firebase/credenciales";
import {
  GoogleAuthProvider,
  signInWithPopup, // registro con ventana modal
  signInWithRedirect, // registro con redireccion
} from "firebase/auth";
import setUserData from "./setUserData";
import getCurrentUser from "./getCurrentUser";
import { postAlumno } from "../../redux/Actions/Alumno";
import { postProfesor } from "../../redux/Actions/Profesor";
import logOut from "./logOut";
import deleteCurrentUser from "./deleteCurretUser";

export default async function loginWithGoogle(form, dispatch) {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);

    const currentAuthGoogle = auth.currentUser;
    console.log(currentAuthGoogle);

    if (form) {
      if (form.rol === "student") {
        dispatch(
          postAlumno({
            id: currentAuthGoogle.uid,
            email: currentAuthGoogle.email,
            ...form,
          })
        );

        await setUserData(currentAuthGoogle.uid, {
          id: currentAuthGoogle.uid,
          email: currentAuthGoogle.email,
          ...form,
        });

        const dataFirestore = await getCurrentUser(currentAuthGoogle.uid);

        const currentUserJSON = JSON.stringify(currentAuthGoogle);
        const dataFirestoreJSON = JSON.stringify(dataFirestore);
        localStorage.setItem("user", "true");
        localStorage.setItem("userData", dataFirestoreJSON);
        localStorage.setItem("userDataAuth", currentUserJSON);
      } else if (form.rol === "teacher") {
        dispatch(
          postProfesor({
            id: currentAuthGoogle.uid,
            email: currentAuthGoogle.email,
            ...form,
          })
        );

        await setUserData(currentAuthGoogle.uid, {
          id: currentAuthGoogle.uid,
          email: currentAuthGoogle.email,
          ...form,
        });

        const dataFirestore = await getCurrentUser(currentAuthGoogle.uid);

        const currentUserJSON = JSON.stringify(currentAuthGoogle);
        const dataFirestoreJSON = JSON.stringify(dataFirestore);
        localStorage.setItem("user", "true");
        localStorage.setItem("userData", dataFirestoreJSON);
        localStorage.setItem("userDataAuth", currentUserJSON);
      }
    } else {
      const dataFirestore = await getCurrentUser(currentAuthGoogle.uid);

      if (!dataFirestore) {
        await deleteCurrentUser();
        await logOut(auth);
        return "user no existe";
      }
      if (dataFirestore) {
        const dataFirestoreJSON = JSON.stringify(dataFirestore);
        const currentUserJSON = JSON.stringify(currentAuthGoogle);

        localStorage.setItem("user", "true");
        localStorage.setItem("userData", dataFirestoreJSON);
        localStorage.setItem("userDataAuth", currentUserJSON);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

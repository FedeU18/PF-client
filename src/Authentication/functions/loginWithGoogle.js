import { auth } from "../firebase/credenciales";
import {
  GoogleAuthProvider,
  signInWithPopup, // registro con ventana modal
  signInWithRedirect, // registro con redireccion
} from "firebase/auth";
import setUserData from "./setUserData";
import getCurrentUser from "./getCurrentUser";
import { useDispatch } from "react-redux";
import { postAlumno } from "../../redux/Actions/Alumno";

export default async function loginWithGoogle(form, dispatch) {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    console.log(provider);

    const currentAuthGoogle = auth.currentUser;

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
    }
  } catch (error) {
    console.error(error);
  }
}

import { createContext, useState } from "react";
import { auth } from "../firebase/credenciales";
import { onAuthStateChanged } from "firebase/auth"
import getCurrentUser from "../functions/getCurrentUser";
import { Navigate, useNavigate } from "react-router-dom"

export const AuthContext = createContext();

function AuthenticationProvider({ children }) {
  const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState(null);

  onAuthStateChanged(auth, (userOnline) => {
    if (userOnline) {
      const UID = userOnline.uid
      if (!isAuth) {
        getCurrentUser(UID)
          .then((currentUser) => {
            if (!currentUser) {
              const allUserData = {
                ...userOnline,
                currentUserData: {
                  name: userOnline.displayName,
                  apellido: userOnline.displayName.split(" ")[1],
                  email: userOnline.email,
                  photo: userOnline.photoURL
                }
              }
              console.log(allUserData);
              setIsAuth({
                ...userOnline,
                currentUserData: allUserData
              })
              return;
            }
            setIsAuth({
              ...userOnline,
              currentUserData: currentUser
            })
          })

      }
    } else {
      setIsAuth(null)
    }
  })

  return (
    <AuthContext.Provider value={isAuth}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthenticationProvider;
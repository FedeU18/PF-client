import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/credenciales";
import { onAuthStateChanged } from "firebase/auth"
import getCurrentUser from "../functions/getCurrentUser";

export const AuthContext = createContext();

function AuthenticationProvider({ children }) {
  const [isAuth, setIsAuth] = useState(null);


  onAuthStateChanged(auth, (userOnline) => {
    if (userOnline) {
      if (isAuth === null) {
        getCurrentUser(userOnline.uid)
          .then(currentUser => {
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
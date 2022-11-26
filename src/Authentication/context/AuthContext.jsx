import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/credenciales";
import { onAuthStateChanged } from "firebase/auth"
import getCurrentUser from "../functions/getCurrentUser";

const AuthContext = createContext();

export const useAuth = () => {
  try {
    const context = useContext(AuthContext);
    if (!context) {
      console.log("no hay usuario")
    }
    return context;
  } catch (error) {
    console.error(error)
  }
}

function AuthenticationProvider({ children }) {
  const [isAuth, setIsAuth] = useState(null);
  const [dbDataUser, setdbDataUser] = useState(null);

  const setData = (uid) => {
    getCurrentUser(uid).then(user => {
      setdbDataUser(user)
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userOnline) => {
      if (userOnline) {
        setData(userOnline.uid)
        setIsAuth(userOnline)
      }
    })

    return () => unsubscribe();
  }, [])


  const data = {
    isAuth,
    dbDataUser,
  }

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthenticationProvider;
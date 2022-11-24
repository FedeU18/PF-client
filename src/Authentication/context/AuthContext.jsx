import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/credenciales";
import { onAuthStateChanged } from "firebase/auth"

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
  // const [dbDataUser, setdbDataUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userOnline) => {
      if (userOnline) {
        setIsAuth(userOnline)
      }
    })

    return () => unsubscribe();
  }, [])


  const data = {
    isAuth,
    // dbDataUser,
  }

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthenticationProvider;
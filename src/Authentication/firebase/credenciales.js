import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB4Wahk9eRFCPsS6x8sJqTr2MievkByLAM",
  authDomain: "findyourteacher-55b78.firebaseapp.com",
  projectId: "findyourteacher-55b78",
  storageBucket: "findyourteacher-55b78.appspot.com",
  messagingSenderId: "155851732814",
  appId: "1:155851732814:web:2c1082ff84464cad66901f",
  // measurementId: "G-MRF6Q02GPL",
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export default firebaseApp;

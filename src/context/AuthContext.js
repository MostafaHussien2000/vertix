/* React Hooks
============== */
import { createContext, useState, useContext, useEffect } from "react";

/* Firebase
=========== */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import {auth, db} from "../firebase.config"
import {setDoc, doc, serverTimestamp}  from "firebase/firestore";


const AuthContext = createContext();
export function useAuth () {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const signup = async (fullName="", email="", password="", profilePicture="") => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    return await setDoc(doc(db, "users", response?.user?.uid), {
      fullName, email, createdAt: serverTimestamp()
    })
  }


  const login = (email="", password="", profilePicture="") => signInWithEmailAndPassword(auth, email, password)


  const logout = () => signOut(auth)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout
  }


  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

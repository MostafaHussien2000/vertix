/* React Hooks
============== */
import { createContext, useState, useContext, useEffect } from "react";

/* Firebase
=========== */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import {auth, db} from "../firebase.config"
import {setDoc, doc, getDoc, serverTimestamp}  from "firebase/firestore";


const AuthContext = createContext();
export function useAuth () {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const signup = async (fullName="", email="", password="", profilePicture="") => {
    const defaultPhotoURL = "https://th.bing.com/th/id/OIP.jV9zPKA_1wFbypI2A2sBywAAAA?w=300&h=300&rs=1&pid=ImgDetMain"
    const response = await createUserWithEmailAndPassword(auth, email, password);
    return await setDoc(doc(db, "users", response?.user?.uid), {
      fullName, email, createdAt: serverTimestamp(), watchlist: {movies: [], tv: []}, saved_articles: [], photoURL: defaultPhotoURL
    })
  }


  const login = (email="", password="", profilePicture="") => signInWithEmailAndPassword(auth, email, password)


  const logout = () => signOut(auth)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setCurrentUser({...user, ...docSnap.data()});
        else console.log("no data found")
      } else {
        setCurrentUser(user)
      }
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

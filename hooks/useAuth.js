import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuthContext } from "../context/useContext";
import { auth } from "../config/firebase"; // Adjust the path accordingly

export default function useAuth() {
  const { updateUser, clearUser } = useAuthContext();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userDoc = await getDoc(doc(db, "users", authUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log(userData);
          updateUser(authUser, userData);
        }
      } else {
        clearUser();
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  // You can omit the return statement, or keep it for any additional logic

  // Example of returning user
  return {
    user: useAuthContext().user,
  };
}

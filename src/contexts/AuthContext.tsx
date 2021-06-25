import { ReactNode, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createContext } from "use-context-selector";

import { auth, firebase } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextData = {
  // data
  user: User | undefined;

  // booleans

  // functions
  signInWithGoogle: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account.");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });

        toast.success(`Welcome back, ${displayName}!`);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        toast.error("Missing information from Google Account.");
        return;
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });

      toast.success(`Welcome, ${displayName}!`);
    }
  }, [])

  const valueAuthContext = {
    // data
    user,

    // booleans

    // functions
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={valueAuthContext}>
      {children}
    </AuthContext.Provider>
  );
}

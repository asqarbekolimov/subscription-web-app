import { auth } from "@/firebase";
import { useAuth } from "@/hooks/useAuth";
import { User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { createContext } from "react";

interface AuthContextState {
  user: User | null;
  error: string;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState>({
  user: null,
  error: "",
  isLoading: false,
  signIn: async () => {},
  signUp: async () => {},
  logOut: async () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [initialLoader, setInitialLoader] = useState<boolean>(true);
  const {
    error,
    isLoading,
    logOut,
    signIn,
    signUp,
    user,
    setUser,
    setIsLoading,
  } = useAuth();
  const router = useRouter();

  const value = useMemo(
    () => ({ user, isLoading, logOut, signIn, signUp, error }),
    [user, isLoading, error],
  );

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          router.push("/");
        } else {
          setUser(null);
          router.push("/auth");
        }
        setIsLoading(false);
        setInitialLoader(false);
      }),
    [],
  );

  return (
    <AuthContext.Provider value={value}>
      {!initialLoader ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

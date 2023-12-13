import { useAuth } from "@/hooks/useAuth";
import { User } from "firebase/auth";
import { ReactNode, useMemo } from "react";
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
  const { error, isLoading, logOut, signIn, signUp, user } = useAuth();

  const value = useMemo(
    () => ({ user, isLoading, logOut, signIn, signUp, error }),
    [user, isLoading, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

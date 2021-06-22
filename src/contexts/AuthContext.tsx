import { createContext, ReactNode } from "react";

type AuthContextData = {};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const valueAuthContext = {};

  return (
    <AuthContext.Provider value={valueAuthContext}>
      {children}
    </AuthContext.Provider>
  );
}

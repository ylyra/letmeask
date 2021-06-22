import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth() {
  const authProvider = useContext(AuthContext);

  return authProvider;
}

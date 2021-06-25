import { useContextSelector } from "use-context-selector";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth() {
  const user = useContextSelector(AuthContext, (auth) => auth.user);
  const signInWithGoogle = useContextSelector(
    AuthContext,
    (auth) => auth.signInWithGoogle
  );

  return {
    // data
    user,

    // booleans

    // functions
    signInWithGoogle,
  };
}

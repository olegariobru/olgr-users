import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

export default function PublicRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Carregando...</p>;

  if (user) {
    return <Navigate to="/telaADMinicial" replace />;
  }

  return children;
}
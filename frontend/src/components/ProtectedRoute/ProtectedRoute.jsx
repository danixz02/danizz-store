import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function ProtectedRoute({ children }) {
  const { isAdmin, carregando } = useAuth();
  const location = useLocation();

  if (carregando) {
    return (
      <main className="admin-loading">
        <p>Verificando permissao...</p>
      </main>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

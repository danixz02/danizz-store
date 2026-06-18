import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const { login, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destino = location.state?.from || "/admin";

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErro("");
    setEnviando(true);

    try {
      const usuarioLogado = await login(email, senha);

      if (usuarioLogado.tipo !== "admin") {
        logout();
        setErro("Acesso negado. Somente administradores podem acessar o painel.");
        return;
      }

      navigate(destino, { replace: true });
    } catch (error) {
      setErro(error.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Painel Administrativo</h1>
        <p>Entre com uma conta do tipo admin para gerenciar produtos.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seu@email.com"
              required
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              placeholder="Sua senha"
              required
            />
          </label>

          {erro && <p className="login-error">{erro}</p>}

          <button type="submit" disabled={enviando}>
            {enviando ? "Entrando..." : "Entrar no painel"}
          </button>
        </form>
      </section>
    </main>
  );
}

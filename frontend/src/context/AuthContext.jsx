import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, TOKEN_KEY, USER_KEY } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem(USER_KEY);
    return salvo ? JSON.parse(salvo) : null;
  });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function validarSessao() {
      const token = localStorage.getItem(TOKEN_KEY);

      if (!token) {
        setCarregando(false);
        return;
      }

      try {
        const usuarioAtual = await api.getMe();
        const dadosUsuario = {
          id: usuarioAtual._id,
          nome: usuarioAtual.nome,
          email: usuarioAtual.email,
          tipo: usuarioAtual.tipo,
        };

        setUsuario(dadosUsuario);
        localStorage.setItem(USER_KEY, JSON.stringify(dadosUsuario));
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setUsuario(null);
      } finally {
        setCarregando(false);
      }
    }

    validarSessao();
  }, []);

  async function login(email, senha) {
    const { token, usuario: usuarioLogado } = await api.login(email, senha);

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(usuarioLogado));
    setUsuario(usuarioLogado);

    return usuarioLogado;
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUsuario(null);
  }

  const value = useMemo(
    () => ({
      usuario,
      carregando,
      isAdmin: usuario?.tipo === "admin",
      login,
      logout,
    }),
    [usuario, carregando],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
}

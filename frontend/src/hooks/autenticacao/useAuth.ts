import { useState } from "react";
import { login } from "../../api/authApi";
import type { User } from "../../types/user";

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function signIn(matricula: string, password: string): Promise<void> {
    try {
      setLoading(true);
      setError("");

      const data = await login(matricula, password);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
    } catch (err) {
      setError("Matrícula ou senha inválida.");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
  }

  return {
    user,
    loading,
    error,
    signIn,
    signOut,
    isAuthenticated: !!user,
    isAdmin: user?.is_staff ?? false,
  };
}

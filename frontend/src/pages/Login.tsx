import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/autenticacao/useAuth";

export default function Login() {
  const { signIn, loading, error } = useAuth();
  const navigate = useNavigate();

  const [matricula, setMatricula] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await signIn(matricula, password);
      navigate("/");
    } catch {}
  }

  function handleBackToDashboard() {
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-[#1A955E] mb-6 text-center">
          Inventário Maker
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Matrícula</label>
          <input
            type="text"
            maxLength={14}
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A955E]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A955E]"
            required
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1A955E] text-white py-2 rounded hover:bg-[#16784b] transition disabled:opacity-60 mb-3"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {/* Botão voltar para dashboard */}
        <button
          type="button"
          onClick={handleBackToDashboard}
          className="
            w-full
            border-2 border-[#1A955E]
            text-[#1A955E]
            py-2
            rounded
            hover:bg-[#1A955E]
            hover:text-white
            transition
            font-semibold
          "
        >
          Voltar para o Dashboard
        </button>
      </form>
    </div>
  );
}

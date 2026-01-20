import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/autenticacao/useAuth";
import { MdLogin } from "react-icons/md";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f9f6] to-[#e8f5f0]">
      {/* Container principal */}
      <div className="w-full max-w-md mx-4">
        
        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Header com gradiente */}
          <div className="bg-gradient-to-r from-[#1A955E] to-[#29854A] px-8 py-12 text-center">
            <div className="mb-4 flex justify-center bg-white rounded-2xl">
              <img
                className="w-20 h-20"
                src="/assets/logo-inventariomaker.svg"
                alt="Logo Inventário Maker"
              />
            </div>
            <h1 className="text-white text-3xl font-bold mb-2">
              Inventário Maker
            </h1>
            <p className="text-[#b8dfd1] text-sm">
              Gerenciar seu estoque com facilidade
            </p>
          </div>

          {/* Conteúdo do formulário */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
            
            {/* Campo Matrícula */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Matrícula
              </label>
              <input
                type="text"
                maxLength={14}
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                placeholder="Digite sua matrícula"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1A955E] focus:ring-2 focus:ring-[#1A955E] focus:ring-opacity-30 transition"
                required
              />
            </div>

            {/* Campo Senha */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1A955E] focus:ring-2 focus:ring-[#1A955E] focus:ring-opacity-30 transition"
                required
              />
            </div>

            {/* Mensagem de erro */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Botão Entrar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#1A955E] to-[#29854A] text-white py-3 rounded-lg hover:shadow-lg transition duration-200 font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <MdLogin size={20} />
              {loading ? "Entrando..." : "Entrar"}
            </button>

            {/* Botão Voltar */}
            <button
              type="button"
              onClick={handleBackToDashboard}
              className="w-full border-2 border-[#1A955E] text-[#1A955E] py-3 rounded-lg hover:bg-[#f0f9f6] transition duration-200 font-semibold"
            >
              Voltar para o Dashboard
            </button>
          </form>

          {/* Rodapé */}
          <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
            <p className="text-gray-600 text-xs">
              © 2026 CNAT Maker. Todos os direitos reservados.
            </p>
          </div>
        </div>

        {/* Decoração */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Sistema de Gestão de Inventário
          </p>
        </div>
      </div>
    </div>
  );
}

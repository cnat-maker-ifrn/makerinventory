import { NavLink, useNavigate } from "react-router-dom";
import { MdLogin, MdLogout } from "react-icons/md";
import { useAuth } from "../../hooks/autenticacao/useAuth";

export default function Header() {
  const { isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    signOut();
    navigate("/login");
  }
  return (
    <header className="w-full h-[100px] bg-white flex items-center justify-between px-6 mb-2 shadow-md">
      
      {/* Logo */}
      <div className="flex items-center gap-4 pl-[10px]">
        <img
          className="w-[85px] h-[85px]"
          src="/assets/logo-inventariomaker.svg"
          alt="Logo Inventário Maker"
        />

        <h1 className="text-[30px] flex flex-col items-start leading-tight logo-font">
          <span className="font-light">Inventário</span>
          <span className="font-bold ml-5">Maker</span>
        </h1>
      </div>

      {/* Botão Login/Logout */}
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-2
            px-6 py-3
            text-red-600
            border-2 border-red-600
            rounded-lg
            hover:bg-red-600
            hover:text-white
            transition-colors
            font-semibold
          "
        >
          <MdLogout size={24} />
          Sair
        </button>
      ) : (
        <NavLink
          to="/login"
          className="
            flex items-center gap-2
            px-6 py-3
            text-[#1A955E]
            border-2 border-[#1A955E]
            rounded-lg
            hover:bg-[#1A955E]
            hover:text-white
            transition-colors
            font-semibold
          "
        >
          <MdLogin size={24} />
          Login
        </NavLink>
      )}
    </header>
  );
}

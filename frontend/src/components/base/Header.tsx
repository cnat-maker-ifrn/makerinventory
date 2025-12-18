import { NavLink } from "react-router-dom";
import { MdLogin } from "react-icons/md";

export default function Header() {
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

      {/* Botão Login */}
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
    </header>
  );
}

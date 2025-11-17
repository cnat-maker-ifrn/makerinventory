// Base.tsx (copiar inteiro)
import Aside from "./Aside";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Base() {
  return (
    <div className="flex flex-col h-screen">

      <Header />

      {/* min-h-0 evita que children overflow quebre o layout */}
      <div className="flex flex-1 gitmin-h-0">

        <Aside />

        <main className="flex-1 px-4 overflow-auto">
          <div className="w-full">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}

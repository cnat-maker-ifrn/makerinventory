import Aside from "./Aside";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";

export default function Base() {

  const { pathname } = useLocation();

  const mainClass =
    pathname === "/"
      ? "flex-1 ml-3"
      : "flex-1 p-8";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1 min-h-screen"> 
        <Aside />

        <main className={mainClass}>
          <Outlet />
        </main>

      </div>
    </div>
  );
}

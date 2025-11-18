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
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex">
        <Aside />

        <main className={mainClass}>
          <Outlet />
        </main>

      </div>
    </div>
  );
}

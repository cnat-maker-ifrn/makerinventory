import Aside from "./Aside"
import Header from "./Header"
import Body from "./Body"
import { Outlet} from "react-router-dom"

export default function Base() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Body />

      <div className="flex flex-1">
        
        <Aside />

        {/* Área onde as páginas aparecem */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}


